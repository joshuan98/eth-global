import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Swap from './components/Swap';
import SwapSelect from './components/SwapSelect';
import './style.css';
import './components/Home.css';  // We'll add styling in this file
import SwapConfirmation from './components/SwapConfirmation';
import SwapConfirming from './components/SwapConfirming';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/swap" element={<Swap />} />
          <Route path="/select" element={<SwapSelect />} />
          <Route path="/confirmation" element={<SwapConfirmation />} />
          <Route path="/confirming" element={<SwapConfirming />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
