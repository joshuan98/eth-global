// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function transfer(address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
}

contract USDCSwap {
    IERC20 public usdc;
    address public owner;

    // Constructor to set the USDC token contract address and owner of the contract
    constructor(address _usdcAddress) {
        usdc = IERC20(_usdcAddress);
        owner = msg.sender;
    }

    // Modifier to restrict certain functions to the contract owner only
    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    // Function to swap USDC tokens sent to this contract
    // The sender needs to approve this contract to spend the tokens before calling this function
    function swap(uint256 amount) external {
        require(usdc.transferFrom(msg.sender, address(this), amount), "Transfer failed");
    }

    // Function to withdraw USDC tokens from this contract, restricted to the owner
    function withdraw(uint256 amount) public onlyOwner {
        require(usdc.balanceOf(address(this)) >= amount, "Insufficient balance");
        require(usdc.transfer(owner, amount), "Withdrawal failed");
    }

    // Function to change the owner of the contract
    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "Invalid address");
        owner = newOwner;
    }

    // Emergency function to recover any ERC20 tokens sent to this contract by mistake
    function recoverERC20(address tokenAddress, uint256 tokenAmount) public onlyOwner {
        IERC20(tokenAddress).transfer(owner, tokenAmount);
    }
}
