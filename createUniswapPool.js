const { ethers } = require("ethers");
const axios = require("axios");
// require("dotenv").config();

const UNISWAP_V3_FACTORY_ADDRESS = "0x1F98431c8aD98523631AE4a59f267346ea31F984";
const ROPSTEN_PROVIDER = new ethers.providers.JsonRpcProvider(
  "https://goerli.infura.io/v3/bd9db9e900d142cfb1a3403c88aa6a4a"
);
const WALLET_ADDRESS = "0x78B15fe96C6eB2fF289AdD959783430076740CA0";
const WALLET_SECRET = "ADD YOUR PRIVATE KEY";
const PUG_COIN_ADDRESS = "0x233E050D18f305DFCc6316de35cc98d3A162EB62";
const COLLIE_COIN_ADDRESS = "0x5CcBbbc0448d3903Aa9292634F197556f6AC953B";

const wallet = new ethers.Wallet(WALLET_SECRET);
const connectedWallet = wallet.connect(ROPSTEN_PROVIDER);

async function main() {
  const abi = [
    { inputs: [], stateMutability: "nonpayable", type: "constructor" },
    {
      anonymous: false,
      inputs: [
        { indexed: true, internalType: "uint24", name: "fee", type: "uint24" },
        {
          indexed: true,
          internalType: "int24",
          name: "tickSpacing",
          type: "int24",
        },
      ],
      name: "FeeAmountEnabled",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "oldOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnerChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "token0",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "token1",
          type: "address",
        },
        { indexed: true, internalType: "uint24", name: "fee", type: "uint24" },
        {
          indexed: false,
          internalType: "int24",
          name: "tickSpacing",
          type: "int24",
        },
        {
          indexed: false,
          internalType: "address",
          name: "pool",
          type: "address",
        },
      ],
      name: "PoolCreated",
      type: "event",
    },
    {
      inputs: [
        { internalType: "address", name: "tokenA", type: "address" },
        { internalType: "address", name: "tokenB", type: "address" },
        { internalType: "uint24", name: "fee", type: "uint24" },
      ],
      name: "createPool",
      outputs: [{ internalType: "address", name: "pool", type: "address" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint24", name: "fee", type: "uint24" },
        { internalType: "int24", name: "tickSpacing", type: "int24" },
      ],
      name: "enableFeeAmount",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint24", name: "", type: "uint24" }],
      name: "feeAmountTickSpacing",
      outputs: [{ internalType: "int24", name: "", type: "int24" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "", type: "address" },
        { internalType: "address", name: "", type: "address" },
        { internalType: "uint24", name: "", type: "uint24" },
      ],
      name: "getPool",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "parameters",
      outputs: [
        { internalType: "address", name: "factory", type: "address" },
        { internalType: "address", name: "token0", type: "address" },
        { internalType: "address", name: "token1", type: "address" },
        { internalType: "uint24", name: "fee", type: "uint24" },
        { internalType: "int24", name: "tickSpacing", type: "int24" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "_owner", type: "address" }],
      name: "setOwner",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  const factoryContract = new ethers.Contract(
    UNISWAP_V3_FACTORY_ADDRESS,
    abi,
    ROPSTEN_PROVIDER
  );

  const tx = await factoryContract
    .connect(connectedWallet)
    .createPool(PUG_COIN_ADDRESS, COLLIE_COIN_ADDRESS, 500);
  const receipt = await tx.wait();
  console.log("receipt ", receipt);
  const newPoolAddress = await factoryContract.getPool(
    PUG_COIN_ADDRESS,
    COLLIE_COIN_ADDRESS,
    500
  );

  console.log("you pool is ", newPoolAddress);
}

async function addLiquidity() {
  const abi = [
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
      ],
      name: "allowance",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "approve",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "decimals",
      outputs: [
        {
          internalType: "uint8",
          name: "",
          type: "uint8",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "subtractedValue",
          type: "uint256",
        },
      ],
      name: "decreaseAllowance",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "addedValue",
          type: "uint256",
        },
      ],
      name: "increaseAllowance",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "mint",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalSupply",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "transfer",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "transferFrom",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  const UniSwapAbi =
    require("@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json").abi;
  const UNISWAP_V3_POOL_ADDRESS = "0x7354E7035359b2cBf61993E3124a7ECF97b9e6E9"; // modify this line
  const uniswapV3Pool = new ethers.Contract(
    UNISWAP_V3_POOL_ADDRESS,
    UniSwapAbi,
    connectedWallet
  );

  const token0 = new ethers.Contract(PUG_COIN_ADDRESS, abi, connectedWallet);
  const token1 = new ethers.Contract(COLLIE_COIN_ADDRESS, abi, connectedWallet);
  const token0Amount = ethers.utils.parseUnits("100", 18);
  const token1Amount = ethers.utils.parseUnits("200", 18);
  const amount0Min = ethers.utils.parseUnits("99", 18);
  const amount1Min = ethers.utils.parseUnits("199", 18);
  const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from now
  const recipient = WALLET_ADDRESS;
  const tx = await uniswapV3Pool.addLiquidity(
    token0.address,
    token1.address,
    token0Amount,
    token1Amount,
    amount0Min,
    amount1Min,
    deadline,
    recipient
  );
  console.log("Transaction hash:", tx.hash);
  await tx.wait();
  console.log("Transaction confirmed");
  //   const UniSwapAbi =
  //     require("@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json").abi;
  //   console.log(UniSwapAbi);
}
// main();
addLiquidity();
