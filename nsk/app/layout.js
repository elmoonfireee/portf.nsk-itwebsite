import Header from './components/Header';
import Footer from "./components/Footer";
import './styles/globals.css'
import './styles/layout.css'



export const metadata = {
  title: 'IT Website',
  description: 'Skalowalna strona IT',
}

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

