import React, { useState, useEffect } from "react";
import "../styles/HomeNewArrivals.css";
import { Link, useLocation } from "react-router-dom";

function NewArrivals() {
  const [sneakers, setSneakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    let endpoint = "https://m8ykv8u2l4.execute-api.us-east-1.amazonaws.com/prod/products/newArrivals";
    if (location.pathname.startsWith("/products/")) {
      endpoint = "https://m8ykv8u2l4.execute-api.us-east-1.amazonaws.com/prod/products/popular";
    }

    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        setSneakers(data.slice(0, 6));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [location.pathname]);

  const title = location.pathname.startsWith("/products/")
    ? "RECOMMENDED FOR YOU"
    : "NEW ARRIVALS";

  // Conditionally set the "View All" link based on the pathname
  const viewAllLink = location.pathname.startsWith("/products/")
    ? "/popular"
    : "/newarrivals";

    useEffect(() => {
      const timer = setTimeout(() => {
        setShowLoading(true);
      }, 100); // 1 second = 1000 milliseconds
  
      return () => clearTimeout(timer);  // cleanup timer if component is unmounted
  }, []);  // empty dependency array means this effect runs once when component mounts
  
  useEffect(() => {
    if (sneakers.length === 0) {
      const timeoutId = setTimeout(() => {
        window.location.reload();
      }, 3000);
  
      // Clear timeout when component is unmounted or if condition changes
      return () => clearTimeout(timeoutId);
    }
  }, [sneakers]);

  function capitalizeWords(str) {
    return str
        .toLowerCase()
        .split(/\s+/) // Split on any whitespace character
        .map((word) => {
            // Check if the word has any type of apostrophe and capitalize appropriately
            if (word.includes("'") || word.includes("‘") || word.includes("’")) {
                return word
                    .split(/('|‘|’)/)
                    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
                    .join("");
            }
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(' ');
}
  return (
    <div className="container popular-releases-container">
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="popularReleasesTitle">{title}</h3>
        <Link
          to={viewAllLink}
          className="viewa"
        >
          <span className="view-all-text">
            View All <i className="bi bi-arrow-right-short"></i>
          </span>
        </Link>
      </div>
    
        <div className="row sneaker-cards">
          {sneakers.map((sneaker, index) => (
            <div
              className="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12"
              key={index}
            >
              <Link
                to={`/products/${sneaker.id}`}
                style={{ textDecoration: "none" }}
              >
                <div className="card newarrivalcards">
                  <img
                    src={sneaker.photo}
                    className="card-img-top"
                    alt={sneaker.name}
                  />
                  <div className="card-body">
                    <p className="card-text"> {sneaker.demographic === "WOMEN" ? capitalizeWords(`WMNS ${sneaker.name}`) : 
  (sneaker.demographic === "KID" ? capitalizeWords(`GS ${sneaker.name}`) : capitalizeWords(sneaker.name))}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
   
    </div>
  );
}

export default NewArrivals;
