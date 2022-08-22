import React, { useState, useMemo, useCallback, useContext } from "react";
import { useRouter } from "next/router";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { useTheme } from "next-themes";
import { create } from "ipfs-http-client";

import { DivvyContext } from "../context/DivvyContext.js";
import { Button, Input, Loader } from "../components";
import images from "../assets";

// const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

const projectId = process.env.NEXT_PUBLIC_ID;
const projectSecret = process.env.NEXT_PUBLIC_SECRET_KEY;

const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

const client = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

const uploadToIPFS = async (file) => {
  try {
    const added = await client.add({ content: file });

    //path to our newly created NFT
    // const url = `https://ipfs.infura.io/ipfs/${added.path}`;
    const url = `https://divvy-bank.infura-ipfs.io/ipfs/${added.path}
    `;

    return url;
  } catch (error) {
    console.log(error);
  }
};

const FormFillUp = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const [fileUrl, setFileUrl] = useState(null);

  const { formInput, setFormInput, createTokenSubmit } =
    useContext(DivvyContext);

  const onDrop = useCallback(async (acceptedFile) => {
    //upload image to ipfs
    const url = await uploadToIPFS(acceptedFile[0]);
    console.log(url);
    setFileUrl(url);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone(
    {
      onDrop,
      accept: "image/*",
      maxSize: 5000000,
    },
    []
  );

  const fileStyle = useMemo(
    () =>
      `dark:bg-nft-black-1 bg-white border dark:border-white border-nft-gray-2 flex flex-col item-center p-5 rounded-lg border-dashed
      ${isDragActive && "border-file-active"}
      ${isDragAccept && "border-file-accept"}
      ${isDragReject && "border-file-reject"}`,
    [isDragActive, isDragAccept, isDragReject]
  );

  const createNFT = async (formInput, fileUrl, router) => {
    const { walletAddress, loanAmount, tenure } = formInput;
    console.log(formInput);

    if (!walletAddress || !loanAmount || !tenure || !fileUrl) return;

    const data = JSON.stringify({
      walletAddress,
      loanAmount,
      image: fileUrl,
    });

    try {
      console.log(data);
      const added = await client.add(data);

      const url = `https://divvy-bank.infura-ipfs.io/ipfs/${added.path}`;

      console.log(`URL ---> ${url}`);

      await createTokenSubmit(url);

      router.push("/loandashboard");
    } catch (error) {
      console.log(error);
    }
  };

  // if (isLoadingNFT) {
  //   return (
  //     <div className='flexStart min-h-screen'>
  //       <Loader />
  //     </div>
  //   );
  // }

  return (
    <div className='flex justify-center sm:px-4 p-12'>
      <div className='w-3/5 md:w-full'>
        <h1 className='font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold sm:mb-4 flex-1'>
          Apply for Loan
        </h1>

        <div className='mt-16'>
          <p className='font-poppins dark:text-white text-nft-black-1 font-semibold text-xl'>
            Upload Document
          </p>
          <div className='mt-4'>
            <div {...getRootProps()} className={fileStyle}>
              <input {...getInputProps()} />
              <div className='flexCenter flex-col text-center'>
                {fileUrl ? (
                  <div className='rounded-md my-2'>
                    <img
                      src={fileUrl}
                      alt='asset_file'
                      className='rounded-md'
                    />
                  </div>
                ) : (
                  <>
                    <p className='font-poppins dark:text-white text-nft-black-1 font-semibold text-lg'>
                      JPG, PNG, GIF, SVG, WEBM. Max 100mb.
                    </p>

                    <div className='my-12 w-full flex justify-center'>
                      <Image
                        src={images.upload}
                        width={100}
                        height={100}
                        objectFit='contain'
                        alt='file_upload'
                        className={theme === "light" ? "filter invert" : ""}
                      />
                    </div>

                    <p className='font-poppins dark:text-white text-nft-black-1 font-semibold text-sm'>
                      Drag and Drop File
                    </p>
                    <p className='font-poppins dark:text-white text-nft-black-1 font-semibold text-sm mt-2'>
                      or browse media on your device
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <Input
          inputType='input'
          title='Wallet Address'
          placeholder='Enter your wallet address'
          handleClick={(e) =>
            setFormInput({ ...formInput, walletAddress: e.target.value })
          }
        />
        <Input
          inputType='number'
          title='Amount'
          placeholder='Loan Amount'
          handleClick={(e) =>
            setFormInput({ ...formInput, loanAmount: e.target.value })
          }
        />
        <Input
          inputType='input'
          title='Tenure'
          placeholder='Enter loan duration'
          handleClick={(e) =>
            setFormInput({ ...formInput, tenure: e.target.value })
          }
        />

        <div className='mt-7 w-full flex justify-end'>
          <Button
            btnName='Submit'
            classStyles='rounded-xl py-3'
            handleClick={() => createNFT(formInput, fileUrl, router)}
          />
        </div>
      </div>
    </div>
  );
};

export default FormFillUp;
