import React from 'react';

const Programs = () => {
  const programs = [
    {
      id: 1,
      name: "Weekend Warriors",
      schedule: "Saturdays & Sundays",
      description: "Perfect for school students who want to learn cricket fundamentals while maintaining their academic schedule.",
      features: [
        "Basic batting and bowling techniques",
        "Fielding skills development",
        "Match simulation games",
        "Physical fitness training",
        "Equipment provided"
      ],
      popular: false,
      icon: "fas fa-calendar-week"
    },
    {
      id: 2,
      name: "Night Owls",
      schedule: "Weekday Evenings",
      description: "Designed for working professionals and college students who can only train in the evenings.",
      features: [
        "Advanced technique refinement",
        "Floodlight training sessions",
        "Competitive match practice",
        "Video analysis sessions",
        "Flexible timing options"
      ],
      popular: false,
      icon: "fas fa-moon"
    },
    {
      id: 3,
      name: "Daily Champions",
      schedule: "Monday to Friday",
      description: "Comprehensive daily training program for serious cricket aspirants aiming for competitive cricket.",
      features: [
        "Intensive training sessions",
        "Specialized coaching for each skill",
        "Mental conditioning program",
        "Nutrition guidance",
        "Tournament preparation"
      ],
      popular: false,
      icon: "fas fa-trophy"
    },
    {
      id: 4,
      name: "Focused Training",
      schedule: "Flexible",
      description: "One-on-one personalized coaching sessions to work on specific skills and techniques.",
      features: [
        "Individual attention",
        "Customized training plans",
        "Immediate feedback",
        "Flexible scheduling",
        "Rapid skill improvement"
      ],
      popular: false,
      icon: "fas fa-user"
    },
    {
      id: 5,
      name: "Summer Camp",
      schedule: "Summer Intensive",
      description: "Our flagship summer camp program offering the most comprehensive cricket training experience.",
      features: [
        "Intensive training program",
        "Professional coaching staff",
        "Daily match practice",
        "Fitness and conditioning",
        "Certificate of completion",
        "Performance assessment"
      ],
      popular: true,
      icon: "fas fa-sun"
    },
    {
      id: 6,
      name: "Elite Academy",
      schedule: "Year-round",
      description: "Premium annual program for serious cricketers aiming for state and national level competitions.",
      features: [
        "Year-round comprehensive training",
        "Advanced technique development",
        "Mental conditioning coach",
        "Nutrition and fitness program",
        "Tournament participation",
        "Career guidance and mentorship"
      ],
      popular: false,
      premium: true,
      icon: "fas fa-crown"
    }
  ];

  return (
    <section id="programs" className="py-16 lg:py-24 bg-white dark:bg-secondary-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-900 dark:text-white mb-4 font-primary">
            Training Programs
          </h2>
          <p className="text-lg md:text-xl text-secondary-600 dark:text-secondary-300 max-w-3xl mx-auto font-secondary">
            Choose the perfect program to elevate your cricket journey
          </p>
        </div>
        
        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program) => (
            <div 
              key={program.id} 
              className={`relative bg-white dark:bg-secondary-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden ${
                program.popular ? 'ring-2 ring-primary-500' : ''
              } ${program.premium ? 'bg-gradient-to-br from-accent-50 to-primary-50 dark:from-secondary-700 dark:to-secondary-600' : ''}`}
            >
              {/* Popular Badge */}
              {program.popular && (
                <div className="absolute top-4 right-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
                  Most Popular
                </div>
              )}
              
              {/* Premium Badge */}
              {program.premium && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-accent-500 to-primary-500 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
                  Premium
                </div>
              )}
              
              {/* Program Header */}
              <div className="p-6 pb-4">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center mr-4">
                    <i className={`${program.icon} text-white text-xl`}></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-secondary-900 dark:text-white font-primary">
                      {program.name}
                    </h3>
                    <div className="flex items-center text-secondary-600 dark:text-secondary-300 text-sm">
                      <i className="fas fa-calendar-alt mr-2"></i>
                      {program.schedule}
                    </div>
                  </div>
                </div>
                
                <p className="text-secondary-600 dark:text-secondary-300 leading-relaxed font-secondary">
                  {program.description}
                </p>
              </div>
              
              {/* Program Features */}
              <div className="px-6 pb-6">
                <h4 className="text-lg font-semibold text-secondary-900 dark:text-white mb-3 font-primary">
                  What's Included:
                </h4>
                <ul className="space-y-2">
                  {program.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <i className="fas fa-check text-primary-500 mr-3 mt-1 flex-shrink-0"></i>
                      <span className="text-secondary-600 dark:text-secondary-300 font-secondary">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Program Footer */}
              <div className="px-6 pb-6 pt-2 border-t border-gray-200 dark:border-secondary-700">
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="btn-primary flex-1 text-center">
                    Enroll Now
                  </button>
                  <button className="btn-secondary flex-1 text-center">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Help Section */}
        <div className="mt-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl p-8 lg:p-12 text-white text-center">
          <h4 className="text-2xl md:text-3xl font-bold mb-4 font-primary flex items-center justify-center">
            <span className="text-3xl mr-3">📞</span>
            Need Help Choosing?
          </h4>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto font-secondary">
            Our expert counselors are here to help you select the perfect program based on your goals and availability.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="https://wa.me/918881113107" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-6 py-3 rounded-full transition-all duration-300 hover:scale-105"
            >
              <i className="fab fa-whatsapp text-lg"></i>
              <span className="font-semibold">WhatsApp: +91 88811 13107</span>
            </a>
            <a 
              href="https://instagram.com/bnioc_cricket" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-6 py-3 rounded-full transition-all duration-300 hover:scale-105"
            >
              <i className="fab fa-instagram text-lg"></i>
              <span className="font-semibold">Follow Us on Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Programs;
