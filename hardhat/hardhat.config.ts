import type { HardhatUserConfig } from "hardhat/config";

import "@nomicfoundation/hardhat-toolbox-viem";
import "@nomiclabs/hardhat-ethers";

import { config as dotEnvConfig } from "dotenv";
dotEnvConfig();

const config: HardhatUserConfig = {
    solidity: "0.8.24",
    networks: {
        localhost: {
            url: "http://127.0.0.1:8545",
        },
        // avalancheTest: {
        //     url: "https://api.avax-test.network/ext/bc/C/rpc",
        //     gasPrice: 225000000000,
        //     chainId: 43113,
        //     accounts: [process.env.AVALANCHE_TESTNET_PK!],
        // },
        /*sepolia: {
            url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_TOKEN}`,
            accounts: [`${process.env.SEPOLIA_PRIVATE_KEY}`],
        },*/
    },
};

export default config;
