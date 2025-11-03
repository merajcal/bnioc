import React from 'react';

const Rules = () => {
  const ruleCategories = [
    {
      id: 1,
      title: "Attendance & Punctuality",
      icon: "fas fa-clock",
      rules: [
        "Students must arrive 15 minutes before scheduled training time",
        "Regular attendance is mandatory for skill development",
        "Notify coaches in advance for planned absences",
        "Make-up sessions available for medical emergencies only"
      ]
    },
    {
      id: 2,
      title: "Equipment & Dress Code",
      icon: "fas fa-tshirt",
      rules: [
        "Proper cricket attire required during all sessions",
        "Personal protective gear must be worn at all times",
        "Academy provides basic equipment for beginners",
        "Students responsible for maintaining their gear"
      ]
    },
    {
      id: 3,
      title: "Conduct & Behavior",
      icon: "fas fa-handshake",
      rules: [
        "Respectful behavior towards coaches and fellow students",
        "No use of mobile phones during training sessions",
        "Follow all safety instructions given by coaches",
        "Maintain discipline and sportsmanship at all times"
      ]
    },
    {
      id: 4,
      title: "Training Guidelines",
      icon: "fas fa-clipboard-list",
      rules: [
        "Active participation in all assigned drills and exercises",
        "Listen carefully to coaching instructions",
        "Practice sessions are mandatory for all enrolled students",
        "Individual coaching sessions require prior booking"
      ]
    },
    {
      id: 5,
      title: "Payment & Fees",
      icon: "fas fa-credit-card",
      rules: [
        "Fees must be paid before the start of each program",
        "No refunds for missed sessions due to personal reasons",
        "Late payment charges apply after due date",
        "Family discounts available for multiple enrollments"
      ]
    },
    {
      id: 6,
      title: "Safety & Health",
      icon: "fas fa-shield-alt",
      rules: [
        "Medical certificate required for all students",
        "Inform coaches about any injuries or health issues",
        "Academy not responsible for personal belongings",
        "Insurance coverage recommended for all participants"
      ]
    }
  ];

  return (
    <section id="rules" className="rules">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Rules & Regulations</h2>
          <p className="section-subtitle">Guidelines for a safe and productive training environment</p>
        </div>
        
        <div className="rules-grid">
          {ruleCategories.map((category) => (
            <div key={category.id} className="rule-category">
              <div className="category-header">
                <div className="category-icon">
                  <i className={category.icon}></i>
                </div>
                <h3>{category.title}</h3>
              </div>
              
              <ul className="rule-list">
                {category.rules.map((rule, index) => (
                  <li key={index}>
                    <i className="fas fa-check"></i>
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="rules-footer">
          <div className="rules-note">
            <h4>📋 Important Note</h4>
            <p>
              These rules are designed to ensure the safety, discipline, and optimal learning environment 
              for all students. Violation of any rules may result in suspension or termination from the program. 
              For any clarifications, please contact our administration team.
            </p>
          </div>
          
          <div className="contact-admin">
            <h4>Questions about Rules?</h4>
            <div className="admin-contact">
              <a href="tel:+917974098410" className="contact-btn">
                <i className="fas fa-phone"></i>
                Call Administration
              </a>
              <a href="mailto:bnioc25@gmail.com" className="contact-btn">
                <i className="fas fa-envelope"></i>
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Rules;
