import React from "react";
import Image from "next/image";
import { Button } from ".";

const Banner = () => {
  return (
    <div className="flex justify-between w-full z-10 p-4 flex-row border-b bg-nft-dark border-nft-black-1 h-[49.2rem]">
      <div className="flex flex-col flexCenter w-1/2">
        <h1>Heading</h1>
        <p>Paragraph</p>
        <div>
          <Button
            btnName="Try Loan"
            clasStyles="mx-2 rounded-xl"
            
          />
        </div>
      </div>
      <div className="flex flex-col flexCenter w-1/2">Image</div>
    </div>
  );
};

export default Banner;
