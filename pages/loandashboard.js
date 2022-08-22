import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";

import images from "../assets";

import { Button, Navbar } from "../components";

import { DivvyContext } from "../context/DivvyContext";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

import {
  DivvyAddress,
  DivvyAddressABI,
  PoolAddress,
  PoolAddressABI,
} from "../context/constants";

const investment = () => {
  const { loanID, setLoanID } = useContext(DivvyContext);
  const [loanAmount, setLoanAmount] = useState(0);
  const [repayAmount, setRepayAmount] = useState(0);
  const [installmentAmount, setInstallmentAmount] = useState(0);
  const [tenure, setTenure] = useState(0);

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
        const res = ethers.utils.formatEther(txRes);
        setLoanAmount(res);

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
        const res = ethers.utils.formatEther(txRes);
        setRepayAmount(res);
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
        const res = ethers.utils.formatEther(txRes);
        setInstallmentAmount(res);
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
        const res = txRes.toString();
        setTenure(res);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const createPayDue = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner(); //who is creating an NFT

    const contract = new ethers.Contract(DivvyAddress, DivvyAddressABI, signer);

    const dueAmount = await contract.installmentAmt();
    const transaction = await contract.pay({ value: dueAmount });

    await transaction.wait();
  };

  const createPayFull = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner(); //who is creating an NFT

    const contract = new ethers.Contract(DivvyAddress, DivvyAddressABI, signer);

    const repayAmount = await contract.fullPaymentWithPenalty();
    const transaction = await contract.payInFull({
      value: repayAmount.toString(),
    });

    await transaction.wait();
  };

  useEffect(() => {
    const loanAmt = async () => {
      await fetchLoanAmount().then((loan) => {});
    };
    loanAmt();
  }, []);

  useEffect(() => {
    const tenureAmt = async () => {
      await fetchTenure().then((tenure) => {});
    };
    tenureAmt();
  }, []);

  useEffect(() => {
    const fetchRepayAmt = async () => {
      await fetchRepayAmount().then((repay) => {});
    };
    fetchRepayAmt();
  }, []);

  useEffect(() => {
    const fetchInstallAmt = async () => {
      await fetchInstallmentAmount().then((install) => {});
    };
    fetchInstallAmt();
  }, []);

  return (
    <>
      <div className='flex flexCenterStart w-full z-10 p-4 flex-row border-b bg-nft-dark border-nft-black-1 h-[49.2rem]'>
        <div className='flex flex-col'>
          <div className='p-10 flexCenterStart '>
            <div className='flex flex-col flexCenter w-2/3 h-full p-10 investedAmount rounded-2xl m-20 drop-shadow-xl'>
              <h1 className='text-center text-2xl drop-shadow-md min min-w-155'>
                Loan Amount
              </h1>
              <p className='text-6xl font-mono font-extrabold pt-5 drop-shadow-md whitespace-nowrap'>
                {`${loanAmount && loanAmount} ETH`}
              </p>
            </div>

            <div className='flex flex-col flexCenter w-2/3 h-full p-10 investedAmount rounded-2xl m-20 drop-shadow-xl'>
              <h1 className='text-center text-2xl drop-shadow-md min min-w-190'>
                Repay Amount
              </h1>
              <p className='text-6xl font-mono font-extrabold pt-5 drop-shadow-md whitespace-nowrap'>
                {`${repayAmount && repayAmount} ETH`}
              </p>
            </div>

            <div className='flex flex-col items-center justify-center flexCenter w-2/3 h-full p-10 investedAmount rounded-2xl m-20 drop-shadow-xl'>
              <h1 className='text-2xl drop-shadow-md min min-w-190 text-center'>
                Next Installment
              </h1>
              <p className='text-6xl font-mono font-extrabold pt-5 drop-shadow-md whitespace-nowrap'>
                {`${installmentAmount && installmentAmount} ETH`}
              </p>

              <div className='font-mono opacity-50'>
                {tenure} installments left
              </div>
            </div>
          </div>

          <div>
            <div className='flex flex-col justify-around flexCenter'>
              <Button
                btnName='Pay Due'
                btnType='primary'
                classStyles='rounded-md w-max m-2'
                handleClick={createPayDue}
              />
              <Button
                btnName='Pay Full'
                btnType='primary'
                classStyles='rounded-md w-max m-2'
                handleClick={() => createPayFull()}
              />
              <div className='flexBetween flex-col md:w-full minlg:w-557 w-357 mt-6 bg-nft-black-2 border-nft-black-2  rounded-md'>
                <input
                  type='number'
                  placeholder='Enter Loan Id'
                  min='0'
                  className='m-5 h-full flex-1 w-full dark:bg-nft-black-2 bg-white px-4 rounded-md font-poppins dark:text-white text-nft-black-1 font-normal text-xs minlg:text-lg outline-none'
                  onChange={(e) => setLoanID(e.target.value)}
                />
              </div>
              <div className='flexEnd m-5'>
                <Button
                  btnName='Settle'
                  btnType='primary'
                  classStyles='rounded-md m-2'
                  handleClick={() => {}}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default investment;
