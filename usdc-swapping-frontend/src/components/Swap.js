import React from 'react';
import { Link } from 'react-router-dom';
import './Swap.css';  // Import the CSS for styling

function Swap() {
    return (
        <div className="home-container">
          <Link to="/" className="link-style">
            <button className="home-button">
              <img src="/usdc.png" alt="Coin" className="coin-image"/>
              <div className="text-container">
                <div className="amount-text">1000 USDC</div>
                <div className="action-text">Initiating Swap</div>
                <img src="/loading.gif" alt="Loading" className="loading-icon"/>  {/* Loading icon/gif */}
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
