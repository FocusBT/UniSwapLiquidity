const { expect } = require("chai");
const { ethers } = require("hardhat");

// const DAI = "0x5CcBbbc0448d3903Aa9292634F197556f6AC953B";
// const USDC = "0x233E050D18f305DFCc6316de35cc98d3A162EB62";
const PRIVATE_KEY = "ADD YOUR PRIVATE KEY";

const liquidAddress = "0xa3c7Ce58943845d8Bfc48ae4A39DaA8980D7326a";
describe("LiquidityExamples", () => {
  let liquidityExamples;
  let accounts;
  let dai;
  let usdc;

  before(async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://goerli.infura.io/v3/bd9db9e900d142cfb1a3403c88aa6a4a"
    );
    // connecting wallet using private key
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    accounts = [wallet];
    // deploying first token called DAI(CC)
    const DAI = await ethers.getContractFactory("CollieCoin");
    dai = await DAI.deploy();
    await dai.deployed();
    // deploying secound token called USDC(PG)
    const USDC = await ethers.getContractFactory("PugCoin");
    usdc = await USDC.deploy();
    await usdc.deployed();
    // deploying main contract
    const LiquidityExamples = await ethers.getContractFactory(
      "LiquidityExamples"
    );
    liquidityExamples = await LiquidityExamples.deploy();
    await liquidityExamples.deployed();
    // minting intial token to current wallet
    await dai
      .connect(accounts[0])
      .mint(accounts[0].address, "1000000000000000000000");

    await usdc
      .connect(accounts[0])
      .mint(accounts[0].address, "1000000000000000000000");

    // liquidityExamples = await ethers.getContractAt(
    //   "LiquidityExamples",
    //   liquidAddress
    // );

    // dai = await ethers.getContractAt("CollieCoin", DAI);
    // usdc = await ethers.getContractAt("PugCoin", USDC);
  }, 900000);

  it("mintNewPosition", async () => {
    // transfer DAI to liquidityExamples contract
    const tx0 = await dai
      .connect(accounts[0])
      .transfer(liquidityExamples.address, "100000000000000000000");

    // wait for tx0 to complete before executing tx1
    const receipt0 = await tx0.wait();

    // transfer USDC to liquidityExamples contract

    const tx1 = await usdc
      .connect(accounts[0])
      .transfer(liquidityExamples.address, "100000000000000000000");

    // wait for tx1 to complete before executing tx2
    const receipt1 = await tx1.wait();

    // minting new position

    const tx2 = await liquidityExamples.mintNewPosition({ gasLimit: 500000 });

    // console.log(receipt2);
  }, 50000000);

  it("increaseLiquidityCurrentRange", async () => {
    const daiAmount = 20n * 10n ** 18n;
    const usdcAmount = 20n * 10n ** 18n;

    await dai
      .connect(accounts[0])
      .approve(liquidityExamples.address, daiAmount);
    await usdc
      .connect(accounts[0])
      .approve(liquidityExamples.address, usdcAmount);

    await liquidityExamples.increaseLiquidityCurrentRange(
      daiAmount,
      usdcAmount,
      { gasLimit: 8000000 }
    );
  });

  it("decreaseLiquidity", async () => {
    const tokenId = await liquidityExamples.tokenId();
    const liquidity = await liquidityExamples.getLiquidity(tokenId);

    await liquidityExamples.decreaseLiquidity(liquidity);

    console.log("--- decrease liquidity ---");
    console.log(`liquidity ${liquidity}`);
    console.log(`dai ${await dai.balanceOf(liquidityExamples.address)}`);
    console.log(`usdc ${await usdc.balanceOf(liquidityExamples.address)}`);
  });

  it("collectAllFees", async () => {
    await liquidityExamples.collectAllFees();

    console.log("--- collect fees ---");
    console.log(`dai ${await dai.balanceOf(liquidityExamples.address)}`);
    console.log(`usdc ${await usdc.balanceOf(liquidityExamples.address)}`);
  });
});
