'use client';

import { Builder } from '@builder.io/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
export default function BannerSlider({ slides = [], showArrows = true }) {
  return (
    <div className='banner-slider'>
      <Swiper
        modules={[Navigation]}
        navigation={showArrows ? true : false}
        loop={true}
        autoplay={{ delay: 3000 }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '500px',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                color: '#fff',
              }}
            >
              <div
                style={{
                  background: 'rgba(0,0,0,0.4)',
                  padding: '20px',
                  borderRadius: '10px',
                }}
              >
                {slide.title && <h2>{slide.title}</h2>}
                {slide.subtitle && <p>{slide.subtitle}</p>}

                {slide.buttonText && (
                  <a
                    href={slide.buttonLink}
                    style={{
                      display: 'inline-block',
                      marginTop: '10px',
                      padding: '10px 20px',
                      background: '#fff',
                      color: '#000',
                      borderRadius: '5px',
                      textDecoration: 'none',
                    }}
                  >
                    {slide.buttonText}
                  </a>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
