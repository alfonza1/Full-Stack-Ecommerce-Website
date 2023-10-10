import React, { useState, useEffect } from 'react';
import '../styles/HomeNewArrivals.css';
import { Link } from "react-router-dom";

function NewArrivals() {
  const [sneakers, setSneakers] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    fetch('http://localhost:8080/sneakers/newArrivals')
      .then(response => response.json())
      .then(data => {
        setSneakers(data.slice(0, 8)); // take only the first 8 sneakers
        setLoading(false); // Set loading to false when data is loaded
      })
      .catch(error => {
        console.error('Error fetching new arrivals:', error);
        setLoading(false); // Handle errors and set loading to false
      });
  }, []);

  return (
    <div className="container popular-releases-container">
      <div className="d-flex justify-content-between align-items-center">
        <h3 className='popularReleasesTitle'>NEW ARRIVALS</h3>
        <Link to="/newarrivals" className='viewa'>
          <span className="view-all-text">View All <i className="bi bi-arrow-right-short"></i></span>
        </Link>
      </div>

      {loading ? ( // Display loading indicator while fetching data
        <p>Loading...</p>
      ) : (
        <div className="row sneaker-cards">
          {sneakers.map((sneaker, index) => (
            <div className='col-12 col-xxl-3 col-xl-4 col-lg-4 col-md-6 col-sm-6' key={index}>
              <Link to={`/products/${sneaker.id}`} style={{ textDecoration: 'none' }}>
                <div className="card" style={{ width: "18rem" }}>
                  <img src={sneaker.photo} className="card-img-top" alt={sneaker.sneakerName} />
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
