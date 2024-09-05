// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import "./interfaces/IONFT1155.sol";
import "./ONFT1155Core.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


// NOTE: this ONFT contract has no public minting logic.
// must implement your own minting logic in child classes
contract ONFT1155 is ONFT1155Core, ERC1155, IONFT1155 {

    mapping (uint256 => string) public tokenURI;
    constructor(string memory _uri, address _lzEndpoint) ERC1155(_uri) ONFT1155Core(_lzEndpoint) Ownable(msg.sender)  {}

    function supportsInterface(bytes4 interfaceId) public view virtual override(ONFT1155Core, ERC1155, IERC165) returns (bool) {
        return interfaceId == type(IONFT1155).interfaceId || super.supportsInterface(interfaceId);
    }

    function _debitFrom(
        address _from,
        uint16,
        bytes memory,
        uint[] memory _tokenIds,
        uint[] memory _amounts
    ) internal virtual override {
        address spender = _msgSender();
        require(spender == _from || isApprovedForAll(_from, spender), "ONFT1155: send caller is not owner nor approved");
        _burnBatch(_from, _tokenIds, _amounts);
    }

    function _creditTo(
        uint16,
        address _toAddress,
        uint[] memory _tokenIds,
        uint[] memory _amounts
    ) internal virtual override {
        _mintBatch(_toAddress, _tokenIds, _amounts, "");
    }
    function uri(uint256 _id) public view override returns(string memory){
        return tokenURI[_id];
    }
    function setURI(uint256 _id, string memory _uri) external onlyOwner{
        tokenURI[_id] = _uri;
    }
}