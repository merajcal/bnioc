import React from 'react';

const News = () => {
  const newsItems = [
    {
      id: 1,
      title: "BNIOC Students Shine in State Championship",
      date: "March 15, 2024",
      category: "Tournament Success",
      excerpt: "Our academy students secured top positions in the Karnataka State Under-19 Cricket Championship, bringing home multiple medals and recognition.",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      readTime: "3 min read"
    },
    {
      id: 2,
      title: "New Floodlight System Installation Complete",
      date: "February 28, 2024",
      category: "Infrastructure",
      excerpt: "We've upgraded our training facilities with state-of-the-art LED floodlights, enabling extended practice sessions and night training programs.",
      image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      readTime: "2 min read"
    },
    {
      id: 3,
      title: "Summer Camp 2024 Registration Opens",
      date: "February 10, 2024",
      category: "Programs",
      excerpt: "Early bird registration is now open for our intensive 6-week summer cricket camp. Limited seats available with special discounts for early enrollments.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      readTime: "4 min read"
    }
  ];

  return (
    <section id="news" className="news-events">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">News & Events</h2>
          <p className="section-subtitle">Stay updated with the latest happenings at BNIOC</p>
        </div>
        
        <div className="news-grid">
          {newsItems.map((item) => (
            <article key={item.id} className="news-card">
              <div className="news-image">
                <img src={item.image} alt={item.title} />
                <div className="news-category">{item.category}</div>
              </div>
              
              <div className="news-content">
                <div className="news-meta">
                  <span className="news-date">
                    <i className="fas fa-calendar-alt"></i>
                    {item.date}
                  </span>
                  <span className="news-read-time">
                    <i className="fas fa-clock"></i>
                    {item.readTime}
                  </span>
                </div>
                
                <h3 className="news-title">{item.title}</h3>
                <p className="news-excerpt">{item.excerpt}</p>
                
                <div className="news-actions">
                  <button className="btn btn-primary btn-sm">Read More</button>
                  <div className="news-share">
                    <button className="share-btn" title="Share on Facebook">
                      <i className="fab fa-facebook-f"></i>
                    </button>
                    <button className="share-btn" title="Share on Twitter">
                      <i className="fab fa-twitter"></i>
                    </button>
                    <button className="share-btn" title="Share on WhatsApp">
                      <i className="fab fa-whatsapp"></i>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
        
        <div className="news-footer">
          <div className="newsletter-signup">
            <h3>📧 Stay Updated</h3>
            <p>Subscribe to our newsletter for the latest news, events, and training tips</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Enter your email address" className="newsletter-input" />
              <button type="submit" className="btn btn-primary">Subscribe</button>
            </form>
          </div>
          
          <div className="social-links">
            <h4>Follow Us</h4>
            <div className="social-icons">
              <a href="https://facebook.com/bnioc" className="social-icon" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://instagram.com/bnioc_cricket" className="social-icon" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://twitter.com/bnioc" className="social-icon" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://youtube.com/bnioc" className="social-icon" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default News;
