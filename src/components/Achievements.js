import React, { useState } from 'react';

const Achievements = () => {
  const [expandedCards, setExpandedCards] = useState({});

  const toggleExpanded = (playerId) => {
    setExpandedCards(prev => ({
      ...prev,
      [playerId]: !prev[playerId]
    }));
  };

  const playerAchievements = [
     {
      id: 2,
      name: "Ishant Bharadwaj",
      achievement: "Selected for Haryana Ranji Trophy Team",
      year: "2025",
      category: "Ranji Trophy Selection",
      image: "/assets/images/achievers/ishant_bharadwaj.jpeg",
      shortDesc: "Selected to represent Haryana in the prestigious Ranji Trophy, marking a significant milestone in his professional cricket career.",
      achievements: [
        "Selected for Haryana Ranji Trophy Team",
        "Demonstrated exceptional dedication and technical skills",
        "Consistent performance under BNIOC's comprehensive training program",
        "Exemplifies pathway from academy training to state-level representation"
      ]
    },
   
    {
      id: 3,
      name: "Sushant Reddy",
      achievement: "Selected for Chambal Division Senior Team",
      year: "2024",
      category: "Rest of Madhya Pradesh Selection",
      image: "/assets/images/achievers/sushant_reddy.jpg",
      shortDesc: "Selected for the Chambal Division Senior Team in Madhya Pradesh Senior Inter-Divisional M.Y. Memorial Trophy - a major step towards Ranji Trophy selection.",
      achievements: [
        "Selected for Chambal Division Senior Team",
        "Participated in Madhya Pradesh Senior Inter-Divisional M.Y. Memorial Trophy",
        "Organized by Madhya Pradesh Cricket Association",
        "Major step towards Ranji Trophy Team selection"
      ]
    },
    {
      id: 4,
      name: "Elagandhala Ramananda",
      achievement: "Outstanding Performance in Regional Tournament",
      year: "2023, 2024",
      category: "Multi-Tournament Champion",
      image: "/assets/images/achievers/rama.jpg",
      shortDesc: "Established himself as a versatile performer across multiple prestigious tournaments organized by the Indore Divisional Cricket Association.",
      achievements: [
        "Outstanding performance in Late Shashtri Memorial 'A' Grade One Day League",
        "Excelled in ICC Mahaveer T-20 Trophy 'A' Grade T-20 League",
        "Participated in Late Shri Ramesh Bhatia Memorial 'A' Grade Tournament",
        "Upcoming participation in Karimnagar Intra District U-25 Cricket League",
        "Consistent performance across T-20 and One Day formats"
      ]
    },
    {
      id: 5,
      name: "Brajesh Kapri",
      achievement: "700 Runs in 14 Matches - Ilford Cricket Club, England",
      year: "2024",
      category: "International Opportunity",
      image: "/assets/images/achievers/county.jpg",
      shortDesc: "Outstanding performance at 33 years of age, scoring 700 runs in just 14 matches for Ilford Cricket Club, England - 3rd Division.",
      achievements: [
        "Scored 700 runs in just 14 matches",
        "Played for Ilford Cricket Club, England - 3rd Division",
        "Remarkable achievement at 33 years of age",
        "Demonstrated dedication, consistency, and passion for the game",
        "Testament to hard work and talent developed at BNIOC"
      ]
    }
   
    
  ];


  const getCategoryColor = (category) => {
    const colors = {
      'State Selection': 'bg-green-500',
      'Rest of Madhya Pradesh Selection': 'bg-blue-600',
      'Multi-Tournament Champion': 'bg-gradient-to-r from-purple-500 to-pink-500',
      'International Opportunity': 'bg-gradient-to-r from-emerald-500 to-teal-500',
      'Regional Excellence': 'bg-purple-600',
      'Championship': 'bg-yellow-500',
      'District Championship': 'bg-orange-500',
      'Individual Award': 'bg-blue-500',
      'Record': 'bg-purple-500',
      'Professional': 'bg-red-500',
      'Recognition': 'bg-yellow-500',
      'Milestone': 'bg-green-500',
      'Partnership': 'bg-blue-500',
      'Tournament': 'bg-red-500',
      'Infrastructure': 'bg-purple-500',
      'Education': 'bg-indigo-500',
      'Social': 'bg-pink-500',
      'Ranji Trophy Selection': 'bg-red-600'
    };
    return colors[category] || 'bg-gray-500';
  };

  const renderAchievements = (achievements, isExpanded, maxItems = 3) => {
    const itemsToShow = isExpanded ? achievements : achievements.slice(0, maxItems);
    
    return itemsToShow.map((achievement, index) => (
      <div key={index} className="flex items-start mb-2">
        <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
        <span className="text-secondary-600 dark:text-secondary-300 text-xs xl:text-sm leading-relaxed">
          {achievement}
        </span>
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 dark:from-secondary-900 dark:to-secondary-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center space-x-3">
              <i className="fas fa-trophy text-4xl text-primary-500"></i>
              <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 dark:text-white font-primary">
                Our Achievements
              </h1>
              <i className="fas fa-star text-4xl text-primary-500"></i>
            </div>
          </div>
          <p className="text-xl text-secondary-600 dark:text-secondary-300 max-w-3xl mx-auto font-secondary">
            Celebrating the remarkable success stories of our students and academy milestones that define our journey of excellence
          </p>
        </div>


        {/* Player Achievements */}
        <div className="space-y-8 mb-16">
          
            
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {playerAchievements.map((player) => (
                <div key={player.id} className="group">
                  <div className="bg-white dark:bg-secondary-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-secondary-700 overflow-hidden h-fit">
                    
                    <div className="flex flex-col lg:flex-row p-4 xl:p-5 gap-4">
                      {/* Passport-sized Image Section */}
                      <div className="flex-shrink-0 relative mx-auto lg:mx-0">
                        <div className="w-32 h-40 xl:w-36 xl:h-44 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-lg overflow-hidden shadow-md border-2 border-primary-200 dark:border-primary-700">
                          <img 
                            src={player.image} 
                            alt={player.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                          <div className="w-full h-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center" style={{display: 'none'}}>
                            <i className="fas fa-user text-xl text-white"></i>
                          </div>
                        </div>
                        
                        {/* Name below image */}
                        <div className="mt-3 text-center">
                          <h3 className="text-sm xl:text-base font-bold text-secondary-900 dark:text-white leading-tight mb-2">
                            {player.name}
                          </h3>
                          {/* Year Badge below name */}
                          <div className="inline-block bg-primary-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                            {player.year}
                          </div>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-end mb-3">
                          <div className={`${getCategoryColor(player.category)} text-white px-2 py-1 rounded-full text-xs font-medium shadow-sm flex-shrink-0 w-fit`}>
                            {player.category}
                          </div>
                        </div>
                        
                        <div className="flex items-start mb-3">
                          <i className="fas fa-trophy text-primary-500 mr-2 mt-1 text-sm flex-shrink-0"></i>
                          <div className="min-w-0">
                            <h4 className="text-primary-600 dark:text-primary-400 font-semibold text-sm xl:text-base mb-2 leading-tight">
                              {player.achievement}
                            </h4>
                          </div>
                        </div>

                        <div className="mb-4">
                          {/* Short Description */}
                          <p className="text-secondary-600 dark:text-secondary-300 text-xs xl:text-sm leading-relaxed mb-3">
                            {player.shortDesc}
                          </p>
                          
                          {/* Achievement Bullets */}
                          <div className="space-y-1">
                            {renderAchievements(player.achievements, expandedCards[player.id])}
                          </div>
                          
                          {player.achievements.length > 3 && (
                            <button
                              onClick={() => toggleExpanded(player.id)}
                              className="mt-2 text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 text-xs font-medium transition-colors duration-200 flex items-center"
                            >
                              {expandedCards[player.id] ? (
                                <>
                                  <span>Show Less</span>
                                  <i className="fas fa-chevron-up ml-1"></i>
                                </>
                              ) : (
                                <>
                                  <span>Show More Achievements</span>
                                  <i className="fas fa-chevron-down ml-1"></i>
                                </>
                              )}
                            </button>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-end">
                          <div className="flex items-center text-primary-500 bg-primary-50 dark:bg-primary-900/20 px-3 py-1 rounded-full">
                            <i className="fas fa-star mr-1 text-xs"></i>
                            <span className="text-xs font-medium">Excellence</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
        </div>



        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-white dark:bg-secondary-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-secondary-700">
            <h3 className="text-2xl font-bold text-secondary-900 dark:text-white mb-4">
              🚀 Ready to Create Your Success Story?
            </h3>
            <p className="text-secondary-600 dark:text-secondary-300 mb-6 max-w-2xl mx-auto">
              Join BNIOC and become part of our growing list of achievers. With world-class training and dedicated mentorship, your cricket dreams are within reach.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/programs" 
                className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-full font-medium transition-colors duration-300 inline-flex items-center justify-center"
              >
                <i className="fas fa-rocket mr-2"></i>
                Explore Programs
              </a>
              <a 
                href="/contact" 
                className="border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white px-8 py-3 rounded-full font-medium transition-colors duration-300 inline-flex items-center justify-center"
              >
                <i className="fas fa-phone mr-2"></i>
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
