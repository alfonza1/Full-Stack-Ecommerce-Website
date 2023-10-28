import React, { useState, useEffect } from "react";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // Change the import here

const Navbar = ({ cart, removeFromCart }) => {
  const [isOffcanvasVisible, setOffcanvasVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate(); // Change from useHistory to useNavigate
  const [searchInput, setSearchInput] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const toggleOffcanvas = () => {
    if (!isOffcanvasVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    setOffcanvasVisible(!isOffcanvasVisible);
  };

  const computeTotal = () => {
    return cart
      .reduce((acc, item) => acc + parseFloat(item.price), 0)
      .toFixed(2);
  };

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  const brandMap = {
    adidas: "ADIDAS",
    nikes: "NIKE",
    pumas: "PUMA",
    jordans: "AIR_JORDAN",
    jordan: "AIR_JORDAN",
    retros: "AIR_JORDAN",
    Js: "AIR_JORDAN",
    retro: "AIR_JORDAN",
    kanye: "YEEZY",
    yeezys: "YEEZY",
    guccis: "GUCCI",
    diors: "DIOR",
    balenciagas: "BALENCIAGA",
    louisvuittons: "LOUIS_VUITTON",
    "louis vuitton": "LOUIS_VUITTON",
    lv: "LOUIS_VUITTON",
    LV: "LOUIS_VUITTON",
    offwhite: "OFF_WHITE",
    "off-white": "OFF_WHITE",
    "off white": "OFF_WHITE",
    virgil: "OFF_WHITE",
  };

  const demographicMap = {
    mens: "MEN",
    womens: "WOMEN",
    kids: "KID",
  };

  const productTypeMap = {
    sneakers: "SNEAKER",
    clothes: "CLOTH",
    accessories: "ACCESSORY",
    apparel: "CLOTH",
  };
  const handleSearch = (e) => {
    e.preventDefault(); // Prevent form submission
    let finalSearchTerm = searchInput.trim().toLowerCase();

    finalSearchTerm =
      brandMap[finalSearchTerm] ||
      demographicMap[finalSearchTerm] ||
      productTypeMap[finalSearchTerm] ||
      finalSearchTerm; // If no match, keep original
    if (!searchInput.trim()) {
      // If input is empty or only contains whitespace
      setShowAlert(true);

      // Reset the alert after 3 seconds
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);

      return;
    }

    // Uncollapse the small navbar
    const navbarToggler = document.querySelector(".navbar-toggler");
    const navbarCollapse = document.querySelector(".navbar-collapse");

    if (navbarToggler && navbarCollapse.classList.contains("show")) {
      navbarToggler.click();
    }

    // Redirect to the desired endpoint using user's input
    navigate(`/search?query=${finalSearchTerm}`);
    setShowModal(false);
    setSearchInput("");
  };

  return (
    <div className="wholenav">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <div className="d-flex">
            <i
              className="bi bi-bag d-lg-none bag-icon smallscreensearch me-3"
              onClick={toggleOffcanvas}
              style={{ cursor: "pointer", position: "relative" }}
            >
              {cart.length > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle bg-danger border border-light rounded-circle"
                  style={{ width: "12px", height: "12px" }}
                >
                  <span className="visually-hidden">New alerts</span>
                </span>
              )}
            </i>
          </div>

          <a className="navbar-brand" href="/">
            SNKRS
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item me-4 d-lg-none">
                <a
                  className="nav-link active smallsearch"
                  aria-current="page"
                  onClick={() => setShowModal(true)}
                >
                  Search
                </a>
              </li>
              <li className="nav-item me-4 ">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/newarrivals"
                >
                  New Arrivals
                </a>
              </li>
              <li className="nav-item me-4 ">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/popular"
                >
                  Popular Releases
                </a>
              </li>
              <li className="nav-item me-4">
                <a className="nav-link active" aria-current="page" href="/men">
                  Men
                </a>
              </li>
              <li className="nav-item me-4">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/women"
                >
                  Women
                </a>
              </li>
              <li className="nav-item me-4">
                <a className="nav-link active" aria-current="page" href="/kids">
                  Kid's
                </a>
              </li>
            </ul>
          </div>

          <i
            className="bi bi-bag d-none d-lg-inline bag-icon"
            onClick={toggleOffcanvas}
            style={{ cursor: "pointer", position: "relative" }}
          >
            {cart.length > 0 && (
              <span
                className="position-absolute top-0 start-100 translate-middle bg-danger border border-light rounded-circle"
                style={{ width: "12px", height: "12px" }}
              >
                <span className="visually-hidden">New alerts</span>
              </span>
            )}
          </i>
          <i
            className="bi bi-search d-none d-lg-inline search-icon"
            onClick={() => setShowModal(true)}
          ></i>
        </div>
      </nav>{" "}
      {showModal && (
        <>
          <div className="modal-backdrop"></div>

          <div
            className="modal show d-block"
            tabIndex="-1"
            style={{ top: "-10%" }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body">
                  <form
                    className="d-flex flex-column"
                    role="search"
                    onSubmit={handleSearch}
                  >
                    <input
                      className="form-control mb-2"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                      value={searchInput}
                      onChange={(e) => {
                        setSearchInput(e.target.value);
                        setShowAlert(false);
                      }}
                    />
                    {showAlert && (
                      <div
                        className="alert alert-dark searchalert col-8"
                        role="alert"
                      >
                        Please Enter Product Information{" "}
                      </div>
                    )}
                    <div className="d-flex justify-content-end">
                      <button
                        className="btn btn-outline-success me-2"
                        type="submit"
                      >
                        Search
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {isOffcanvasVisible && (
        <div className="offcanvas-bg" onClick={toggleOffcanvas}></div>
      )}
      {isOffcanvasVisible && (
        <div
          className="offcanvas offcanvas-end show"
          tabIndex="-1"
          id="offcanvasRight"
          aria-labelledby="offcanvasRightLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasRightLabel">
              Shopping Cart
            </h5>
            {cart.length > 0 && (
              <div className="cart-subtotal  ">
                <strong>Subtotal:</strong> ${computeTotal()}
              </div>
            )}
            <button
              type="button"
              className="btn-close"
              onClick={toggleOffcanvas}
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cart.map((item, index) => (
                <div key={index} className="cartitems">
                  <a
                    href={`/products/${item.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                    onClick={(e) => {
                      toggleOffcanvas();
                    }}
                  >
                    <img
                      src={item.photo}
                      alt={item.name}
                      style={{ width: "150px", height: "100px" }}
                    />
                    <h5>
                      {item.demographic === "KID"
                        ? `GS ${item.name}`
                        : item.name}
                    </h5>
                    <p>Size: {item.selectedSize}</p>
                    <p>${item.price}</p>
                  </a>
                  <span
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent the click from propagating to the anchor tag
                      removeFromCart(index);
                    }}
                    class="badge text-bg-danger mb-4"
                  >
                    <i class="bi bi-trash"></i>
                  </span>
                </div>
              ))
            )}
            {cart.length > 0 && (
              <div className="d-flex justify-content-center">
                <button
                  type="button"
                  class="btn btn-success col-6 mb-4"
                  onClick={() =>
                    (window.location.href =
                      "http://alfonzasportfolio.s3-website-us-east-1.amazonaws.com/")
                  }
                >
                  Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
