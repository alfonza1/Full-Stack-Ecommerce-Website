import React from 'react';
import HomeDemographicmages from '../services/HomeDemographicmages';
import '../styles/HomeDemographics.css';


function HomeDemographics() {
  return (
    <div className="container-fluid">
      <div className="row card-list">
        {HomeDemographicmages.getAllCategories().map((category, index) => (
          <div className="col-6 col-xxl-2 col-xl-4 col-lg-6 col-md-6 col-sm-6  " key={index}>
            <div className="card demographicCards">
              <a href={category.href}>
              <img src={category.imageSrc} className="card-img-top" alt={category.demographic} />
              </a>
              <div className="card-body">
                <a className='demtextdiv' href={category.href}>
                <p className="card-text demographicName">{category.demographic}</p></a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeDemographics;

