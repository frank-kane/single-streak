import { Inter } from 'next/font/google'
// import {BrowserRouter as Router} from 'react-router-dom';
const inter = Inter({ subsets: ['latin'] })



export default function RootLayout({ children }) {
  return (
    
    <html lang="en">
      
      <body className={inter.className}>{children}</body>
      
    </html>
   
  )
}
