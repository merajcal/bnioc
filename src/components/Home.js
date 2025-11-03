import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
      badge: '🤝 SPORTS PARTNERSHIP',
      title: 'Collaborating with',
      subtitle: 'Vanaprastha International School',
      description: 'Proud to partner with Vanaprastha International School in developing sports excellence. BNIOC will train their coaches and students, bringing world-class sports education and training programs to their campus.',
      backgroundImage: 'assets/images/collaboration/vanaprastha_school_img.jpg',
      achievements: [
        { icon: 'fas fa-chalkboard-teacher', text: 'Sports Coach Training' },
        { icon: 'fas fa-graduation-cap', text: 'Athletic Development' },
        { icon: 'fas fa-school', text: 'Campus Sports Programs' },
        { icon: 'fas fa-handshake', text: 'Strategic Partnership' }
      ],
      partnerLogo: '/assets/images/collaboration/vanaprastha_school.png'
    },
    {
      id: 3,
      badge: '🤝 SPORTS PARTNERSHIP',
      title: 'Collaborating with',
      subtitle: 'Wellspring Academy',
      description: 'Expanding our reach through partnership with Wellspring Academy. BNIOC brings professional sports training and coaching excellence to nurture young athletic talent at their prestigious institution.',
      backgroundImage: 'https://wellspringsacademy.in/static/images/What_makes_us_uncommon_banner.webp',
      achievements: [
        { icon: 'fas fa-chalkboard-teacher', text: 'Sports Coach Training' },
        { icon: 'fas fa-graduation-cap', text: 'Athletic Development' },
        { icon: 'fas fa-school', text: 'Campus Sports Programs' },
        { icon: 'fas fa-users-cog', text: 'Professional Training' }
      ],
      partnerLogo: 'https://wellspringsacademy.in/static/images/Logo_02_01.webp'
    },
    {
      id: 4,
      badge: '🎯 TRAINING PROGRAMS',
      title: 'Choose Your Path',
      subtitle: 'to Cricket Excellence',
      description: 'Discover our comprehensive range of training programs designed for every skill level and commitment. From weekend sessions to intensive camps, find the perfect program to elevate your game.',
      backgroundImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      achievements: [
        { icon: 'fas fa-calendar-week', text: 'Weekend Programs' },
        { icon: 'fas fa-sun', text: 'Summer Camps' },
        { icon: 'fas fa-user', text: 'Individual Coaching' },
        { icon: 'fas fa-users', text: 'Group Training' }
      ]
    },
    {
      id: 5,
      badge: '🏏 SUMMER CAMP 2025',
      title: 'Join Our Exclusive',
      subtitle: 'Summer Cricket Camp',
      description: 'Intensive 6-week program with professional coaches, daily practice sessions, and match experience. Limited seats available - Register now!',
      backgroundImage: '/assets/images/banners/summer_camp_2025.png.PNG',
      achievements: [
        { icon: 'fas fa-calendar-alt', text: '22 Sep 2025' },
        { icon: 'fas fa-clock', text: '6 Weeks Intensive' },
        { icon: 'fas fa-users', text: 'Limited Seats' },
        { icon: 'fas fa-trophy', text: 'Certificates' }
      ]
    },
    {
      id: 6,
      badge: '🏆 CHAMPIONSHIP SUCCESS',
      title: 'Our Students',
      subtitle: 'Dominate the Field',
      description: 'Celebrating our recent victories in district and state-level tournaments. Our training methodology produces champions who excel under pressure.',
      backgroundImage: '/assets/images/gallery/academy-facilities.jpg',
      achievements: [
        { icon: 'fas fa-medal', text: 'State Champions 2024' },
        { icon: 'fas fa-trophy', text: '15 Tournament Wins' },
        { icon: 'fas fa-star', text: '50+ Individual Awards' },
        { icon: 'fas fa-crown', text: 'District Champions' }
      ]
    },
    {
      id: 7,
      badge: '🏟️ WORLD-CLASS FACILITIES',
      title: 'State-of-the-Art',
      subtitle: 'Training Infrastructure',
      description: 'Experience cricket training like never before with our world-class facilities, featuring international-standard pitches and modern equipment.',
      backgroundImage: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      achievements: [
        { icon: 'fas fa-baseball-ball', text: '5 Turf Pitches' },
        { icon: 'fas fa-lightbulb', text: 'LED Floodlights' },
        { icon: 'fas fa-video', text: 'Video Analysis' },
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
    <section id="home" className="relative w-full bg-white dark:bg-secondary-900">
      {/* Mobile-First Hero Section */}
      <div className="relative w-full min-h-screen flex flex-col">
        {/* Current Slide Background */}
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src={slides[currentSlide].backgroundImage}
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-1000"
            style={{ 
              objectFit: 'cover',
              objectPosition: 'center'
            }}
          />
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60"></div>
        
        {/* Content Container - Mobile First */}
        <div className="relative z-10 flex-1 flex flex-col justify-center px-6 py-20 sm:px-12 lg:px-16">
          <div className="max-w-7xl mx-auto w-full">
            
            {/* Hero Content */}
            <div className="text-center space-y-6 sm:space-y-8">
              
              {/* Badge */}
              <div className="inline-block bg-primary-500/90 text-white px-4 py-2 rounded-full text-sm font-bold backdrop-blur-sm border border-white/20">
                {slides[currentSlide].badge}
              </div>
              
              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                {slides[currentSlide].id === 1 ? (
                  `${slides[currentSlide].title} ${slides[currentSlide].subtitle}`
                ) : (
                  <>
                    {slides[currentSlide].title}
                    <br />
                    {slides[currentSlide].subtitle}
                  </>
                )}
              </h1>
              
              {/* Description */}
              <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                {slides[currentSlide].description}
              </p>

              {/* Partner Logo - Only show for collaboration slide */}
              {slides[currentSlide].partnerLogo && (
                <div className="flex justify-center mt-6">
                  <div className="max-w-xs">
                    <img 
                      src={slides[currentSlide].partnerLogo} 
                      alt={`${slides[currentSlide].subtitle} Logo`}
                      className="w-full h-auto max-h-40 object-contain"
                    />
                  </div>
                </div>
              )}
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link 
                  to="/programs" 
                  className="w-full sm:w-auto bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-center"
                >
                  Explore Programs
                </Link>
                <Link 
                  to="/contact" 
                  className="w-full sm:w-auto bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-500 font-semibold py-3 px-8 rounded-lg transition-all duration-300 text-center"
                >
                  Book Free Trial
                </Link>
              </div>
              
              {/* Achievement Items - Mobile Optimized */}
              <div className="flex flex-wrap justify-center gap-4 mt-12 max-w-6xl mx-auto px-4 sm:px-0">
                {slides[currentSlide].achievements.map((achievement, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white transition-all duration-300 hover:bg-primary-500/20 pointer-events-auto min-w-[200px] max-w-[250px]"
                  >
                    <i className={`${achievement.icon} text-primary-400 text-lg flex-shrink-0`}></i>
                    <span className="text-sm font-medium">
                      {achievement.text}
                    </span>
                  </div>
                ))}
              </div>
              
            </div>
          </div>
        </div>
        
        {/* Navigation Controls - Higher z-index and better positioning */}
        <div className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 z-50">
          <button 
            onClick={prevSlide}
            className="bg-black/50 hover:bg-black/70 border-none text-white w-14 h-14 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 flex items-center justify-center shadow-lg"
            aria-label="Previous slide"
          >
            <i className="fas fa-chevron-left text-lg"></i>
          </button>
        </div>
        
        <div className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 z-50">
          <button 
            onClick={nextSlide}
            className="bg-black/50 hover:bg-black/70 border-none text-white w-14 h-14 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 flex items-center justify-center shadow-lg"
            aria-label="Next slide"
          >
            <i className="fas fa-chevron-right text-lg"></i>
          </button>
        </div>
        
        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-40">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer shadow-lg ${
                index === currentSlide 
                  ? 'bg-white w-8' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
