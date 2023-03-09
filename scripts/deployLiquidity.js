const hre = require("hardhat");
async function main() {
  const [deployer] = await hre.ethers.getSigners();

  const LiquidityExamples = await hre.ethers.getContractFactory(
    "LiquidityExamples",
    deployer
  );
  const liquidityExamples = await LiquidityExamples.deploy();

  console.log("Liquidity Pool ", liquidityExamples.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
