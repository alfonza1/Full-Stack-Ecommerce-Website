import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import HomeDemographics from '../components/HomeDemographics';
import NewArrivals from '../components/HomeNewArrivals';
import Footer from '../components/Footer';
import HomeApparel from '../components/HomeApparel';


const HomePage = () => {
  return (
    <div>
      
<Hero/>
<HomeDemographics/>
<NewArrivals/>
<HomeApparel/>
    </div>
  );
};

export default HomePage;
