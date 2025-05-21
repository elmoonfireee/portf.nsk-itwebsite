'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import '../styles/services.css';

// React functional component displaying service cards and 'see more' button
export default function Services() {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [features, setFeatures] = useState([]);

  // Fetch features data from JSON when component mounts
  // Observe visibility of the 'see more' button
  useEffect(() => {
    fetch('/data/features.json')
      .then((response) => response.json())
      .then((data) => setFeatures(data));
  }, []);

  useEffect(() => {
    if (!features.length) return;
    const element = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.2 }
    );

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [features]);

  return (
    <section id="services">
      <div className="service-container">
        <div className="services-grid">
          {features.map((feature, index) => (
            <ServiceCard
              key={index}
              feature={feature}
              direction={index % 2 === 0 ? 'left' : 'right'}
            />
          ))}
        </div>
        <a
          href="/services"
          ref={ref}
          className={`service-more-button ${isVisible ? 'animate-slide-in-top' : 'opacity-0'}`}>
          <div className="service-more">Zobacz więcej</div>
        </a>
      </div>
    </section>
  );
}

// Card component that animates into view when visible
function ServiceCard({ feature, direction }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element); // unobserve after first view
        }
      },
      {
        threshold: 0.2, // 20% visibility
      }
    );

    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`service-card ${direction === 'left' ? 'service-card-left' : 'service-card-right'} ${
        isVisible ? `animate-slide-in-${direction}` : ''
      }`}
    >
      <Image
        src={feature.icon}
        alt={feature.title}
        width={300}
        height={300}
        loading="lazy"
        className="service-icon"
      />
      <h1 className="service-title">{feature.title}</h1>
      <p className="service-text">{feature.text}</p>
    </div>
  );
}
