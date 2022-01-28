// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts@4.4.2/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts@4.4.2/access/Ownable.sol";
import "@openzeppelin/contracts@4.4.2/token/ERC1155/extensions/ERC1155Burnable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/contracts/utils/Counters.sol";

contract MedNetContract is ERC1155, Ownable, ERC1155Burnable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    mapping (uint256 => string) private _uris; 
    event MintEvent(string tokenType, string tokenUri);
    event BurnEvent(uint256 tokenId);

    constructor() ERC1155("") {}

    function mint(string memory tokenUri, address to, string memory tokenType) public // onlyOwner "only the owner can mint"
    {
        // incrementing inside the smart contract enables non fungibility
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _mint(msg.sender, newTokenId, 1, "");

        _uris[newTokenId] = tokenUri;

        if(msg.sender != to) 
        {
            safeTransferFrom(msg.sender, to, newTokenId, 1, "");        
        }

        emit MintEvent(tokenType, tokenUri);
    }

    function uri(uint256 tokenId) override public view returns (string memory) {
        return(_uris[tokenId]);
    }

    function burn(uint256 tokenId) public 
    {
        _burn(msg.sender, tokenId, 1);
        emit BurnEvent(tokenId);
    }
}