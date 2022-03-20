import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Products from './Products';
import Forums from './Forums';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="menu">
          <Link className="link" to="/products">
            Products
          </Link>
          <Link className="link" to="/forums">
            Forums
          </Link>
        </div>
        <Routes>
          <Route path="/products" element={<Products />} />
          <Route path="/forums" element={<Forums />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
