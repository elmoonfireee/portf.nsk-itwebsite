'use client';

import { useEffect } from "react";
import { useSearchParams, usePathname } from 'next/navigation';

import Services from "./components/Services";
import Slogan from "./components/Slogan";
import About from "./components/About";
import Contact from "./components/Contact";

export default function Home() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    const scrollTo = searchParams.get('scrollTo');
    if (scrollTo) {
      let attempts = 0;
      const interval = setInterval(() => {
        const el = document.getElementById(scrollTo);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          clearInterval(interval);

          // ❗ USUWAMY scrollTo z URL po scrollowaniu
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
