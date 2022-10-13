import Head from "next/head";
import Image from "next/image";
import { Navbar, Team, Banner, Services, Button } from "../components/index.js";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";

import images from "../assets";
import { useContext } from "react";
import { DivvyContext } from "../context/DivvyContext.js";
import { shortenAddress } from "../utils/shortenAddress";

export default function Home() {
  const { currentAccount } = useContext(DivvyContext);

  return (
    <div>
      <div className='flex justify-between nav-h w-full z-10 p-4 pl-5 pr-20 flex-row border-b bg-nft-dark border-nft-black-1 h-[49.2rem]'>
        <div className='flex flex-col w-1/2 flex-2 items-start pl-10 justify-center gap-31'>
          <h1 className='text-4xl font-semibold mb-7'>
            <p className='text-8xl text-font font-bold'>Divvy,</p> <br /> The
            next generation bank
          </h1>
          <p className='text-lg opacity-60 mb-10 text-gradient'>
            Borrowing loan made secured and easier than never before
          </p>
          <div>
            <Button
              btnName='Try Loan'
              classStyles='mx-2 rounded-xl'
              moveTo='terms'
            />
          </div>
        </div>

        <div className='p-3 items-center self-center flex-col rounded-xl h-40 max-w-xs sm:w-72 w-full my-5 eth-card white-glassmorphism border-none flex-1'>
          <div className='flex justify-between flex-col w-full h-full'>
            <div className='flex justify-between items-start'>
              <div className='w-10 h-10 rounded-full border-2 border-nft-black-2 flex justify-center items-center'>
                <SiEthereum fontSize={21} color='#1B1A21' />
              </div>
              <BsInfoCircle fontSize={17} color='#1B1A21' />
            </div>

            <div>
              <p className='text-nft-black-2 font-semibold text-sm'>
                {shortenAddress(currentAccount)}
              </p>
              <p className='text-nft-black-2 font-light text-lg mt-1'>
                Ethereum
              </p>
            </div>
          </div>
        </div>
      </div>

      <Services />
      <Team />
    </div>
  );
}
