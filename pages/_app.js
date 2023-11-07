import '../styles/navbar.css';
// import '../styles/page.css';
// import '../styles/tabs.css';
// import '../styles/user-content.css';
import '../styles/index.css';
import { BrowserRouter as Router } from 'react-router-dom';

export default function MyApp({ Component, pageProps }) {
  return (
    
      <Component {...pageProps} />
    
  );
}