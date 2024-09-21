import React from "react";
import { Link } from "react-router-dom";
import "./SwapConfirmation.css";

import Web3 from "web3";
import { useState } from "react";

function SwapConfirmation() {
  const [account, setAccount] = useState(null);

  // MetaMask connection logic
  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" }); // Request access to the user's wallet
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
      } catch (error) {
        console.error("User denied account access", error);
      }
    } else {
      alert("MetaMask not found! Please install MetaMask.");
    }
  };
  const contractABI = [
    {
      inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
      name: "swap",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  const contractAddress = "0x08581cAc60513FCfCDa302aE38ABa973E5f4414e"; // Replace with actual contract address
  const swapTokens = async (amount) => {
    if (!account) {
      alert("Please connect MetaMask first!");
      return;
    }

    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    try {
      await contract.methods.swap(amount).send({ from: account });
      alert("Swap successful!");
    } catch (error) {
      console.error("Error executing swap", error);
      alert("Swap failed");
    }
  };
  return (
    <div className="home-container">
      <Link to="" className="link-style">
        <button className="home-button">
          <img
            src="/usdc.png"
            alt="Icon 1"
            className="icon-image round-image"
          />
          <div className="options-title">50 USDC</div>
          <div className="confirmation-box">
            <p>Swap Details</p>

            <div className="columns-container">
              <div className="confirmation-column">
                <p>Best Route Found:</p>
                <p>Swap to XSGD</p>
                <p>Swap to StraitsX</p>
                <p>Swap to SGD</p>
                <p>Bank Transfer</p>
              </div>
              <div className="confirmation-column">
                <p>Provider:</p>
                <p>Uniswap</p>
                <p>Transfer</p>
                <p>StraitsX</p>
                <p>StraitsX</p>
              </div>
            </div>
            <button
              className="swap-button"
              onClick={account ? swapTokens(50000000) : connectMetaMask}
            >
              {account ? `Swap` : "Connect"}
            </button>
          </div>
        </button>
      </Link>

      <div className="arrow-container">↔️</div>

      <Link to="/confirming" className="link-style">
        <button className="home-button-2">
          <img
            src="/singapore.jpeg"
            alt="Icon 2"
            className="icon-image round-image"
          />
          <div className="options-title">63.49 SGD</div>
          <div className="confirmation-box">
            <p>Fee Details</p>

            <div className="columns-container">
              <div className="confirmation-column">
                <p>Transaction:</p>
                <p>Swap to XSGD</p>
                <p>Swap to StraitsX</p>
                <p>Swap to SGD</p>
                <p>Bank Transfer</p>
              </div>
              <div className="confirmation-column">
                <p>Fee% / Value:</p>
                <p>1% / 0.5 USDC</p>
                <p>0.5% / 0.25 USDC</p>
                <p>0.5% / 0.25 USDC</p>
                <p>0.1% / 0.05 USDC</p>
              </div>
            </div>

            <div className="columns-container">
              <div className="confirmation-column">
                <p>Effective Rate:</p>
                <p>Market Rate:</p>
              </div>
              <div className="confirmation-column">
                <p>
                  1.2698 <span className="negative-change">(-2.11%)</span>
                </p>
                <p>1.2971 USD/SGD</p>
              </div>
            </div>
          </div>
        </button>
      </Link>
    </div>
  );
}

export default SwapConfirmation;
