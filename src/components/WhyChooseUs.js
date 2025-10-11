import React, { useState } from 'react';

const WhyChooseUs = () => {
  const [activeAccordion, setActiveAccordion] = useState(0); // Start with first item open

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const accordionItems = [
    {
      title: "Proven Track Record",
      icon: "fas fa-trophy",
      content: "With over 15 years of experience, we have successfully trained 500+ students who have gone on to represent their schools, colleges, and clubs at various levels. Our alumni have achieved remarkable success in district and state-level competitions.",
      color: "text-yellow-500"
    },
    {
      title: "Expert Coaching Staff",
      icon: "fas fa-user-tie",
      content: "Learn from coaches who have worked with elite-level cricketers. Our experienced coaching staff is passionate about the game and dedicated to helping you achieve your goals.",
      color: "text-blue-500"
    },
    {
      title: "World-Class Infrastructure",
      icon: "fas fa-building",
      content: "Train on 5 international standard turf pitches with modern facilities including floodlights, fitness center, and professional-grade equipment. Our infrastructure meets international cricket standards.",
      color: "text-green-500"
    },
    {
      title: "Personalized Development",
      icon: "fas fa-chart-line",
      content: "Every student receives individual attention with customized training programs. We focus on identifying and developing each player's unique strengths while addressing areas for improvement.",
      color: "text-purple-500"
    },
    {
      title: "Comprehensive Programs",
      icon: "fas fa-bullseye",
      content: "From beginner-friendly weekend programs to intensive summer camps and individual coaching, we offer flexible training options to suit every schedule and skill level.",
      color: "text-red-500"
    },
    {
      title: "Tournament Opportunities",
      icon: "fas fa-medal",
      content: "Regular participation in local and state-level tournaments provides real match experience. We organize internal competitions and help students participate in external tournaments to build competitive skills.",
      color: "text-indigo-500"
    }
  ];

  return (
    <section id="why-choose-us" className="py-16 lg:py-24 bg-gray-50 dark:bg-secondary-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-900 dark:text-white mb-4 font-primary">
            Why Choose BNIOC?
          </h2>
          <p className="text-lg md:text-xl text-secondary-600 dark:text-secondary-300 max-w-3xl mx-auto font-secondary">
            Discover what makes BNIOC the premier choice for cricket training in Bengaluru
          </p>
        </div>

        {/* Accordion Container */}
        <div className="max-w-4xl mx-auto space-y-4">
          {accordionItems.map((item, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-secondary-900 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              {/* Accordion Header */}
              <div 
                className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-secondary-800 transition-colors duration-200"
                onClick={() => toggleAccordion(index)}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full bg-opacity-10 flex items-center justify-center ${item.color} bg-current`}>
                    <i className={`${item.icon} text-xl ${item.color}`}></i>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-secondary-900 dark:text-white font-primary">
                    {item.title}
                  </h3>
                </div>
                <div className={`transform transition-transform duration-300 ${activeAccordion === index ? 'rotate-180' : ''}`}>
                  <i className="fas fa-chevron-down text-secondary-500 dark:text-secondary-400"></i>
                </div>
              </div>

              {/* Accordion Content */}
              <div className={`overflow-hidden transition-all duration-300 ${
                activeAccordion === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="px-6 pb-6">
                  <div className="pl-16">
                    <p className="text-secondary-600 dark:text-secondary-300 leading-relaxed font-secondary">
                      {item.content}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl p-8 lg:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 font-primary">
              Ready to Start Your Cricket Journey?
            </h3>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto font-secondary">
              Join hundreds of successful cricketers who have trained at BNIOC. Experience the difference that quality coaching and world-class facilities can make.
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
      </div>
    </section>
  );
};

export default WhyChooseUs;
