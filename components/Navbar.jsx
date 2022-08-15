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
  const { connectWallet, currentAccount } = useContext(DivvyContext);
  return (
    <Button
      btnName='Connect'
      classStyles='mx-2 rounded-xl'
      handleClick={connectWallet}
    />
  );
};

const Navbar = () => {
  return (
    <nav className='flex justify-around w-screen fixed z-10 p-4 flex-row border-b dark:bg-nft-dark bg-white dark:border-nft-black-1 border-nft-gray-1'>
      {/* <div className="md:hidden flex justify-around"> */}
      <Image
        src={images.logo02}
        objectFit='contain'
        width={32}
        height={32}
        alt='logo'
      />
      <div className='ml-4'>
        <ButtonGroup />
      </div>
      {/* </div> */}
    </nav>
  );
};

export default Navbar;
