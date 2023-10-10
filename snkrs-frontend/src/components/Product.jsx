import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import "../styles/ProductPage.css";

const ProductPage = () => {
  const { id } = useParams(); // Use useParams to get the id from the URL
  const [sneaker, setSneaker] = useState({});
  const [selectedSize, setSelectedSize] = useState("6");

  useEffect(() => {
    Axios.get(`http://localhost:8080/sneakers/${id}`) // Use the id from useParams
      .then((response) => {
        setSneaker(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sneaker details:", error);
      });
  }, [id]); // Add id to the dependency array to fetch data when it changes

  return (
    <div>
      {/* Display sneaker details */}
      <h2>{sneaker.name}</h2>
      <img src={sneaker.photo} alt={sneaker.name} />
      <p>{sneaker.brand}</p>
      <p>${sneaker.price}</p>
      {/* Sizes */}
      <div>
        {["6", "7", "8", "9", "10", "11", "12", "13", "14"].map((size) => (
          <button
            key={size}
            className={selectedSize === size ? "selected-size" : ""}
            onClick={() => setSelectedSize(size)}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
