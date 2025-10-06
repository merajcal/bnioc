import React from 'react';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">About BNIOC</h2>
          <p className="section-subtitle">Nurturing cricket talent with passion, precision, and excellence</p>
        </div>
        
        <div className="about-content">
          <div className="about-text">
            <h3>🏏 Welcome to Bengaluru Nex-Gen Institute of Cricket</h3>
            <p>
              At BNIOC, we believe that every aspiring cricketer has the potential to achieve greatness. 
              Founded with a vision to revolutionize cricket training in Bengaluru, we have established 
              ourselves as the premier destination for comprehensive cricket education and development.
            </p>
            
            <h3>🎯 Our Mission</h3>
            <p>
              To provide world-class cricket training that combines traditional techniques with modern 
              methodologies, ensuring every student receives personalized attention and develops both 
              technical skills and mental toughness required to excel in competitive cricket.
            </p>
            
            <h3>🌟 What Sets Us Apart</h3>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-users"></i>
                </div>
                <h4>Expert Coaching</h4>
                <p>Learn from experienced coaches with proven track records in developing successful cricketers.</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-trophy"></i>
                </div>
                <h4>Proven Results</h4>
                <p>Our students consistently perform well in district, state, and national level competitions.</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-cog"></i>
                </div>
                <h4>Modern Methods</h4>
                <p>We use cutting-edge training techniques and technology to accelerate skill development.</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-heart"></i>
                </div>
                <h4>Holistic Development</h4>
                <p>Focus on physical fitness, mental conditioning, and character building alongside cricket skills.</p>
              </div>
            </div>
            
            <h3>📈 Our Track Record</h3>
            <div className="stats-showcase">
              <div className="stat-item">
                <div className="stat-number">100+</div>
                <div className="stat-description">Students Successfully Trained</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">15+</div>
                <div className="stat-description">Years of Excellence</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">95%</div>
                <div className="stat-description">Student Success Rate</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">50+</div>
                <div className="stat-description">Tournament Winners</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
