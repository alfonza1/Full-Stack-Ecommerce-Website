import React from 'react';
import Navbar from '../components/Navbar';
import Product from '../components/Product'; // Import the correct component

const ProductsPage = () => {
  return (
    <div>
      <Navbar />
      <Product /> {/* Use the correct component name */}
    </div>
  );
};

export default ProductsPage;
