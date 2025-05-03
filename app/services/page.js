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
      .then((data) => {
        setFeatures(data);

        const cardsPerRow = 6;

        data.forEach((section, i) => {
          const cardCount = section.items.length;
          const fullRows = Math.floor(cardCount / cardsPerRow);
          const remaining = cardCount % cardsPerRow;
          const usedRows = fullRows + (remaining > 0 ? 1 : 0);

          console.log(`📂 Sekcja ${i + 1}: ${section.title}`);
          console.log(`🔢 Liczba kart: ${cardCount}`);
          console.log(`🧱 Pełne rzędy (po 6): ${fullRows}`);
          console.log(`➕ Pozostałe karty: ${remaining}`);
          console.log(`🧮 Użyte rzędy razem: ${usedRows}`);
          console.log('--------------------------');
        });
      })
      .catch((err) => console.error('Błąd ładowania usług:', err));
  }, []);

  return (
    <section className="service-page">
      <h1 className="service-page-title">Nasze usługi</h1>

      <div className="service-page-description-box">
        <div className="service-page-description">
          Cennik usług nie jest podany na stronie, ponieważ każda usterka czy
          zlecenie jest inne i wymaga indywidualnego podejścia. Oferujemy
          bezpłatną diagnostykę, po której przedstawiamy szczegółową wycenę
          usługi. Dzięki temu masz pewność, że płacisz tylko za realną pracę i
          faktycznie potrzebne działania – bez ukrytych kosztów i niepotrzebnych
          usług.
        </div>
      </div>

      {features.map((section, sectionIndex) => (
        <div className="service-page-grid-container" key={sectionIndex}>
          <div
            className={`service-page-subtitle-box ${
              hoveredRowIndex !== null && hoveredRowIndex !== sectionIndex
                ? sectionIndex < hoveredRowIndex
                  ? 'row-move-up'
                  : 'row-move-down'
                : ''
            }`}
          >
            <h2 className="service-page-subtitle">{section.title}</h2>
          </div>

          <div
            className={`service-page-grid-columns ${
              hoveredRowIndex !== null && hoveredRowIndex !== sectionIndex
                ? sectionIndex < hoveredRowIndex
                  ? 'row-move-up'
                  : 'row-move-down'
                : ''
            }`}
            onMouseEnter={() => setHoveredRowIndex(sectionIndex)}
            onMouseLeave={() => setHoveredRowIndex(null)}
          >
            {section.items.map((feature, indexInRow) => {
              const index = sectionIndex * 6 + indexInRow;
              const isActive = hoveredCardIndex === index;
              const isInActiveRow = hoveredRowIndex === sectionIndex;
              const isAnyHovered = hoveredCardIndex !== null;

              const activeCol = hoveredCardIndex % 6;
              const col = indexInRow;

              let dynamicStyle = {};

              if (isAnyHovered && isInActiveRow && !isActive) {
                const distance = Math.abs(col - activeCol);
                const delay = distance * 50;

                if (col === 0) {
                  dynamicStyle = {
                    transform: 'translateX(-7vh)',
                    transition: `transform 0.3s ease-in-out ${delay}ms`,
                  };
                } else if (col === section.items.length - 1) {
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
        </div>
      ))}
    </section>
  );
}
