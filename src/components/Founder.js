import React from 'react';

const Founder = () => {
  return (
    <section id="founder" className="founder">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Meet Our Founder</h2>
          <p className="section-subtitle">Visionary leadership driving cricket excellence</p>
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
              <p className="founder-title">Founder & Head Coach</p>
              <div className="founder-credentials">
                <span className="credential">
                  <i className="fas fa-graduation-cap"></i>
                  Cricket Coaching Certification
                </span>
                <span className="credential">
                  <i className="fas fa-medal"></i>
                  Former District Player
                </span>
                <span className="credential">
                  <i className="fas fa-star"></i>
                  15+ Years Experience
                </span>
              </div>
            </div>
            
            <div className="founder-message">
              <h4>💬 A Message from Our Founder</h4>
              <p className="message-text">
                "Cricket is not just a game; it's a journey of self-discovery, discipline, and determination. When I founded BNIOC, my vision was simple yet ambitious - to create a nurturing environment where young cricketers could flourish and reach their full potential."
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
                    <p>Instilling love for cricket while building character and discipline</p>
                  </div>
                  <div className="vision-item">
                    <i className="fas fa-target"></i>
                    <h5>Excellence</h5>
                    <p>Pursuing perfection in every aspect of cricket development</p>
                  </div>
                  <div className="vision-item">
                    <i className="fas fa-handshake"></i>
                    <h5>Community</h5>
                    <p>Building lasting relationships and supporting each other's growth</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Founder;
