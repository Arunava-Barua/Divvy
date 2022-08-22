import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import axios from "axios";

import {
  DivvyAddress,
  DivvyAddressABI,
  PoolAddress,
  PoolAddressABI,
} from "./constants";

// const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');

const fetchDivvyContract = (signerOrProvider) =>
  new ethers.Contract(DivvyAddress, DivvyAddressABI, signerOrProvider);

const fetchPoolContract = (signerOrProvider) =>
  new ethers.Contract(DivvyAddress, DivvyAddressABI, signerOrProvider);

export const DivvyContext = React.createContext();

export const DivvyProvider = ({ children }) => {
  const nftCurrency = "ETH";
  const [currentAccount, setCurrentAccount] = useState("");
  let currAccountStorage = "";
  //   const [isLoadingNFT, setIsLoadingNFT] = useState(false);

  const [formInput, setFormInput] = useState({
    walletAddress: "",
    loanAmount: "",
    tenure: "",
  });
  const [investWithdrawInput, setInvestWithdrawInput] = useState({
    invest: "",
    withdraw: "",
  });
  const [loanID, setLoanID] = useState("");
  const [adminState, setAdminState] = useState({
    address: "",
    amount: "",
  });
  const [investedAmount, setInvestedAmount] = useState(0);

  // Check if it is connected to wallet
  const checkIfWalletIsConnect = async () => {
    // While installing metamask, it has an ethereum object in the window
    if (!window.ethereum) return alert("Please install MetaMask.");

    // Fetch all the eth accounts
    const accounts = await window.ethereum.request({ method: "eth_accounts" });

    // Connecting account if exists
    if (accounts.length) {
      setCurrentAccount(accounts[0]);
    } else {
      console.log("No accounts found");
    }
  };

  // Connect wallet
  const connectWallet = async () => {
    if (!window.ethereum) return alert("Please install MetaMask.");

    // Fetch all the eth accounts------------------------------------here----------------
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    setCurrentAccount(accounts[0]);

    // Reloading window
    // window.location.reload();
  };

  // const fetchLoanAmount = async () => {
  //   const web3Modal = new Web3Modal({
  //     gasLimit: 200000,
  //   });
  //   const connection = await web3Modal.connect();
  //   const provider = new ethers.providers.Web3Provider(connection);
  //   const signer = provider.getSigner(); //who is creating an NFT

  //   const contract = fetchContract(signer);

  //   const tx = await contract.loanAmt();

  //   tx.wait(1);
  // };

  const fetchLoanAmount = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        DivvyAddress,
        DivvyAddressABI,
        signer
      );

      try {
        const txRes = await contract.loanAmt();
        console.log(ethers.utils.formatEther(txRes));
        console.log("Done");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const fetchRepayAmount = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        DivvyAddress,
        DivvyAddressABI,
        signer
      );
      try {
        const txRes = await contract.repayAmt();
        console.log(ethers.utils.formatEther(txRes));
        console.log("Done");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const fetchInstallmentAmount = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        DivvyAddress,
        DivvyAddressABI,
        signer
      );
      try {
        const txRes = await contract.installmentAmt();
        console.log(ethers.utils.formatEther(txRes));
        console.log("Done");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const fetchTenure = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        DivvyAddress,
        DivvyAddressABI,
        signer
      );
      try {
        const txRes = await contract.tenure();
        console.log(ethers.utils.formatEther(txRes));
        console.log("Done");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const fetchPoolBalance = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(PoolAddress, PoolAddressABI, signer);
      try {
        const txRes = await contract.balance();
        const res = ethers.utils.formatEther(txRes);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const createTokenSubmit = async (url) => {
    const { loanAmount, walletAddress, tenure } = formInput;

    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner(); //who is creating an NFT

    const contract = new ethers.Contract(DivvyAddress, DivvyAddressABI, signer);

    const transaction = await contract.createToken(url);

    const res = await transaction.wait(1);

    let id = await contract.getId();
    console.log({ res });
    id = id.toString();

    console.log({ id });

    console.log(walletAddress.toString(), loanAmount, tenure, transaction);

    await contract.init(walletAddress, loanAmount, tenure, id);
  };

  const createPayDue = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner(); //who is creating an NFT

    const contract = fetchContract(signer);

    const dueAmount = await contract.installmentAmt();
    const transaction = await contract.pay({
      value: dueAmount.toString(),
    });

    await transaction.wait();
  };

  const createPayFull = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner(); //who is creating an NFT

    const contract = fetchContract(signer);

    const repayAmount = await contract.fullPaymentWithPenalty();
    const transaction = await contract.payInFull({
      value: repayAmount.toString(),
    });

    await transaction.wait();
  };

  const createSettleLoan = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner(); //who is creating an NFT

    const contract = fetchContract(signer);

    const settleLoan = await contract.settleLoan();

    await settleLoan.wait();
  };

  const invest = async () => {
    const { withdraw, invest } = investWithdrawInput;

    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner(); //who is creating an NFT

    const contract = new ethers.Contract(PoolAddress, PoolAddressABI, signer);

    const receiveETH = await contract.receiveEther({
      value: invest,
    });

    await receiveETH.wait();
  };

  const withdraw = async () => {
    const { withdraw, invest } = investWithdrawInput;

    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner(); //who is creating an NFT

    const contract = new ethers.Contract(PoolAddress, PoolAddressABI, signer);

    const withdrawAmt = await contract.withdraw(withdraw);

    await withdrawAmt.wait();
  };

  const fetchInvestedAmount = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner(); //who is creating an NFT

    const contract = new ethers.Contract(PoolAddress, PoolAddressABI, signer);

    const txRes = await contract.investedAmount();
    const investedAmt = ethers.utils.formatEther(txRes);

    // await txRes.wait();
    setInvestedAmount(investedAmt);
  };

  const tranferETH = async () => {
    const { amount, address } = adminState;

    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner(); //who is creating an NFT

    const contract = fetchPoolContract(signer);

    const transferETH = await contract.transferEther(amount, address);

    await transferETH.wait();
  };

  // const fetchInit = async () => {
  //   const web3Modal = new Web3Modal();
  //   const connection = await web3Modal.connect();
  //   const provider = new ethers.providers.Web3Provider(connection);
  //   const signer = provider.getSigner(); //who is creating an NFT

  //   const contract = fetchContract(signer);

  //   const initFunc = await contract.init();
  // };

  return (
    <DivvyContext.Provider
      value={{
        nftCurrency,
        connectWallet,
        currentAccount,
        checkIfWalletIsConnect,
        fetchLoanAmount,
        fetchRepayAmount,
        fetchInstallmentAmount,
        fetchTenure,
        fetchPoolBalance,
        formInput,
        setFormInput,
        investWithdrawInput,
        setInvestWithdrawInput,
        loanID,
        setLoanID,
        createTokenSubmit,
        createPayDue,
        createPayFull,
        createSettleLoan,
        invest,
        withdraw,
        adminState,
        setAdminState,
        tranferETH,
        investedAmount,
        fetchInvestedAmount,
      }}
    >
      {children}
    </DivvyContext.Provider>
  );
};
