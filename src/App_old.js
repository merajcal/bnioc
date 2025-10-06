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
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

function App() {
  const [theme, setTheme] = useState('dark');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Theme toggle functionality
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
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
      <div className="App">
        <Header 
          theme={theme} 
          toggleTheme={toggleTheme} 
          isMenuOpen={isMenuOpen} 
          toggleMenu={toggleMenu} 
        />
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<><About /><WhyChooseUs /><Testimonials /></>} />
            <Route path="/founder" element={<Founder />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/facilities" element={<Facilities />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/news" element={<News />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
      stats: [
        { number: '100+', label: 'Students Trained' },
        { number: '15+', label: 'Years Experience' },
        { number: '4+', label: 'Expert Coaches' },
        { number: '5', label: 'International Standard Turf Pitch' },
        { number: '2', label: 'upcoming grounds' }
      ],
      primaryCTA: 'Explore Programs',
      secondaryCTA: 'Book Free Trial'
    },
    {
      id: 'summer-camp',
      type: 'summer-camp',
      badge: '🏏 SUMMER CAMP 2025',
      title: 'Join Our Exclusive',
      subtitle: 'Summer Cricket Camp',
      description: 'Intensive 6-week program with professional coaches, daily practice sessions, and match experience. Limited seats available - Register now!',
      backgroundImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      highlights: [
        { icon: 'fas fa-calendar-alt', text: '22 Sep 2025' },
        { icon: 'fas fa-users', text: 'Ages 7-14' },
        { icon: 'fas fa-trophy', text: 'Boys & Girls' }
      ],
      stats: [
        { number: '6', label: 'Weeks', icon: 'fas fa-clock' },
        { number: '50', label: 'Seats', icon: 'fas fa-users' },
        { number: '5', label: 'Coaches', icon: 'fas fa-medal' }
      ],
      primaryCTA: 'Enroll Now',
      secondaryCTA: 'Get Details'
    }
  ];

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="App" data-theme={theme}>
      {/* Header */}
      <header className="header">
        <nav className="navbar">
          <div className="container">
            <div className="nav-brand">
              <img src="/assets/logo.png" alt="BNIOC Logo" className="logo" />
              <div className="brand-text">
                <h1>BNIOC</h1>
                <span>Shaping the future of cricket stars</span>
              </div>
            </div>
            
            <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`} id="nav-menu">
              <ul className="nav-list">
                <li className="nav-item">
                  <button onClick={() => scrollToSection('home')} className="nav-link active">Home</button>
                </li>
                <li className="nav-item">
                  <button onClick={() => scrollToSection('about')} className="nav-link">About</button>
                </li>
                <li className="nav-item">
                  <button onClick={() => scrollToSection('founder')} className="nav-link">Founder</button>
                </li>
                <li className="nav-item">
                  <button onClick={() => scrollToSection('programs')} className="nav-link">Programs</button>
                </li>
                <li className="nav-item">
                  <button onClick={() => scrollToSection('facilities')} className="nav-link">Facilities</button>
                </li>
                <li className="nav-item">
                  <button onClick={() => scrollToSection('gallery')} className="nav-link">Gallery</button>
                </li>
                <li className="nav-item">
                  <button onClick={() => scrollToSection('news')} className="nav-link">News & Events</button>
                </li>
                <li className="nav-item">
                  <button onClick={() => scrollToSection('contact')} className="nav-link">Contact</button>
                </li>
              </ul>
            </div>
            
            <div className="header-controls">
              <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle dark mode">
                <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
              </button>
              
              <div className="nav-toggle" onClick={toggleMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section with Carousel */}
      <section id="home" className="hero">
        <div className="hero-carousel">
          <div className="carousel-container">
            {slides.map((slide, index) => (
              <div 
                key={slide.id}
                className={`carousel-slide ${slide.type === 'summer-camp' ? 'summer-camp-slide' : ''} ${slide.id === 'home' ? 'cricket-bg' : ''} ${index === currentSlide ? 'active' : ''}`}
              >
                <div className="hero-bg" style={{backgroundImage: `url('${slide.backgroundImage}')`}}></div>
                <div className="hero-overlay"></div>
                <div className="hero-content">
                  <div className="container">
                    {slide.type === 'summer-camp' ? (
                      // Original Summer Camp Layout with enhancements
                      <div className="summer-camp-layout">
                        <div className="summer-camp-content">
                          <div className="hero-badge pulse-animation">{slide.badge}</div>
                          <h1 className="hero-title">
                            {slide.title}
                            <br /><span className="highlight-text">{slide.subtitle}</span>
                          </h1>
                          <p className="hero-subtitle">
                            {slide.description}
                          </p>
                          
                          <div className="camp-highlights">
                            {slide.highlights.map((highlight, idx) => (
                              <div key={idx} className="highlight-item">
                                <i className={highlight.icon}></i>
                                <span>{highlight.text}</span>
                              </div>
                            ))}
                          </div>
                          
                          <div className="hero-buttons">
                            <button onClick={() => scrollToSection('programs')} className="btn btn-primary glow-effect">
                              {slide.primaryCTA}
                            </button>
                            <button onClick={() => scrollToSection('contact')} className="btn btn-secondary">
                              {slide.secondaryCTA}
                            </button>
                          </div>
                        </div>
                        
                        <div className="summer-camp-visual">
                          <div className="camp-image-container">
                            <img src="/assets/images/banners/summer_camp.png" alt="Summer Camp 2025" className="camp-banner-image" />
                            <div className="image-overlay">
                              <div className="overlay-badge">
                                <i className="fas fa-star"></i>
                                <span>Limited Seats</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="floating-stats">
                            {slide.stats.map((stat, idx) => (
                              <div key={idx} className="floating-stat">
                                <div className="stat-icon">
                                  <i className={stat.icon}></i>
                                </div>
                                <div className="stat-info">
                                  <div className="stat-number">{stat.number}</div>
                                  <div className="stat-label">{stat.label}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      // Original Main Hero Layout with enhancements
                      <>
                        <div className="hero-text">
                          <div className="hero-badge fade-in">{slide.badge}</div>
                          <h1 className="hero-title">
                            {slide.title}
                            <br />{slide.subtitle}
                          </h1>
                          <p className="hero-subtitle">
                            {slide.description}
                          </p>
                          <div className="hero-buttons">
                            <button onClick={() => scrollToSection('programs')} className="btn btn-primary">
                              {slide.primaryCTA}
                            </button>
                            <button onClick={() => scrollToSection('contact')} className="btn btn-secondary">
                              {slide.secondaryCTA}
                            </button>
                          </div>
                        </div>
                        
                        <div className="hero-stats">
                          {slide.stats.map((stat, idx) => (
                            <div key={idx} className="stat-card">
                              <div className="stat-number">{stat.number}</div>
                              <div className="stat-label">{stat.label}</div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Carousel Controls */}
          <button className="carousel-btn carousel-btn-prev" onClick={prevSlide}>
            <i className="fas fa-chevron-left"></i>
          </button>
          <button className="carousel-btn carousel-btn-next" onClick={nextSlide}>
            <i className="fas fa-chevron-right"></i>
          </button>
          
          {/* Carousel Indicators */}
          <div className="carousel-indicators">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              ></button>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <div className="section-header">
                <h2 className="section-title">About BNIOC</h2>
                <p className="section-subtitle">Nurturing cricket talent with passion and precision</p>
              </div>
              <p>
                Bengaluru Nex-Gen Institute of Cricket (BNIOC) stands as a beacon of excellence in cricket education. 
                Founded with the vision to nurture young talent and transform passionate players into skilled cricketers, 
                we have been at the forefront of cricket coaching for over a decade.
              </p>
              <p>
                Our comprehensive training programs combine traditional coaching methods with modern techniques, 
                ensuring that every student receives personalized attention and develops both technical skills and 
                mental fortitude required to excel in cricket.
              </p>
              <div className="about-features">
                <div className="feature-item">
                  <i className="fas fa-trophy"></i>
                  <div>
                    <h4>Championship Training</h4>
                    <p>Proven methods that have produced tournament winners</p>
                  </div>
                </div>
                <div className="feature-item">
                  <i className="fas fa-users"></i>
                  <div>
                    <h4>Expert Coaches</h4>
                    <p>Learn from experienced professionals and former players</p>
                  </div>
                </div>
                <div className="feature-item">
                  <i className="fas fa-chart-line"></i>
                  <div>
                    <h4>Skill Development</h4>
                    <p>Comprehensive programs for all skill levels and ages</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="about-image">
              <img src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Cricket Training" />
              <div className="image-stats">
                <div className="stat-badge">
                  <span className="number">15+</span>
                  <span className="label">Years</span>
                </div>
                <div className="stat-badge">
                  <span className="number">500+</span>
                  <span className="label">Students</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder & Head Coach Section */}
      <section id="founder" className="founder">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Meet Our Founder & Head Coach</h2>
            <p className="section-subtitle">Leading with experience, passion, and dedication</p>
          </div>
          
          <div className="founder-content">
            <div className="founder-image">
              <img src="/assets/images/coaches/head_coach.png" alt="Kamal Sharma - Founder & Head Coach" />
              <div className="founder-badge">
                <i className="fas fa-award"></i>
                <span>Founder & Head Coach</span>
              </div>
            </div>
            
            <div className="founder-info">
              <div className="founder-header">
                <h3>Kamal Sharma</h3>
                <p className="founder-title">Visionary Founder & Master Coach</p>
                <div className="founder-tagline">
                  <i className="fas fa-star"></i>
                  <span>"Transforming Dreams into Cricket Legends"</span>
                </div>
                <div className="founder-experience">
                  <div className="experience-item premium">
                    <i className="fas fa-crown"></i>
                    <span>Elite A-Grade Coach</span>
                  </div>
                  <div className="experience-item premium">
                    <i className="fas fa-trophy"></i>
                    <span>State Champions Mentor</span>
                  </div>
                  <div className="experience-item premium">
                    <i className="fas fa-medal"></i>
                    <span>National Team Advisor</span>
                  </div>
                  <div className="experience-item premium">
                    <i className="fas fa-globe"></i>
                    <span>International Cricket Strategist</span>
                  </div>
                </div>
              </div>
              
              <div className="founder-message">
                <div className="message-quote">
                  <i className="fas fa-quote-left"></i>
                </div>
                <p className="highlight">
                  "Welcome to the future of cricket excellence! I'm Kamal Sharma, and my mission is simple yet revolutionary: to transform passionate cricket enthusiasts into champions who dominate the field with skill, strategy, and unwavering confidence."
                </p>
                <p className="message-text">
                  "With over two decades of elite coaching experience, I've had the privilege of mentoring champions at every level - from grassroots talents to international stars. My coaching philosophy isn't just about technique; it's about building cricket warriors who think like strategists, perform like athletes, and lead like champions."
                </p>
                <p className="message-text">
                  "At BNIOC, we don't just teach cricket - we engineer success stories. Every student who walks through our doors embarks on a transformational journey where raw talent meets world-class methodology, where dreams meet reality, and where potential becomes performance."
                </p>
                <p className="message-text">
                  "Whether you're a beginner taking your first swing or an aspiring professional seeking that competitive edge, BNIOC is your gateway to cricket excellence. We combine cutting-edge training techniques, personalized mentorship, and a winning mindset to create the next generation of cricket superstars."
                </p>
                <p className="message-text vision">
                  "Join the BNIOC family and discover what it truly means to play cricket at the highest level. Together, we'll unlock your potential, exceed your expectations, and write your success story in the annals of cricket history!"
                </p>
                <div className="message-signature">
                  <strong>- Kamal Sharma</strong>
                  <span>Founder & Head Coach, BNIOC</span>
                </div>
              </div>
              
              <div className="founder-achievements">
                <h4>🏆 Legacy of Excellence</h4>
                <ul className="achievement-list">
                  <li><i className="fas fa-star"></i> <strong>15+ Years</strong> of elite coaching mastery with A-grade cricketers</li>
                  <li><i className="fas fa-trophy"></i> <strong>Champion Maker:</strong> Mentored 50+ players to State, National & International levels</li>
                  <li><i className="fas fa-rocket"></i> <strong>Innovation Pioneer:</strong> Revolutionary training methodologies that guarantee results</li>
                  <li><i className="fas fa-brain"></i> <strong>Holistic Approach:</strong> Technical brilliance + Mental toughness + Physical excellence</li>
                  <li><i className="fas fa-medal"></i> <strong>Success Rate:</strong> 95% of students achieve their cricket goals within 12 months</li>
                  <li><i className="fas fa-users"></i> <strong>Community Builder:</strong> Created India's most supportive cricket development ecosystem</li>
                </ul>
                
                <div className="founder-vision">
                  <h4>🎯 The BNIOC Vision</h4>
                  <div className="vision-grid">
                    <div className="vision-item">
                      <i className="fas fa-lightbulb"></i>
                      <h5>Innovation</h5>
                      <p>Cutting-edge training methods that stay ahead of the game</p>
                    </div>
                    <div className="vision-item">
                      <i className="fas fa-heart"></i>
                      <h5>Passion</h5>
                      <p>Igniting the love for cricket in every student's heart</p>
                    </div>
                    <div className="vision-item">
                      <i className="fas fa-target"></i>
                      <h5>Excellence</h5>
                      <p>Setting new standards in cricket education and performance</p>
                    </div>
                  </div>
                </div>
                
                <div className="founder-cta">
                  <h4>🚀 Ready to Transform Your Cricket Journey?</h4>
                  <p>Join thousands of successful cricketers who chose BNIOC as their pathway to greatness!</p>
                  <div className="cta-buttons">
                    <button onClick={() => scrollToSection('programs')} className="btn btn-primary">Explore Programs</button>
                    <button onClick={() => scrollToSection('contact')} className="btn btn-secondary">Book Free Consultation</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="programs">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Programs</h2>
            <p className="section-subtitle">Comprehensive cricket training programs for all skill levels</p>
          </div>
          
          <div className="programs-grid">
            <div className="program-card">
              <div className="program-header">
                <h3>🏏 Weekend Warriors</h3>
              </div>
              <div className="program-meta">
                <span className="program-duration"><i className="fas fa-calendar"></i> Saturdays & Sundays</span>
                <span className="program-age"><i className="fas fa-users"></i> All Ages Welcome</span>
              </div>
              <div className="program-content">
                <p className="program-description">Master cricket skills on weekends with flexible timing options!</p>
                <ul className="program-features">
                  <li><i className="fas fa-check"></i> Morning & Afternoon Sessions</li>
                  <li><i className="fas fa-check"></i> Weekend Flexibility</li>
                  <li><i className="fas fa-check"></i> Year-Round Training</li>
                  <li><i className="fas fa-check"></i> Expert Coaching</li>
                </ul>
                <button onClick={() => scrollToSection('contact')} className="btn btn-primary">Join Weekend Warriors</button>
              </div>
            </div>
            
            <div className="program-card">
              <div className="program-header">
                <h3>🌙 Night Owls Cricket</h3>
              </div>
              <div className="program-meta">
                <span className="program-duration"><i className="fas fa-moon"></i> Friday & Saturday Nights</span>
                <span className="program-age"><i className="fas fa-briefcase"></i> Working Professionals</span>
              </div>
              <div className="program-content">
                <p className="program-description">Train under the lights after work hours - perfect for professionals!</p>
                <ul className="program-features">
                  <li><i className="fas fa-check"></i> Floodlight Training</li>
                  <li><i className="fas fa-check"></i> Professional-Friendly Timing</li>
                  <li><i className="fas fa-check"></i> Advanced Coaching</li>
                  <li><i className="fas fa-check"></i> Weekend Convenience</li>
                </ul>
                <button onClick={() => scrollToSection('contact')} className="btn btn-primary">Join Night Owls</button>
              </div>
            </div>
            
            <div className="program-card">
              <div className="program-header">
                <h3>⚡ Daily Champions</h3>
              </div>
              <div className="program-meta">
                <span className="program-duration"><i className="fas fa-calendar"></i> Monday to Saturday</span>
                <span className="program-age"><i className="fas fa-rocket"></i> Rapid Improvement</span>
              </div>
              <div className="program-content">
                <p className="program-description">Daily evening training for serious cricket enthusiasts!</p>
                <ul className="program-features">
                  <li><i className="fas fa-check"></i> Daily Evening Sessions</li>
                  <li><i className="fas fa-check"></i> Consistent Practice</li>
                  <li><i className="fas fa-check"></i> Floodlight Training</li>
                  <li><i className="fas fa-check"></i> Rapid Skill Development</li>
                </ul>
                <button onClick={() => scrollToSection('contact')} className="btn btn-primary">Become a Champion</button>
              </div>
            </div>
            
            <div className="program-card">
              <div className="program-header">
                <h3>🎯 Focused Training</h3>
              </div>
              <div className="program-meta">
                <span className="program-duration"><i className="fas fa-clock"></i> 7 Days a Week</span>
                <span className="program-age"><i className="fas fa-sun"></i> Morning or Evening</span>
              </div>
              <div className="program-content">
                <p className="program-description">Choose your preferred time slot and train every day!</p>
                <ul className="program-features">
                  <li><i className="fas fa-check"></i> Morning or Evening Choice</li>
                  <li><i className="fas fa-check"></i> Seven Days Training</li>
                  <li><i className="fas fa-check"></i> Flexible Scheduling</li>
                  <li><i className="fas fa-check"></i> Consistent Progress</li>
                </ul>
                <button onClick={() => scrollToSection('contact')} className="btn btn-primary">Start Focused Training</button>
              </div>
            </div>
            
            <div className="program-card featured">
              <div className="program-header">
                <h3>🔥 Double Impact</h3>
              </div>
              <div className="program-meta">
                <span className="program-duration"><i className="fas fa-fire"></i> Morning & Evening</span>
                <span className="program-age"><i className="fas fa-star"></i> Intensive Training</span>
              </div>
              <div className="program-content">
                <p className="program-description">Double the training, double the results - our most popular program!</p>
                <ul className="program-features">
                  <li><i className="fas fa-check"></i> Morning & Evening Sessions</li>
                  <li><i className="fas fa-check"></i> Maximum Practice Time</li>
                  <li><i className="fas fa-check"></i> Intensive Training</li>
                  <li><i className="fas fa-check"></i> Rapid Skill Development</li>
                </ul>
                <button onClick={() => scrollToSection('contact')} className="btn btn-primary">Double Your Skills</button>
              </div>
            </div>
            
            <div className="program-card premium">
              <div className="program-header">
                <h3>👑 Elite Academy</h3>
              </div>
              <div className="program-meta">
                <span className="program-duration"><i className="fas fa-crown"></i> Full Day Training</span>
                <span className="program-age"><i className="fas fa-trophy"></i> Elite Development</span>
              </div>
              <div className="program-content">
                <p className="program-description">Complete immersion in cricket - for serious aspiring professionals!</p>
                <ul className="program-features">
                  <li><i className="fas fa-check"></i> Full Day Training</li>
                  <li><i className="fas fa-check"></i> Professional Development</li>
                  <li><i className="fas fa-check"></i> Elite Coaching</li>
                  <li><i className="fas fa-check"></i> Championship Preparation</li>
                </ul>
                <button onClick={() => scrollToSection('contact')} className="btn btn-primary">Join Elite Academy</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rules and Regulations Section */}
      <section id="rules" className="rules">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">BNIOC Cricket Academy Rules & Regulations</h2>
            <p className="section-subtitle">Guidelines for a safe and productive training environment</p>
          </div>
          
          <div className="rules-content">
            <div className="rules-grid">
              <div className="rule-category">
                <h3><i className="fas fa-clock"></i> Training Schedule & Attendance</h3>
                <ul className="rule-list">
                  <li>Students must arrive 15 minutes before scheduled training time</li>
                  <li>Regular attendance is mandatory for skill development</li>
                  <li>Notify coaches in advance for planned absences</li>
                  <li>Make-up sessions available for medical emergencies only</li>
                </ul>
              </div>
              
              <div className="rule-category">
                <h3><i className="fas fa-tshirt"></i> Dress Code & Equipment</h3>
                <ul className="rule-list">
                  <li>Proper cricket attire required during all sessions</li>
                  <li>Cricket shoes with spikes mandatory on turf pitches</li>
                  <li>Personal protective gear (pads, gloves, helmet) recommended</li>
                  <li>Academy provides basic equipment for beginners</li>
                </ul>
              </div>
              
              <div className="rule-category">
                <h3><i className="fas fa-handshake"></i> Conduct & Behavior</h3>
                <ul className="rule-list">
                  <li>Respectful behavior towards coaches and fellow students</li>
                  <li>No use of mobile phones during training sessions</li>
                  <li>Follow all safety instructions given by coaches</li>
                  <li>Maintain discipline and sportsmanship at all times</li>
                </ul>
              </div>
              
              <div className="rule-category">
                <h3><i className="fas fa-rupee-sign"></i> Fees & Payment</h3>
                <ul className="rule-list">
                  <li>Fees must be paid in advance before course commencement</li>
                  <li>No refunds for voluntary withdrawals mid-course</li>
                  <li>Late payment charges apply after due date</li>
                  <li>Scholarships available for deserving candidates</li>
                </ul>
              </div>
              
              <div className="rule-category">
                <h3><i className="fas fa-shield-alt"></i> Safety & Health</h3>
                <ul className="rule-list">
                  <li>Medical certificate required for all students</li>
                  <li>Inform coaches about any injuries or health issues</li>
                  <li>Academy not responsible for personal belongings</li>
                  <li>Insurance coverage recommended for all participants</li>
                </ul>
              </div>
              
              <div className="rule-category">
                <h3><i className="fas fa-ban"></i> Disciplinary Actions</h3>
                <ul className="rule-list">
                  <li>Verbal warning for first-time rule violations</li>
                  <li>Written warning for repeated violations</li>
                  <li>Suspension for serious misconduct</li>
                  <li>Termination for continued disruptive behavior</li>
                </ul>
              </div>
            </div>
            
            <div className="rules-footer">
              <p><strong>Note:</strong> All students and parents must read and agree to these rules before enrollment. The academy reserves the right to modify these rules as needed.</p>
              <div className="rules-contact">
                <p>For any clarifications, contact us at <strong>+91 88811 13107</strong> or <strong>info@batkhelo.com</strong></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section id="facilities" className="facilities">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">World-Class Facilities</h2>
            <p className="section-subtitle">Train with the best equipment and infrastructure</p>
          </div>
          
          <div className="facilities-content">
            <div className="facilities-grid">
              <div className="facility-card featured">
                <div className="facility-icon">
                  <i className="fas fa-baseball-ball"></i>
                </div>
                <h3>International Standard Turf Pitches</h3>
                <p>5 professional-grade turf pitches that meet international cricket standards for authentic match experience and professional training.</p>
              </div>
              
              <div className="facility-card">
                <div className="facility-icon">
                  <i className="fas fa-lightbulb"></i>
                </div>
                <h3>Floodlight Training</h3>
                <p>State-of-the-art LED floodlights enable evening and night training sessions for maximum flexibility and extended practice hours.</p>
              </div>
              
              <div className="facility-card">
                <div className="facility-icon">
                  <i className="fas fa-dumbbell"></i>
                </div>
                <h3>Fitness Center</h3>
                <p>Fully equipped gymnasium with modern fitness equipment designed specifically for cricket conditioning and strength training.</p>
              </div>
              
              <div className="facility-card">
                <div className="facility-icon">
                  <i className="fas fa-video"></i>
                </div>
                <h3>Video Analysis Center</h3>
                <p>Advanced video analysis equipment for technical skill development, performance review, and strategic improvement sessions.</p>
              </div>
              
              <div className="facility-card">
                <div className="facility-icon">
                  <i className="fas fa-home"></i>
                </div>
                <h3>Modern Clubhouse</h3>
                <p>Contemporary clubhouse with changing rooms, equipment storage, lounge areas, and comfortable seating for players and parents.</p>
              </div>
              
              
            </div>
            
            <div className="facilities-stats">
              <div className="stat-card">
                <div className="stat-number">5</div>
                <div className="stat-label">Turf Pitches</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">2</div>
                <div className="stat-label">Upcoming Grounds</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Security</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">100+</div>
                <div className="stat-label">Parking Spots</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-choose-us" className="why-choose-us">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose Us?</h2>
            <p className="section-subtitle">Discover what makes BNIOC the premier choice for cricket training</p>
          </div>
          
          <div className="accordion-container">
            {[
              {
                title: "🏆 Proven Track Record",
                content: "With over 15 years of experience, we have successfully trained 500+ students who have gone on to represent their schools, colleges, and clubs at various levels. Our alumni have achieved remarkable success in district and state-level competitions."
              },
              {
                title: "👨‍🏫 Expert Coaching Staff",
                content: "Learn from coaches who have worked with elite-level cricketers. Our experienced coaching staff is passionate about the game and dedicated to helping you achieve your goals."
              },
              {
                title: "🏟️ World-Class Infrastructure",
                content: "Train on 5 international standard turf pitches with modern facilities including floodlights, fitness center, and professional-grade equipment. Our infrastructure meets international cricket standards."
              },
              {
                title: "📈 Personalized Development",
                content: "Every student receives individual attention with customized training programs. We focus on identifying and developing each player's unique strengths while addressing areas for improvement."
              },
              {
                title: "🎯 Comprehensive Programs",
                content: "From beginner-friendly weekend programs to intensive summer camps and individual coaching, we offer flexible training options to suit every schedule and skill level."
              }
            ].map((item, index) => (
              <div key={index} className="accordion-item">
                <div 
                  className="accordion-header" 
                  onClick={() => toggleAccordion(index)}
                  style={{ cursor: 'pointer' }}
                >
                  <h3>{item.title}</h3>
                  <i className={`fas fa-chevron-${activeAccordion === index ? 'up' : 'down'}`}></i>
                </div>
                <div className={`accordion-content ${activeAccordion === index ? 'active' : ''}`}>
                  <p>{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Testimonials</h2>
            <p className="section-subtitle">What our students and parents say about us</p>
          </div>
          
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <div className="quote-icon">
                  <i className="fas fa-quote-left"></i>
                </div>
                <p>"The summer camp was fantastic! I learned so many new techniques and had fun while doing it. The coaches are really supportive, and the drills were spot on!"</p>
                <div className="testimonial-author">
                  <h4>Shashank</h4>
                  <span>Youth Player</span>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-content">
                <div className="quote-icon">
                  <i className="fas fa-quote-left"></i>
                </div>
                <p>"BNIOC has excellent facilities and coaching staff. My son has improved tremendously in his batting and bowling skills. Highly recommend for serious cricket training."</p>
                <div className="testimonial-author">
                  <h4>Ramakant</h4>
                  <span>Parent</span>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-content">
                <div className="quote-icon">
                  <i className="fas fa-quote-left"></i>
                </div>
                <p>"The individual coaching sessions helped me work on my specific weaknesses. The personalized attention and expert guidance made a huge difference in my game."</p>
                <div className="testimonial-author">
                  <h4>Ravikant</h4>
                  <span>Academy Student</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="gallery">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Gallery</h2>
            <p className="section-subtitle">Capturing moments of excellence and passion for cricket</p>
          </div>
          
          <div className="gallery-container">
            {/* Featured Large Image */}
            <div className="gallery-featured">
              <div className="featured-image">
                <img src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Cricket Academy" />
                <div className="featured-overlay">
                  <div className="featured-content">
                    <h3>🏏 BNIOC Cricket Academy</h3>
                    <p>Where champions are made through dedication, training, and passion</p>
                    <div className="featured-stats">
                      <span><i className="fas fa-users"></i> 100+ Students</span>
                      <span><i className="fas fa-trophy"></i> 15+ Tournaments</span>
                      <span><i className="fas fa-medal"></i> 50+ Awards</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Gallery Grid */}
            <div className="gallery-masonry">
              <div className="gallery-card">
                <div className="card-image">
                  <img src="https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Batting Training" />
                </div>
                <div className="card-content">
                  <h4>🏏 Batting Training</h4>
                  <p>Master the art of batting with expert techniques</p>
                </div>
              </div>
              
              <div className="gallery-card">
                <div className="card-image">
                  <img src="https://images.unsplash.com/photo-1593341646782-e0b495cff86d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Bowling Practice" />
                </div>
                <div className="card-content">
                  <h4>⚡ Bowling Practice</h4>
                  <p>Perfect your bowling skills with professional guidance</p>
                </div>
              </div>
              
              <div className="gallery-card">
                <div className="card-image">
                  <img src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Match Day" />
                </div>
                <div className="card-content">
                  <h4>🏆 Match Day</h4>
                  <p>Experience the thrill of competitive cricket</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Instagram CTA */}
          <div className="instagram-cta">
            <div className="cta-content">
              <div className="cta-icon">
                <i className="fab fa-instagram"></i>
              </div>
              <div className="cta-text">
                <h3>Follow Our Journey</h3>
                <p>🏏 Get daily updates, behind-the-scenes content, and match highlights on Instagram!</p>
              </div>
              <a href="https://www.instagram.com/bnioc_cricketers/" target="_blank" rel="noopener noreferrer" className="btn btn-primary instagram-btn">
                <i className="fab fa-instagram"></i>
                Follow @bnioc_cricketers
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* News & Events Section */}
      <section id="news" className="news-events">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Latest News & Events</h2>
            <p className="section-subtitle">Stay updated with our latest activities and achievements</p>
          </div>
          
          <div className="news-grid">
            <article className="news-card">
              <div className="news-image">
                <img src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Summer Camp Registration" />
                <div className="news-date">
                  <span className="day">15</span>
                  <span className="month">Jan</span>
                </div>
              </div>
              <div className="news-content">
                <div className="news-category">Registration Open</div>
                <h3>Summer Cricket Camp 2025 Registration Now Open!</h3>
                <p>Early bird registration for our exclusive Summer Cricket Camp 2025 is now open. Limited seats available with special discounts for early registrations.</p>
                <button onClick={() => scrollToSection('contact')} className="news-link">
                  Register Now <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            </article>
            
            <article className="news-card">
              <div className="news-image">
                <img src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Tournament Victory" />
                <div className="news-date">
                  <span className="day">08</span>
                  <span className="month">Jan</span>
                </div>
              </div>
              <div className="news-content">
                <div className="news-category">Achievement</div>
                <h3>BNIOC Students Win Inter-Academy Championship</h3>
                <p>Our talented students secured first place in the prestigious Inter-Academy Cricket Championship, showcasing exceptional skills and teamwork.</p>
                <button onClick={() => scrollToSection('gallery')} className="news-link">
                  View Gallery <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            </article>
            
            <article className="news-card">
              <div className="news-image">
                <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="New Facilities" />
                <div className="news-date">
                  <span className="day">02</span>
                  <span className="month">Jan</span>
                </div>
              </div>
              <div className="news-content">
                <div className="news-category">Infrastructure</div>
                <h3>New State-of-the-Art Training Facilities Inaugurated</h3>
                <p>We're excited to announce the opening of our new training facilities including advanced fitness center and additional practice nets.</p>
                <button onClick={() => scrollToSection('facilities')} className="news-link">
                  Explore Facilities <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            </article>
          </div>
          
          <div className="news-cta">
            <h3>Stay Connected</h3>
            <p>Follow us on social media for daily updates, training tips, and behind-the-scenes content!</p>
            <div className="social-buttons">
              <a href="https://www.instagram.com/bnioc_cricketers/" target="_blank" rel="noopener noreferrer" className="social-btn instagram">
                <i className="fab fa-instagram"></i> Instagram
              </a>
              <a href="#" className="social-btn facebook">
                <i className="fab fa-facebook-f"></i> Facebook
              </a>
              <a href="#" className="social-btn youtube">
                <i className="fab fa-youtube"></i> YouTube
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Contact Us</h2>
            <p className="section-subtitle">Get in touch for enrollment and inquiries</p>
          </div>
          
          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className="contact-details">
                  <h4>Address</h4>
                  <p>Global White Pearl, Panditana Agrahara<br />Bengaluru, Karnataka 562125</p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-phone"></i>
                </div>
                <div className="contact-details">
                  <h4>Phone</h4>
                  <p>+91 79740 94110<br />+91 88811 13107</p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="contact-details">
                  <h4>Email</h4>
                  <p>info@batkhelo.com<br />admissions@batkhelo.com</p>
                </div>
              </div>
            </div>
            
            <div className="contact-form">
              <div className="google-form-container">
                <div className="form-header">
                  <h3>📝 Enrollment & Inquiry Form</h3>
                  <p>Fill out this form and we'll get back to you within 24 hours!</p>
                </div>
                
                <div className="google-form-embed">
                  <iframe 
                    src="https://docs.google.com/forms/d/e/1FAIpQLScXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/viewform?embedded=true" 
                    width="100%" 
                    height="600" 
                    frameBorder="0" 
                    marginHeight="0" 
                    marginWidth="0"
                    title="BNIOC Contact Form">
                    Loading…
                  </iframe>
                </div>
                
                <div className="form-footer">
                  <p><strong>Note:</strong> Having trouble with the form? You can also reach us directly:</p>
                  <div className="quick-contact">
                    <a href="tel:+918881113107" className="quick-contact-btn">
                      <i className="fas fa-phone"></i> Call Now
                    </a>
                    <a href="mailto:info@batkhelo.com" className="quick-contact-btn">
                      <i className="fas fa-envelope"></i> Email Us
                    </a>
                    <a href="https://wa.me/918881113107" className="quick-contact-btn" target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-whatsapp"></i> WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="footer-brand">
                <img src="/assets/logo.png" alt="BNIOC Logo" className="footer-logo" />
                <h3>BNIOC</h3>
                <p>Bengaluru Nex-Gen Institute of Cricket</p>
              </div>
              <p className="footer-description">
                Empowering the next generation of cricket champions through professional training, 
                expert coaching, and comprehensive development programs.
              </p>
              <div className="social-links">
                <a href="#" className="social-link"><i className="fab fa-facebook-f"></i></a>
                <a href="https://www.instagram.com/bnioc_cricketers/" target="_blank" rel="noopener noreferrer" className="social-link"><i className="fab fa-instagram"></i></a>
                <a href="#" className="social-link"><i className="fab fa-twitter"></i></a>
                <a href="#" className="social-link"><i className="fab fa-youtube"></i></a>
              </div>
            </div>
            
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul className="footer-links">
                <li><a href="#about">About Us</a></li>
                <li><a href="#programs">Programs</a></li>
                <li><a href="#gallery">Gallery</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Contact Info</h4>
              <div className="footer-contact">
                <p><i className="fas fa-map-marker-alt"></i> Global White Pearl, Panditana Agrahara, Bengaluru</p>
                <p><i className="fas fa-phone"></i> +91 79740 94110</p>
                <p><i className="fas fa-envelope"></i> info@batkhelo.com</p>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2024 BNIOC - Bengaluru Nex-Gen Institute of Cricket. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
