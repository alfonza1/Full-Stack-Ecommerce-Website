import React from 'react';
import '../styles/navbar.css';




const Navbar = () => {
  return (
    <div>

<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
  <i className="bi bi-bag d-lg-none bag-icon"></i> {/* <-- Shown only on small screens */}

   <a class="navbar-brand" href="#">SNKRS</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">

        <li class="nav-item me-4">
          <a class="nav-link active" aria-current="page" href="#">New Arrivals</a>
        </li>
        <li class="nav-item me-4">
          <a class="nav-link active" aria-current="page" href="#"> Men </a>

        </li>
        <li class="nav-item me-4">
          <a class="nav-link active" aria-current="page" href="#">Women</a>
        </li>
        <li class="nav-item me-4">
          <a class="nav-link active" aria-current="page" href="#">Kid's</a>
        </li>
     

      </ul> 
     
   
   



 
    </div>
    
    <i className="bi bi-bag d-none d-lg-inline bag-icon"></i> {/* Shown only on screens larger than 992px */}
    <i class="bi bi-search d-none d-lg-inline search-icon"></i>
  </div>
  
</nav>



    </div>
  );
};

export default Navbar;
