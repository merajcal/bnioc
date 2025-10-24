import React from 'react';

const Contact = () => {

  const contactInfo = [
    {
      icon: 'fas fa-map-marker-alt',
      title: 'Visit Our Academy',
      content: 'Global White Pearl, Panditana Agrahara\nBengaluru, Karnataka 562125',
      color: 'text-red-500'
    },
    {
      icon: 'fas fa-phone',
      title: 'Call Us',
      content: '+91 79740 94110\n+91 88811 13107',
      color: 'text-green-500',
      links: ['tel:+917974094110', 'tel:+918881113107']
    },
    {
      icon: 'fas fa-envelope',
      title: 'Email Us',
      content: 'info@batkhelo.com',
      color: 'text-blue-500',
      links: ['mailto:info@batkhelo.com']
    },
    {
      icon: 'fas fa-clock',
      title: 'Training Hours',
      content: 'Mon-Fri: 6:00 AM - 8:00 PM\nSat-Sun: 5:00 AM - 7:00 PM',
      color: 'text-purple-500'
    }
  ];

  return (
    <section id="contact" className="py-16 lg:py-24 bg-white dark:bg-secondary-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-900 dark:text-white mb-4 font-primary">
            Get In Touch
          </h2>
          <p className="text-lg md:text-xl text-secondary-600 dark:text-secondary-300 max-w-3xl mx-auto font-secondary">
            Ready to start your cricket journey? Let's connect and discuss how BNIOC can help you achieve your goals!
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <div key={index} className="bg-gray-50 dark:bg-secondary-800 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className={`w-16 h-16 ${info.color} bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4`}>
                <i className={`${info.icon} text-2xl ${info.color}`}></i>
              </div>
              <h3 className="text-lg font-bold text-secondary-900 dark:text-white mb-3 font-primary">
                {info.title}
              </h3>
              <div className="text-secondary-600 dark:text-secondary-300 font-secondary">
                {info.links ? (
                  info.content.split('\n').map((line, i) => (
                    <div key={i}>
                      <a 
                        href={info.links[i]} 
                        className="hover:text-primary-500 transition-colors duration-200"
                      >
                        {line}
                      </a>
                    </div>
                  ))
                ) : (
                  info.content.split('\n').map((line, i) => (
                    <div key={i}>{line}</div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Main Contact Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          {/* Google Form */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 dark:bg-secondary-800 rounded-2xl p-8">
             
              
              <div className="relative overflow-hidden rounded-xl shadow-lg bg-white">
                <iframe
                  src="https://docs.google.com/forms/d/e/1FAIpQLSc1rK8lpP1km9Bj-b0PdpCPhOwV9Hisp0Qnep8SGbcKu93GuQ/viewform?usp=dialog"
                  width="100%"
                  height="900"
                  frameBorder="0"
                  marginHeight="0"
                  marginWidth="0"
                  title="BNIOC Contact Form"
                  className="w-full"
                  scrolling="no"
                >
                  Loading…
                </iframe>
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-sm text-secondary-600 dark:text-secondary-400">
                  Having trouble with the form? 
                  <a 
                    href="https://docs.google.com/forms/d/e/1FAIpQLScQq3FpAhgH4FDSgkUvffp4n-hTaLVXhe_4i4U0h_1U-y51aw/viewform?usp=header"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-500 hover:text-primary-600 ml-1 font-semibold"
                  >
                    Open in new tab
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions & Academy Highlights */}
          <div className="space-y-8">
            {/* Quick Connect */}
            <div className="bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4 font-primary">Quick Connect</h3>
              <div className="space-y-3">
                <a
                  href="tel:+917974094110"
                  className="flex items-center gap-3 p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg transition-all duration-200 hover:scale-105"
                >
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <i className="fas fa-phone"></i>
                  </div>
                  <span className="font-semibold">Call Now</span>
                </a>
                
                <a
                  href="https://wa.me/917974094110"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg transition-all duration-200 hover:scale-105"
                >
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <i className="fab fa-whatsapp"></i>
                  </div>
                  <span className="font-semibold">WhatsApp</span>
                </a>
                
                <a
                  href="mailto:info@batkhelo.com"
                  className="flex items-center gap-3 p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg transition-all duration-200 hover:scale-105"
                >
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <span className="font-semibold">Email Us</span>
                </a>
              </div>
            </div>

            {/* Academy Highlights */}
            <div className="bg-gray-50 dark:bg-secondary-800 rounded-2xl p-6">
              <h4 className="text-lg font-bold text-secondary-900 dark:text-white mb-4 font-primary">
                Why Choose BNIOC?
              </h4>
              <ul className="space-y-3">
                {[
                  'Expert Coaching Staff',
                  'World-Class Facilities',
                  'Proven Track Record',
                  'Individual Attention',
                  'Flexible Training Hours',
                  'Tournament Opportunities'
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-secondary-600 dark:text-secondary-300">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-check text-white text-xs"></i>
                    </div>
                    <span className="font-secondary">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="bg-gray-50 dark:bg-secondary-800 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-secondary-900 dark:text-white mb-6 text-center font-primary">
            Find Our Academy
          </h3>
          <div className="relative overflow-hidden rounded-xl shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.8267!2d77.6311!3d12.9141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU0JzUwLjgiTiA3N8KwMzgnNTIuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="BNIOC Academy Location"
              className="w-full h-96 md:h-[400px]"
            ></iframe>
          </div>
          <div className="text-center mt-4">
            <p className="text-secondary-600 dark:text-secondary-300 font-secondary">
              <i className="fas fa-map-marker-alt text-primary-500 mr-2"></i>
              Global White Pearl, Panditana Agrahara, Bengaluru, Karnataka 562125
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
