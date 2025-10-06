import React, { useState, useEffect } from 'react';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      badge: '🏏 BNIOC ACADEMY',
      title: 'Bengaluru Nex-Gen Institute',
      subtitle: 'of Cricket',
      description: 'Empowering the next generation of cricket champions through world-class training, expert coaching, and comprehensive development programs at Bengaluru\'s premier cricket academy.',
      backgroundImage: 'assets/images/academy_bg.jpeg',
      achievements: [
        { icon: 'fas fa-users', text: '100+ Students Trained' },
        { icon: 'fas fa-calendar-alt', text: '15+ Years Experience' },
        { icon: 'fas fa-user-tie', text: '4+ Expert Coaches' },
        { icon: 'fas fa-baseball-ball', text: '5 Turf Pitches' },
        { icon: 'fas fa-map-marker-alt', text: '2 New Grounds' }
      ]
    },
    {
      id: 2,
      badge: '🏏 SUMMER CAMP 2025',
      title: 'Join Our Exclusive',
      subtitle: 'Summer Cricket Camp',
      description: 'Intensive 6-week program with professional coaches, daily practice sessions, and match experience. Limited seats available - Register now!',
      backgroundImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      achievements: [
        { icon: 'fas fa-calendar-alt', text: '22 Sep 2025' },
        { icon: 'fas fa-clock', text: '6 Weeks Intensive' },
        { icon: 'fas fa-users', text: 'Limited Seats' },
        { icon: 'fas fa-trophy', text: 'Certificates' }
      ]
    },
    {
      id: 3,
      badge: '🏆 CHAMPIONSHIP SUCCESS',
      title: 'Our Students',
      subtitle: 'Dominate the Field',
      description: 'Celebrating our recent victories in district and state-level tournaments. Our training methodology produces champions who excel under pressure.',
      backgroundImage: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      achievements: [
        { icon: 'fas fa-medal', text: 'State Champions 2024' },
        { icon: 'fas fa-trophy', text: '15 Tournament Wins' },
        { icon: 'fas fa-star', text: '50+ Individual Awards' },
        { icon: 'fas fa-crown', text: 'District Champions' }
      ]
    },
    {
      id: 4,
      badge: '🏟️ WORLD-CLASS FACILITIES',
      title: 'State-of-the-Art',
      subtitle: 'Training Infrastructure',
      description: 'Experience cricket training like never before with our world-class facilities, featuring international-standard pitches and modern equipment.',
      backgroundImage: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      achievements: [
        { icon: 'fas fa-baseball-ball', text: '5 Turf Pitches' },
        { icon: 'fas fa-lightbulb', text: 'LED Floodlights' },
        { icon: 'fas fa-dumbbell', text: 'Fitness Center' },
        { icon: 'fas fa-video', text: 'Video Analysis' },
        { icon: 'fas fa-home', text: 'Modern Clubhouse' },
        { icon: 'fas fa-shield-alt', text: '24/7 Security' }
      ]
    }
  ];

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section id="home" className="hero">
      <div className="hero-carousel">
        <div className="carousel-container">
          <div className="carousel-track" style={{ transform: `translateX(-${currentSlide * 25}%)` }}>
            {slides.map((slide, index) => (
              <div 
                key={slide.id}
                className={`hero-slide ${index === currentSlide ? 'active' : ''} ${slide.id === 1 ? 'cricket-themed' : ''}`}
              >
                <div className="hero-bg" style={{ backgroundImage: `url("${slide.backgroundImage}")` }}></div>
                <div className="hero-overlay"></div>
                <div className="hero-content">
                  <div className="container">
                    
                    <div className="hero-text">
                      <div className="hero-badge">{slide.badge}</div>
                      <h1 className="hero-title">
                        {slide.id === 1 ? `${slide.title} ${slide.subtitle}` : (
                          <>
                            {slide.title}
                            <br />{slide.subtitle}
                          </>
                        )}
                      </h1>
                      <p className="hero-subtitle">
                        {slide.description}
                      </p>
                      
                      <div className="hero-buttons">
                        <a href="/programs" className="btn btn-primary">Explore Programs</a>
                        <a href="/contact" className="btn btn-secondary">Book Free Trial</a>
                      </div>
                    </div>
                    
                    {/* Render achievements for all slides with consistent styling */}
                    {slide.achievements && (
                      <div className="hero-achievements">
                        {slide.achievements.map((achievement, idx) => (
                          <div key={idx} className="achievement-item">
                            <i className={achievement.icon}></i>
                            <span>{achievement.text}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Carousel Controls */}
        <button className="carousel-btn carousel-prev" onClick={prevSlide}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <button className="carousel-btn carousel-next" onClick={nextSlide}>
          <i className="fas fa-chevron-right"></i>
        </button>
        
        {/* Carousel Indicators */}
        <div className="carousel-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
