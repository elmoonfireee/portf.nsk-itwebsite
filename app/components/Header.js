'use client';

import '../styles/header.css';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const handleScrollLink = (id) => {
    if (pathname !== '/') {
      router.push(`/?scrollTo=${id}`);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="header">
      <div className="logo">
        <Image
          src={"/logo-NSK.png"}
          alt="Logo"
          width={500}
          height={500}
          className={"logoImage"}
          priority
        />
      </div>
      <nav className="navbar">
        <a href="/">Strona główna</a>
        <button onClick={() => handleScrollLink('services')}>Usługi</button>
        <button onClick={() => handleScrollLink('about')}>O mnie</button>
        <button onClick={() => handleScrollLink('contact')}>Kontakt</button>
      </nav>
      <div className="social-media">
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <Image src={"/ig_sm.png"} alt="Social" width={35} height={24} />
        </a>
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
          <Image src={"/ln_sm.png"} alt="Social" width={35} height={24} />
        </a>
      </div>
    </header>
  );
}
