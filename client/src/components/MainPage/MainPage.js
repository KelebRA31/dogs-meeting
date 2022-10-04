/* eslint-disable max-len */
/* eslint-disable react/jsx-indent */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import './MainPage.css';
import Carousel from 'react-bootstrap/Carousel';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
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

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    height: 528,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Carousel className="position-Carousel">
        <Carousel.Item>
          <img className="image-carousel example-img" src="/Images/Photo3.svg" alt="pic1" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="image-carousel example-img" src="/Images/Photo4.svg" alt="pic2" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="image-carousel example-img" src="/Images/Photo5.svg" alt="pic3" />
        </Carousel.Item>
      </Carousel>
      <div className="button-containerDown">
      <img
        src="/Images/ButtonDown.svg"
        className="button-down"
        onClick={handlerScrollDown}
        alt="button-down"
      />
      </div>
      <Map />
      <div className="button-containerUp">
      <img
        src="/Images/ButtonUp.svg"
        className="button-up"
        onClick={handlerScrollUp}
        alt="button-up"
      />
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
// <img src="/Images/ButtonDown.svg" className="button-down-and-up" onClick={handlerScrollDown} alt="button-down" />
//       </div>
//       <Map />
//       <div className="button-containerUp">
// <img src="/Images/ButtonUp.svg" className="button-down-and-up" onClick={handlerScrollUp} alt="button-up" />
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
