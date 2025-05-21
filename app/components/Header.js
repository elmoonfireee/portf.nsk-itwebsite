'use client';

import '../styles/header.css';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

// React functional component for page header with logo, navigation and social icons
export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  // Handle in-page scroll if on homepage, or navigate to homepage with anchor
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
        <Link href="/" passHref>
          <Image
            src="/logo-NSK.webp"
            alt="Logo"
            width={500}
            height={500}
            className="logoImage"
            priority
          />
        </Link>
      </div>

      <nav className="navbar">
        <a href="/">Strona główna</a>
        <button onClick={() => handleScrollLink('services')}>Usługi</button>
        <button onClick={() => handleScrollLink('about')}>O mnie</button>
        <button onClick={() => handleScrollLink('contact')}>Kontakt</button>
      </nav>

      <div className="social-media">
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <Image className='social-media-image' loading="lazy" src={"/ig_sm.webp"} alt="Social" width={50} height={50} />
        </a>
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
          <Image className='social-media-image' loading="lazy" src={"/ln_sm.webp"} alt="Social" width={50} height={50} />
        </a>
      </div>
    </header>
  );
}
