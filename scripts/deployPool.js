const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  const PoolCtr = await hre.ethers.getContractFactory("Pool");
  const pool = await PoolCtr.deploy();

  await pool.deployed();

  console.log("Pool deployed to:", pool.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
