// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {EmmentalCollection} from "./ERC721.sol";

contract EmmentalFactory{

    // =============================================================
    //                            ERRORS
    // =============================================================

    error COLLECTION_NOT_FOUND(string);

    error COLLECTION_NAME_ALREADY_EXISTS(string);

    error COLLECTION_SYMBOL_ALREADY_EXISTS(string);

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
    //                   FACTORY IMPLEMENTATION
    // =============================================================

     function createCollection(string memory name, string memory symbol, uint256 maximumSupply ) external{
        if (!isNameAvailable(name)){
            revert COLLECTION_NAME_ALREADY_EXISTS(name);
        }else if(!isSymbolAvailable(symbol)){
            revert COLLECTION_SYMBOL_ALREADY_EXISTS(symbol);
        }
       EmmentalCollection collection = new EmmentalCollection(name, symbol, maximumSupply);// index
       collections.push(collection);
       nbListedCollection++;
       emit CollectionCreated(address(collection), name, symbol);
     }

     function isNameAvailable(string memory name) public view returns (bool){
        for (uint256 i=0; i < nbListedCollection; i++) {
            if ( keccak256(abi.encodePacked(collections[i].name)) == keccak256(abi.encodePacked(name))){
                return true;
            }
       }
       return false;
     }

     function isSymbolAvailable(string memory symbol) public view returns (bool){
        for (uint256 i=0; i < nbListedCollection; i++) {
            if ( keccak256(abi.encodePacked(collections[i].symbol)) == keccak256(abi.encodePacked(symbol))){
                return true;
            }
       }
       return false;
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
