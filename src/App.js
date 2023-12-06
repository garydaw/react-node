import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import "bootstrap-icons/font/bootstrap-icons.css";
import { LoadingProvider } from './LoadingContext';
import { ErrorProvider } from './ErrorContext';
import Crawler from './Crawler';
import Main from './Main';

function App() {

  //variables
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      clearIntro();
    }, 50000); 

    return () => clearTimeout(timer);
  }, []);
  
  function clearIntro() {
    setShowIntro(false);
  }
  
  return (
    <div className="bg">
      <LoadingProvider>
        <ErrorProvider>
          {showIntro ? (
            <Crawler clearIntro={clearIntro}></Crawler>
          ) : (
            <Main></Main>
          )}
        </ErrorProvider>
      </LoadingProvider>
    </div>

  );
}

export default App;
