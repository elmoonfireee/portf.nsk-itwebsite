'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import '../styles/slogan.css';

export default function Slogan() {
  const [titles, setTitles] = useState([]);
  const [leftImage, setLeftImage] = useState('');
  const [rightImage, setRightImage] = useState('');

  useEffect(() => {
    
    fetch('/data/slogan.json')
      .then((response) => response.json())
      .then((data) => {
        setTitles(data.titles);
        setLeftImage(data.leftImage);
        setRightImage(data.rightImage);
      });
  }, []);

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
{/* Lewy obrazek */}
<div className="slogan-icon-left">
  <Image src={leftImage} alt="Left" width={300} height={300} className="slogan-icon" priority/>
</div>

{/* Środkowy zmieniający się tekst */}
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

{/* Prawy obrazek */}
<div className="slogan-icon-right ">
  <Image src={rightImage} alt="Right" width={300} height={300} className="slogan-icon" priority/>
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
