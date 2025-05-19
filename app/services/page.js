'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import './page.css';

export default function ServicesPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [features, setFeatures] = useState([]);
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null);
  const [hoveredGridRowIndex, setHoveredGridRowIndex] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [expandedSections, setExpandedSections] = useState({}); // 🟢 TO BYŁO BRAKUJĄCE


  
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    fetch('/data/service_page.json')
      .then((res) => res.json())
      .then((data) => setFeatures(data))
      .catch((err) => console.error('Błąd ładowania usług:', err));
  }, []);

  if (isMobile) {
    return (
      <section className="service-page-mobile">
        <h1 className="service-page-title">Nasze usługi</h1>

        <div className="service-page-description-box">
          <div className="service-page-description">
            Cennik usług nie jest podany na stronie, ponieważ każda usterka czy zlecenie jest inne i wymaga indywidualnego podejścia. Oferujemy bezpłatną diagnostykę, po której przedstawiamy szczegółową wycenę usługi.
          </div>
        </div>

        {features.map((section, i) => {
          const isSectionExpanded = !!expandedSections[i];

          return (
            <div key={i} className="service-page-mobile-section">
              <div
                className={`service-page-mobile-subtitle-box cursor-pointer ${isSectionExpanded ? 'expanded' : ''}`}
                onClick={() =>
                  setExpandedSections((prev) => ({
                    ...prev,
                    [i]: !prev[i],
                  }))
                }
              >
                <h2 className="service-page-mobile-subtitle">{section.title}</h2>
              </div>

              <div className={`service-page-mobile-cards-wrapper ${isSectionExpanded ? 'expanded' : ''}`}>
                <div className="grid grid-cols-1 items-center gap-4">
                  {section.items.map((item, j) => {
                    const index = `${i}-${j}`;
                    const isExpanded = expandedIndex === index;

                    return (
                      <div
                        key={index}
                        className={`service-page-mobile-card ${isExpanded ? 'service-page-mobile-card-expanded' : ''}`}
                        onClick={() =>
                          setExpandedIndex(isExpanded ? null : index)
                        }
                      >
                        <Image
                          src={item.icon}
                          alt={item.title}
                          width={80}
                          height={80}
                          loading="lazy"
                          className="service-page-mobile-card-icon"
                        />
                        <h3 className="service-page-mobile-card-title">{item.title}</h3>
                        <p className="service-page-mobile-card-text">{item.text}</p>
                      </div>
                    );
                  })}
                </div>

                {isSectionExpanded && (
                  <div className="flex justify-center mt-4">
                    <button
                      onClick={() =>
                        setExpandedSections((prev) => ({
                          ...prev,
                          [i]: false,
                        }))
                      }
                      className="service-page-mobile-collapse-button"
                      aria-label="Zwiń sekcję"
                    >
                      ↑
                    </button>
                  </div>

                )}
              </div>
            </div>
          );
        })}
      </section>
    );
  }





  // DESKTOPOWA WERSJA (oryginalna)
  const cardsPerRow = 6;

  return (
    <section className="service-page">
      <h1 className="service-page-title">Nasze usługi</h1>
      <div className="service-page-description-box">
        <div className="service-page-description">
          <h3>Cennik usług nie jest podany na stronie, ponieważ każda usterka czy zlecenie jest inne i wymaga indywidualnego podejścia. Oferujemy bezpłatną diagnostykę, po której przedstawiamy szczegółową wycenę usługi.</h3>
        </div>
      </div>

      {features.map((section, sectionIndex) => {
        const rows = [];
        for (let i = 0; i < section.items.length; i += cardsPerRow) {
          rows.push(section.items.slice(i, i + cardsPerRow));
        }

        return (
          <div
            key={sectionIndex}
            className="service-page-grid-container"
            style={{
              transform:
                hoveredRowIndex !== null && hoveredRowIndex !== sectionIndex
                  ? sectionIndex < hoveredRowIndex
                    ? 'translateY(-5vh)'
                    : 'translateY(5vh)'
                  : 'translateY(0)',
              transition: 'transform 0.3s ease-in-out',
              willChange: 'transform',
            }}
          >
            <div className="service-page-subtitle-box">
              <h2 className="service-page-subtitle">{section.title}</h2>
            </div>

            <div className="service-page-grid-rows">
              {rows.map((row, rowIndex) => {
                const isThisRowHovered =
                  hoveredRowIndex === sectionIndex &&
                  hoveredGridRowIndex === rowIndex;

                const isMovingRow =
                  hoveredGridRowIndex !== null &&
                  hoveredRowIndex === sectionIndex &&
                  hoveredGridRowIndex !== rowIndex;

                const offset = isMovingRow
                  ? rowIndex < hoveredGridRowIndex
                    ? '-5vh'
                    : '5vh'
                  : '0';

                return (
                  <div
                    key={rowIndex}
                    className="service-page-grid-columns"
                    onMouseEnter={() => {
                      setHoveredRowIndex(sectionIndex);
                      setHoveredGridRowIndex(rowIndex);
                    }}
                    onMouseLeave={() => {
                      setHoveredRowIndex(null);
                      setHoveredGridRowIndex(null);
                    }}
                    style={{
                      transform: `translateY(${offset})`,
                      transition: 'transform 0.3s ease-in-out',
                      willChange: 'transform',
                    }}
                  >
                    {row.map((feature, indexInRow) => {
                      const index =
                        sectionIndex * cardsPerRow +
                        rowIndex * cardsPerRow +
                        indexInRow;
                      const isActive = hoveredCardIndex === index;
                      const isInActiveRow = isThisRowHovered;
                      const isAnyHovered = hoveredCardIndex !== null;

                      const activeCol = hoveredCardIndex % cardsPerRow;
                      const col = indexInRow;

                      let dynamicStyle = {
                        transform: 'translateX(0)',
                        transition: 'transform 0.3s ease-in-out',
                      };

                      if (isAnyHovered && isInActiveRow && !isActive) {
                        const distance = Math.abs(col - activeCol);
                        const delay = distance * 50;
                        const direction = col < activeCol ? -1 : 1;
                        dynamicStyle = {
                          transform: `translateX(${direction * 7}vh)`,
                          transition: `transform 0.3s ease-in-out ${delay}ms`,
                        };
                      }

                      return (
                        <div key={index}>
                          <div
                            className={`service-page-card
                              ${isActive ? 'service-page-card-active z-10' : ''}
                              ${
                                isAnyHovered && isInActiveRow && !isActive
                                  ? 'service-page-card-deactive'
                                  : ''
                              }
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
                              loading="lazy"
                              className="service-page-card-icon"
                            />
                            <h3 className="service-page-card-title">{feature.title}</h3>
                            <p className="service-page-card-text">{feature.text}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </section>
  );
}
