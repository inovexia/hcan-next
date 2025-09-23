'use client';

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/thumbs';

export default function ProductSlider({ thumbnail, images }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const allImages = [thumbnail, ...images];

  return (
    <div>
      {/* Main Slider */}
      <Swiper
        className='main-swiper'
        spaceBetween={10}
        slidesPerView={1}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Thumbs]}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        style={{ marginBottom: '1rem' }}
      >
        {allImages.map((img, i) => (
          <SwiperSlide key={`main-${i}`}>
            <img
              src={img}
              alt={`Main image ${i + 1}`}
              className='img-fluid'
              style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail Slider */}
      <Swiper
        className='small-swiper'
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={10}
        watchSlidesProgress
        modules={[Thumbs]}
        style={{ cursor: 'pointer' }}
      >
        {allImages.map((img, i) => (
          <SwiperSlide key={`thumb-${i}`}>
            <img
              src={img}
              alt={`Thumbnail ${i + 1}`}
              className='img-fluid'
              style={{
                height: '50px',
                objectFit: 'cover',
                opacity: i === activeIndex ? 1 : 0.5,
                transition: 'opacity 0.3s ease',
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
