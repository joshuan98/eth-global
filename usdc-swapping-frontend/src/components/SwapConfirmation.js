import React from 'react';
import { Link } from 'react-router-dom';
import './SwapConfirmation.css';  // Import the CSS for styling

function SwapConfirmation() {
    return (
        <div className="home-container">
          <Link to="/" className="link-style">
            <button className="home-button">
              <img src="/usdc.png" alt="Coin" className="coin-image"/>
              <div className="text-container">
                <div className="amount-text">1000 USDC</div>
                <div className="action-text">Initiating Swap</div>
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
            </button>
          </Link>
        </div>
      );
    }

export default SwapConfirmation;
