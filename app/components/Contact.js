// Contact.js (frontend)

'use client';

import { useEffect, useRef, useState } from 'react';
import '../styles/contact.css';
import Image from 'next/image';

// React functional component that displays contact information and a form
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

  // Fetch contact data from JSON when component mounts
  // Set up IntersectionObservers to animate contact info and form on scroll
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

  // Handle input change for form fields and file upload
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (e.target.type === 'file') {
      setFormData(prev => ({
        ...prev,
        files: Array.from(files),
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle form submission: send form data and files to backend
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
      });

      const res = await fetch('/api/contact', {
        method: 'POST',
        body: data,
      });

      if (res.ok) {
        setStatus('Formularz został wysłany!');
        setStatusType('success');
        setFormData({ name: '', phone: '', email: '', message: '', files: [] });

        if (fileInputRef.current) {
          fileInputRef.current.value = ''; // reset file input
        }
      } else {
        let errorMessage = 'Błąd przy wysyłaniu formularza. Napisz do nas na e-mail lub zadzwoń.';
        if (res.status === 413) {
          const json = await res.json();
          errorMessage = json.error || 'Plik jest zbyt duży. Maksymalna dozwolona wielkość to 20 MB.';
        }

        setStatus(errorMessage);
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
        <p>
          <strong>Godziny pracy:</strong><br />
          {contactData.workingHours.split('\n').map((line, idx) => (
            <span key={idx}>{line}<br /></span>
          ))}
        </p>
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
            src={"/logo-NSK.webp"}
            alt="Logo"
            width={500}
            height={500}
            className={"form-logoImage"}
            loading="lazy"
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
        <label htmlFor="file-input">
        </label>
        <input
          id="file-input"
          type="file"
          name="file"
          multiple
          ref={fileInputRef}
          onChange={handleChange}
          className="file-input "
        />
        <button className='contact-form-button' type="submit">Wyślij</button>
        {status && <p className={`form-alert ${statusType}`}>{status}</p>}
      </form>
    </section>
  );
}
