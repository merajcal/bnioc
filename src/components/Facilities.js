import React from 'react';

const Facilities = () => {
  const facilities = [
    {
      id: 1,
      icon: "fas fa-baseball-ball",
      title: "International Standard Turf Pitches",
      description: "5 professional-grade turf pitches that meet international cricket standards for authentic match experience and professional training.",
      featured: true
    },
    {
      id: 2,
      icon: "fas fa-map-marked-alt",
      title: "Match Grounds & Practice Areas",
      description: "Comprehensive cricket infrastructure featuring dedicated internal match ground for academy tournaments, premium external match ground for inter-academy competitions, and spacious open nets practice area with multiple batting and bowling lanes for skill development."
    },
    {
      id: 3,
      icon: "fas fa-lightbulb",
      title: "Floodlight Training",
      description: "State-of-the-art LED floodlights enable evening and night training sessions for maximum flexibility and extended practice hours."
    },
    {
      id: 4,
      icon: "fas fa-dumbbell",
      title: "Fitness Center",
      description: "Fully equipped gymnasium with modern fitness equipment designed specifically for cricket conditioning and strength training."
    },
    {
      id: 5,
      icon: "fas fa-video",
      title: "Video Analysis Center",
      description: "Advanced video analysis equipment for technical skill development, performance review, and strategic improvement sessions."
    },
    {
      id: 6,
      icon: "fas fa-shield-alt",
      title: "Secure Parking",
      description: "Spacious parking facility for cars and two-wheelers with 24/7 security surveillance and covered parking options."
    }
  ];

  const stats = [
    { number: "5", label: "Turf Pitches" },
    { number: "2", label: "Match Grounds" },
    { number: "24/7", label: "Security" },
    { number: "100+", label: "Parking Spots" }
  ];

  return (
    <section id="facilities" className="py-16 lg:py-24 bg-gray-50 dark:bg-secondary-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-900 dark:text-white mb-4 font-primary">
            World-Class Facilities
          </h2>
          <p className="text-lg md:text-xl text-secondary-600 dark:text-secondary-300 max-w-3xl mx-auto font-secondary">
            Train with the best equipment and infrastructure
          </p>
        </div>
        
        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {facilities.map((facility) => (
            <div 
              key={facility.id}
              className={`group relative bg-white dark:bg-secondary-900 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                facility.featured ? 'ring-2 ring-primary-500 lg:scale-105' : ''
              }`}
            >
              {facility.featured && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Featured
                  </div>
                </div>
              )}
              
              <div className="text-center">
                <div className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                  facility.featured 
                    ? 'bg-gradient-to-r from-primary-500 to-accent-500' 
                    : 'bg-primary-500 group-hover:bg-primary-600'
                }`}>
                  <i className={`${facility.icon} text-white text-2xl`}></i>
                </div>
                
                <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-4 font-primary">
                  {facility.title}
                </h3>
                
                <p className="text-secondary-600 dark:text-secondary-300 leading-relaxed font-secondary">
                  {facility.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Statistics Section */}
        <div className="bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl p-8 lg:p-12 text-white">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 font-primary">
              Our Facilities by Numbers
            </h3>
            <p className="text-lg opacity-90 font-secondary">
              Impressive infrastructure that speaks for itself
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold mb-2 font-primary">
                  {stat.number}
                </div>
                <div className="text-sm lg:text-base opacity-90 font-secondary">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-white dark:bg-secondary-900 rounded-2xl p-8 lg:p-12 shadow-lg">
            <h3 className="text-2xl md:text-3xl font-bold text-secondary-900 dark:text-white mb-4 font-primary">
              Experience Our Facilities
            </h3>
            <p className="text-lg text-secondary-600 dark:text-secondary-300 mb-8 max-w-2xl mx-auto font-secondary">
              Visit our academy to see these world-class facilities in person and understand why BNIOC is the preferred choice for serious cricket training.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact" 
                className="btn-primary"
              >
                Schedule a Visit
              </a>
              <a 
                href="https://wa.me/918881113107" 
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <i className="fab fa-whatsapp mr-2"></i>
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Facilities;
