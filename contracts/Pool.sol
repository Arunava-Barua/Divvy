// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@chainlink/contracts/src/v0.8/KeeperCompatible.sol";

contract Pool is KeeperCompatibleInterface {
    address public owner;
    uint public balanceContract;

    uint public immutable interval;
    uint public lastTimeStamp;

    constructor() {
        owner = msg.sender;

        interval = 31536000; // 1 year in sec
        lastTimeStamp = block.timestamp;
    }

    struct AmountInterest {
        uint investedAmount;
        uint interestAmount;
        uint accountBalance;
    }

    mapping(address => AmountInterest) public perPersonAmount;

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    event depositAmount(address indexed _from, uint _amount);
    event transferAmount(address indexed _to, uint _amount);
    event withdrawAmount(address indexed _to, uint _amount);

    function receiveEther() public payable {
        balanceContract += msg.value; // increment the contract balance

        uint investedAmount = (perPersonAmount[msg.sender].investedAmount +
            msg.value);
        uint accountInterest = (investedAmount / 100) * 4;
        uint accountBalance = investedAmount + accountInterest;

        perPersonAmount[msg.sender] = AmountInterest({
            investedAmount: investedAmount,
            interestAmount: accountInterest,
            accountBalance: accountBalance
        });

        emit depositAmount(msg.sender, msg.value);
    }

    function transferEther(uint amount, address payable to)
        public
        payable
        onlyOwner
    {
        require(
            balanceContract > amount * (1 ether),
            "Insufficient funds in the pool. Please try later!"
        );
        balanceContract -= amount * (1 ether);
        to.transfer(amount * (1 ether));

        emit transferAmount(to, amount);
    }

    function withdraw(uint amount) public payable {
        require(
            balanceContract > amount,
            "Insufficient funds in the pool. Please try later!"
        );
        require(
            perPersonAmount[msg.sender].accountBalance > amount,
            "Insufficient funds in your account"
        );
        require(
            perPersonAmount[msg.sender].accountBalance / 5 > amount,
            "You cannot withdraw more than 20% at once"
        );

        balanceContract -= amount; // decrement the contract balance

        uint accountBalance = (perPersonAmount[msg.sender].accountBalance -
            amount);
        uint accountInterest = (accountBalance / 100) * 4;

        perPersonAmount[msg.sender] = AmountInterest({
            investedAmount: accountBalance,
            interestAmount: accountInterest,
            accountBalance: accountBalance
        });

        payable(msg.sender).transfer(amount);

        emit withdrawAmount(msg.sender, amount);
    }

    // upKeep
    function addInterestRate() public {
        perPersonAmount[msg.sender].accountBalance +=
            perPersonAmount[msg.sender].accountBalance /
            10;
    }

    function balance() external view returns (uint) {
        return address(this).balance;
    }

    function checkUpkeep(
        bytes calldata /* checkData */
    )
        external
        view
        override
        returns (
            bool upkeepNeeded,
            bytes memory /* performData */
        )
    {
        upkeepNeeded = (block.timestamp - lastTimeStamp) > interval;
    }

    function performUpkeep(
        bytes calldata /* performData */
    ) external override {
        if ((block.timestamp - lastTimeStamp) > interval) {
            lastTimeStamp = block.timestamp;

            addInterestRate();
        }
    }
}
