import React from 'react';
import { Link } from 'react-router-dom';
import './Swap.css';  // Import the CSS for styling
import Web3 from 'web3';
import { useState } from 'react';
function Swap() {
    const [account, setAccount] = useState(null);

  // MetaMask connection logic
  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' }); // Request access to the user's wallet
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
      } catch (error) {
        console.error('User denied account access', error);
      }
    } else {
      alert('MetaMask not found! Please install MetaMask.');
    }
  };
  const contractABI = [
    {
      inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
      name: 'swap',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ];

  const contractAddress = '0x08581cAc60513FCfCDa302aE38ABa973E5f4414e'; // Replace with actual contract address
  const swapTokens = async (amount) => {
    if (!account) {
      alert('Please connect MetaMask first!');
      return;
    }

    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    try {
      await contract.methods.swap(amount).send({ from: account });
      alert('Swap successful!');
    } catch (error) {
      console.error('Error executing swap', error);
      alert('Swap failed');
    }
  };
    return (
        <div className="home-container">
          <Link to="/swap" className="link-style">
          <button className="home-button" onClick={connectMetaMask}>
        {account ? `Connected: ${account}` : 'Connect MetaMask'}
      </button>

      <button
        className="home-button"
        onClick={() => swapTokens(1000)} // Example: swapping 1000 USDC
      >
        <img src="/usdc.png" alt="Coin" className="coin-image" />
        <div className="text-container">
          <div className="amount-text">1000 USDC</div>
          <div className="action-text">Initiating Swap</div>
          <img src="/loading.gif" alt="Loading" className="loading-icon" />
        </div>
      </button>
          </Link>
          <div className="arrow-container">↔️</div> {/* Here's the bidirectional arrow */}
          <Link to="/confirmation" className="link-style">
            <button className="home-button-2">
              <div className="options-title">Select Currency</div>
              <div className="internal-button">
                <div className="left-side">
                  <div className="internal-title">Singapore Dollar</div>
                  <div className="internal-desc">SGD/USDC ~1.277</div>
                </div>
                <img src="/singapore.jpeg" alt="Icon 1" className="icon-image round-image"/>
              </div>
              <div className="internal-button">
                <div className="left-side">
                  <div className="internal-title">Japanese Yen</div>
                  <div className="internal-desc">JPY/USDC ~143.83</div>
                </div>
                <img src="/japanese.png" alt="Icon 2" className="icon-image round-image"/>
              </div>
              <div className="internal-button">
                <div className="left-side">
                  <div className="internal-title">Swiss Franc</div>
                  <div className="internal-desc">SGD/USDC ~0.851</div>
                </div>
                <img src="/swiss.png" alt="Icon 2" className="icon-image round-image"/>
              </div>
            </button>
          </Link>
        </div>
      );
    }

export default Swap;
