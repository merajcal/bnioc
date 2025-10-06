import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Shashank",
      role: "Youth Player",
      message: "The summer camp was fantastic! I learned so many new techniques and had fun while doing it. The coaches are really supportive, and the drills were spot on!",
      rating: 5
    },
    {
      id: 2,
      name: "Ramakant",
      role: "Parent",
      message: "BNIOC has excellent facilities and coaching staff. My son has improved tremendously in his batting and bowling skills. Highly recommend for serious cricket training.",
      rating: 5
    },
    {
      id: 3,
      name: "Ravikant",
      role: "Academy Student",
      message: "The individual coaching sessions helped me work on my specific weaknesses. The personalized attention and expert guidance made a huge difference in my game.",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="testimonials">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Testimonials</h2>
          <p className="section-subtitle">What our students and parents say about us</p>
        </div>
        
        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-content">
                <div className="quote-icon">
                  <i className="fas fa-quote-left"></i>
                </div>
                <p>"{testimonial.message}"</p>
                <div className="testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, index) => (
                    <i key={index} className="fas fa-star"></i>
                  ))}
                </div>
                <div className="testimonial-author">
                  <h4>{testimonial.name}</h4>
                  <span>{testimonial.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
