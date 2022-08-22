/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

import { Button } from ".";
import { DivvyContext } from "../context/DivvyContext";

import images from "../assets";

const ButtonGroup = ({ setActive, router, setIsOpen, isMobile }) => {
  const { connectWallet } = useContext(DivvyContext);

  return (
    <Button
      btnName='Connect'
      classStyles='mx-2 rounded-xl'
      handleClick={connectWallet}
    />
  );
};

const Navbar = () => {
  const { currentAccount } = useContext(DivvyContext);
  let admin = false;

  return (
    <nav className='flex items-center justify-around w-screen fixed z-10 p-4 flex-row border-b dark:bg-nft-dark bg-white dark:border-nft-black-1 border-nft-gray-1'>
      {/* <div className="md:hidden flex justify-around"> */}
      <div className='rounded-md white-glassmorphism p-3 hover:cursor-pointer'>
        <Link href='/'>
          <Image
            src={images.decentralized}
            objectFit='contain'
            width={32}
            height={32}
            alt='logo'
          />
        </Link>
      </div>
      <div className='ml-4'>
        {currentAccount && admin ? (
          <>
            <Button
              btnName='Admin'
              classStyles='mx-2 rounded-xl'
              moveTo='/admin'
            />
            <Button
              btnName='Invest'
              classStyles='mx-2 rounded-xl'
              moveTo='/investment'
            />
            <Button
              btnName='Loan'
              classStyles='mx-2 rounded-xl'
              moveTo='/loandashboard'
            />
          </>
        ) : currentAccount ? (
          <>
            <Button
              btnName='Invest'
              classStyles='mx-2 rounded-xl'
              moveTo='/investment'
            />
            <Button
              btnName='Loan'
              classStyles='mx-2 rounded-xl'
              moveTo='/loandashboard'
            />
          </>
        ) : (
          <ButtonGroup />
        )}
      </div>
      {/* </div> */}
    </nav>
  );
};

export default Navbar;
