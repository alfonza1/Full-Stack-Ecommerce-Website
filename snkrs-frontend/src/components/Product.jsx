import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import "../styles/ProductPage.css";

const ProductPage = ({ addToCart }) => {
  const { id } = useParams();
  const [sneaker, setSneaker] = useState({});
  const [selectedSize, setSelectedSize] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // State for button disabled state
  const [sizeAlert, setSizeAlert] = useState(false);

  useEffect(() => {
    setSelectedSize(null);
    Axios.get(`https://m8ykv8u2l4.execute-api.us-east-1.amazonaws.com/prod/products/${id}`)
      .then((response) => {
        setSneaker(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sneaker details:", error);
      });
  }, [id]);

  useEffect(() => {
    setTimeout(scrollToTop, 100); // 100ms delay
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
    setSizeAlert(false); // Clear the size alert
  };

  const handleAddToCart = () => {
    if (!selectedSize && sneaker.productType !== "ACCESSORY") {
      setSizeAlert(true);

      // Hide the "Please pick a size" alert after 3 seconds
      setTimeout(() => {
        setSizeAlert(false);
      }, 3000);

      return; // Exit the function early to avoid adding to cart without a size
    }

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

    // Hide the "Added to Cart Successfully" alert after 3 seconds
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);

    // Enable the "Add to Cart" button after 3 seconds
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 3000);
  };

  const capitalizeFirstLetter = (string) => {
    if (!string) return ""; // Return an empty string if the input is falsy

    return string
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="container-fluid containerproductpage">
      <div className="row">
        {/* Navigation and images */}
        <div className="col-xxl-7 col-xl-7 col-lg-7 col-md-10 col-sm-10 col-12 image-container">
          <img
            src={sneaker.photo}
            alt={sneaker.name}
            className="sneaker-imagee"
          />
          {/* Add your left and right arrows here */}
        </div>
        <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-9 col-sm-6 col-12 sneaker-details">
          <p className="sneakbrand mt-4">
            {sneaker.brand
              ? capitalizeFirstLetter(sneaker.brand.replace(/_/g, " "))
              : "Loading..."}
          </p>

          <h3>{sneaker.demographic === "KID" ? `GS ${sneaker.name}` : sneaker.name}</h3>
          <p>{sneaker.demographic}</p>
          <p>${sneaker.price}</p>

          <h4>
            {sneaker.productType === "ACCESSORY"
              ? "ONE SIZE"
              : sneaker.productType === "CLOTH"
              ? "SELECT SIZE"
              : "SELECT US SIZE"}
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

          <div>
            <button
              className="add-to-cart-btn "
              onClick={handleAddToCart}
              disabled={isButtonDisabled}
            >
              Add To Cart
            </button>
            {/* Add other buttons and details as per your requirements */}
            {showAlert && (
              <div className="alert alert-dark mt-2 col-xxl-2 col-lg-2 col-md-3 col-sm-4 col-8">
                Added to Cart Successfully
              </div>
            )}
            {sizeAlert && (
              <div className="alert alert-danger mt-2 col-xxl-2 col-lg-2 col-md-3 col-sm-4 col-8">
                Please pick a size
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
