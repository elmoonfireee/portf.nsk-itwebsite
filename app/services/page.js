'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import './page.css';

export default function ServicesPage() {
  const [features, setFeatures] = useState([]);
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);

  useEffect(() => {
    fetch('/data/service_page.json')
      .then((res) => res.json())
      .then((data) => setFeatures(data))
      .catch((err) => console.error('Błąd ładowania usług:', err));
  }, []);

  return (
    <section className="service-page">
      <h1 className="service-page-title">Nasze usługi</h1>
      <div className="service-page-grid-container">
      <div className="service-page-grid">
  {features.map((feature, index) => {
    const isActive = hoveredCardIndex === index;
    const isAnyHovered = hoveredCardIndex !== null;

    // pozycja karty w siatce
    const cols = 6; // zakładamy md:grid-cols-6
    const row = Math.floor(index / cols);
    const col = index % cols;

    const activeRow = Math.floor(hoveredCardIndex / cols);
    const activeCol = hoveredCardIndex % cols;

    // obliczamy kierunek przesunięcia
    const isLeft = col < activeCol && row === activeRow;
    const isRight = col > activeCol && row === activeRow;
    const isAbove = row < activeRow;
    const isBelow = row > activeRow;

    let moveClass = '';
    if (isAnyHovered && !isActive) {
      if (isLeft) moveClass = 'translate-left';
      else if (isRight) moveClass = 'translate-right';
      else if (isAbove) moveClass = 'translate-up';
      else if (isBelow) moveClass = 'translate-down';
    }
    

    return (
      <div className="service-page-card-container" key={index}>
        <div
          className={`service-page-card
            ${isActive ? 'service-page-card-active z-10' : ''}
            ${isAnyHovered && !isActive ? 'service-page-card-deactive' : ''}
            ${moveClass}
          `}
          onMouseEnter={() => setHoveredCardIndex(index)}
          onMouseLeave={() => setHoveredCardIndex(null)}
        >
          <Image
            src={feature.icon}
            alt={feature.title}
            width={300}
            height={300}
            className="service-page-card-icon"
          />
          <h3 className="service-page-card-title">{feature.title}</h3>
          <p className="service-page-card-text">{feature.text}</p>
        </div>
      </div>
    );
  })}
</div>
</div>
    </section>
  );
}
