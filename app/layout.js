import Header from './components/Header';
import Footer from "./components/Footer";
import './styles/globals.css'
import './styles/layout.css'

// Metadata for SEO and browser config
export const metadata = {
  title: 'Najszybszy Serwis Komputerowy',
  description: 'Serwis komputerowy',
  icons: {
    icon: '/logo-NSK.ico', 
  },
}

// Main application layout with header, footer and page content
export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <body className="layout">
        <Header />
        <div className="main">{children}</div> 
        <Footer />
      </body>
    </html>
  )
}
