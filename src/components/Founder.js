import React from 'react';

const Founder = () => {
  return (
    <section id="founder" className="py-16 lg:py-24 bg-gray-50 dark:bg-secondary-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-900 dark:text-white mb-4 font-primary">
            Meet Our Founder
          </h2>
          <p className="text-lg md:text-xl text-secondary-600 dark:text-secondary-300 max-w-3xl mx-auto font-secondary">
            Visionary leadership driving cricket excellence
          </p>
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          
          {/* Founder Image */}
          <div className="lg:col-span-1">
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img 
                  src="/assets/images/coaches/head_coach.png" 
                  alt="Kamal Sharma - Founder & Head Coach"
                  className="w-full h-96 lg:h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              
              {/* Founder Badge */}
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                <div className="bg-primary-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center space-x-2">
                  <i className="fas fa-award text-lg"></i>
                  <span className="font-semibold">Founder & Head Coach</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Founder Info */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Header */}
            <div className="text-center lg:text-left mt-8 lg:mt-0">
              <h3 className="text-3xl md:text-4xl font-bold text-secondary-900 dark:text-white mb-2 font-primary">
                Kamal Sharma
              </h3>
              <p className="text-xl text-primary-500 mb-6 font-secondary">
                Founder & Head Coach
              </p>
              
              {/* Credentials */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <div className="flex items-center space-x-2 bg-white dark:bg-secondary-700 px-4 py-2 rounded-full shadow-md">
                  <i className="fas fa-graduation-cap text-primary-500"></i>
                  <span className="text-sm font-medium text-secondary-700 dark:text-secondary-200">Cricket Coaching Certification</span>
                </div>
                <div className="flex items-center space-x-2 bg-white dark:bg-secondary-700 px-4 py-2 rounded-full shadow-md">
                  <i className="fas fa-medal text-primary-500"></i>
                  <span className="text-sm font-medium text-secondary-700 dark:text-secondary-200">Former District Player</span>
                </div>
                <div className="flex items-center space-x-2 bg-white dark:bg-secondary-700 px-4 py-2 rounded-full shadow-md">
                  <i className="fas fa-star text-primary-500"></i>
                  <span className="text-sm font-medium text-secondary-700 dark:text-secondary-200">15+ Years Experience</span>
                </div>
              </div>
            </div>
            
            {/* Message */}
            <div className="bg-white dark:bg-secondary-900 rounded-2xl p-8 shadow-lg">
              <h4 className="text-2xl font-bold text-secondary-900 dark:text-white mb-6 font-primary flex items-center">
                <span className="text-2xl mr-3">💬</span>
                A Message from Our Founder
              </h4>
              
              <div className="space-y-4 text-secondary-600 dark:text-secondary-300 font-secondary">
                <p className="leading-relaxed">
                  "Cricket is not just a game; it's a journey of self-discovery, discipline, and determination. When I founded BNIOC, my vision was simple yet ambitious - to create a nurturing environment where young cricketers could flourish and reach their full potential."
                </p>
                <p className="leading-relaxed">
                  "At BNIOC, we don't just teach cricket - we engineer success stories. Every student who walks through our doors embarks on a transformational journey where raw talent meets world-class methodology, where dreams meet reality, and where potential becomes performance."
                </p>
                <p className="leading-relaxed">
                  "Whether you're a beginner taking your first swing or an aspiring professional seeking that competitive edge, BNIOC is your gateway to cricket excellence. We combine cutting-edge training techniques, personalized mentorship, and a winning mindset to create the next generation of cricket superstars."
                </p>
                <p className="leading-relaxed font-semibold text-primary-600 dark:text-primary-400">
                  "Join the BNIOC family and discover what it truly means to play cricket at the highest level. Together, we'll unlock your potential, exceed your expectations, and write your success story in the annals of cricket history!"
                </p>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-secondary-700">
                <div className="text-right">
                  <p className="font-bold text-secondary-900 dark:text-white">- Kamal Sharma</p>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">Founder & Head Coach, BNIOC</p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
        
        {/* Achievements Section */}
        <div className="mt-16 space-y-12">
          
          {/* Legacy of Excellence */}
          <div className="bg-white dark:bg-secondary-900 rounded-2xl p-8 lg:p-12 shadow-lg">
            <h4 className="text-2xl md:text-3xl font-bold text-secondary-900 dark:text-white mb-8 font-primary text-center flex items-center justify-center">
              <span className="text-3xl mr-3">🏆</span>
              Legacy of Excellence
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-secondary-800 dark:to-secondary-700 rounded-xl">
                <i className="fas fa-star text-primary-500 text-xl mt-1 flex-shrink-0"></i>
                <div>
                  <span className="font-bold text-secondary-900 dark:text-white">15+ Years</span>
                  <p className="text-secondary-600 dark:text-secondary-300 text-sm">of elite coaching mastery with A-grade cricketers</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-secondary-800 dark:to-secondary-700 rounded-xl">
                <i className="fas fa-trophy text-primary-500 text-xl mt-1 flex-shrink-0"></i>
                <div>
                  <span className="font-bold text-secondary-900 dark:text-white">Champion Maker:</span>
                  <p className="text-secondary-600 dark:text-secondary-300 text-sm">Mentored 50+ players to State, National & International levels</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-secondary-800 dark:to-secondary-700 rounded-xl">
                <i className="fas fa-rocket text-primary-500 text-xl mt-1 flex-shrink-0"></i>
                <div>
                  <span className="font-bold text-secondary-900 dark:text-white">Innovation Pioneer:</span>
                  <p className="text-secondary-600 dark:text-secondary-300 text-sm">Revolutionary training methodologies that guarantee results</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-secondary-800 dark:to-secondary-700 rounded-xl">
                <i className="fas fa-brain text-primary-500 text-xl mt-1 flex-shrink-0"></i>
                <div>
                  <span className="font-bold text-secondary-900 dark:text-white">Holistic Approach:</span>
                  <p className="text-secondary-600 dark:text-secondary-300 text-sm">Technical brilliance + Mental toughness + Physical excellence</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-secondary-800 dark:to-secondary-700 rounded-xl">
                <i className="fas fa-medal text-primary-500 text-xl mt-1 flex-shrink-0"></i>
                <div>
                  <span className="font-bold text-secondary-900 dark:text-white">Success Rate:</span>
                  <p className="text-secondary-600 dark:text-secondary-300 text-sm">95% of students achieve their cricket goals within 12 months</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-secondary-800 dark:to-secondary-700 rounded-xl">
                <i className="fas fa-users text-primary-500 text-xl mt-1 flex-shrink-0"></i>
                <div>
                  <span className="font-bold text-secondary-900 dark:text-white">Community Builder:</span>
                  <p className="text-secondary-600 dark:text-secondary-300 text-sm">Created India's most supportive cricket development ecosystem</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Vision Section */}
          <div className="bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl p-8 lg:p-12 text-white">
            <h4 className="text-2xl md:text-3xl font-bold mb-8 font-primary text-center flex items-center justify-center">
              <span className="text-3xl mr-3">🎯</span>
              The BNIOC Vision
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl">
                <i className="fas fa-lightbulb text-4xl mb-4"></i>
                <h5 className="text-xl font-semibold mb-2 font-primary">Innovation</h5>
                <p className="text-sm opacity-90 font-secondary">Cutting-edge training methods that stay ahead of the game</p>
              </div>
              
              <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl">
                <i className="fas fa-heart text-4xl mb-4"></i>
                <h5 className="text-xl font-semibold mb-2 font-primary">Passion</h5>
                <p className="text-sm opacity-90 font-secondary">Instilling love for cricket while building character and discipline</p>
              </div>
              
              <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl">
                <i className="fas fa-target text-4xl mb-4"></i>
                <h5 className="text-xl font-semibold mb-2 font-primary">Excellence</h5>
                <p className="text-sm opacity-90 font-secondary">Pursuing perfection in every aspect of cricket development</p>
              </div>
              
              <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl">
                <i className="fas fa-handshake text-4xl mb-4"></i>
                <h5 className="text-xl font-semibold mb-2 font-primary">Community</h5>
                <p className="text-sm opacity-90 font-secondary">Building lasting relationships and supporting each other's growth</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Founder;
