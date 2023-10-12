import React, { useState, useEffect } from "react";
import Navbar from '../components/Navbar';
import Product from '../components/Product'; 
import HomeNewArrivals from '../components/HomeNewArrivals';
import Footer from '../components/Footer';

const ProductsPage = () => {
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


  return (
    <div>
      <Navbar cart={cart} removeFromCart={removeFromCart} />
      <Product addToCart={addToCart} />
      <HomeNewArrivals />
    </div>
  );
};

export default ProductsPage;
