# Seed Coin

This is a demo project of a crowdfunding platform, built using React, Next.js, TypeScript, and Solidity.

https://github.com/user-attachments/assets/507470ec-508f-45a5-8bb9-a33aff40e660

## Setup

1. Git clone: `git clone git@github.com:OmarBasem/seed-coin.git && cd seed-coin`
2. Install dependencies: `yarn`
3. Start server: `yarn dev`

## Deploying your own contract

1. Add .env file to the root directory with the following content:
```
MNEMONIC="your mnemonic"
INFURA_PROJECT_ID="your infura project id"
```
2. Compile smart contract: `cd ./src/ethereum && node compile.js`
3. Deploy smart contract: `node deploy.js`
4. Use the deployed contract address in `factory.js` inside `web3.eth.Contract` function.

## License

Licensed under the [MIT License](https://opensource.org/licenses/MIT)
