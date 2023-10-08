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
    Axios.get("http://localhost:8080/sneakers/brands")
      .then((response) => {
        setBrands(response.data);
      })
      .catch((error) => {
        console.error("Error fetching brands:", error);
        setBrands([]); 
      });
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:8080/sneakers/producttypes")
      .then((response) => {
        setProductType(response.data);
      })
      .catch((error) => {
        console.error("Error fetching brands:", error);
        setProductType([]); 
      });
  }, []);
  useEffect(() => {
    Axios.get("http://localhost:8080/sneakers/demographics")
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

    if (name === "demographic") {
      const newValue = selectedDemographic === value ? "All" : value;
      setSelectedDemographic(newValue);
      props.setSelectedDemographic(newValue);
    } else if (name === "productType") {
      const newValue = selectedProductType === value ? "All" : value;
      setSelectedProductType(newValue);
      props.setSelectedProductType(newValue); // Assuming you want to pass this up to parent
    } else if (name === "brand") {
      const newValue = selectedBrand === value ? "All" : value;
      setSelectedBrand(newValue);
      props.setSelectedBrand(newValue);
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
    "/women"
  ].includes(window.location.pathname);

  return (
    <div className="container">
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
              : "Default Text"}
          </h3>

          <div className="popularaccordian">
            <div className="accordion" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    PRODUCT TYPE
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    {productType.map((productType) => (
                      <div className="form-check" key={productType}>
                        <input
                          name="productType"
                          className="form-check-input"
                          type="checkbox"
                          value={productType}
                          id={`checkbox-${productType}`}
                          checked={selectedProductType === productType}
                          onChange={handleCheckboxChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`checkbox-${productType}`}
                        >
                          <p>{productType}</p>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

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
                      DEMOGRAPHIC{" "}
                    </button>
                  </h2>
                  <div
                    id="collapseThree"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
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
                            <p>{demographic}</p>
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
                    BRANDS
                  </button>
                </h2>
                <div
                  id="collapseBrands"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionBrands"
                >
                  <div className="accordion-body">
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
