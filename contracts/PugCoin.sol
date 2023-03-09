// SPDX-License-Identifier: MIT
pragma solidity =0.7.6;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
// 0x233E050D18f305DFCc6316de35cc98d3A162EB62
contract PugCoin is ERC20, Ownable {
    constructor() ERC20("PugCoin", "PC") {
        mint(msg.sender, 2500 * 10 ** 18);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}