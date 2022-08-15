import React, { useState, useEffect } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import axios from 'axios';
// import { create as ipfsHttpClient } from 'ipfs-http-client';

// import { MarketAddress, MarketAddressABI } from './constants';

// const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');

// const fetchContract = (signerOrProvider) => new ethers.Contract(MarketAddress, MarketAddressABI, signerOrProvider);

export const DivvyContext = React.createContext();

export const DivvyProvider = ({ children }) => {
  const nftCurrency = 'ETH';
  const [currentAccount, setCurrentAccount] = useState('');
//   const [isLoadingNFT, setIsLoadingNFT] = useState(false);

  // Check if it is connected to wallet
  const checkIfWalletIsConnect = async () => {
    // While installing metamask, it has an ethereum object in the window
    if (!window.ethereum) return alert('Please install MetaMask.');

    // Fetch all the eth accounts
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });

    // Connecting account if exists
    if (accounts.length) {
      setCurrentAccount(accounts[0]);
    } else {
      console.log('No accounts found');
    }
  };

  // Connect wallet
  const connectWallet = async () => {
    if (!window.ethereum) return alert('Please install MetaMask.');

    // Fetch all the eth accounts------------------------------------here----------------
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

    setCurrentAccount(accounts[0]);

    // Reloading window
    window.location.reload();
  };

  return (
    <DivvyContext.Provider value={{ nftCurrency, connectWallet, currentAccount, checkIfWalletIsConnect }}>
      {children}
    </DivvyContext.Provider>
  );
};
