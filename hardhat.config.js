require("@nomicfoundation/hardhat-toolbox");
const privateKey1 = "ADD YOUR PRIVATE KEY";
const privateKey2 = "ADD YOUR PRIVATE KEY";
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
