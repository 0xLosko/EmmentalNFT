import { ethers } from "hardhat";

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const Emmental = await ethers.getContractFactory("EmmentalCollection");
    const emmental = await Emmental.deploy();

    console.log("Emmental deployed to:", emmental.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
