// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
        //////////////////////////////////////////////////////////
        //                  _                                   //
        //                 | |                                  //
        //              ___| |__   ___  ___  ___  ___           //
        //             / __| '_ \ / _ \/ _ \/ __|/ _ \          //
        //            | (__| | | |  __/  __/\__ \  __/          //
        //             \___|_| |_|\___|\___||___/\___|          //
        //                __                _ _                 //
        //               / _|              (_) |                //
        //              | |_ __ _ _ __ ___  _| |_   _           //
        //              |  _/ _` | '_ ` _ \| | | | | |          //
        //              | || (_| | | | | | | | | |_| |          //
        //              |_| \__,_|_| |_| |_|_|_|\__, |          //
        //                                       __/ |          //
        //                                      |___/           //
        //                      _--"-.                          //
        //                   .-"      "-.                       //
        //                  |""--..      '-.                    //
        //                  |      ""--..   '-.                 //
        //                  |.-. .-".    ""--..".               //
        //                  |'./  -_'  .-.      |               //
        //                  |      .-. '.-'   .-'               //
        //                  '--..  '.'    .-  -.                //
        //                       ""--..   '_'   :               //
        //                             ""--..   |               //
        //                                   ""-'               //
        //////////////////////////////////////////////////////////
contract CheeseCollection is ERC721URIStorage{

    // =============================================================
    //                            ERRORS
    // =============================================================

    error ALREADY_LISTED(uint256 nftId);

    error U_NOT_THE_OWNER(uint256 nftId);

    error DONT_HAVE_MONEY_FOR(uint256 nbEth);

    error MAXIMUM_SUPPLY_REACHED(uint256 maximumSupply);

    // =============================================================
    //                         NFT COUNTERS
    // =============================================================

    /**
     * Next Nft ID or Minted Nft counter
     */
    uint256 private indexMint;
    /**
     * Listed Nft (In the market) counter.
     */
    uint256 public nbListedNft;

    // =============================================================
    //                         CONSTANTS (no initial stats)
    // =============================================================

    /**
     * Maximum Nft supply (also higher Nft ID)
     */
    uint256 public maximumSupply;
    /**
     * Base URI to find NFT images
     */
    string public baseURI;

    // =============================================================
    //                            STRUCTS
    // =============================================================

    struct Listed {
        uint256 price;
        address from;
        address to;
        uint256 tokenId;
        uint256 timestamp;
    }

    struct NftHistory {
        mapping(uint256 => Listed) history;
        uint256 count;
    }

    mapping(uint256 => Listed) public market;

    mapping(uint256 => NftHistory) public marketHistory;

    // =============================================================
    //                            Events
    // =============================================================

    event NftMinted(uint256 _tokenId, address _owner);

    event NftListed(uint256 _tokenId, uint256 _price);

    event NftUnlisted(uint256 _tokenId);

    event NftSold(uint256 _tokenId);

    // =============================================================
    //                        Implementation
    // =============================================================

    constructor(string memory name, string memory symbol, uint256 _maximumSupply, string memory baseURI_) ERC721(name, symbol) {
        baseURI = baseURI_;
        maximumSupply = _maximumSupply;
        }

    function mint() public {
        // Maximum supply limit if disabled if equal to 0
        if (maximumSupply > 0 && indexMint == maximumSupply-1){
            revert MAXIMUM_SUPPLY_REACHED(maximumSupply);
        }
        super._safeMint(msg.sender, indexMint); // GENERATION DES METADATAS EN FUNCTION DE L'ID
        super._setTokenURI(indexMint, string.concat(baseURI, Strings.toString(indexMint)));
        indexMint++;
        emit NftMinted(indexMint-1, msg.sender);
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
        market[nbListedNft] = Listed(_price, msg.sender, address(this), _tokenId, block.timestamp);
        nbListedNft++;
        approve(address(this), _tokenId);
        transferFrom(msg.sender, address(this), _tokenId);
        emit NftListed(_tokenId, _price);
    }

    function getIdForNftInMarket(uint256 _tokenId) public view returns (uint256) {
        if (isListed(_tokenId)) {
            for (uint i = 0; i < nbListedNft; i++) {
                if (market[i].tokenId == _tokenId) {
                    return i;
                }
            }
        }
        revert("Nft not listed in market");
    }

    function unListNft(uint256 _tokenId) public {
        if (isListed(_tokenId)) {
            uint256 indexNftInMarket = getIdForNftInMarket(_tokenId);
            if (msg.sender != market[indexNftInMarket].from) {
                revert U_NOT_THE_OWNER(_tokenId);
            }
            deleteNftInMarket(_tokenId);
            transferFrom(address(this), msg.sender, _tokenId);
            emit NftUnlisted(_tokenId);
        }
    }

    function deleteNftInMarket(uint256 _tokenId) private {
        uint256 indexNftInMarket = getIdForNftInMarket(_tokenId);
        marketHistory[_tokenId].history[marketHistory[_tokenId].count] = market[indexNftInMarket];
        marketHistory[_tokenId].history[marketHistory[_tokenId].count].to = msg.sender;
        marketHistory[_tokenId].count++;
        for (uint256 i = indexNftInMarket+1; i < nbListedNft; i++){
            market[i-1] = market[i];
        }
        nbListedNft--;
    }

    function buyNft(uint256 _tokenId) public payable {
        // NFT PRICE IN WEI !!
        //CONDITION POUR PAS SE LACHETER A SOIT MEME
        uint256 indexNftInMarket = getIdForNftInMarket(_tokenId);
        if(msg.value != market[indexNftInMarket].price){
            revert DONT_HAVE_MONEY_FOR(market[indexNftInMarket].price);
        }
        payable(market[indexNftInMarket].from).transfer(msg.value);
        _transfer(address(this), msg.sender, _tokenId);
        deleteNftInMarket(_tokenId);
        emit NftSold(_tokenId);
    }


    //overide balance of avec les nft listés

    function getAllNftInMarket() public view returns (Listed[] memory){
        Listed[] memory rt = new Listed[](nbListedNft);
        for (uint256 i = 0; i < nbListedNft; i++){
            rt[i] = market[i];
        }
        return rt;
    }

    function getMarketSize() public view returns (uint256){
        return nbListedNft;
    }

    function getNbMint() public view returns (uint256){
        return indexMint;
    }

    function getMaximumSupply() public view returns (uint256){
        return maximumSupply;
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

    function getNftHistory(uint256 _tokenId) public view returns (Listed[] memory){
        Listed[] memory history = new Listed[](marketHistory[_tokenId].count);
        for (uint256 i = 0; i < marketHistory[_tokenId].count; i++){
            history[i] = marketHistory[_tokenId].history[i];
        }
        return history;
    }
    
    // function getFloorPrice();
}
