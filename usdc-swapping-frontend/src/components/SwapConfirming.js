import React from "react";
import { Link } from "react-router-dom";
import "./SwapConfirming.css"; // Import the CSS for styling

function SwapConfirming() {
  return (
    <div className="home-container">
      <Link to="/confirmed" className="link-style">
        <button className="home-button-2">
          <div className="grid-container">
            <div className="grid-row centered-text">
              <div className="swapping">Swapping...</div>
            </div>
            <div className="grid-row">
              <img
                src="/usdc.png"
                alt="Icon 1"
                className="icon-image round-image"
              />
              <div className="currency-text">50 USDC</div>
            </div>
            <div className="grid-row centered-text">
              <div>to</div>
            </div>
            <div className="grid-row">
              <img
                src="/singapore.jpeg"
                alt="Icon 2"
                className="icon-image round-image"
              />
              <div className="currency-text">1277.10 SGD</div>
            </div>
            <div className="grid-row">
              <img src="/loading.gif" alt="Loading" className="loading-icon" />
            </div>
          </div>
        </button>
      </Link>
    </div>
  );
}

export default SwapConfirming;
