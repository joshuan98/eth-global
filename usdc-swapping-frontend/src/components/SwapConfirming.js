import React from 'react';
import { Link } from 'react-router-dom';
import './SwapConfirmation.css';  // Import the CSS for styling

function SwapConfirming() {
    return (
        <div className="home-container">
          <Link to="/confirmation" className="link-style">
            <button className="home-button-2">
              <div className="options-title">Swapping</div>
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

export default SwapConfirming;
