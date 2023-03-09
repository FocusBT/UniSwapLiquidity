const hre = require("hardhat");
async function main() {
  const [deployer] = await hre.ethers.getSigners();

  const CollieCoin = await hre.ethers.getContractFactory(
    "CollieCoin",
    deployer
  );
  const collieCoin = await CollieCoin.deploy();

  console.log("Collie Coin deployed to ", collieCoin.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
