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

        {/* LEWA STRONA */}
        <div className="left">
          <p>{footerData.company}</p>
          {footerData.address.map((line, idx) => (
            <p key={idx}>{line}</p>
          ))}
          <p className="copy">{footerData.copyright}</p>
        </div>

        {/* PRAWA STRONA */}
        <div className="right">
          <p className="kontaktTitle">{footerData.contact.title}</p>

          <div className="contactRow">
            <img src="/icons/emails.png" className="icon" />
            <span>{footerData.contact.email}</span>
          </div>

          <div className="contactRow">
            <img src="/icons/calling.png" className="icon" />
            <span>{footerData.contact.phone}</span>
          </div>

          <div className="socials">
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <Image
                  src={"/ig_sm.png"}
                  alt="Social"
                  width={35}
                  height={24}
                />
          </a>

          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
          <Image
                  src={"/ln_sm.png"}
                  alt="Social"
                  width={35}
                  height={24}
                />
          </a>
          </div>
        </div>

      </div>
    </div>
  );
}
