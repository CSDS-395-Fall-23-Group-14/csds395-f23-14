import './App.css';
import React from "react";
import Navbar from './components/navbar/navbar.js';
import StockScreener from './components/stock-screener/stock-screener.js';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <div className='header'>
          <Navbar />
        </div>
        <div className='body'>
          <Routes>
            <Route exact path="/" element={<StockScreener/>}/>
          </Routes>
        </div>
      </Router>

    </>
  );
}

export default App;