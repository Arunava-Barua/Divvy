const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  const Divvy = await hre.ethers.getContractFactory("Divvy");
  const divvy = await Divvy.deploy(
    "0x5FbDB2315678afecb367f032d93F642f64180aa3" // pool address
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
