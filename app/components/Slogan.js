'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import '../styles/slogan.css';

// React component rendering a slogan section with image icons and animated text using Swiper
export default function Slogan() {
  const [titles, setTitles] = useState([]);
  const [leftImage, setLeftImage] = useState('');
  const [rightImage, setRightImage] = useState('');

  // Fetch images and slogans from external JSON file on mount
  useEffect(() => {
    fetch('/data/slogan.json')
      .then((response) => response.json())
      .then((data) => {
        setTitles(data.titles);
        setLeftImage(data.leftImage);
        setRightImage(data.rightImage);
      });
  }, []);

  // Display empty space if no titles are loaded yet
  if (titles.length === 0) {
    return (
      <section className="slogan-container">
        <div style={{ height: '80vh' }}></div> {/* lub className="min-h-[80vh]" */}
      </section>
    );
  }

  return (
    <section className="slogan-container">
      <div className="slogan">

        {/* Left icon */}
        <div className="slogan-icon-left">
          <Image src={leftImage} alt="Left" width={300} height={300} className="slogan-icon" priority />
        </div>

        {/* Center slogan text with fade animation */}
        <div className="slogan-text-wrapper">
          <Swiper
            modules={[Autoplay, EffectFade]}
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            effect="fade"
            speed={3000}
            fadeEffect={{ crossFade: true }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            className="slogan"
            allowTouchMove={false}
          >
            {titles.map((title, index) => (
              <SwiperSlide key={index}>
                <h1 className="slogan-text">{title}</h1>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Right icon */}
        <div className="slogan-icon-right">
          <Image src={rightImage} alt="Right" width={300} height={300} className="slogan-icon" priority />
        </div>
      </div>

      <div className="slogan-image-wrapper">
        <Image  
          src="/icons/slogan_img.webp"
          alt="Mid"
          width={1536}
          height={1024}
          className="slogan-image"
          priority
        />
      </div>
    </section>
  );
}
