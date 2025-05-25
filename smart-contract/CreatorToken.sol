// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import {ERC20} from  "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC721URIStorage, ERC721} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";


contract CreatorToken is ERC20 {
    address public minter;
    ArtNft private _artNFT;

    uint256 public constant REWARD_AMOUNT = 10 * 10**18;

    constructor() ERC20 ("Creator Token", "CTN") {
        minter = msg.sender;
        _artNFT = new ArtNft();
    }

    modifier onlyMinter() {
        require(msg.sender == minter, "Only minter");
        _;
    }

    function rewardCreator (address to, uint256 amount) internal onlyMinter {
        _mint(to, amount);
    }

    function mintNft (string calldata tokenUri) external {
        _artNFT.safeMint(msg.sender, tokenUri);
        rewardCreator(msg.sender, REWARD_AMOUNT);
    }

    function artNftAddress() external view returns (address) {
        return address(_artNFT);
    }
    
    /**
     * @notice Get the total number of NFTs minted
     */
    function totalNFTsMinted() external view returns (uint256) {
        return _artNFT.totalSupply();
    }
}

contract ArtNft is ERC721URIStorage {
    uint256 private _tokenIdCounter;
    mapping(uint256 => address) public creators;

    event NFTMinted(uint256 indexed tokenId, address indexed creator, string tokenURI);

    constructor() ERC721("ArtNFT", "ARTN") {}

    function safeMint(address to, string calldata uri) external {
        uint256 tokenId = _tokenIdCounter++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        creators[tokenId] = msg.sender;

        emit NFTMinted(tokenId, msg.sender, uri);
    }

    /**
        @notice Get  total NFT minted
    */
    function totalSupply() external view returns (uint256) {
        return _tokenIdCounter;
    }
}
