import React, { useState, useEffect } from "react";
import "../styles/Releases.css";
import Accordians from "./Accordians";
import Axios from "axios";
import { Link } from "react-router-dom";
import { useSearchParams } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import NewArrivals from '../components/HomeNewArrivals';

function Releases() {
  const [sneakers, setSneakers] = useState([]);
  const [selectedDemographic, setSelectedDemographic] = useState("All");
  const [selectedProductType, setSelectedProductType] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('query');
  

  useEffect(() => {
    let endpoint;

    switch (window.location.pathname) {
      case "/popular":
        endpoint = "http://localhost:8080/products/popular";
        break;
      case "/men":
        endpoint = "http://localhost:8080/products/demographic/MEN";
        break;
      case "/women":
        endpoint = "http://localhost:8080/products/demographic/WOMEN";
        break;
      case "/kids":
        endpoint = "http://localhost:8080/products/demographic/KID";
        break;
      case "/newarrivals":
        endpoint = "http://localhost:8080/products/newArrivals";
        break;
      case "/onsale":
        endpoint = "http://localhost:8080/products/onSale";
        break;
      case "/accessories":
        endpoint = "http://localhost:8080/products/type/ACCESSORY";
        break;
      case "/apparel":
        endpoint = "http://localhost:8080/products/type/CLOTH";
        break;
      case "/search":
        endpoint = `http://localhost:8080/products/search?query=${searchTerm}`;
        break;
      default:
        endpoint = "";
    }

    if (endpoint) {
      Axios.get(endpoint)
        .then((response) => {
          setSneakers(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching sneakers:", error);
        });
    }
  }, [searchTerm]);

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

  const capitalizeFirstLetter = (string) => {
    return string
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };


  useEffect(() => {
    setTimeout(scrollToTop, 100); // 100ms delay
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


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
        <div className="col-xxl-9 col-12 col-xl-9 col-lg-9 col-md-12 col-sm-12 ">
          <div className="row releasecards">
          {currentSneakers.length === 0 && (
          <><h4 className="noproducts mt-4"> No products found </h4><NewArrivals /></>

        )}
            {currentSneakers.map((sneaker) => (
              <div
                className="col-6 col-xxl-3 col-xl-4 col-lg-4 col-md-6 col-sm-6 "
                key={sneaker.id}
              >
                
                <Link
                  to={`/products/${sneaker.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="card releasecard">
                    <img
                      src={sneaker.photo}
                      className="card-img-top card-img-custom"
                      alt={sneaker.name}
                    />

                    <div className="card-body">
                      <p className="card-title sneaker-name">{sneaker.name}</p>
                      <p className="card-text sneaker-name">${sneaker.price}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {filteredSneakers.length > 0 && (
        <nav aria-label="Page navigation example" className="paginationbar">
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
                currentPage ===
                Math.ceil(filteredSneakers.length / itemsPerPage)
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
      )}
    </div>
  );
};

export default Releases;
