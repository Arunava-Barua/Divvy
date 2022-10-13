const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  const Divvy = await hre.ethers.getContractFactory("Divvy");
  const divvy = await Divvy.deploy(
    "0xd80bB2F749B4b556aeaB4A82aB5CE0608fca429b",
    { gasLimit: 20287350, gasPrice: 252873500 } // pool address
  );

  await divvy.deployed();

  console.log("Divvy deployed to:", divvy.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
