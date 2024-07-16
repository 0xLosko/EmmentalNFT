// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {CheeseCollection} from "./cheese-collection.sol";
///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//               88                                                          //
//               88                                                          //
//               88                                                          //
//     ,adPPYba, 88,dPPYba,   ,adPPYba,  ,adPPYba, ,adPPYba,  ,adPPYba,      //
//    a8"     "" 88P'    "8a a8P_____88 a8P_____88 I8[    "" a8P_____88      //
//    8b         88       88 8PP""""""" 8PP"""""""  `"Y8ba,  8PP"""""""      //
//    "8a,   ,aa 88       88 "8b,   ,aa "8b,   ,aa aa    ]8I "8b,   ,aa      //
//     `"Ybbd8"' 88       88  `"Ybbd8"'  `"Ybbd8"' `"YbbdP"'  `"Ybbd8"'      //
//                                                                           //
//    ad88                                                                   //
//   d8"                           ,d                                        //
//   88                            88                                        //
// MM88MMM ,adPPYYba,  ,adPPYba, MM88MMM ,adPPYba,  8b,dPPYba, 8b       d8   //
//   88    ""     `Y8 a8"     ""   88   a8"     "8a 88P'   "Y8 `8b     d8'   //
//   88    ,adPPPPP88 8b           88   8b       d8 88          `8b   d8'    //
//   88    88,    ,88 "8a,   ,aa   88,  "8a,   ,a8" 88           `8b,d8'     //
//   88    `"8bbdP"Y8  `"Ybbd8"'   "Y888 `"YbbdP"'  88             Y88'      //
//                                                                 d8'       //
//                                                                d8'        //
//                      _________ /-'._________                              //
//                     /         /     \       .                             //
//                    / ______  /       .       -                            //
//                   / /      //         |        --------.                  //
//                  / /      /|----------|                .                  //
//                 / /      //|          |          _____.'|                 //
//                / /______// |          |     _ .       |.                  //
//               /  -------'   ----------   ,-   | ------                    //
//               --------------------------   _ "                            //
//              |_________________________|,-                                //
///////////////////////////////////////////////////////////////////////////////

contract CheeseFactory{

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

    CheeseCollection[] public collections;

    // =============================================================
    //                          CONSTANTS
    // =============================================================

    enum FilterType{
      ALL,
      MINTABLE,
      OWNED
    }

    // =============================================================
    //                            EVENTS
    // =============================================================

    event CollectionCreated(address collectionAddress, string name, string symbol );

    // =============================================================
    //                   FACTORY IMPLEMENTATION
    // =============================================================

     function createCollection(string memory name, string memory symbol, CheeseCollection.Aging _agingMethod, uint256 maximumSupply, string memory baseURI_ ) external{
        if (isNameExists(name)){
            revert COLLECTION_NAME_ALREADY_EXISTS(name);
        }else if(isSymbolExists(symbol)){
            revert COLLECTION_SYMBOL_ALREADY_EXISTS(symbol);
        }
       CheeseCollection collection = new CheeseCollection(name, symbol,_agingMethod, maximumSupply, baseURI_);// index
       collections.push(collection);
       nbListedCollection++;
       emit CollectionCreated(address(collection), name, symbol);
     }

     function isNameExists(string memory name) public view returns (bool){
        for (uint256 i=0; i < nbListedCollection; i++) {
            if ( keccak256(abi.encodePacked(collections[i].name)) == keccak256(abi.encodePacked(name))){
                return true;
            }
       }
       return false;
     }

     function isSymbolExists(string memory symbol) public view returns (bool){
        for (uint256 i=0; i < nbListedCollection; i++) {
            if ( keccak256(abi.encodePacked(collections[i].symbol)) == keccak256(abi.encodePacked(symbol))){
                return true;
            }
       }
       return false;
     }

     function getCollectionById(uint256 index) public view returns (CheeseCollection){
        return collections[index];
     }

     function getCollectionByName(string memory name) public view returns (CheeseCollection){
        for (uint256 i=0; i < nbListedCollection; i++) {
            if ( keccak256(abi.encodePacked(collections[i].name)) == keccak256(abi.encodePacked(name))){
                return collections[i];
            }
       }
       revert COLLECTION_NOT_FOUND(name);
     }

    function getCollections(FilterType filter) external view returns (CheeseCollection[] memory) {
        if(filter == FilterType.MINTABLE) {
            uint256 count = 0;
            for (uint256 i = 0; i < nbListedCollection; i++) {
                if (filter == FilterType.MINTABLE && collections[i].getMaximumSupply() > collections[i].getNbMint()) {
                    count++;
                }
            }
            CheeseCollection[] memory _collections = new CheeseCollection[](count);

            uint256 index = 0;

            for (uint256 i = 0; i < nbListedCollection; i++) {
                if (filter == FilterType.MINTABLE && collections[i].getMaximumSupply() > collections[i].getNbMint()) {
                    _collections[index] = collections[i];
                    index++;
                }
            }
            return _collections;
        }
        else {
            CheeseCollection[] memory _collections = new CheeseCollection[](nbListedCollection);
            for (uint256 i = 0; i < nbListedCollection; i++) {
                _collections[i] = collections[i];
            }
            return _collections;
        }
    }
}
