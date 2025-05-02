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

  function chunkArray(arr, size) {
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size)
    );
  }

  return (
    <section className="service-page">
      <h1 className="service-page-title">Nasze usługi</h1>
      <div className="service-page-grid-container">
        {chunkArray(features, 6).map((row, rowIndex) => (
          <div key={rowIndex} className="service-page-grid">
            {row.map((feature, indexInRow) => {
              const index = rowIndex * 6 + indexInRow;
              const isActive = hoveredCardIndex === index;
              const isAnyHovered = hoveredCardIndex !== null;

              const activeRow = Math.floor(hoveredCardIndex / 6);
              const activeCol = hoveredCardIndex % 6;
              const col = indexInRow;
              const row = rowIndex;

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
                <div  key={index}>
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
        ))}
      </div>
    </section>
  );
}
