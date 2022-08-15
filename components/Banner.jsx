import React from "react";
import Image from "next/image";
import { Button } from ".";
import Router from "next/router";

import images from "../assets";

const Banner = () => {
  return (
    <div className='flex justify-between w-full z-10 p-4 flex-row border-b bg-nft-dark border-nft-black-1 h-[49.2rem]'>
      <div className='flex flex-col flexCenter w-1/2'>
        <h1>Heading</h1>
        <p>Paragraph</p>
        <div>
          <Button
            btnName='Try Loan'
            classStyles='mx-2 rounded-xl'
            handleClick='/loan'
          />
        </div>
      </div>
      <div className='flex flex-col flexCenter w-1/2'>
        <Image
          src={images.creator8}
          objectFit='contain'
          width={300}
          height={300}
          alt='logo'
        />
      </div>
    </div>
  );
};

export default Banner;
