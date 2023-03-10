require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: __dirname + "/.env" });

// const { WALLET_TWO_PRIVATE_KEY } = process.env;
const privateKey1 = process.env.WALLET_TWO_PRIVATE_KEY;
const privateKey2 = privateKey1;

console.log(" private keys should be the same");
console.log("privateKey1", privateKey1);
console.log("privateKey2", privateKey2);

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
 solidity: {
  compilers: [
   {
    version: "0.7.6",
    settings: {
     evmVersion: "istanbul",
     optimizer: {
      enabled: true,
      runs: 1000,
     },
    },
   },
  ],
 },
 networks: {
  goerli: {
   url: "https://goerli.infura.io/v3/bd9db9e900d142cfb1a3403c88aa6a4a",
   accounts: [privateKey1, privateKey2],
  },
 },
};
