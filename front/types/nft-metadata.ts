import { Address } from "./solidity-native";

export interface CheeseMetadata {
        productionYear: number;
        shape: number;
    }

export interface INftDetails {
    contractAddress: Address;
    tokenId: string;
}
