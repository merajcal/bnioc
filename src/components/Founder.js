import React, { useState } from 'react';

const Founder = () => {
  const [lightboxImage, setLightboxImage] = useState(null);
  const [lightboxCaption, setLightboxCaption] = useState('');

  const openLightbox = (imageSrc, caption) => {
    setLightboxImage(imageSrc);
    setLightboxCaption(caption);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    setLightboxCaption('');
  };

  // Experience images data
  const experienceImages = [
    { src: "/assets/images/coach-with-i8n-players/with-bumrah.jpeg", caption: "Elite Training Session" },
    { src: "/assets/images/coach-with-i8n-players/with-gaikwad.jpeg", caption: "Professional Coaching" },
    { src: "/assets/images/coach-with-i8n-players/with-ishan-kishan.jpeg", caption: "Elite Level Training" },
    { src: "/assets/images/coach-with-i8n-players/with-shami.jpeg", caption: "High Performance Coaching" },
    { src: "/assets/images/coach-with-i8n-players/with-mulitpl-1.jpeg", caption: "Team Training Sessions" },
    { src: "/assets/images/coach-with-i8n-players/with-washinton.jpeg", caption: "Professional Development" },
    { src: "/assets/images/coach-with-i8n-players/with-shyrash.jpeg", caption: "Elite Coaching Experience" },
    { src: "/assets/images/coach-with-i8n-players/with-newzeland.jpeg", caption: "International Exposure" },
    { src: "/assets/images/coach-with-i8n-players/with-ishan-kishan-2.jpeg", caption: "Advanced Training Methods" },
    { src: "/assets/images/coach-with-i8n-players/with-laxman-sir.jpeg", caption: "Mentorship & Learning" }
  ];

  return (
    <section id="founder" className="py-8 lg:py-12 bg-gradient-to-br from-gray-50 via-white to-primary-50 dark:from-secondary-900 dark:via-secondary-800 dark:to-secondary-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Compact Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 dark:text-white mb-3 font-primary">
            Meet Our <span className="text-primary-500">Founder</span>
          </h2>
          <p className="text-lg text-secondary-600 dark:text-secondary-300 max-w-3xl mx-auto font-secondary">
            Visionary leadership and elite coaching expertise driving cricket excellence
          </p>
        </div>

        {/* Optimized Profile & Complete Message Section */}
        <div className="mb-10">
          <div className="bg-white dark:bg-secondary-800 rounded-2xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
              
              {/* Profile Side - Rectangle Layout */}
              <div className="lg:col-span-1 bg-gradient-to-br from-primary-500 to-accent-500 p-0 flex flex-col">
                {/* Large Rectangle Profile Image */}
                <div className="relative flex-1 min-h-[200px]">
                  <img 
                    src="/assets/images/coaches/head_coach.png" 
                    alt="Kamal Sharma - Founder & Head Coach"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Name & Title Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-lg font-bold font-primary">Kamal Sharma</h3>
                    <p className="text-white/90 text-sm font-semibold">Founder & Head Coach</p>
                  </div>
                  
                  {/* Crown Badge */}
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full">
                    <i className="fas fa-crown text-sm"></i>
                  </div>
                </div>
                
                {/* Stats at Bottom */}
           
              </div>
              
              {/* Complete Message Side */}
              <div className="lg:col-span-2 p-6">
                <div className="space-y-4">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center mr-3">
                      <i className="fas fa-quote-left text-white text-sm"></i>
                    </div>
                    <h4 className="text-xl font-bold text-secondary-900 dark:text-white font-primary">A Message from Our Founder</h4>
                  </div>
                  
                  <div className="space-y-4 text-secondary-700 dark:text-secondary-200">
                    <div className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-secondary-700 dark:to-secondary-600 p-4 rounded-lg border-l-4 border-primary-500">
                      <p className="text-sm leading-relaxed">
                        "Cricket is not just a game; it's a journey of self-discovery, discipline, and determination. When I founded BNIOC, my vision was simple yet ambitious - to create a nurturing environment where young cricketers could flourish and reach their full potential."
                      </p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-accent-50 to-primary-50 dark:from-secondary-600 dark:to-secondary-700 p-4 rounded-lg border-l-4 border-accent-500">
                      <p className="text-sm leading-relaxed">
                        "At BNIOC, we don't just teach cricket - we engineer success stories. Every student who walks through our doors embarks on a transformational journey where raw talent meets world-class methodology, where dreams meet reality, and where potential becomes performance."
                      </p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-secondary-700 dark:to-secondary-600 p-4 rounded-lg border-l-4 border-primary-500">
                      <p className="text-sm leading-relaxed">
                        "Whether you're a beginner taking your first swing or an aspiring professional seeking that competitive edge, BNIOC is your gateway to cricket excellence. We combine cutting-edge training techniques, personalized mentorship, and a winning mindset to create the next generation of cricket superstars."
                      </p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-primary-500 to-accent-500 text-white p-4 rounded-lg shadow-lg">
                      <p className="text-sm font-semibold leading-relaxed">
                        "Join the BNIOC family and discover what it truly means to play cricket at the highest level. Together, we'll unlock your potential, exceed your expectations, and write your success story in the annals of cricket history!"
                      </p>
                    </div>
                  </div>
                  
                  {/* Credentials & Signature */}
                  <div className="pt-4 border-t border-gray-200 dark:border-secondary-700">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-3 py-1 rounded-full text-xs">
                        <i className="fas fa-graduation-cap mr-1"></i>Certified Coach
                      </span>
                      <span className="bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-3 py-1 rounded-full text-xs">
                        <i className="fas fa-medal mr-1"></i>Former State Player
                      </span>
                      <span className="bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-3 py-1 rounded-full text-xs">
                        <i className="fas fa-trophy mr-1"></i>Elite Training Expert
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-secondary-900 dark:text-white text-sm">- Kamal Sharma</p>
                      <p className="text-xs text-secondary-600 dark:text-secondary-400">Founder & Head Coach, BNIOC</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Compact Professional Experience Gallery */}
        <div className="mb-8">
          <div className="bg-white dark:bg-secondary-800 rounded-2xl shadow-lg p-6 border border-primary-100 dark:border-secondary-700">
            
            {/* Compact Gallery Header */}
            <div className="text-center mb-6">
              <div className="flex items-center justify-center mb-3">
                <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center mr-3">
                  <i className="fas fa-camera text-white text-sm"></i>
                </div>
                <h4 className="text-2xl font-bold text-secondary-900 dark:text-white font-primary">
                  Professional <span className="text-primary-500">Experience</span>
                </h4>
              </div>
              <p className="text-sm text-secondary-600 dark:text-secondary-300 max-w-2xl mx-auto">
                Elite cricket training experience with India's finest cricketers at premier facilities
              </p>
            </div>
              
              {/* Experience Gallery Grid */}
              <div className="relative">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
                  {experienceImages.map((image, index) => (
                    <div 
                      key={index}
                      className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2"
                      onClick={() => openLightbox(image.src, image.caption)}
                    >
                      {/* Image Container */}
                      <div className="relative aspect-square">
                        <img 
                          src={image.src}
                          alt="Coach Kamal - Professional Training Experience"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        {/* Caption */}
                        <div className="absolute bottom-3 left-3 right-3 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                          <p className="text-sm font-semibold leading-tight">{image.caption}</p>
                        </div>
                        
                        {/* Click indicator */}
                        <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                          <i className="fas fa-expand text-white text-sm"></i>
                        </div>
                        
                        {/* Border Glow Effect */}
                        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary-400/50 transition-colors duration-300"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            
            {/* Experience Highlights */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-secondary-800 dark:to-secondary-700 rounded-xl">
                <i className="fas fa-users text-primary-500 text-3xl mb-3"></i>
                <h5 className="text-lg font-bold text-secondary-900 dark:text-white mb-2">Elite Training Environment</h5>
                <p className="text-sm text-secondary-600 dark:text-secondary-300">Experience working with top-level cricketers in professional training facilities</p>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-secondary-800 dark:to-secondary-700 rounded-xl">
                <i className="fas fa-globe text-primary-500 text-3xl mb-3"></i>
                <h5 className="text-lg font-bold text-secondary-900 dark:text-white mb-2">International Exposure</h5>
                <p className="text-sm text-secondary-600 dark:text-secondary-300">Coaching experience with international players and diverse cricket cultures</p>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-secondary-800 dark:to-secondary-700 rounded-xl">
                <i className="fas fa-trophy text-primary-500 text-3xl mb-3"></i>
                <h5 className="text-lg font-bold text-secondary-900 dark:text-white mb-2">Professional Standards</h5>
                <p className="text-sm text-secondary-600 dark:text-secondary-300">Bringing elite-level training methodologies to BNIOC students</p>
              </div>
            </div>
          </div>
        </div>

        {/* Compact Achievements Section */}
        <div className="mt-8">
          
          {/* Compact Legacy of Excellence */}
          <div className="bg-white dark:bg-secondary-900 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-center mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center mr-3">
                <i className="fas fa-trophy text-white text-sm"></i>
              </div>
              <h4 className="text-xl font-bold text-secondary-900 dark:text-white font-primary">
                Legacy of Excellence
              </h4>
            </div>
            
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
                  <p className="text-secondary-600 dark:text-secondary-300 text-sm">Mentored 20+ players to State, National & International levels</p>
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
          
          {/* Compact Vision Section */}
          <div className="bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl p-6 text-white mt-6">
            <div className="flex items-center justify-center mb-4">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                <i className="fas fa-target text-white text-sm"></i>
              </div>
              <h4 className="text-lg font-bold font-primary">The BNIOC Vision</h4>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                <i className="fas fa-lightbulb text-2xl mb-2"></i>
                <h5 className="text-sm font-semibold mb-1">Innovation</h5>
                <p className="text-xs opacity-90">Cutting-edge methods</p>
              </div>
              
              <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                <i className="fas fa-heart text-2xl mb-2"></i>
                <h5 className="text-sm font-semibold mb-1">Passion</h5>
                <p className="text-xs opacity-90">Love for cricket</p>
              </div>
              
              <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                <i className="fas fa-target text-2xl mb-2"></i>
                <h5 className="text-sm font-semibold mb-1">Excellence</h5>
                <p className="text-xs opacity-90">Pursuing perfection</p>
              </div>
              
              <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                <i className="fas fa-handshake text-2xl mb-2"></i>
                <h5 className="text-sm font-semibold mb-1">Community</h5>
                <p className="text-xs opacity-90">Building relationships</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>


      {/* Lightbox Modal */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div className="relative max-w-4xl max-h-full">
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-white hover:text-primary-400 transition-colors duration-200 z-10"
            >
              <i className="fas fa-times text-2xl"></i>
            </button>
            
            {/* Image */}
            <img
              src={lightboxImage}
              alt="Coach Kamal - Professional Training Experience"
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            
            {/* Caption */}
            {lightboxCaption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                <p className="text-white text-center font-medium text-lg">
                  {lightboxCaption}
                </p>
                <p className="text-white/80 text-center text-sm mt-1">
                  Coach Kamal - Professional Training Experience
                </p>
              </div>
            )}
            
            {/* Navigation hint */}
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white/60 text-sm">
              <i className="fas fa-mouse-pointer mr-2"></i>
              Click outside to close
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Founder;
