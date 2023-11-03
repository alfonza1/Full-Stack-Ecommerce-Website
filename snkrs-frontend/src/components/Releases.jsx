import React, { useState, useEffect } from "react";
import "../styles/Releases.css";
import Accordians from "./Accordians";
import Axios from "axios";
import { Link, useSearchParams } from 'react-router-dom';
import NewArrivals from "./HomeNewArrivals";
import { Navigate } from 'react-router-dom';


function Releases() {
  const [sneakers, setSneakers] = useState([]);
  const [selectedDemographic, setSelectedDemographic] = useState("All");
  const [selectedProductType, setSelectedProductType] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('query');
  const [showNoProducts, setShowNoProducts] = useState(false);
  const [hasReloaded, setHasReloaded] = useState(false);


  

  

  const filteredSneakers = sneakers.filter((sneaker) => (
    (selectedDemographic === "All" || sneaker.demographic === selectedDemographic) &&
    (selectedProductType === "All" || sneaker.productType === selectedProductType) &&
    (selectedBrand === "All" || sneaker.brand === selectedBrand)
  ));

  const indexOfLastSneaker = currentPage * itemsPerPage;
  const indexOfFirstSneaker = indexOfLastSneaker - itemsPerPage;
  const currentSneakers = filteredSneakers.slice(indexOfFirstSneaker, indexOfLastSneaker);

  const getEndpoint = (path) => {
    const endpoints = {
      "/popular": "/products/popular",
      "/men": "/products/demographic/MEN",
      "/women": "/products/demographic/WOMEN",
      "/kids": "/products/demographic/KID",
      "/newarrivals": "/products/newArrivals",
      "/onsale": "/products/onSale",
      "/accessories": "/products/type/ACCESSORY",
      "/apparel": "/products/type/CLOTH",
      "/search": `/products/search?query=${searchTerm}`
    };

    return `https://m8ykv8u2l4.execute-api.us-east-1.amazonaws.com/prod${endpoints[path] || ""}`;
  };


  useEffect(() => {
    const endpoint = getEndpoint(window.location.pathname);
    if (endpoint) {
      Axios.get(endpoint)
        .then((response) => {
          if (response.data.length === 0 && !sessionStorage.getItem('hasReloaded')) {
            sessionStorage.setItem('hasReloaded', 'true'); // set the flag in sessionStorage
            setTimeout(() => {
              window.location.reload();
            }, 1000); // reload after 1 second
          } else {
            setSneakers(response.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching sneakers:", error);
        });
    }
}, [searchTerm]);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 150);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNoProducts(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);


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

useEffect(() => {
  const endpoint = getEndpoint(window.location.pathname);

  // Check if there are query parameters in the URL
  const hasQueryParameters = window.location.search !== '';

  if (currentSneakers.length === 0 && !hasQueryParameters) {
    const timeoutId = setTimeout(() => {
      window.location.reload();
    }, 8000);

    // Clear timeout when component is unmounted or if condition changes
    return () => clearTimeout(timeoutId);
  }
}, [currentSneakers]);


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
            {showNoProducts && currentSneakers.length === 0 && (
              <>
                <h4 className="noproducts mt-4">No products found</h4>
                <NewArrivals />
              </>
            )}
            {currentSneakers.map((sneaker) => (
              
              <div className="col-6 col-xxl-3 col-xl-4 col-lg-4 col-md-6 col-sm-6" key={sneaker.id}>
<Link to={`/products/${sneaker.id}`} style={{ textDecoration: "none" }}>
                  <div className="card releasecard">
                    <img src={sneaker.photo} className="card-img-top card-img-custom" alt={sneaker.name} />
                    <div className="card-body">
                      <p className="card-title sneaker-name">
  {sneaker.demographic === "WOMEN" ? capitalizeWords(`WMNS ${sneaker.name}`) : 
  (sneaker.demographic === "KID" ? capitalizeWords(`GS ${sneaker.name}`) : capitalizeWords(sneaker.name))}
</p>
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
              <a className="page-link" href="#" aria-label="Previous" onClick={() => setCurrentPage(currentPage - 1)}>
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            {[...Array(Math.ceil(filteredSneakers.length / itemsPerPage))].map(
              (_, index) => (
                <li className={`page-item ${index + 1 === currentPage ? "active" : ""}`} key={index}>
                  <a className="page-link" href="#" onClick={() => setCurrentPage(index + 1)}>
                    {index + 1}
                  </a>
                </li>
              )
            )}
            <li className={`page-item ${currentPage === Math.ceil(filteredSneakers.length / itemsPerPage) ? "disabled" : ""}`}>
              <a className="page-link" href="#" aria-label="Next" onClick={() => setCurrentPage(currentPage + 1)}>
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
