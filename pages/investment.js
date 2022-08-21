import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";

import images from "../assets";
import { Button, Navbar } from "../components/index.js";
import { DivvyContext } from "../context/DivvyContext.js";

const investment = () => {
  const { fetchPoolBalance, investWithdrawInput, setInvestWithdrawInput } =
    useContext(DivvyContext);
  const [poolBalance, setPoolBalance] = useState(0);

  useEffect(() => {
    const fetchPoolAmt = async () => {
      await fetchPoolBalance().then((bal) => {
        setPoolBalance(bal);
      });
      fetchPoolAmt();
    };
  }, [poolBalance]);

  console.log(investWithdrawInput);

  return (
    <>
      <div className='flex flexCenterStart w-full z-10 p-4 flex-row border-b bg-nft-dark border-nft-black-1 h-[49.2rem]'>
        <div className='w-1/2 p-10 flexCenterStart h-2/3'>
          <div className='flex flex-col flexCenter w-2/3 h-full p-10 investedAmount rounded-2xl m-20 drop-shadow-xl'>
            <div className=''>
              <h1 className='text-4xl font-mono font-normal drop-shadow-md '>
                Total Balance:
              </h1>
            </div>
            <div className='text-6xl font-mono font-extrabold pt-5 drop-shadow-md'>
              {`${poolBalance} ETH`}
            </div>
          </div>
        </div>

        <div className='w-1/2 p-10 flexCenterStart flex-col'>
          <div className='flex flex-col flexStartCenter w-2/3 p-10 investedAmount rounded-2xl h-1/3 m-20 drop-shadow-xl'>
            <div className=''>
              <h1 className='text-4xl font-mono font-normal drop-shadow-md'>
                Invested Amount:
              </h1>
            </div>
            <div className='text-6xl font-mono font-extrabold pt-5 drop-shadow-md'>
              $80,000
            </div>
          </div>

          <div className='flex flexCenter flex-col w-full'>
            <div className='flexBetween md:w-full minlg:w-557 w-357 mt-6 dark:bg-nft-black-2 bg-white border dark:border-nft-black-2 border-nft-gray-2 rounded-md'>
              <input
                type='number'
                placeholder='Enter amount'
                className='h-full flex-1 w-full dark:bg-nft-black-2 bg-white px-4 rounded-md font-poppins dark:text-white text-nft-black-1 font-normal text-xs minlg:text-lg outline-none'
                onChange={(e) => {
                  setInvestWithdrawInput({
                    ...investWithdrawInput,
                    invest: e.target.value,
                  });
                }}
              />
              <div className='flex-initial'>
                <Button
                  btnName='Invest'
                  btnType='primary'
                  classStyles='rounded-md'
                />
              </div>
            </div>

            <div className='flexBetween md:w-full minlg:w-557 w-357 mt-6 dark:bg-nft-black-2 bg-white border dark:border-nft-black-2 border-nft-gray-2 rounded-md'>
              <input
                type='number'
                placeholder='Enter amount'
                className='h-full flex-1 w-full dark:bg-nft-black-2 bg-white px-4 rounded-md font-poppins dark:text-white text-nft-black-1 font-normal text-xs minlg:text-lg outline-none'
                onChange={(e) => {
                  setInvestWithdrawInput({
                    ...investWithdrawInput,
                    withdraw: e.target.value,
                  });
                }}
              />
              <div className='flex-initial'>
                <Button
                  btnName='Withdraw'
                  btnType='primary'
                  classStyles='rounded-md'
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
