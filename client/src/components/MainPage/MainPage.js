/* eslint-disable react/jsx-indent */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import './MainPage.css';
import Carousel from 'react-bootstrap/Carousel';
import Map from '../Map/Map';

export default function MainPage() {
  const handlerScrollDown = () => {
    if (document.body.scrollTop >= 0 || document.documentElement.scrollTop >= 0) {
      window.scrollBy(0, -50);
      window.scrollTo({
        top: 900,
        left: 100,
        behavior: 'smooth',
      });
    }
  };

  const handlerScrollUp = () => {
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      window.scrollBy(0, -50);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div>
      <Carousel className="position-Carousel">
        <Carousel.Item>
          <img className="image-carousel example-img" src="/Images/Photo3.svg" alt="pic1" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="image-carousel example-img" src="/Images/Photo3.svg" alt="pic2" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="image-carousel example-img" src="/Images/Photo3.svg" alt="pic3" />
        </Carousel.Item>
      </Carousel>
      <div className="button-containerDown">
      <img src="/Images/ButtonDown.svg" className="button-down" onClick={handlerScrollDown} alt="button-down" />
      </div>
      <Map />
      <div className="button-containerUp">
      <img src="/Images/ButtonUp.svg" className="button-up" onClick={handlerScrollUp} alt="button-up" />
      </div>
    </div>

  );
}

/* eslint-disable react/jsx-indent */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
// import React from 'react';
// import './MainPage.css';
// import Carousel from 'react-bootstrap/Carousel';
// import Map from '../Map/Map';

// export default function MainPage() {
//   const handlerScrollUp = () => {
//     if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
//       window.scrollBy(0, -50);
//       window.scrollTo({
//         top: 0,
//         left: 0,
//         behavior: 'smooth',
//       });
//     }
//   };

//   const handlerScrollDown = () => {
//     if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
//       window.scrollBy(0, -50);
//       window.scrollTo({
//         top: -400,
//         left: -400,
//         behavior: 'smooth',
//       });
//     }
//   };

//   return (
//     <div>
//       <Carousel className="position-Carousel">
//         <Carousel.Item>
//           <img className="image-carousel example-img" src="/Images/Photo3.svg" alt="pic1" />
//         </Carousel.Item>
//         <Carousel.Item>
//           <img className="image-carousel example-img" src="/Images/Photo3.svg" alt="pic2" />
//         </Carousel.Item>
//         <Carousel.Item>
//           <img className="image-carousel example-img" src="/Images/Photo3.svg" alt="pic3" />
//         </Carousel.Item>
//       </Carousel>
//       <div className="button-containerDown">
//       <img src="/Images/ButtonDown.svg" className="button-down-and-up" onClick={handlerSc
/// rollDown} alt="button-down" />
//       </div>
//       <Map />
//       <div className="button-containerUp">
//       <img src="/Images/ButtonUp.svg" className="button-down-and-up" onClick
/// ={handlerScrollUp} alt="button-up" />
//       </div>
//     </div>

//   );
// }
