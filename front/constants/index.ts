import FactoryCompiledJson from "../hardhat/artifacts/contracts/cheese-factory.sol/CheeseFactory.json";
import CollectionCompiledJson from "../hardhat/artifacts/contracts/cheese-collection.sol/CheeseCollection.json";
export const FactoryContractAbi = FactoryCompiledJson.abi;
export const CollectionContractAbi = CollectionCompiledJson.abi;
export const contractAddress = "0x162A433068F51e18b7d13932F27e66a3f99E6890";

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
