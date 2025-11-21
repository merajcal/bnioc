import React, { useState, useEffect } from 'react';

const ScrollIndicator = () => {
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      
      // Adjust threshold based on screen size - much earlier on mobile
      const isMobile = window.innerWidth < 768;
      const showThreshold = isMobile ? 0.1 : 0.25; // Show much earlier on mobile (10% vs 25%)
      const hideThreshold = 0.95;
      
      const scrollPercentage = (scrollTop + windowHeight) / docHeight;
      setShowScrollIndicator(scrollPercentage > showThreshold && scrollPercentage < hideThreshold);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll); // Also check on resize
    handleScroll(); // Check initial state
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const handleScrollClick = () => {
    const currentScrollTop = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const scrollPercentage = (currentScrollTop + windowHeight) / docHeight;
    
    if (scrollPercentage < 0.8) {
      // Scroll down to next section
      window.scrollBy({ top: windowHeight * 0.8, behavior: 'smooth' });
    } else {
      // Scroll back to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Global Clickable Scroll Indicator */}
      {showScrollIndicator && (
        <button
          onClick={handleScrollClick}
          className="fixed bottom-6 right-6 z-50 w-10 h-10 bg-primary-500 hover:bg-primary-600 text-white rounded-full shadow-lg border border-primary-300 flex items-center justify-center animate-bounce hover:animate-pulse transition-all duration-200 cursor-pointer"
          title="Click to scroll"
        >
          <i className="fas fa-chevron-down text-sm"></i>
        </button>
      )}
    </>
  );
};

export default ScrollIndicator;
