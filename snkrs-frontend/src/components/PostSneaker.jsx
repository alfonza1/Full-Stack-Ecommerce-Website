import React, { useState, useEffect } from "react";
import Axios from "axios";

const PostSneaker = () => {
  const [formData, setFormData] = useState({
    brand: "",
    productType: "",
    name: "",
    price: "",
    photo: "",
    demographic: "",
    newArrival: false,
    sale: false,
    popular: false
  });
  const [demographics, setDemographics] = useState([]);
  const [brands, setBrands] = useState([]);
  const [productTypes, setProductTypes] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let parsedValue = value;
    if (["newArrival", "sale", "popular"].includes(name)) {
      parsedValue = value === "true";
    }
    setFormData((prev) => ({ ...prev, [name]: parsedValue }));
  };

  const handleSubmit = () => {
    if (!formData.brand || !formData.productType || !formData.demographic) {
      alert("Please make sure all dropdowns have a selected value.");
      return;
    }
    Axios.post("http://localhost:8080/products", formData)
      .then(response => {
        console.log("Successfully posted:", response.data);
        alert("Sneaker successfully posted!");
        window.location.reload();  // This line will refresh the page

      })
      .catch(error => {
        console.error("Error posting sneaker:", error);
        if (error.response) {
          alert(`Error: ${error.response.data.message || "An error occurred"}`);
        } else if (error.request) {
          alert("No response received from the server. Please try again.");
        } else {
          alert("There was an error setting up the request.");
        }
      });
  };

  useEffect(() => {
    Axios.get("http://localhost:8080/products/demographics")
      .then((response) => {
        setDemographics(response.data);
        if (response.data.length) {
          setFormData(prev => ({ ...prev, demographic: response.data[0] }));
        }
      });
    Axios.get("http://localhost:8080/products/brands")
      .then((response) => {
        setBrands(response.data);
        if (response.data.length) {
          setFormData(prev => ({ ...prev, brand: response.data[0] }));
        }
      });
    Axios.get("http://localhost:8080/products/producttypes")
      .then((response) => {
        setProductTypes(response.data);
        if (response.data.length) {
          setFormData(prev => ({ ...prev, productType: response.data[0] }));
        }
      });
  }, []);

  return (
    <div className="post-sneaker-form-container" style={{ marginTop: "200px" }}>
      <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Name" />
      <input type="number" name="price" value={formData.price} onChange={handleInputChange} placeholder="Price" />
      <input type="text" name="photo" value={formData.photo} onChange={handleInputChange} placeholder="Photo URL" />
      <select name="brand" value={formData.brand} onChange={handleInputChange}>
        {brands.map((brand) => (
          <option key={brand} value={brand}>{brand}</option>
        ))}
      </select>
      <select name="productType" value={formData.productType} onChange={handleInputChange}>
        {productTypes.map((type) => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>
      <select name="demographic" value={formData.demographic} onChange={handleInputChange}>
        {demographics.map((demo) => (
          <option key={demo} value={demo}>{demo}</option>
        ))}
      </select>
      <label>New Arrival:
        <select name="newArrival" value={formData.newArrival.toString()} onChange={handleInputChange}>
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
      </label>
      <label>Sale:
        <select name="sale" value={formData.sale.toString()} onChange={handleInputChange}>
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
      </label>
      <label>Popular:
        <select name="popular" value={formData.popular.toString()} onChange={handleInputChange}>
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
      </label>
      <button onClick={handleSubmit}>Post Sneaker</button>
    </div>
  );
};

export default PostSneaker;
