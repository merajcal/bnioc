import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    program: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    // Reset form
    setFormData({
      name: '',
      phone: '',
      email: '',
      program: '',
      message: ''
    });
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        {/* Header */}
        <div className="contact-header">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">Ready to start your cricket journey? Let's connect!</p>
        </div>

        {/* Main Content */}
        <div className="contact-main">
          {/* Contact Info Cards */}
          <div className="contact-info-grid">
            <div className="info-card">
              <div className="info-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <h3>Visit Our Academy</h3>
              <p>Global White Pearl, Panditana Agrahara<br />Bengaluru, Karnataka 562125</p>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <i className="fas fa-phone"></i>
              </div>
              <h3>Call Us</h3>
              <p>
                <a href="tel:+917974094110">+91 79740 94110</a><br />
                <a href="tel:+918881113107">+91 88811 13107</a>
              </p>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <h3>Email Us</h3>
              <p><a href="mailto:info@batkhelo.com">info@batkhelo.com</a></p>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <i className="fas fa-clock"></i>
              </div>
              <h3>Training Hours</h3>
              <p>
                Mon-Fri: 6:00 AM - 8:00 PM<br />
                Sat-Sun: 5:00 AM - 7:00 PM
              </p>
            </div>
          </div>

          {/* Contact Form & Quick Actions */}
          <div className="contact-form-container">
            <div className="form-section">
              <h3>Send us a Message</h3>
              <form className="modern-form" onSubmit={handleSubmit}>
                <div className="form-grid">
                  <div className="form-field">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Full Name *"
                      required
                    />
                  </div>
                  <div className="form-field">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Phone Number *"
                      required
                    />
                  </div>
                </div>

                <div className="form-field">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email Address"
                  />
                </div>

                <div className="form-field">
                  <select
                    name="program"
                    value={formData.program}
                    onChange={handleInputChange}
                  >
                    <option value="">Select a Program</option>
                    <option value="summer-camp">Summer Camp 2025</option>
                    <option value="annual-academy">Annual Academy</option>
                    <option value="weekend-coaching">Weekend Coaching</option>
                    <option value="individual-coaching">Individual Coaching</option>
                  </select>
                </div>

                <div className="form-field">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your cricket goals and any questions..."
                    rows="4"
                  ></textarea>
                </div>

                <button type="submit" className="submit-btn">
                  <i className="fas fa-paper-plane"></i>
                  Send Message
                </button>
              </form>
            </div>

            <div className="quick-actions">
              <h3>Quick Connect</h3>
              <div className="action-buttons">
                <a href="tel:+917974094110" className="action-btn call-btn">
                  <i className="fas fa-phone"></i>
                  <span>Call Now</span>
                </a>
                <a href="https://wa.me/917974094110" className="action-btn whatsapp-btn" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-whatsapp"></i>
                  <span>WhatsApp</span>
                </a>
                <a href="mailto:info@batkhelo.com" className="action-btn email-btn">
                  <i className="fas fa-envelope"></i>
                  <span>Email Us</span>
                </a>
              </div>

              <div className="academy-highlights">
                <h4>Why Choose BNIOC?</h4>
                <ul>
                  <li><i className="fas fa-check"></i> Expert Coaching Staff</li>
                  <li><i className="fas fa-check"></i> World-Class Facilities</li>
                  <li><i className="fas fa-check"></i> Proven Track Record</li>
                  <li><i className="fas fa-check"></i> Individual Attention</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="map-section">
          <h3>Find Our Academy</h3>
          <div className="map-wrapper">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.8267!2d77.6311!3d12.9141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU0JzUwLjgiTiA3N8KwMzgnNTIuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="400"
              style={{ border: 0, borderRadius: '20px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="BNIOC Academy Location"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
