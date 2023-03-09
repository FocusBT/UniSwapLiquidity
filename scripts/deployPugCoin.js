const hre = require("hardhat");
async function main() {
  const [deployer] = await hre.ethers.getSigners();

  const PugCoin = await hre.ethers.getContractFactory("PugCoin", deployer);
  const pugCoin = await PugCoin.deploy();

  console.log("Pug Coin deployed to ", pugCoin.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
