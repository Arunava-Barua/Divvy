import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import axios from "axios";

import { DivvyAddress, DivvyAddressABI } from "./constants";

// const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');

const fetchContract = (signerOrProvider) =>
  new ethers.Contract(DivvyAddress, DivvyAddressABI, signerOrProvider);

export const DivvyContext = React.createContext();

export const DivvyProvider = ({ children }) => {
  const nftCurrency = "ETH";
  const [currentAccount, setCurrentAccount] = useState("");
  let currAccountStorage = "";
  //   const [isLoadingNFT, setIsLoadingNFT] = useState(false);

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
      }}
    >
      {children}
    </DivvyContext.Provider>
  );
};
