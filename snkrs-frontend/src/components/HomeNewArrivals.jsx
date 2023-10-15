import React, { useState, useEffect } from "react";
import "../styles/HomeNewArrivals.css";
import { Link, useLocation } from "react-router-dom";

function NewArrivals() {
  const [sneakers, setSneakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    let endpoint = "http://localhost:8080/products/newArrivals";
    if (location.pathname.startsWith("/products/")) {
      endpoint = "http://localhost:8080/products/popular";
    }

    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        setSneakers(data.slice(0, 8));
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
    const scrollToTop = () => {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 0); // Set the delay to 250 milliseconds (0.25 seconds)
    };
  
  return (
    <div className="container popular-releases-container">
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="popularReleasesTitle">{title}</h3>
        <Link
          to={viewAllLink}
          className="viewa"
          onClick={scrollToTop} // Add this onClick handler
        >
          <span className="view-all-text">
            View All <i className="bi bi-arrow-right-short"></i>
          </span>
        </Link>
      </div>

      {loading ? ( // Display loading indicator while fetching data
        <p>Loading...</p>
      ) : (
        <div className="row sneaker-cards">
          {sneakers.map((sneaker, index) => (
            <div
              className="col-6 col-xxl-3 col-xl-4 col-lg-6 col-md-6 col-sm-6 "
              key={index}
            >
              <Link
                to={`/products/${sneaker.id}`}
                style={{ textDecoration: "none" }}
                onClick={scrollToTop}
              >
                <div className="card newarrivalcards">
                  <img
                    src={sneaker.photo}
                    className="card-img-top"
                    alt={sneaker.name}
                  />
                  <div className="card-body">
                    <p className="card-text">{sneaker.name}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NewArrivals;
