'use client';

import { useEffect, Suspense } from "react";
import { useSearchParams, usePathname } from 'next/navigation';

import Services from "./components/Services";
import Slogan from "./components/Slogan";
import About from "./components/About";
import Contact from "./components/Contact";

// HomeContent component loads the main sections and scrolls to anchor if specified
function HomeContent() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Scroll to top on initial load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Scroll to specific section if 'scrollTo' param is present
  useEffect(() => {
    const scrollTo = searchParams.get('scrollTo');
    if (scrollTo) {
      let attempts = 0;
      const interval = setInterval(() => {
        const el = document.getElementById(scrollTo);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          clearInterval(interval);

          const newUrl = `${pathname}`;
          window.history.replaceState({}, '', newUrl);
        } else if (attempts > 20) {
          clearInterval(interval);
        }
        attempts++;
      }, 100);
    }
  }, [searchParams, pathname]);

  return (
    <>
      <Slogan />
      <Services />
      <About />
      <Contact />
    </>
  );
}

// Root Home component with Suspense for async rendering
export default function Home() {
  return (
    <Suspense fallback={<div>Ładowanie strony...</div>}>
      <HomeContent />
    </Suspense>
  );
}
