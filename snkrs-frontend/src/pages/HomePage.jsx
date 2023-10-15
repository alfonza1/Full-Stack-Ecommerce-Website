import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import HomeDemographics from '../components/HomeDemographics';
import NewArrivals from '../components/HomeNewArrivals';
import Footer from '../components/Footer';


const HomePage = () => {
  return (
    <div>
<Hero/>
<HomeDemographics/>
<NewArrivals/>

    </div>
  );
};

export default HomePage;
