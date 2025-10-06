import React from 'react';

const Facilities = () => {
  return (
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
            
            <div className="facility-card">
              <div className="facility-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3>Secure Parking</h3>
              <p>Spacious parking facility for cars and two-wheelers with 24/7 security surveillance and covered parking options.</p>
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
  );
};

export default Facilities;
