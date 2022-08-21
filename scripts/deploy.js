const hre = require("hardhat");

async function main() {
  const Divvy = await hre.ethers.getContractFactory("Divvy");
  const divvy = await Divvy.deploy("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb922");

  await divvy.deployed();

  console.log("Divvy deployed to:", divvy.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
