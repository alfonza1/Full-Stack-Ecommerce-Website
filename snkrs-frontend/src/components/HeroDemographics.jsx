import React from 'react';
import DemographicHeroImages from '../services/DemographicHeroImages';
import '../styles/HeroDemographics.css';

// ... same as before ...

function HeroDemographics() {
  return (
    <div className="container-fluid">
      <div className="row card-list">
        {DemographicHeroImages.getAllCategories().map((category, index) => (
          <div className="col-12 col-xxl-2 col-xl-6 col-lg-6 col-md-6 col-sm-6  " key={index}>
            <div className="card">
              <a href={category.href}>
              <img src={category.imageSrc} className="card-img-top" alt={category.demographic} />
              </a>
              <div className="card-body">
                <a className='demtextdiv' href={category.href}>
                <p className="card-text">{category.demographic}</p></a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HeroDemographics;

