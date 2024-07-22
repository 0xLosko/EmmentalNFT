import { ethers } from "hardhat";
import * as fs from "fs";

async function main() {
    // Deployment
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const Factory = await ethers.getContractFactory("CheeseFactory");
    const factory = await Factory.deploy();
    console.log("Factory deployed !");

    // Deploy the Emmental collection
    const emmentalsResult = await factory.createCollection("Emmental", "EM", 0, 10, "/ico/ex_nft.png", "My nft collection description.")
    // Retrieve the collection
    const collectionAddress = await factory.collections(0);
    // Map the ABI
    const emmentals = await(
        await ethers.getContractFactory("CheeseCollection")
    ).attach(collectionAddress);
    // Mint an nft
    const mintResult = await emmentals.mint()

    // Auto update factory address in constants
    let envContent = fs.readFileSync("../constants/index.ts", "utf8");
    envContent = envContent.replace(/(export const contractAddress = ")\w+?"/, `$1${factory.address}"`);
    fs.writeFileSync("../constants/index.ts", envContent, "utf8");
    console.log("Factory deployed to:", factory.address);
    
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
