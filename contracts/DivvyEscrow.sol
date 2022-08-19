// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract EscrowNew is ERC721URIStorage {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;

    // Variables

    enum State {
        AWAITING_MORTGAGE,
        AWAITING_REPAYMENT,
        COMPLETE
    }
    State public currState;

    uint public creationTime;

    // Can use structs

    bool public isBuyerIn;
    bool public isSellerIn;

    struct Payment {
        uint256 loanAmount;
        uint256 repayAmount;
        uint256 tenure;
        uint256 penalty;
        uint256 payoutPerMonth;
    }
    Payment public payment;

    address public buyer;
    address payable public owner;

    uint public intervalTimes;
    uint public interval = (30 days);

    // Modifiers

    modifier onlyBuyer() {
        require(msg.sender == buyer, "Only buyer can call this function!");
        _;
    }

    modifier onlySeller() {
        require(msg.sender == owner, "Only owner can call this function!");
        _;
    }

    event initEvent(address _buyer, uint _loanAmount, uint _tenure);
    event NFTReceivedEvent(uint _id);
    event installmentPaidEvent(uint installment, uint installmentNumber);
    event FullPaidEvent(uint installment, uint installmentNumber);

    constructor(address payable _owner) ERC721("Divvy Token", "DVT") {
        owner = _owner;
        creationTime = block.timestamp;
        isSellerIn = true;
        isBuyerIn = true;
    }

    function init(
        address _buyer,
        uint _loanAmount,
        uint _tenure
    ) public {
        buyer = _buyer;
        intervalTimes = _tenure;
        payment = Payment(
            _loanAmount * (1 ether),
            0,
            _tenure * (30 days),
            0,
            0
        );

        payment.repayAmount = payment.loanAmount + (payment.loanAmount / 5);
        payment.penalty = (payment.repayAmount / 10);
        payment.payoutPerMonth = payment.repayAmount / intervalTimes;

        currState = State.AWAITING_MORTGAGE;
    }

    function receiveNft() public onlyBuyer {
        require(
            currState == State.AWAITING_MORTGAGE,
            "You cannot deposit mortgage"
        );

        currState = State.AWAITING_REPAYMENT;
    }

    // Pay the due amount (periodically)
    function pay() public payable onlyBuyer {
        //****************************************************************** */
        require(
            msg.value == payment.payoutPerMonth,
            "Amount not accurate. Try again!"
        );

        if (intervalTimes == 0 && payment.repayAmount == 0)
            currState = State.COMPLETE;

        require(
            currState == State.AWAITING_REPAYMENT,
            "Repayment not started yet or you already paid"
        );
        require(intervalTimes > 0, "You have 0 installments to pay");

        // Pay periodically

        payment.repayAmount -= msg.value;
        intervalTimes--;
        owner.transfer(msg.value);
    }

    function payInFull() public payable onlyBuyer {
        //********************************************************************** */
        require(payment.repayAmount != 0, "You already paid");
        require(currState == State.AWAITING_REPAYMENT, "You cannot repay now");
        require(
            msg.value == payment.repayAmount + payment.penalty,
            "The repay amount is not enough"
        ); // 10% Penalty for late repayment

        payment.repayAmount = 0;
        intervalTimes = 0;
        currState = State.COMPLETE;

        owner.transfer(msg.value);
    }

    function createToken(string memory tokenURI, uint256 price)
        public
        payable
        returns (uint256)
    {
        //increment token ID by one
        _tokenIds.increment();

        //get current value of token ids
        uint256 newTokenId = _tokenIds.current();

        //_mint => utility func that allows us to mint/create NFT
        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        createMarketItem(newTokenId, price);

        return newTokenId;
    }

    function accBalance() external view returns (uint) {
        return address(this).balance;
    }

    function loanAmt() external view returns (uint) {
        return payment.loanAmount;
    }

    function installmentAmt() external view returns (uint) {
        return payment.payoutPerMonth;
    }

    function repayAmt() external view returns (uint) {
        return payment.repayAmount;
    }

    function tenure() external view returns (uint) {
        return intervalTimes;
    }

    function status() external view returns (State) {
        return currState;
    }

    function buyerAddress() external view returns (address) {
        return buyer;
    }

    function creation() external view returns (uint) {
        return creationTime;
    }
}
