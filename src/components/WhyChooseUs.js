import React, { useState } from 'react';

const WhyChooseUs = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const accordionItems = [
    {
      title: "🏆 Proven Track Record",
      content: "With over 15 years of experience, we have successfully trained 500+ students who have gone on to represent their schools, colleges, and clubs at various levels. Our alumni have achieved remarkable success in district and state-level competitions."
    },
    {
      title: "👨‍🏫 Expert Coaching Staff",
      content: "Learn from coaches who have worked with elite-level cricketers. Our experienced coaching staff is passionate about the game and dedicated to helping you achieve your goals."
    },
    {
      title: "🏟️ World-Class Infrastructure",
      content: "Train on 5 international standard turf pitches with modern facilities including floodlights, fitness center, and professional-grade equipment. Our infrastructure meets international cricket standards."
    },
    {
      title: "📈 Personalized Development",
      content: "Every student receives individual attention with customized training programs. We focus on identifying and developing each player's unique strengths while addressing areas for improvement."
    },
    {
      title: "🎯 Comprehensive Programs",
      content: "From beginner-friendly weekend programs to intensive summer camps and individual coaching, we offer flexible training options to suit every schedule and skill level."
    }
  ];

  return (
    <section id="why-choose-us" className="why-choose-us">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Why Choose Us?</h2>
          <p className="section-subtitle">Discover what makes BNIOC the premier choice for cricket training</p>
        </div>
        
        <div className="accordion-container">
          {accordionItems.map((item, index) => (
            <div key={index} className="accordion-item">
              <div 
                className="accordion-header" 
                onClick={() => toggleAccordion(index)}
                style={{ cursor: 'pointer' }}
              >
                <h3>{item.title}</h3>
                <i className={`fas fa-chevron-${activeAccordion === index ? 'up' : 'down'}`}></i>
              </div>
              <div className={`accordion-content ${activeAccordion === index ? 'active' : ''}`}>
                <p>{item.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
