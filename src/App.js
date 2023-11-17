import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { LoadingProvider } from './LoadingContext';
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
        {showIntro ? (
          <Crawler clearIntro={clearIntro}></Crawler>
        ) : (
          <Main></Main>
        )}
      </LoadingProvider>
    </div>

  );
}

export default App;
