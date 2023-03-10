# UniSwap Liquidity Pool programmed

---

```bash
npm ci ; npx hardhat compile ; npx hardhat test --network goerli
```

---

### Steps to run the test

```bash
npm ci
```

```bash
npx hardhat compile
```

- add you private key in hardhat.config and in test/test.liquidity.js

- ake sure you have enough goerli ETH

```bash
npx hardhat test --network goerli
```

    above script will first deploy both tokens then LiquidityListingPool
    after that mintNewPosition is being executed which creates position at the start 100 tokens of both tokens are sent to liquidity pool
    once its done than 2nd test will increase the liquidity
    then 3rd test will decrease the liquidity
    in the last but not least will collect the fees
