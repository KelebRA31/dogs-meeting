import React from 'react';
import './MainPage.css';
import Carousel from 'react-bootstrap/Carousel';
import Map from '../Map/Map';

export default function MainPage() {
  return (
    <div>
      <Carousel className="position-Carousel">
        <Carousel.Item>
          <img className="image-carousel" src="/Images/2727570.jpg" alt="pic1" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="image-carousel" src="/Images/dogswalk.jpeg" width="300px" alt="pic2" />
          <p>123123</p>
        </Carousel.Item>
        <Carousel.Item>
          <img className="image-carousel" src="/Images/DogsWalk.png" width="50px" alt="pic3" />
        </Carousel.Item>
      </Carousel>
      <Map />
    </div>

  );
}
