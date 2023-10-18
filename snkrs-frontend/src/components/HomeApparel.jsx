import React, { useState, useEffect } from "react";
import "../styles/HomeNewArrivals.css";
import { Link } from "react-router-dom";

function HomeApparel() {
  const [sneakers, setSneakers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let endpoint = "http://localhost:8080/products/type/CLOTH";
 
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
  }, );

 
  return (
    <div className="container popular-releases-container">
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="popularReleasesTitle">APPAREL</h3>
        <Link to="/apparel" className="viewa">

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

export default HomeApparel;
