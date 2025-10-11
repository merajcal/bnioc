import React, { useState } from 'react';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Shashank",
      role: "Youth Player",
      age: "16 years",
      message: "The summer camp was fantastic! I learned so many new techniques and had fun while doing it. The coaches are really supportive, and the drills were spot on!",
      rating: 5,
      achievement: "District Level Player",
      avatar: "S"
    },
    {
      id: 2,
      name: "Ramakant",
      role: "Parent",
      age: "Father of Arjun",
      message: "BNIOC has excellent facilities and coaching staff. My son has improved tremendously in his batting and bowling skills. Highly recommend for serious cricket training.",
      rating: 5,
      achievement: "Son selected for State Team",
      avatar: "R"
    },
    {
      id: 3,
      name: "Ravikant",
      role: "Academy Student",
      age: "18 years",
      message: "The individual coaching sessions helped me work on my specific weaknesses. The personalized attention and expert guidance made a huge difference in my game.",
      rating: 5,
      achievement: "College Team Captain",
      avatar: "R"
    },
    {
      id: 4,
      name: "Priya Sharma",
      role: "Parent",
      age: "Mother of Kavya",
      message: "My daughter has gained so much confidence since joining BNIOC. The coaches focus on both technical skills and mental strength. Excellent academy!",
      rating: 5,
      achievement: "Daughter in School Team",
      avatar: "P"
    },
    {
      id: 5,
      name: "Arjun Kumar",
      role: "Advanced Student",
      age: "17 years",
      message: "The tournament preparation and match experience at BNIOC is unmatched. I've won 3 tournaments this year thanks to their training methodology.",
      rating: 5,
      achievement: "3 Tournament Winner",
      avatar: "A"
    },
    {
      id: 6,
      name: "Meera Patel",
      role: "Weekend Student",
      age: "14 years",
      message: "Even with weekend classes, I've improved so much! The coaches make every session count and the facilities are world-class.",
      rating: 5,
      achievement: "School Cricket Star",
      avatar: "M"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-16 lg:py-24 bg-white dark:bg-secondary-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-900 dark:text-white mb-4 font-primary">
            Student Success Stories
          </h2>
          <p className="text-lg md:text-xl text-secondary-600 dark:text-secondary-300 max-w-3xl mx-auto font-secondary">
            Hear from our students and parents about their transformative journey at BNIOC
          </p>
        </div>

        {/* Featured Testimonial */}
        <div className="mb-16">
          <div className="bg-gradient-to-br from-primary-50 to-accent-50 dark:from-secondary-800 dark:to-secondary-700 rounded-2xl p-8 lg:p-12 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
              <i className="fas fa-quote-right text-8xl text-primary-500"></i>
            </div>
            
            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 bg-primary-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    {testimonials[currentTestimonial].avatar}
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="mb-4">
                    <i className="fas fa-quote-left text-3xl text-primary-500 mb-4"></i>
                  </div>
                  
                  <p className="text-xl md:text-2xl text-secondary-700 dark:text-secondary-200 leading-relaxed mb-6 font-secondary italic">
                    "{testimonials[currentTestimonial].message}"
                  </p>
                  
                  {/* Rating */}
                  <div className="flex justify-center lg:justify-start gap-1 mb-4">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, index) => (
                      <i key={index} className="fas fa-star text-yellow-400 text-lg"></i>
                    ))}
                  </div>
                  
                  {/* Author Info */}
                  <div>
                    <h4 className="text-xl font-bold text-secondary-900 dark:text-white font-primary">
                      {testimonials[currentTestimonial].name}
                    </h4>
                    <p className="text-secondary-600 dark:text-secondary-300 font-secondary">
                      {testimonials[currentTestimonial].role} • {testimonials[currentTestimonial].age}
                    </p>
                    <div className="mt-2 inline-flex items-center gap-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-3 py-1 rounded-full text-sm font-semibold">
                      <i className="fas fa-trophy"></i>
                      {testimonials[currentTestimonial].achievement}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Navigation */}
              <div className="flex items-center justify-center lg:justify-end gap-4 mt-8">
                <button
                  onClick={prevTestimonial}
                  className="w-12 h-12 bg-white dark:bg-secondary-800 rounded-full flex items-center justify-center text-secondary-600 dark:text-secondary-300 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200 shadow-lg"
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-200 ${
                        index === currentTestimonial
                          ? 'bg-primary-500 w-8'
                          : 'bg-secondary-300 dark:bg-secondary-600 hover:bg-primary-300 dark:hover:bg-primary-700'
                      }`}
                    />
                  ))}
                </div>
                
                <button
                  onClick={nextTestimonial}
                  className="w-12 h-12 bg-white dark:bg-secondary-800 rounded-full flex items-center justify-center text-secondary-600 dark:text-secondary-300 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200 shadow-lg"
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.slice(0, 6).map((testimonial, index) => (
            <div 
              key={testimonial.id} 
              className={`bg-gray-50 dark:bg-secondary-800 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${
                index === currentTestimonial ? 'ring-2 ring-primary-500 bg-primary-50 dark:bg-primary-900/20' : ''
              }`}
            >
              {/* Quote Icon */}
              <div className="mb-4">
                <i className="fas fa-quote-left text-2xl text-primary-500"></i>
              </div>
              
              {/* Message */}
              <p className="text-secondary-600 dark:text-secondary-300 leading-relaxed mb-4 font-secondary">
                "{testimonial.message}"
              </p>
              
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, starIndex) => (
                  <i key={starIndex} className="fas fa-star text-yellow-400 text-sm"></i>
                ))}
              </div>
              
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-secondary-900 dark:text-white font-primary">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-secondary-500 dark:text-secondary-400 font-secondary">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl p-8 lg:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 font-primary">
              Ready to Write Your Success Story?
            </h3>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto font-secondary">
              Join our community of successful cricketers and experience the BNIOC difference. Your journey to cricket excellence starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact" 
                className="inline-flex items-center gap-2 bg-white text-primary-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                <i className="fas fa-rocket"></i>
                Start Your Journey
              </a>
              <a 
                href="/programs" 
                className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-6 py-3 rounded-lg font-semibold transition-all duration-200"
              >
                <i className="fas fa-info-circle"></i>
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
