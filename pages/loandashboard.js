import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";

import images from "../assets";

import { Button, Navbar } from "../components";

import { DivvyContext } from "../context/DivvyContext";

const investment = () => {
  const {
    fetchLoanAmount,
    fetchRepayAmount,
    fetchInstallmentAmount,
    fetchTenure,
  } = useContext(DivvyContext);
  const [loanAmount, setLoanAmount] = useState(0);
  const [repayAmount, setRepayAmount] = useState(0);
  const [installmentAmount, setInstallmentAmount] = useState(0);
  const [tenure, setTenure] = useState(0);

  useEffect(() => {
    const fetchAmt = async () => {
      await fetchLoanAmount().then((loan) => {
        setLoanAmount(loan);
      });
      fetchAmt();
    };

    const fetchRepayAmt = async () => {
      await fetchRepayAmount().then((repay) => {
        setRepayAmount(repay);
      });
      fetchRepayAmt();
    };

    const fetchInstallationAmt = async () => {
      await fetchInstallmentAmount().then((ins) => {
        setRepayAmount(ins);
      });
      fetchInstallationAmt();
    };

    const fetchTenureTime = async () => {
      await fetchTenure().then((ten) => {
        setTenure(ten);
      });
      fetchTenureTime();
    };
  }, [loanAmount, repayAmount, installmentAmount, tenure]);

  return (
    <>
      <div className='flex flexCenterStart w-full z-10 p-4 flex-row border-b bg-nft-dark border-nft-black-1 h-[49.2rem]'>
        <div className='w-1/3 p-10 flexCenterStart h-1/3 '>
          <div className='flex flex-col flexCenter w-2/3 h-full p-10 investedAmount rounded-2xl m-20 drop-shadow-xl'>
            <div className=''>
              <h1 className='text-2xl font-mono font-normal drop-shadow-md '>
                Loan Amount:
              </h1>
            </div>
            <div className='text-6xl font-mono font-extrabold pt-5 drop-shadow-md'>
              {`${loanAmount} ETH`}
            </div>
          </div>

          <div className='flex flex-col flexCenter w-2/3 h-full p-10 investedAmount rounded-2xl m-20 drop-shadow-xl'>
            <div className=''>
              <h1 className='text-2xl font-mono font-normal drop-shadow-md '>
                Repay Amount:
              </h1>
            </div>
            <div className='text-6xl font-mono font-extrabold pt-5 drop-shadow-md'>
              {`${repayAmount} ETH`}
            </div>
          </div>

          <div className='w-full '>
            <div className='flex flex-col flexCenter w-2/3 h-full p-10 investedAmount rounded-2xl m-20 drop-shadow-xl'>
              <div className=''>
                <h1 className='text-2xl font-mono font-normal drop-shadow-md '>
                  Next Installment:
                </h1>
              </div>
              <div className='text-6xl font-mono font-extrabold pt-5 drop-shadow-md'>
                {`${installmentAmount} ETH`}
              </div>
              <div className='font-mono opacity-50'>
                {tenure} installments left
              </div>
            </div>
            <div className='flex flex-col justify-around flexCenter'>
              <Button
                btnName='Pay Due'
                btnType='primary'
                classStyles='rounded-md w-max m-2'
                handleClick={() => {}}
              />
              <Button
                btnName='Pay Full'
                btnType='primary'
                classStyles='rounded-md w-max m-2'
                handleClick={() => {}}
              />
              <div className='flexBetween flex-col md:w-full minlg:w-557 w-357 mt-6 bg-nft-black-2 border-nft-black-2  rounded-md'>
                <input
                  type='number'
                  placeholder='Enter Loan Id'
                  min='0'
                  className='m-5 h-full flex-1 w-full dark:bg-nft-black-2 bg-white px-4 rounded-md font-poppins dark:text-white text-nft-black-1 font-normal text-xs minlg:text-lg outline-none'
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
