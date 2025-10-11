import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-8 lg:py-16 bg-white dark:bg-secondary-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary-900 dark:text-white mb-6 font-primary">
            About <span className="text-primary-500">BNIOC</span>
          </h1>
          <p className="text-xl md:text-2xl text-secondary-600 dark:text-secondary-300 max-w-4xl mx-auto font-secondary leading-relaxed">
            Bengaluru's premier cricket academy where champions are made through world-class training, expert coaching, and unwavering dedication to excellence.
          </p>
        </div>
        
        {/* Stats Section - Moved to top for immediate impact */}
        <div className="bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl p-6 lg:p-10 text-white mb-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold mb-1 font-primary">500+</div>
              <div className="text-xs lg:text-sm opacity-90 font-secondary">Students Trained</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold mb-1 font-primary">15+</div>
              <div className="text-xs lg:text-sm opacity-90 font-secondary">Years Excellence</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold mb-1 font-primary">95%</div>
              <div className="text-xs lg:text-sm opacity-90 font-secondary">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold mb-1 font-primary">50+</div>
              <div className="text-xs lg:text-sm opacity-90 font-secondary">Tournament Winners</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-12 mb-12">
          
          {/* Academy Story */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="bg-gray-50 dark:bg-secondary-800 rounded-xl p-8 lg:p-10">
              <h3 className="text-2xl lg:text-3xl font-bold text-secondary-900 dark:text-white mb-6 font-primary flex items-center">
                <span className="text-3xl mr-3">🏏</span>
                Our Story
              </h3>
              <p className="text-lg text-secondary-600 dark:text-secondary-300 leading-relaxed font-secondary mb-6">
                At BNIOC, we believe every aspiring cricketer has the potential to achieve greatness. 
                Founded with a vision to revolutionize cricket training in Bengaluru, we've established 
                ourselves as the premier destination for comprehensive cricket education and development.
              </p>
              <p className="text-secondary-600 dark:text-secondary-300 leading-relaxed font-secondary">
                Our journey began with a simple mission: to create an environment where young cricketers 
                can learn, grow, and excel under the guidance of experienced coaches using world-class facilities.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-primary-50 to-accent-50 dark:from-secondary-800 dark:to-secondary-700 rounded-xl p-8 lg:p-10">
              <h3 className="text-2xl lg:text-3xl font-bold text-secondary-900 dark:text-white mb-6 font-primary flex items-center">
                <span className="text-3xl mr-3">🎯</span>
                Our Mission
              </h3>
              <p className="text-lg text-secondary-700 dark:text-secondary-200 leading-relaxed font-secondary mb-6">
                To provide world-class cricket training that combines traditional techniques with modern 
                methodologies, ensuring every student receives personalized attention and develops both 
                technical skills and mental toughness required to excel in competitive cricket.
              </p>
              <p className="text-secondary-700 dark:text-secondary-200 leading-relaxed font-secondary">
                We are committed to nurturing not just skilled cricketers, but well-rounded individuals 
                who embody the spirit of sportsmanship and excellence.
              </p>
            </div>
          </div>

          {/* What Sets Us Apart */}
          <div>
            <h3 className="text-2xl lg:text-3xl font-bold text-secondary-900 dark:text-white mb-12 font-primary text-center flex items-center justify-center">
              <span className="text-3xl mr-3">🌟</span>
              What Sets Us Apart
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white dark:bg-secondary-800 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <i className="fas fa-users text-white text-2xl"></i>
                </div>
                <h4 className="text-xl font-semibold text-secondary-900 dark:text-white mb-3 font-primary">
                  Expert Coaching
                </h4>
                <p className="text-secondary-600 dark:text-secondary-300 font-secondary">
                  Learn from experienced coaches with proven track records in developing successful cricketers.
                </p>
              </div>
              
              <div className="bg-white dark:bg-secondary-800 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <i className="fas fa-trophy text-white text-2xl"></i>
                </div>
                <h4 className="text-xl font-semibold text-secondary-900 dark:text-white mb-3 font-primary">
                  Proven Results
                </h4>
                <p className="text-secondary-600 dark:text-secondary-300 font-secondary">
                  Our students consistently perform well in district, state, and national level competitions.
                </p>
              </div>
              
              <div className="bg-white dark:bg-secondary-800 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <i className="fas fa-cog text-white text-2xl"></i>
                </div>
                <h4 className="text-xl font-semibold text-secondary-900 dark:text-white mb-3 font-primary">
                  Modern Methods
                </h4>
                <p className="text-secondary-600 dark:text-secondary-300 font-secondary">
                  We use cutting-edge training techniques and technology to accelerate skill development.
                </p>
              </div>
              
              <div className="bg-white dark:bg-secondary-800 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <i className="fas fa-heart text-white text-2xl"></i>
                </div>
                <h4 className="text-xl font-semibold text-secondary-900 dark:text-white mb-3 font-primary">
                  Holistic Development
                </h4>
                <p className="text-secondary-600 dark:text-secondary-300 font-secondary">
                  Focus on physical fitness, mental conditioning, and character building alongside cricket skills.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation to Detailed Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white text-center hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-star text-2xl"></i>
            </div>
            <h4 className="text-xl font-bold mb-3 font-primary">Discover Our Advantages</h4>
            <p className="mb-4 opacity-90 font-secondary text-sm">Explore detailed reasons why BNIOC stands out from other cricket academies.</p>
            <a 
              href="/why-choose-us"
              className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg font-semibold transition-all duration-200 text-sm"
            >
              <i className="fas fa-arrow-right"></i>
              Why Choose BNIOC
            </a>
          </div>
          
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white text-center hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-quote-left text-2xl"></i>
            </div>
            <h4 className="text-xl font-bold mb-3 font-primary">Hear From Our Community</h4>
            <p className="mb-4 opacity-90 font-secondary text-sm">Read inspiring success stories from students and parents who chose BNIOC.</p>
            <a 
              href="/testimonials"
              className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg font-semibold transition-all duration-200 text-sm"
            >
              <i className="fas fa-arrow-right"></i>
              Read Success Stories
            </a>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl p-8 lg:p-12 text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 font-primary">
            Ready to Begin Your Cricket Journey?
          </h3>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto font-secondary">
            Join hundreds of successful cricketers who have trained at BNIOC. Experience world-class coaching and facilities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact" 
              className="inline-flex items-center gap-2 bg-white text-primary-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              <i className="fas fa-phone"></i>
              Contact Us Today
            </a>
            <a 
              href="/programs" 
              className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-6 py-3 rounded-lg font-semibold transition-all duration-200"
            >
              <i className="fas fa-eye"></i>
              View Programs
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
