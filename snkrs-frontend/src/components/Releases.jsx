import React, { useState, useEffect } from "react";
import "../styles/Releases.css";
import Accordians from "./Accordians";
import Axios from "axios";

const Releases = () => {
  const [sneakers, setSneakers] = useState([]);
  const [selectedDemographic, setSelectedDemographic] = useState("All");
  const [selectedProductType, setSelectedProductType] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // You can adjust this number based on your requirements

  // ADD THE STUFF TO THE API AND FIX PAGINATION

  useEffect(() => {
    let endpoint;

    switch (window.location.pathname) {
      case "/popular":
        endpoint = "http://localhost:8080/sneakers/popular";
        break;
      case "/men":
        endpoint = "http://localhost:8080/sneakers/demographic/MEN";
        break;
      case "/women":
        endpoint = "http://localhost:8080/sneakers/demographic/WOMEN";
        break;
      case "/kids":
        endpoint = "http://localhost:8080/sneakers/demographic/KID";
        break;
      case "/newarrivals":
        endpoint = "http://localhost:8080/sneakers/newArrivals";
        break;
      default:
        endpoint = "";
    }

    if (endpoint) {
      Axios.get(endpoint)
        .then((response) => {
          setSneakers(response.data);
        })
        .catch((error) => {
          console.error("Error fetching sneakers:", error);
        });
    }
  }, []);

  const filteredSneakers = sneakers.filter((sneaker) => {
    return (
      (selectedDemographic === "All" ||
        sneaker.demographic === selectedDemographic) &&
      (selectedProductType === "All" ||
        sneaker.productType === selectedProductType) &&
      (selectedBrand === "All" || sneaker.brand === selectedBrand)
    );
  });
  const indexOfLastSneaker = currentPage * itemsPerPage;
  const indexOfFirstSneaker = indexOfLastSneaker - itemsPerPage;
  const currentSneakers = filteredSneakers.slice(
    indexOfFirstSneaker,
    indexOfLastSneaker
  );

  return (
    <div className="container">
      <div className="row">
        <div className="col-3">
          <Accordians
            setSelectedDemographic={setSelectedDemographic}
            setSelectedProductType={setSelectedProductType}
            setSelectedBrand={setSelectedBrand}
          />
        </div>
        <div className="col-9 ">
          <div className="row releasecards">
            {currentSneakers.map((sneaker) => (
              <div
                className="col-12 col-xxl-3 col-xl-4 col-lg-6 col-md-6 col-sm-12"
                key={sneaker.id}
              >
                <div className="card" style={{ width: "15rem" }}>
                  <img
                    src={sneaker.photo}
                    className="card-img-top card-img-custom"
                    alt={sneaker.name}
                  />

                  <div className="card-body">
                    <h5 className="card-title">{sneaker.name}</h5>
                    <p className="card-text">{sneaker.brand}</p>
                    <p className="card-text">${sneaker.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <a
              className="page-link"
              href="#"
              aria-label="Previous"
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {[...Array(Math.ceil(filteredSneakers.length / itemsPerPage))].map(
            (_, index) => (
              <li
                className={`page-item ${
                  index + 1 === currentPage ? "active" : ""
                }`}
                key={index}
              >
                <a
                  className="page-link"
                  href="#"
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </a>
              </li>
            )
          )}
          <li
            className={`page-item ${
              currentPage === Math.ceil(filteredSneakers.length / itemsPerPage)
                ? "disabled"
                : ""
            }`}
          >
            <a
              className="page-link"
              href="#"
              aria-label="Next"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Releases;
