// const fs = require("fs");
require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

const { NEXT_PUBLIC_API_URL, NEXT_PUBLIC_PRIVATE_KEY } = process.env;

module.exports = {
  defaultNetwork: "polygon_mumbai",
  networks: {
    hardhat: {},
    polygon_mumbai: {
      url: NEXT_PUBLIC_API_URL,
      accounts: [`0x${NEXT_PUBLIC_PRIVATE_KEY}`],
    },
  },
  solidity: "0.8.4",
};
