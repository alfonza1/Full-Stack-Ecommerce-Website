class HomeDemographicmages {
    static categories = [
      {
        demographic: 'Men',
        imageSrc: 'https://images.footlocker.com/content/dam/final/footlocker/site/homepage/2023/september/230912-fl-hp-category-6up-update-mens.jpg',
        href: '/men',
      },,
      {
        demographic: 'Women',
        imageSrc: 'https://images.footlocker.com/content/dam/final/footlocker/site/homepage/2023/september/230912-fl-hp-category-6up-update-womens.jpg',
        href: '/women',
      },
      {
        demographic: 'Kids',
        imageSrc: 'https://images.footlocker.com/content/dam/final/footlocker/site/homepage/2023/september/230912-fl-hp-category-6up-update-kids.jpg',
        href: '/kids',
      },
      {
        demographic: 'Clothing',
        imageSrc: 'https://images.footlocker.com/content/dam/final/footlocker/site/homepage/2023/september/230912-fl-hp-category-6up-update-clothing.jpg',
        href: '/clothing',
      },
      {
        demographic: 'Accessories',
        imageSrc: 'https://images.footlocker.com/content/dam/final/footlocker/site/homepage/2023/september/230912-fl-hp-category-6up-update-accessories.jpg',
        href: '/accessories',
      },
      {
        demographic: 'Sale',
        imageSrc: 'https://images.footlocker.com/content/dam/final/footlocker/site/homepage/2023/september/230912-fl-hp-category-6up-update-sale.jpg',
        href: '/onsale',
      },
     
    ];
  
    static getCategoryByDemographic(demographic) {
      return this.categories.find(category => category.demographic === demographic);
    }
  
    static getAllCategories() {
      return this.categories;
    }
  }
  
  export default HomeDemographicmages;
  