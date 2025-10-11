import React, { useState } from 'react';

const News = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const newsItems = [
    {
      id: 1,
      title: "BNIOC Students Shine in State Championship",
      date: "March 15, 2024",
      category: "Tournament Success",
      excerpt: "Proud Moment for both of our players for receiving award at KSCA Stadium. They emerged winners of BTR U 14 KSCA tournament for their respective school.",
      image: "/assets/images/gallery/BTR_U14_2024-2025_1.jpg",
      readTime: "3 min read",
      featured: true
    },
    {
      id: 2,
      title: "BNIOC Players Triumph in BTR U14 KSCA Championship",
      date: "March 15, 2024",
      excerpt: "Proud Moment for both of our players for receiving award at KSCA Stadium. They emerged winners of BTR U 14 KSCA tournament for their respective school.",
      image: "/assets/images/gallery/BTR_U14_2024-2025_2.jpeg",
      readTime: "3 min read",
    },
    {
      id: 3,
      title: "Summer Camp 2025 Registration Opens",
      date: "February 10, 2024",
      category: "Programs",
      excerpt: "Early bird registration is now open for our intensive summer cricket camp. Limited seats available - secure your spot today!",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      readTime: "4 min read"
    },
    {
      id: 4,
      title: "International Coach Workshop Scheduled",
      date: "January 20, 2024",
      category: "Training",
      excerpt: "Renowned international cricket coaches will conduct a special workshop for our students, focusing on advanced batting and bowling techniques.",
      image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      readTime: "3 min read"
    },
    {
      id: 5,
      title: "New Academy Facilities Unveiled",
      date: "January 5, 2024",
      category: "Infrastructure",
      excerpt: "BNIOC proudly unveils new state-of-the-art training facilities including modern clubhouse and advanced video analysis center.",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      readTime: "5 min read"
    },
    {
      id: 6,
      title: "Alumni Success Stories",
      date: "December 15, 2023",
      category: "Achievement",
      excerpt: "Former BNIOC students making waves in professional cricket leagues across India and internationally.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      readTime: "6 min read"
    }
  ];

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Tournament Success': 'bg-green-500',
      'Infrastructure': 'bg-blue-500',
      'Programs': 'bg-primary-500',
      'Training': 'bg-purple-500',
      'Achievement': 'bg-yellow-500'
    };
    return colors[category] || 'bg-gray-500';
  };

  return (
    <section id="news" className="py-16 lg:py-24 bg-gray-50 dark:bg-secondary-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-900 dark:text-white mb-4 font-primary">
            News & Events
          </h2>
          <p className="text-lg md:text-xl text-secondary-600 dark:text-secondary-300 max-w-3xl mx-auto font-secondary">
            Stay updated with the latest happenings at BNIOC
          </p>
        </div>

        {/* Featured News */}
        {newsItems.filter(item => item.featured).map((item) => (
          <div key={item.id} className="mb-16">
            <div className="relative group overflow-hidden rounded-2xl shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px]">
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`${getCategoryColor(item.category)} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                      {item.category}
                    </span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="bg-white dark:bg-secondary-900 p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 text-sm text-secondary-500 dark:text-secondary-400 mb-4">
                    <span className="flex items-center gap-2">
                      <i className="fas fa-calendar-alt text-primary-500"></i>
                      {item.date}
                    </span>
                    <span className="flex items-center gap-2">
                      <i className="fas fa-clock text-primary-500"></i>
                      {item.readTime}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold text-secondary-900 dark:text-white mb-4 font-primary">
                    {item.title}
                  </h3>
                  
                  <p className="text-secondary-600 dark:text-secondary-300 leading-relaxed mb-6 font-secondary">
                    {item.excerpt}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <button className="btn-primary">
                      Read Full Article
                    </button>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-secondary-500 dark:text-secondary-400 mr-2">Share:</span>
                      <button className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-colors duration-200" title="Share on Facebook">
                        <i className="fab fa-facebook-f text-xs"></i>
                      </button>
                      <button className="w-8 h-8 rounded-full bg-blue-400 hover:bg-blue-500 text-white flex items-center justify-center transition-colors duration-200" title="Share on Twitter">
                        <i className="fab fa-twitter text-xs"></i>
                      </button>
                      <button className="w-8 h-8 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center transition-colors duration-200" title="Share on WhatsApp">
                        <i className="fab fa-whatsapp text-xs"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {newsItems.filter(item => !item.featured).map((item) => (
            <article key={item.id} className="group bg-white dark:bg-secondary-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              {/* Image */}
              <div className="relative overflow-hidden h-48">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4">
                  <span className={`${getCategoryColor(item.category)} text-white px-2 py-1 rounded-full text-xs font-semibold`}>
                    {item.category}
                  </span>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-4 text-xs text-secondary-500 dark:text-secondary-400 mb-3">
                  <span className="flex items-center gap-1">
                    <i className="fas fa-calendar-alt text-primary-500"></i>
                    {item.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <i className="fas fa-clock text-primary-500"></i>
                    {item.readTime}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-secondary-900 dark:text-white mb-3 font-primary line-clamp-2">
                  {item.title}
                </h3>
                
                <p className="text-secondary-600 dark:text-secondary-300 text-sm leading-relaxed mb-4 font-secondary line-clamp-3">
                  {item.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <button className="text-primary-500 hover:text-primary-600 font-semibold text-sm transition-colors duration-200">
                    Read More →
                  </button>
                  
                  <div className="flex items-center gap-1">
                    <button className="w-7 h-7 rounded-full bg-gray-100 dark:bg-secondary-800 hover:bg-primary-100 dark:hover:bg-primary-900 text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 flex items-center justify-center transition-all duration-200" title="Share">
                      <i className="fas fa-share-alt text-xs"></i>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter & Social Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Newsletter Signup */}
          <div className="bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4 font-primary flex items-center gap-3">
              <span className="text-2xl">📧</span>
              Stay Updated
            </h3>
            <p className="mb-6 opacity-90 font-secondary">
              Subscribe to our newsletter for the latest news, events, and training tips
            </p>
            
            {subscribed ? (
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                <i className="fas fa-check-circle text-2xl mb-2"></i>
                <p className="font-semibold">Thank you for subscribing!</p>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-white text-primary-500 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>

          {/* Social Links */}
          <div className="bg-white dark:bg-secondary-900 rounded-2xl p-8 shadow-lg">
            <h4 className="text-xl font-bold text-secondary-900 dark:text-white mb-4 font-primary">
              Follow Us
            </h4>
            <p className="text-secondary-600 dark:text-secondary-300 mb-6 font-secondary">
              Connect with us on social media for daily updates
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <a
                href="https://facebook.com/bnioc"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors duration-200 group"
              >
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <i className="fab fa-facebook-f text-white"></i>
                </div>
                <span className="font-medium text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300">Facebook</span>
              </a>
              
              <a
                href="https://instagram.com/bnioc_cricket"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-pink-50 dark:bg-pink-900/20 hover:bg-pink-100 dark:hover:bg-pink-900/30 rounded-lg transition-colors duration-200 group"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                  <i className="fab fa-instagram text-white"></i>
                </div>
                <span className="font-medium text-pink-600 dark:text-pink-400 group-hover:text-pink-700 dark:group-hover:text-pink-300">Instagram</span>
              </a>
              
              <a
                href="https://twitter.com/bnioc"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors duration-200 group"
              >
                <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center">
                  <i className="fab fa-twitter text-white"></i>
                </div>
                <span className="font-medium text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300">Twitter</span>
              </a>
              
              <a
                href="https://youtube.com/bnioc"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors duration-200 group"
              >
                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                  <i className="fab fa-youtube text-white"></i>
                </div>
                <span className="font-medium text-red-600 dark:text-red-400 group-hover:text-red-700 dark:group-hover:text-red-300">YouTube</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default News;
