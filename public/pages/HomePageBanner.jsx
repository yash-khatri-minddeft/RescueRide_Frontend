import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import { Link } from 'react-router-dom';

export default function HomePageBanner() {
  return (
    <>
      <Swiper slidesPerView={1} loop={true} >
        <SwiperSlide>
          <div className="banner-swiper-inner">
            <div className="container">
              <h1 className='banner-title'>Ambulance Service</h1>
              <p className='banner-text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur posuere, est rhoncus efficitur auctor, lectus lacus pharetra ipsum, sed vulputate nunc velit sed tellus.</p>
              <Link className='button button-white'>Book Ambulance</Link>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="banner-swiper-inner">
            <div className="container">
              <h1 className='banner-title'>Book Ambulance</h1>
              <p className='banner-text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur posuere, est rhoncus efficitur auctor, lectus lacus pharetra ipsum, sed vulputate nunc velit sed tellus.</p>
              <Link className='button button-white'>Book Ambulance</Link>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  )
}
