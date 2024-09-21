import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';  // Import the CSS for styling

function Home() {
  return (
    <div className="home-container">
      <Link to="/" className="link-style">
        <button className="home-button">
          <img src="/usdc.png" alt="Coin" className="coin-image"/>
          <div className="text-container">
            <div className="amount-text">50 USDC</div>
            <div className="action-text">Select Swap</div>
          </div>
        </button>
      </Link>
      <div className="arrow-container">↔️</div> {/* Here's the bidirectional arrow */}
      <Link to="/swap" className="link-style">
        <button className="home-button-2">
          <div className="options-title">Options</div>
          <div className="internal-button">
            <div className="left-side">
              <div className="internal-title">DEX Swap</div>
              <div className="internal-desc">Cross-chain Swaps</div>
            </div>
            <img src="/memecoin.png" alt="Icon 1" className="icon-image"/>
          </div>
          <div className="internal-button">
            <div className="left-side">
              <div className="internal-title">Convert to Fiat</div>
              <div className="internal-desc">Swap Directly to Fiat</div>
            </div>
            <img src="/forex.png" alt="Icon 2" className="icon-image"/>
          </div>
        </button>
      </Link>
    </div>
  );
}

export default Home;
