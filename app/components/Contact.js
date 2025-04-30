// Contact.js (frontend)

'use client';

import { useEffect, useRef, useState } from 'react';
import '../styles/contact.css';
import Image from 'next/image';

export default function Contact() {
  const [contactData, setContactData] = useState(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const fileInputRef = useRef();
  const [isVisible, setIsVisible] = useState({ left: false, right: false });
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    files: [],
  });
  const [status, setStatus] = useState('');
  const [statusType, setStatusType] = useState('');

  useEffect(() => {
    fetch('/data/contact.json')
      .then((res) => res.json())
      .then((data) => setContactData(data));
  }, []);

  useEffect(() => {
    if (!contactData) return;

    const observerLeft = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(prev => ({ ...prev, left: true }));
        observerLeft.disconnect();
      }
    }, { threshold: 0.3 });

    const observerRight = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(prev => ({ ...prev, right: true }));
        observerRight.disconnect();
      }
    }, { threshold: 0.3 });

    if (leftRef.current) observerLeft.observe(leftRef.current);
    if (rightRef.current) observerRight.observe(rightRef.current);

    return () => {
      observerLeft.disconnect();
      observerRight.disconnect();
    };
  }, [contactData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
  
    if (e.target.type === 'file') {
      setFormData(prev => ({
        ...prev,
        files: Array.from(files), // ← tutaj zawsze aktualizujemy `formData.files`
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  

   const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Wysyłanie...');
    setStatusType('info');

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('phone', formData.phone);
      data.append('email', formData.email);
      data.append('message', formData.message);
      formData.files.forEach((file) => {
        data.append('file', file);
        console.log('📤 Wysyłam plik:', file.name);
      });
      console.log('📤 Wysyłam plik:', formData.files);
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: data,
      });

      if (res.ok) {
        setStatus('Formularz został wysłany! ');
        setStatusType('success');
        setFormData({ name: '', phone: '', email: '', message: '', files: [] });
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // reset inputa plików
          }
      } else {
        setStatus('Błąd przy wysyłaniu formularza. Napisz do nas na e-mail lub zadzwoń.');
        setStatusType('error');
      }
    } catch (err) {
      console.error('Błąd sieci:', err);
      setStatus('Błąd połączenia z serwerem. Napisz do nas na e-mail lub zadzwoń.');
      setStatusType('error');
    }
  };

  if (!contactData) return null;

  return (
    <section id="contact" className="contact-section">
      <div
        ref={leftRef}
        className={`contact-info ${isVisible.left ? 'animate-slide-in-left' : 'opacity-0'}`}
      >
        <h2>{contactData.title}</h2>
        <p><strong>Adres:</strong> {contactData.address}</p>
        <p><strong>Telefon:</strong> {contactData.phone}</p>
        <p><strong>Email:</strong> {contactData.email}</p>
        <p><strong>Godziny pracy:</strong> {contactData.workingHours}</p>
      </div>
      

      <form
        ref={rightRef}
        onSubmit={handleSubmit}
        className={`contact-form ${isVisible.right ? 'animate-slide-in-right' : 'opacity-0'}`}
      >
        <div className='form-top'>
 
            <div className='form-title'>
                <h2>Wypełnij formularz</h2>
                <p>Skontaktujemy się z Tobą jak najszybciej.</p>
            </div>
            <Image
                  src={"/logo-NSK.png"}
                  alt="Logo"
                  width={500}
                  height={500}
                  className={"form-logoImage"}
                  priority
                />
            
        </div>
    
        
        <input
          type="text"
          name="name"
          placeholder="Imię i Nazwisko"
          value={formData.name}
          onChange={handleChange}
          required
          className='contact-form-input'
        />
        <input
          type="tel"
          name="phone"
          placeholder="Numer telefonu"
          value={formData.phone}
          onChange={handleChange}
          required
          className='contact-form-input'
        />
        <input
          type="email"
          name="email"
          placeholder="Adres e-mail"
          value={formData.email}
          onChange={handleChange}
          required
          className='contact-form-input'
        />
        <textarea
          name="message"
          placeholder="Opis problemu"
          value={formData.message}
          onChange={handleChange}
          required
          className='contact-form-textarea'
        ></textarea>
        <input
          type="file"
          name="file"
          multiple
          ref={fileInputRef}
          onChange={handleChange}
          className='file-input'
        />
        <button  className='contact-form-button' type="submit">Wyślij</button>
        {status && (
  <p className={`form-alert ${statusType}`}>
    {status}
  </p>
)}

      </form>

    </section>
    
  );
}
