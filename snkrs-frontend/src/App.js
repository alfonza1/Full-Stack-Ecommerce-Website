import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS
import HomePage from './pages/HomePage';
import SneakerCardsData from './pages/SneakerCardsData';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import the Bootstrap Icons CSS
import ProductsPage from './pages/ProductsPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import PopularReleasesPage from './pages/SneakerCardsData';

const App = () => {
  const [cart, setCart] = useState(() => {
    // Try to retrieve the cart from localStorage on initial load
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    // Update localStorage whenever the cart changes
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (sneaker) => {
    const updatedCart = [...cart, sneaker];
    setCart(updatedCart);
  };

  const removeFromCart = (indexToRemove) => {
    const updatedCart = cart.filter((_, index) => index !== indexToRemove);
    setCart(updatedCart);
  };
  const [searchInput, setSearchInput] = useState("");


  return (
    <div className="app-container">
      <Router>
        <Navbar cart={cart} removeFromCart={removeFromCart} />
        <div className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/popular" element={<SneakerCardsData />} />
            <Route path="/men" element={<SneakerCardsData />} />
            <Route path="/women" element={<SneakerCardsData />} />
            <Route path="/kids" element={<SneakerCardsData />} />
            <Route path="/newArrivals" element={<SneakerCardsData />} />
            <Route path="/clothes" element={<SneakerCardsData />} />
            <Route path="/accessories" element={<SneakerCardsData />} />
            <Route path="/onsale" element={<SneakerCardsData />} />
            <Route path="/:searchQuery" element={<SneakerCardsData />} />

            <Route path="/products/:id" element={<ProductsPage cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} />} />
          </Routes>
        </div>
        <Footer/>
      </Router>
    </div>
  );
}


export default App;
