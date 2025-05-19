'use client';

import { useEffect, useState } from 'react';
import '../styles/footer.css';
import Image from 'next/image';

export default function Footer() {
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    fetch('/data/footer.json')
      .then(res => res.json())
      .then(data => setFooterData(data));
  }, []);

  if (!footerData) return null;

  return (
    <div className="footer">
  <div className="content">

    {/* PRAWA STRONA – wyżej na mobile, po prawej na desktopie */}
    <div className="right order-1 md:order-2">
      <p className="kontaktTitle">{footerData.contact.title}</p>

      <div className="contactRow">
        
        <Image loading="lazy" className='icon' src="/icons/emails.webp" alt="Mail" width={50} height={50} />
        <span>{footerData.contact.email}</span>
      </div>

      <div className="contactRow">
        
        <Image loading="lazy" className='icon' src="/icons/calling.webp" alt="Call" width={50} height={50}/>
        <span>{footerData.contact.phone}</span>
      </div>

      <div className="socials">
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <Image loading="lazy" src="/ig_sm.webp" alt="Social" width={35} height={24} />
        </a>
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
          <Image loading="lazy" src="/ln_sm.webp" alt="Social" width={35} height={24} />
        </a>
      </div>
    </div>

    {/* LEWA STRONA – niżej na mobile, po lewej na desktopie */}
    <div className="left order-2 md:order-1">
      <p>{footerData.company}</p>
      {footerData.address.map((line, idx) => (
        <p key={idx}>{line}</p>
      ))}
      <p className="copy">{footerData.copyright}</p>
    </div>

  </div>
</div>
  );
}
