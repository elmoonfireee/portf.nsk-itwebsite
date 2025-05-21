'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import '../styles/about.css';

// React functional component displaying an "About" section with animated image and text
export default function About() {
  // References to DOM elements for observing visibility
  const imageRef = useRef(null);
  const textRef = useRef(null);

  // Tracks visibility state for triggering animations
  const [isVisible, setIsVisible] = useState({ image: false, text: false });

  // Holds the fetched data from JSON
  const [aboutData, setAboutData] = useState(null);

  // Fetch content data from JSON file when component mounts
  useEffect(() => {
    fetch('/data/about.json')
      .then((res) => res.json())
      .then((data) => {
        setAboutData(data);
      });
  }, []);

  // Observe visibility of image and text blocks using IntersectionObserver
  useEffect(() => {
    if (!aboutData) return;

    const observerImage = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(prev => ({ ...prev, image: true }));
        observerImage.disconnect();
      }
    }, { threshold: 0.3 });

    const observerText = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(prev => ({ ...prev, text: true }));
        observerText.disconnect();
      }
    }, { threshold: 0.3 });

    if (imageRef.current) observerImage.observe(imageRef.current);
    if (textRef.current) observerText.observe(textRef.current);

    return () => {
      observerImage.disconnect();
      observerText.disconnect();
    };
  }, [aboutData]);

  // Don't render anything until data is loaded
  if (!aboutData) return null;

  return (
    <section id="about" className="about-section">
      {/* Image block with animation */}
      <div
        ref={imageRef}
        className={`about-image ${isVisible.image ? 'animate-slide-in-left' : 'opacity-0'}`}
      >
        <Image loading="lazy" src={aboutData.image} alt={aboutData.title} width={400} height={400} />
      </div>

      {/* Text block with animation */}
      <div
        ref={textRef}
        className={`about-text ${isVisible.text ? 'animate-slide-in-right' : 'opacity-0'}`}
      >
        <h2>{aboutData.title}</h2>
        <p>{aboutData.text}</p>
      </div>
    </section>
  );
}
