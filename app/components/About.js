'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import '../styles/about.css';

export default function About() {
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const [isVisible, setIsVisible] = useState({ image: false, text: false });
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    fetch('/data/about.json')
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Dane załadowane:", data);
        setAboutData(data);
      });
  }, []);
  

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
  
  if (!aboutData) return null;

  return (
    <section id="about" className="about-section">
      <div
        ref={imageRef}
        className={`about-image ${isVisible.image ? 'animate-slide-in-left' : 'opacity-0'}`}
      >
        <Image src={aboutData.image} alt={aboutData.title} width={400} height={400} />
      </div>
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
