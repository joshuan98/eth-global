import React from 'react';
import { Link } from 'react-router-dom';
import './SwapConfirming.css';  // Import the CSS for styling

function SwapConfirming() {
  return (
    <div className="home-container">
      <Link to="/confirming" className="link-style">
        <button className="home-button-3s">
          <div className="content-container">
            <img src="/usdc.png" alt="Coin" className="coin-image"/>
            <div className="amount-text">1000 USDC</div>
          </div>
          <div className="action-text">Select Swap</div>
        </button>
      </Link>
    </div>
  );
}

export default SwapConfirming;
