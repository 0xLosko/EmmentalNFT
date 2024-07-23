import { ethers } from "hardhat";
import * as fs from "fs";

async function main() {
    // Deployment
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const Factory = await ethers.getContractFactory("CheeseFactory");
    const factory = await Factory.deploy();
    console.log("Factory deployed !");

    // Deploy base collections
    const emmentalsResult = await factory.createCollection("Emmental", "EM", 0, 4, "/ico/ex_nft.png", "La team trouée !")
    const camembertResult = await factory.createCollection("Camembert", "CAM", 0, 7, "/collections/Camembert.webp", "Le NFT qui va faire fondre vos papilles et votre portefeuille !")
    const chevromageResult = await factory.createCollection("Chevromage", "CHM", 0, 5, "/collections/Chevromage.webp", "La collection qui vous rendra chèvre !")
    const blueBoucResult = await factory.createCollection("BlueBouc", "BBC", 0, 10, "/collections/goat_cheese.webp", "My nft collection description.")
    const racletteResult = await factory.createCollection("Raclette", "RCL", 0, 20, "/collections/Raclette.webp", "Il en faut le plus possible !")
    const roquefortResult = await factory.createCollection("Roquefort", "RQF", 0, 2, "/collections/Roquefort.webp", "ça alors, c'est trop fort !")
    const goudaResult = await factory.createCollection("Gouda", "GDA", 0, 8, "/collections/wallace-big-cheese.webp", "Du vrai plastic !")
    // Retrieve the collection
    const collectionAddress = (await factory.getCollections(0))[0];
    // Map the ABI
    const emmentals = await(
        await ethers.getContractFactory("CheeseCollection")
    ).attach(collectionAddress);
    // Mint an nft
    await emmentals.mint()
    const mintResult = await emmentals.mint();
    // List
    const listResult = await emmentals.listNft(BigInt(10000000000000000), 0);
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
