import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Accordians from "../components/Accordians";
import Releases from "../components/Releases";

const ReleasesData = () => {
  return (
    <div>
      <Navbar />
      <Releases />
      <Footer/>
    </div>
  );
};

export default ReleasesData;
