# 🖥️ Najszybszy Serwis Komputerowy

A professional, responsive web application for a computer repair service. Built with **Next.js**, **Tailwind CSS**, and modern frontend tools. Includes a functional contact form with file attachments, dynamic sections, and smooth animations.

## 🔗 Live Demo

👉 [Visit the live site](https://nsk-serwis.pl) 

---

## ⚙️ Tech Stack

- [Next.js](https://nextjs.org/) — App framework
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first styling
- [Formidable](https://www.npmjs.com/package/formidable) — File upload handler
- [Nodemailer](https://nodemailer.com/) — Email sending from API
- [Swiper](https://swiperjs.com/) — Hero slider

---

## 📂 Project Structure

```
/app
  /components     → Reusable UI components (Header, Footer, etc.)
  /services       → Full-page dynamic services section
  /styles         → Tailwind-based custom CSS
/pages/api        → Contact form backend (with file support)
public            → Images, icons, JSON data
```

---

## ✉️ Contact Form

- Built using `formidable` and `nodemailer`
- Supports multiple file attachments (max total: 20MB)
- Sends formatted emails to configured address via Gmail SMTP

> ℹ️ Requires the following environment variables:
```
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_gmail_app_password
CONTACT_EMAIL=recipient_email@example.com
```

---

## 🚀 How to Run Locally

1. Clone the repo:
```bash
git clone https://github.com/your-username/nsk-website.git
cd nsk-website
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` with required SMTP config

4. Run the app:
```bash
npm run build
node app.js
```

> Or use `next dev` during development.

---

## 📦 Build & Deploy

- Fully static-compatible (except `/api/contact`)
- Works well on **Nazwa** or **custom VPS**

---

## 👤 Author

Created by **elmoonfireee**  
Feel free to reach out via [LinkedIn](https://www.linkedin.com/in/damian-kaminski-9ab52a286/) or email.

---

## 📝 License

This project is proprietary. All rights reserved.  
Code and design are © by elmoonfireee.  
You may not reuse or redistribute any part of it without permission.

