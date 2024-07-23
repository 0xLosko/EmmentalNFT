import FactoryCompiledJson from "../hardhat/artifacts/contracts/cheese-factory.sol/CheeseFactory.json";
import CollectionCompiledJson from "../hardhat/artifacts/contracts/cheese-collection.sol/CheeseCollection.json";
export const FactoryContractAbi = FactoryCompiledJson.abi;
export const CollectionContractAbi = CollectionCompiledJson.abi;
export const contractAddress = "0xe01F1A1b5faC39A3664097c2eD16ba54C73851D1";

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
