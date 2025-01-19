'use client'

// In your App.js or another component file
import React from 'react';
import Slider from 'react-slick'; // Import react-slick

// Import CSS styles for slick carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const App = () => {
  // Slider settings
  const settings = {
    dots: true,               
    infinite: true,           
    speed: 500,               
    slidesToShow: 1,          // Number of slides to show at once
    slidesToScroll: 1,        // Number of slides to scroll at a time
  };

  return (
    <div style={{ width: '80%', margin: 'auto', paddingTop: '50px' }}>
      <h2>Simple React Slick Carousel</h2>
      <Slider {...settings}>
        <div>
          <img src="/images/product-1.png" alt="slide 1" />
        </div>
       
        <div>
        <img src="/images/product-2.png" alt="slide 1" />
        </div>
      </Slider>
    </div>
  );
};

export default App;
