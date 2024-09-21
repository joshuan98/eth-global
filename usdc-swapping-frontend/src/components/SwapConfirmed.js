import React from "react";
import { Link } from "react-router-dom";
import "./SwapConfirmed.css"; // Import the CSS for styling

function SwapConfirming() {
  return (
    <div className="home-container">
      <Link to="/" className="link-style">
        <button className="home-button-2">
          <div className="grid-container">
            <div className="grid-row centered-text">
              <div className="swapping">Swap Successful</div>
            </div>
            <div className="grid-row">
              <img
                src="/singapore.jpeg"
                alt="Icon 2"
                className="icon-image round-image"
              />
              <div className="currency-text">63.49 SGD</div>
            </div>
          </div>
          <div className="centered-text">
            <div className="transfer-text">
              has been successfully transferred to your bank account at
              22/09/2024, 1:00p.m.
            </div>
          </div>
        </button>
      </Link>
    </div>
  );
}

export default SwapConfirming;
