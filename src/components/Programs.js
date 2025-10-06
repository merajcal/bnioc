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
      popular: false
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
      popular: false
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
      popular: false
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
      popular: false
    },
    {
      id: 5,
      name: "Double Impact",
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
      popular: true
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
      premium: true
    }
  ];

  return (
    <section id="programs" className="programs">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Training Programs</h2>
          <p className="section-subtitle">Choose the perfect program to elevate your cricket journey</p>
        </div>
        
        <div className="programs-grid">
          {programs.map((program) => (
            <div 
              key={program.id} 
              className={`program-card ${program.popular ? 'popular' : ''} ${program.premium ? 'premium' : ''}`}
            >
              {program.popular && <div className="popular-badge">Most Popular</div>}
              {program.premium && <div className="premium-badge">Premium</div>}
              
              <div className="program-header">
                <h3 className="program-name">{program.name}</h3>
                <div className="program-schedule">
                  <i className="fas fa-calendar-alt"></i>
                  {program.schedule}
                </div>
              </div>
              
              <div className="program-content">
                <p className="program-description">{program.description}</p>
                
                <div className="program-features">
                  <h4>What's Included:</h4>
                  <ul>
                    {program.features.map((feature, index) => (
                      <li key={index}>
                        <i className="fas fa-check"></i>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="program-footer">
                <button className="btn btn-primary program-btn">
                  Enroll Now
                </button>
                <button className="btn btn-secondary">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="programs-note">
          <div className="note-content">
            <h4>📞 Need Help Choosing?</h4>
            <p>Our expert counselors are here to help you select the perfect program based on your goals, age, and availability.</p>
            <div className="contact-options">
              <a href="tel:+917974094110" className="contact-btn">
                <i className="fas fa-phone"></i>
                Call Us: +91 79740 94110
              </a>
              <a href="mailto:info@batkhelo.com" className="contact-btn">
                <i className="fas fa-envelope"></i>
                Email: info@batkhelo.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Programs;
