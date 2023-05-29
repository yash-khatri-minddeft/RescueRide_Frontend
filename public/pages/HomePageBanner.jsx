import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import ambulance from './.././../src/assets/images/ambulance-banner.png';
import ambulance2 from './.././../src/assets/images/ambulance-banner-2.png';

import 'swiper/css';
import { Link } from 'react-router-dom';

export default function HomePageBanner() {
  return (
    <>
      <Swiper slidesPerView={1} loop={true} >
        <SwiperSlide>
          <div className="banner-swiper-inner" style={{backgroundImage:`url(${ambulance})`}}>
            <div className="container">
              <h1 className='banner-title'>Ambulance Service</h1>
              <p className='banner-text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur posuere, est rhoncus efficitur auctor, lectus lacus pharetra ipsum, sed vulputate nunc velit sed tellus.</p>
              <Link to='/book-ambulance' className='button button-white'>Book Ambulance</Link>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="banner-swiper-inner" style={{backgroundImage:`url(${ambulance2})`}}>
            <div className="container">
              <h1 className='banner-title'>Book Ambulance</h1>
              <p className='banner-text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur posuere, est rhoncus efficitur auctor, lectus lacus pharetra ipsum, sed vulputate nunc velit sed tellus.</p>
              <Link to='/book-ambulance' className='button button-white'>Book Ambulance</Link>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  )
}
