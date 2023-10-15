import React, { useState, useEffect } from "react";
import "../styles/Accordians.css";
import Axios from "axios";

const Accordians = (props) => {
  const [selectedDemographic, setSelectedDemographic] = useState("All");
  const [selectedProductType, setSelectedProductType] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All"); // Initialize as string for single selection
  const [brands, setBrands] = useState([]);
  const [productType, setProductType] = useState([]);
  const [demographic, setDemographic] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:8080/products/brands")
      .then((response) => {
        setBrands(response.data);
      })
      .catch((error) => {
        console.error("Error fetching brands:", error);
        setBrands([]);
      });
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:8080/products/producttypes")
      .then((response) => {
        setProductType(response.data);
      })
      .catch((error) => {
        console.error("Error fetching brands:", error);
        setProductType([]);
      });
  }, []);
  useEffect(() => {
    Axios.get("http://localhost:8080/products/demographics")
      .then((response) => {
        setDemographic(response.data);
      })
      .catch((error) => {
        console.error("Error fetching brands:", error);
        setDemographic([]);
      });
  }, []);

  const handleCheckboxChange = (event) => {
    const { value, name } = event.target;

    // If "All" is checked, clear all other selections in the same accordion
    if (value === "All") {
      if (name === "demographic") {
        setSelectedDemographic("All");
        props.setSelectedDemographic("All");
      } else if (name === "productType") {
        setSelectedProductType("All");
        props.setSelectedProductType("All");
      } else if (name === "brand") {
        setSelectedBrand("All");
        props.setSelectedBrand("All");
      }
    }
    // If any other checkbox is checked, uncheck "All"
    else {
      if (name === "demographic") {
        setSelectedDemographic(value);
        props.setSelectedDemographic(value);
      } else if (name === "productType") {
        setSelectedProductType(value);
        props.setSelectedProductType(value);
      } else if (name === "brand") {
        setSelectedBrand(value);
        props.setSelectedBrand(value);
      }
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const shouldRenderDemographicAccordion = ![
    "/men",
    "/kids",
    "/women",
  ].includes(window.location.pathname);

  const shouldRenderProductTypeAccordion = ![
    "/accessories",
    "/clothes",
  ].includes(window.location.pathname);

  const fetchedProductType = "CLOTH"; // Replace this with the actual fetched product type
  const fetchedProductTypeAcc = "ACCESSORY";

  return (
    <div className="container accordscontain">
      <div className="row">
        <div className="col-3">
          <h3 className="accordianTitle">
            {window.location.pathname === "/popular"
              ? "Popular Releases"
              : window.location.pathname === "/men"
              ? "Men"
              : window.location.pathname === "/women"
              ? "Women"
              : window.location.pathname === "/kids"
              ? "Kids"
              : window.location.pathname === "/newarrivals"
              ? "New Arrivals"
              : window.location.pathname === "/clothes"
              ? "Clothing"
              : window.location.pathname === "/onsale"
              ? "SALE"
              : window.location.pathname === "/accessories"
              ? "Accessories"
              : "Default Text"}
          </h3>
          {shouldRenderProductTypeAccordion && (
            <div className="popularaccordian">
              <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="true" // Set to true to make it open by default
                      aria-controls="collapseTwo"
                    >
                      Product Type
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse show" // Add "show" to make it open by default
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <div className="form-check">
                        <input
                          name="productType"
                          className="form-check-input"
                          type="checkbox"
                          value="All"
                          id="checkbox-all-productType"
                          checked={selectedProductType === "All"}
                          onChange={handleCheckboxChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="checkbox-all-productType"
                        >
                          All
                        </label>
                      </div>

                      {productType.map((productTypeItem) => (
                        <div className="form-check" key={productTypeItem}>
                          <input
                            name="productType"
                            className="form-check-input"
                            type="checkbox"
                            value={productTypeItem}
                            id={`checkbox-${productTypeItem}`}
                            checked={selectedProductType === productTypeItem}
                            onChange={handleCheckboxChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`checkbox-${productTypeItem}`}
                          >
                            <p>
                              {productTypeItem === "CLOTH"
                                ? "Clothes"
                                : productTypeItem === "ACCESSORY"
                                ? "Accessories"
                                : productTypeItem === "SNEAKER"
                                ? "Sneakers"
                                : capitalizeFirstLetter(productTypeItem)}
                            </p>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {shouldRenderDemographicAccordion && (
            <div className="popularaccordian">
              <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      Demographic{" "}
                    </button>
                  </h2>
                  <div
                    id="collapseThree"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <div className="form-check">
                        <input
                          name="demographic" // <-- Change this
                          className="form-check-input"
                          type="checkbox"
                          value="All"
                          id="checkbox-all-demographic" // <-- Change this
                          checked={selectedDemographic === "All"}
                          onChange={handleCheckboxChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="checkbox-all-demographic" // <-- Change this
                        >
                          All
                        </label>
                      </div>

                      {demographic.map((demographic) => (
                        <div className="form-check" key={demographic}>
                          <input
                            name="demographic"
                            className="form-check-input"
                            type="checkbox"
                            value={demographic}
                            id={`checkbox-${demographic}`}
                            checked={selectedDemographic === demographic}
                            onChange={handleCheckboxChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`checkbox-${demographic}`}
                          >
                            <p>{capitalizeFirstLetter(demographic)}</p>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="popularaccordian">
            <div className="accordion" id="accordionBrands">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseBrands"
                    aria-expanded="false"
                    aria-controls="collapseBrands"
                  >
                    Brands
                  </button>
                </h2>
                <div
                  id="collapseBrands"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionBrands"
                >
                  <div className="accordion-body">
                    <div className="form-check">
                      <input
                        name="brand" // <-- Change this
                        className="form-check-input"
                        type="checkbox"
                        value="All"
                        id="checkbox-all-brand" // <-- Change this
                        checked={selectedBrand === "All"}
                        onChange={handleCheckboxChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="checkbox-all-brand" // <-- Change this
                      >
                        All
                      </label>
                    </div>
                    {brands.map((brand) => (
                      <div className="form-check" key={brand}>
                        <input
                          name="brand"
                          className="form-check-input"
                          type="checkbox"
                          value={brand}
                          id={`checkbox-${brand}`}
                          checked={selectedBrand === brand}
                          onChange={handleCheckboxChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`checkbox-${brand}`}
                        >
                          {capitalizeFirstLetter(brand.replace(/_/g, " "))}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordians;
