import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import components
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Founder from './components/Founder';
import Programs from './components/Programs';
import Facilities from './components/Facilities';
import Gallery from './components/Gallery';
import News from './components/News';
import Contact from './components/Contact';
import Achievements from './components/Achievements';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

function App() {
  const [theme, setTheme] = useState('dark');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Theme toggle functionality
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Mobile menu toggle
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Router>
      <div className="App min-h-screen bg-white dark:bg-secondary-900 transition-colors duration-300">
        <Header 
          theme={theme} 
          toggleTheme={toggleTheme} 
          isMenuOpen={isMenuOpen} 
          toggleMenu={toggleMenu} 
        />
        
        <main className="pt-16 lg:pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/founder" element={<Founder />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/facilities" element={<Facilities />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/news" element={<News />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/why-choose-us" element={<WhyChooseUs />} />
            <Route path="/testimonials" element={<Testimonials />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
