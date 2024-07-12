// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {EmmentalCollection} from "./ERC721.sol";

contract EmmentalFactory{

    // =============================================================
    //                            ERRORS
    // =============================================================

    error COLLECTION_NOT_FOUND(string);

    // =============================================================
    //                     COLLECTIONS COUNTERS
    // =============================================================

    uint256 public nbListedCollection;

    // =============================================================
    //                            STRUCTS
    // =============================================================

    EmmentalCollection[] public collections;

    // =============================================================
    //                            EVENTS
    // =============================================================

    event CollectionCreated(address collectionAddress, string name, string symbol );

    // =============================================================
    //                        IMPLEMENTATION
    // =============================================================

     function createCollection(string memory name, string memory symbol, uint256 maximumSupply ) external{
       EmmentalCollection collection = new EmmentalCollection(name, symbol, maximumSupply);// index
       collections.push(collection);
       nbListedCollection++;
       emit CollectionCreated(address(collection), name, symbol);
     }

     function getCollectionById(uint256 index) public view returns (EmmentalCollection){
        return collections[index];
     }

     function getCollectionByName(string memory name) public view returns (EmmentalCollection){
        for (uint256 i=0; i < nbListedCollection; i++) {
            if ( keccak256(abi.encodePacked(collections[i].name)) == keccak256(abi.encodePacked(name))){
                return collections[i];
            }
       }
       revert COLLECTION_NOT_FOUND(name);
     }

     function getCollections() external view returns(EmmentalCollection[] memory){
        EmmentalCollection[] memory _collections = new EmmentalCollection[](nbListedCollection);
       for (uint256 i=0; i < nbListedCollection; i++) {
        _collections[i] = collections[i];
       }
       return _collections;
     }
}
