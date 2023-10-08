import React, { useState, useEffect } from 'react';
import '../styles/HomeNewArrivals.css';


function NewArrivals() {
  const [sneakers, setSneakers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/sneakers/newArrivals')
      .then(response => response.json())
      .then(data => setSneakers(data.slice(0, 8)));  // take only the first 6 sneakers
  }, []);

  return (
<div className="container popular-releases-container">
    <div className="d-flex justify-content-between align-items-center">
        <h3 className='popularReleasesTitle'>NEW ARRIVALS</h3>
        <a href="/newarrivals" className='viewa'><span class="view-all-text">View All <i class="bi bi-arrow-right-short"></i></span></a>
        </div> 

    <div className="row sneaker-cards">
        {sneakers.map((sneaker, index) => (
            <div className='col-12 col-xxl-3 col-xl-4 col-lg-4 col-md-6 col-sm-6' key={index}>
                <div className="card" style={{width: "18rem"}}>
                    <img src={sneaker.photo} className="card-img-top" alt={sneaker.sneakerName} />
                    <div className="card-body">
                        <h5>{sneaker.brand}</h5>
                        <p className="card-text">{sneaker.sneakerName}</p>
                        <p>${sneaker.price}</p>
                    </div>
                </div>
            </div>
        ))}
    </div>
</div>

  ); 
}

export default NewArrivals;
