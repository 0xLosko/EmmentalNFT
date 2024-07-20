import FactoryCompiledJson from "../hardhat/artifacts/contracts/cheese-factory.sol/CheeseFactory.json";
import CollectionCompiledJson from "../hardhat/artifacts/contracts/cheese-collection.sol/CheeseCollection.json";
export const FactoryContractAbi = FactoryCompiledJson.abi;
export const CollectionContractAbi = CollectionCompiledJson.abi;
export const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
export const publicContractAddress = "0xE8C5f757a75AaBeeF6B4450cf5a56B584d5BF524";

enum Aging {
    cave, // Affinage en cave
    hayloft, // Affinage en fenil
    openAir, // Affinage à l'air libre
    salt, // Affinage au sel
    pressing, // Affinage par pressage
    cold, // Affinage à froid
}

enum FilterType {
    ALL,
    MINTABLE,
    OWNED,
}
