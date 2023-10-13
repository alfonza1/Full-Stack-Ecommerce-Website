import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import "../styles/ProductPage.css";

const ProductPage = ({ addToCart }) => {
  const { id } = useParams();
  const [sneaker, setSneaker] = useState({});
  const [selectedSize, setSelectedSize] = useState("6");
  const [showAlert, setShowAlert] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // State for button disabled state

  useEffect(() => {
    Axios.get(`http://localhost:8080/products/${id}`)
      .then((response) => {
        setSneaker(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sneaker details:", error);
      });
  }, [id]);

  useEffect(() => {
    scrollToTop();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const shoeSizeArray = [
    5,
    5.5,
    "6",
    "6.5",
    "7",
    "7.5",
    "8",
    "8.5",
    "9",
    "9.5",
    "10",
    "10.5",
    "11",
    "11.5",
    "12",
    "12.5",
    "13",
    "13.5",
    "14",
  ];

  const clothSizeArray = ["S", "M", "L", "XL", "XXL"];

  const getCurrentSizeArray = () => {
    if (sneaker.productType === "ACCESSORY") {
      return [];
    } else if (sneaker.productType === "CLOTH") {
      return clothSizeArray;
    } else {
      return shoeSizeArray;
    }
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };
  const handleAddToCart = () => {
    let finalSelectedSize = selectedSize;
  
    if (sneaker.productType === "ACCESSORY") {
      finalSelectedSize = "ONE SIZE";
    }
  
    const selectedItem = {
      ...sneaker,
      selectedSize: finalSelectedSize,
    };
  
    addToCart(selectedItem);
    setShowAlert(true);
    setIsButtonDisabled(true);
  
    // Hide the alert after 3 seconds
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 3000);
  };
  

  return (
    <div className="container-fluid containerproductpage">
      <div className="row">
        {/* Navigation and images */}
        <div className="col-12 col-xl-6 image-container">
          <img
            src={sneaker.photo}
            alt={sneaker.name}
            className="sneaker-imagee"
          />
          {/* Add your left and right arrows here */}
        </div>

        <div className="col-12 col-xl-6 sneaker-details">
          <h3>{sneaker.name}</h3>
          <p>{sneaker.demographic}</p>
          <p>${sneaker.price}</p>

          <h4>
  {
    sneaker.productType === "ACCESSORY" 
      ? "ONE SIZE" 
      : sneaker.productType === "CLOTH" 
        ? "SELECT SIZE" 
        : "SELECT US SIZE"
  }
</h4>
          <div className="size-selector">
            {getCurrentSizeArray().map((size) => (
              <button
                key={size}
                className={`size-btn ${
                  selectedSize === size ? "selected" : ""
                }`}
                onClick={() => handleSizeClick(size)}
              >
                {size}
              </button>
            ))}
          </div>

          <div >
            <button
              className="add-to-cart-btn "
              onClick={handleAddToCart}
              disabled={isButtonDisabled}
            >
              Add To Cart
            </button>
            {/* Add other buttons and details as per your requirements */}
            {showAlert && (
              <div className="alert alert-dark mt-2 col-5">
                Added to Cart Successfully
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
