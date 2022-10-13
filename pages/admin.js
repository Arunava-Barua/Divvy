import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { ethers } from "ethers";

import { Button, Navbar } from "../components/index.js";
import images from "../assets";
import { DivvyContext } from "../context/DivvyContext.js";
import {
  DivvyAddress,
  DivvyAddressABI,
  PoolAddress,
  PoolAddressABI,
} from "../context/constants";

const admin = () => {
  const { adminState, setAdminState } = useContext(DivvyContext);
  const [poolBalance, setPoolBalance] = useState(0);

  const { address, amount } = adminState;

  const fetchPoolBalance = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(PoolAddress, PoolAddressABI, signer);
      try {
        const txRes = await contract.balance();
        const res = ethers.utils.formatEther(txRes);
        // console.log(res);
        setPoolBalance(res);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const callFunc = async () => {
      await fetchPoolBalance();
    };
    callFunc();
  }, []);

  const transfer = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(PoolAddress, PoolAddressABI, signer);
      try {
        const txRes = await contract.transferEther(amount.toString(), address);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className='flex flexCenterStart nav-h w-full z-10 p-4 flex-row border-b bg-nft-dark border-nft-black-1 h-[49.2rem]'>
        <div className='w-1/2 p-10 flexCenterStart h-2/3'>
          <div className='flex flex-col flexCenter w-2/3 h-full p-10 investedAmount rounded-2xl m-20 drop-shadow-xl'>
            <h1 className='text-center text-2xl drop-shadow-md min min-w-155 mb-4 text-font'>
              Total Pool Balance
            </h1>
            <div className='rounded-md white-glassmorphism p-3 '>
              <p className='text-6xl font-mono font-extrabold pb-1 drop-shadow-md whitespace-nowrap'>
                {`${poolBalance && poolBalance} ETH`}
              </p>
            </div>
          </div>
        </div>

        <div className='w-1/2 p-10 flexCenter flex-col h-full'>
          <div className='flex flexCenter flex-col w-full'>
            <div className='flexBetween flex-col md:w-full minlg:w-557 w-357 mt-6 bg-nft-black-2 border-nft-black-2  rounded-md'>
              <input
                type='string'
                placeholder='Enter Address'
                className='m-5 h-full flex-1 w-full dark:bg-nft-black-2 bg-white px-4 rounded-md font-poppins dark:text-white text-nft-black-1 font-normal text-xs minlg:text-lg outline-none'
                onChange={(e) =>
                  setAdminState({ ...adminState, address: e.target.value })
                }
              />
              <input
                type='number'
                placeholder='Enter Amount (ETH)'
                className='m-5 h-full flex-1 w-full dark:bg-nft-black-2 bg-white px-4 rounded-md font-poppins dark:text-white text-nft-black-1 font-normal text-xs minlg:text-lg outline-none'
                min='0'
                onChange={(e) =>
                  setAdminState({ ...adminState, amount: e.target.value })
                }
              />
            </div>
            <div className='flexEnd m-5'>
              <Button
                btnName='Send'
                btnType='primary'
                classStyles='rounded-md m-2'
                handleClick={() => transfer()}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default admin;
