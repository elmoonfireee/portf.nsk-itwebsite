'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import './page.css';

export default function ServicesPage() {
  const [features, setFeatures] = useState([]);
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null);

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
          <div
            key={rowIndex}
            className={`service-page-grid ${
              hoveredRowIndex !== null && hoveredRowIndex !== rowIndex
                ? rowIndex < hoveredRowIndex
                  ? 'row-move-up'
                  : 'row-move-down'
                : ''
            }`}
            onMouseEnter={() => setHoveredRowIndex(rowIndex)}
            onMouseLeave={() => setHoveredRowIndex(null)}
          >
            {row.map((feature, indexInRow) => {
              const index = rowIndex * 6 + indexInRow;
              const isActive = hoveredCardIndex === index;
              const isInActiveRow = hoveredRowIndex === rowIndex;
              const isAnyHovered = hoveredCardIndex !== null;

              const activeCol = hoveredCardIndex % 6;
              const col = indexInRow;

              let dynamicStyle = {};

              if (isAnyHovered && isInActiveRow && !isActive) {
                const distance = Math.abs(col - activeCol);
                const delay = distance * 50; // 50ms za każdy krok

                if (col === 0) {
                  dynamicStyle = {
                    transform: 'translateX(-7vh)',
                    transition: `transform 0.3s ease-in-out ${delay}ms`,
                  };
                } else if (col === 5) {
                  dynamicStyle = {
                    transform: 'translateX(7vh)',
                    transition: `transform 0.3s ease-in-out ${delay}ms`,
                  };
                } else {
                  const direction = col < activeCol ? -1 : 1;
                  dynamicStyle = {
                    transform: `translateX(${direction * 7}vh)`,
                    transition: `transform 0.3s ease-in-out ${delay}ms`,
                  };
                }
              }

              return (
                <div key={index}>
                  <div
                    className={`service-page-card
                      ${isActive ? 'service-page-card-active z-10' : ''}
                      ${isAnyHovered && isInActiveRow && !isActive ? 'service-page-card-deactive' : ''}
                    `}
                    style={dynamicStyle}
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
