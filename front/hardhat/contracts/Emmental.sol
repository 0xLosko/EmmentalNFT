// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract EmmentalCollection is ERC721{

    uint256 private indexMint;

    uint256 public nbListedNft;

    uint256 public maximumSupply;

    constructor(string memory name, string memory symbol, uint256 _maximumSupply) ERC721(name, symbol) {
        maximumSupply = _maximumSupply;
        }

    struct Listed {
        uint256 price;
        address seller;
        uint256 tokenId;
        uint256 timestamp;
    }

    mapping(uint256 => Listed) public market;

    error ALREADY_LISTED(uint256 nftId);

    error U_NOT_THE_OWNER(uint256 nftId);

    error DONT_HAVE_MONEY_FOR(uint256 nbEth);

    error MAXIMUM_SUPPLY_REACHED(uint256 maxSupl);


    function mint() public {
        // Maximum supply limit if disabled if equal to 0
        if (maximumSupply > 0 && indexMint == maximumSupply-1){
            revert MAXIMUM_SUPPLY_REACHED(maximumSupply);
        }
        super._safeMint(msg.sender, indexMint); // GENERATION DES METADATAS EN FUNCTION DE L'ID
        indexMint++;
    }

    function isListed(uint256 _tokenId) public view returns (bool) {
        for (uint i = 0; i < nbListedNft; i++) {
            if (market[i].tokenId == _tokenId) {
                return true;
            }
        }
        return false;
    }

    function listNft(uint256 _price, uint256 _tokenId) public {
        if (isListed(_tokenId)) {
            revert ALREADY_LISTED(_tokenId);
        }
        market[nbListedNft] = Listed(_price, msg.sender, _tokenId, block.timestamp);
        nbListedNft++;
        approve(address(this), _tokenId);
        transferFrom(msg.sender, address(this), _tokenId);
    }

    function getIdForNftInMarket(uint256 _tokenId) public view returns (uint256) {
        if (isListed(_tokenId)) {
            for (uint i = 0; i < nbListedNft; i++) {
                if (market[i].tokenId == _tokenId) {
                    return i;
                }
            }
        }
        revert("NFT not listed in market");
    }

    function unListNft(uint256 _tokenId) public {
        if (isListed(_tokenId)) {
            uint256 indexNftInMarket = getIdForNftInMarket(_tokenId);
            if (msg.sender != market[indexNftInMarket].seller) {
                revert U_NOT_THE_OWNER(_tokenId);
            }
            deleteNftInMarket(_tokenId);
            transferFrom(address(this), msg.sender, _tokenId);
        }
    }

    function deleteNftInMarket(uint256 _tokenId) private {
        uint256 indexNftInMarket = getIdForNftInMarket(_tokenId);
        for (uint256 i = indexNftInMarket+1; i < nbListedNft; i++){
            market[i-1] = market[i];
        }
        delete market[nbListedNft];
        nbListedNft--;
    }

    function buyNft(uint _tokenId) public payable {
        //CONDITION POUR PAS SE LACHETER A SOIT MEME
        uint256 indexNftInMarket = getIdForNftInMarket(_tokenId);
        if(msg.value != market[indexNftInMarket].price){
            revert DONT_HAVE_MONEY_FOR(market[indexNftInMarket].price);
        }
        payable(market[indexNftInMarket].seller).transfer(msg.value);
        _transfer(address(this), msg.sender, _tokenId);
        deleteNftInMarket(_tokenId);
    }


    //overide balance of avec les nft listés

    function getAllNftInMarket() public view returns (Listed[] memory){
        Listed[] memory rt = new Listed[](nbListedNft);
        for (uint256 i = 0; i < nbListedNft; i++){
            rt[i] = market[i];
        }
        return rt;
    }

    function getNbMint() public view returns (uint256){
        return indexMint;
    }

    function getNftIdForWallet() public view returns (uint256[] memory) {
        uint256[] memory rt = new uint256[](balanceOf(msg.sender)); //override si nft listé le balance of sinon on perds l'info du nft listé
        uint256 j = 0;
        for (uint256 i = 0; i < getNbMint(); i++){
            if(_requireOwned(i) == msg.sender){
                rt[j] = i;
                j++;
            }
        }
        return rt;
    }
    //get details nft
}
