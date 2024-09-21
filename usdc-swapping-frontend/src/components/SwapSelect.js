import React from 'react';

function SwapSelect() {
  return (
    <div>
      <h1>Your Transaction History</h1>
      <ul>
        <li>Transaction 1: 100 USDC → 0.5 ETH</li>
        <li>Transaction 2: 50 USDC → 0.25 ETH</li>
        {/* More transactions */}
      </ul>
    </div>
  );
}

export default SwapSelect;
