import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { generatePlayerData } from '../utils/videoUtils';
import './BeforeAfterPlayer.css';

const BeforeAfterPlayer = () => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isPlaying, setIsPlaying] = useState({ before: false, after: false });
  const [currentTime, setCurrentTime] = useState({ before: 0, after: 0 });
  const [duration, setDuration] = useState({ before: 0, after: 0 });
  const [searchTerm, setSearchTerm] = useState('');
  const [isFullscreen, setIsFullscreen] = useState({ before: false, after: false });
  
  const beforeVideoRef = useRef(null);
  const afterVideoRef = useRef(null);

  // Base player data - videos paths will be generated dynamically
  const basePlayerData = [
    {
      id: 1,
      name: "Sushant Reddy",
      age: 20,
      improvements: [
        "Batting stance corrected",
        "Improved timing and footwork",
        "Better shot selection",
        "Increased confidence"
      ],
      beforeDescription: "Initial assessment - basic technique",
      afterDescription: "After training - professional form"
    },
    
  ];

  // Generate complete player data with dynamic video paths
  const playerProgressData = generatePlayerData(basePlayerData);

  // Filter players based on search term
  const filteredPlayers = playerProgressData.filter(player => {
    return player.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleVideoPlay = async (type) => {
    const videoRef = type === 'before' ? beforeVideoRef : afterVideoRef;
    const otherVideoRef = type === 'before' ? afterVideoRef : beforeVideoRef;
    
    if (videoRef.current) {
      try {
        if (isPlaying[type]) {
          videoRef.current.pause();
        } else {
          // Pause the other video if playing
          if (otherVideoRef.current && !otherVideoRef.current.paused) {
            otherVideoRef.current.pause();
          }
          
          // Check if video is still in DOM before playing
          if (document.contains(videoRef.current)) {
            await videoRef.current.play();
          }
        }
      } catch (error) {
        // Handle play() interruption errors gracefully
        if (error.name !== 'AbortError' && error.name !== 'NotAllowedError') {
          console.warn('Video play error:', error);
        }
      }
    }
  };

  const handleTimeUpdate = (type) => {
    const videoRef = type === 'before' ? beforeVideoRef : afterVideoRef;
    if (videoRef.current) {
      setCurrentTime(prev => ({
        ...prev,
        [type]: videoRef.current.currentTime
      }));
    }
  };

  const handleLoadedMetadata = (type) => {
    const videoRef = type === 'before' ? beforeVideoRef : afterVideoRef;
    if (videoRef.current) {
      setDuration(prev => ({
        ...prev,
        [type]: videoRef.current.duration
      }));
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (type, value) => {
    const videoRef = type === 'before' ? beforeVideoRef : afterVideoRef;
    if (videoRef.current) {
      videoRef.current.currentTime = value;
    }
  };

  const handleFullscreen = async (type) => {
    const videoRef = type === 'before' ? beforeVideoRef : afterVideoRef;
    
    if (!videoRef.current) return;

    try {
      if (isFullscreen[type]) {
        // Exit fullscreen
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          await document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          await document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          await document.msExitFullscreen();
        }
      } else {
        // Enter fullscreen
        const videoContainer = videoRef.current.parentElement;
        if (videoContainer.requestFullscreen) {
          await videoContainer.requestFullscreen();
        } else if (videoContainer.webkitRequestFullscreen) {
          await videoContainer.webkitRequestFullscreen();
        } else if (videoContainer.mozRequestFullScreen) {
          await videoContainer.mozRequestFullScreen();
        } else if (videoContainer.msRequestFullscreen) {
          await videoContainer.msRequestFullscreen();
        }
      }
    } catch (error) {
      console.warn('Fullscreen error:', error);
    }
  };

  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
      );

      setIsFullscreen(prev => ({
        before: isCurrentlyFullscreen && document.fullscreenElement?.contains(beforeVideoRef.current),
        after: isCurrentlyFullscreen && document.fullscreenElement?.contains(afterVideoRef.current)
      }));
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    const beforeVideo = beforeVideoRef.current;
    const afterVideo = afterVideoRef.current;

    const updateBeforePlayState = () => {
      if (beforeVideo && document.contains(beforeVideo)) {
        setIsPlaying(prev => ({ ...prev, before: !beforeVideo.paused }));
      }
    };
    
    const updateAfterPlayState = () => {
      if (afterVideo && document.contains(afterVideo)) {
        setIsPlaying(prev => ({ ...prev, after: !afterVideo.paused }));
      }
    };

    if (beforeVideo) {
      beforeVideo.addEventListener('play', updateBeforePlayState);
      beforeVideo.addEventListener('pause', updateBeforePlayState);
      beforeVideo.addEventListener('ended', updateBeforePlayState);
      beforeVideo.addEventListener('error', updateBeforePlayState);
    }

    if (afterVideo) {
      afterVideo.addEventListener('play', updateAfterPlayState);
      afterVideo.addEventListener('pause', updateAfterPlayState);
      afterVideo.addEventListener('ended', updateAfterPlayState);
      afterVideo.addEventListener('error', updateAfterPlayState);
    }

    return () => {
      // Pause videos before cleanup to prevent play() interruption
      if (beforeVideo && document.contains(beforeVideo)) {
        beforeVideo.pause();
        beforeVideo.removeEventListener('play', updateBeforePlayState);
        beforeVideo.removeEventListener('pause', updateBeforePlayState);
        beforeVideo.removeEventListener('ended', updateBeforePlayState);
        beforeVideo.removeEventListener('error', updateBeforePlayState);
      }
      if (afterVideo && document.contains(afterVideo)) {
        afterVideo.pause();
        afterVideo.removeEventListener('play', updateAfterPlayState);
        afterVideo.removeEventListener('pause', updateAfterPlayState);
        afterVideo.removeEventListener('ended', updateAfterPlayState);
        afterVideo.removeEventListener('error', updateAfterPlayState);
      }
    };
  }, [selectedPlayer]);

  return (
    <section className="py-16 bg-white dark:bg-secondary-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 dark:text-white mb-4">
            Player Progress Showcase
          </h2>
          <p className="text-lg text-secondary-600 dark:text-secondary-300 max-w-3xl mx-auto">
            Witness the remarkable transformation of our students through our proven training methodologies. 
            See the before and after videos showcasing real improvement.
          </p>
        </div>

        {/* Player Selection */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4 text-center">
            Select a Player to View Progress
          </h3>
          
          {/* Search */}
          <div className="flex justify-center mb-6">
            <div className="w-full max-w-md">
              <input
                type="text"
                placeholder="Search by player name..."
                className="w-full px-4 py-2 border border-secondary-300 dark:border-secondary-600 rounded-lg bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Player Cards - Horizontal Scrollable */}
          <div className="relative">
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-primary-500 scrollbar-track-secondary-200 dark:scrollbar-track-secondary-700">
              {filteredPlayers.map((player) => (
                <button
                  key={player.id}
                  onClick={() => setSelectedPlayer(player)}
                  className={`flex-shrink-0 w-64 p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                    selectedPlayer?.id === player.id
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-lg'
                      : 'border-secondary-200 dark:border-secondary-700 hover:border-primary-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center font-semibold">
                      {player.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary-900 dark:text-white">{player.name}</h4>
                      <p className="text-xs text-secondary-500 dark:text-secondary-400">Age: {player.age}</p>
                    </div>
                  </div>
                  
                 
                </button>
              ))}
            </div>
            
            {/* Scroll indicators */}
            <div className="absolute top-1/2 -left-2 transform -translate-y-1/2 bg-white dark:bg-secondary-800 rounded-full shadow-lg p-2 opacity-75 hover:opacity-100 transition-opacity">
              <i className="fas fa-chevron-left text-secondary-600 dark:text-secondary-300"></i>
            </div>
            <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 bg-white dark:bg-secondary-800 rounded-full shadow-lg p-2 opacity-75 hover:opacity-100 transition-opacity">
              <i className="fas fa-chevron-right text-secondary-600 dark:text-secondary-300"></i>
            </div>
          </div>

          {/* Results count */}
          <div className="text-center mt-4">
            <p className="text-sm text-secondary-600 dark:text-secondary-300">
              Showing {filteredPlayers.length} of {playerProgressData.length} students
            </p>
          </div>
        </div>

        {/* Video Player Section */}
        {selectedPlayer && (
          <div className="bg-secondary-50 dark:bg-secondary-800 rounded-2xl p-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-secondary-900 dark:text-white mb-2">
                {selectedPlayer.name}'s Progress Journey
              </h3>
              <p className="text-secondary-600 dark:text-secondary-300">
                {selectedPlayer.program} • {selectedPlayer.timeframe} transformation
              </p>
            </div>

            {/* Video Comparison */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Before Video */}
              <div className="space-y-4">
                <div className="bg-white dark:bg-secondary-900 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2 flex items-center">
                    <span className="bg-red-500 text-white px-2 py-1 rounded text-sm mr-2">BEFORE</span>
                    {selectedPlayer.beforeDescription}
                  </h4>
                  
                  <div className="video-container relative bg-black rounded-lg overflow-hidden aspect-video">
                    <video
                      ref={beforeVideoRef}
                      className="w-full h-full object-cover"
                      poster={selectedPlayer.beforeThumbnail}
                      onTimeUpdate={() => handleTimeUpdate('before')}
                      onLoadedMetadata={() => handleLoadedMetadata('before')}
                    >
                      <source src={selectedPlayer.beforeVideo} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    
                    {/* Video Controls */}
                    <div className="video-controls absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleVideoPlay('before')}
                          className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
                        >
                          <i className={`fas ${isPlaying.before ? 'fa-pause' : 'fa-play'} text-sm`}></i>
                        </button>
                        
                        <div className="flex-1">
                          <input
                            type="range"
                            min="0"
                            max={duration.before || 0}
                            value={currentTime.before}
                            onChange={(e) => handleSeek('before', e.target.value)}
                            className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer"
                          />
                        </div>
                        
                        <span className="text-white text-xs">
                          {formatTime(currentTime.before)} / {formatTime(duration.before)}
                        </span>
                        
                        <button
                          onClick={() => handleFullscreen('before')}
                          className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
                          title={isFullscreen.before ? 'Exit Fullscreen' : 'Enter Fullscreen'}
                        >
                          <i className={`fas ${isFullscreen.before ? 'fa-compress' : 'fa-expand'} text-sm`}></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* After Video */}
              <div className="space-y-4">
                <div className="bg-white dark:bg-secondary-900 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2 flex items-center">
                    <span className="bg-green-500 text-white px-2 py-1 rounded text-sm mr-2">AFTER</span>
                    {selectedPlayer.afterDescription}
                  </h4>
                  
                  <div className="video-container relative bg-black rounded-lg overflow-hidden aspect-video">
                    <video
                      ref={afterVideoRef}
                      className="w-full h-full object-cover"
                      poster={selectedPlayer.afterThumbnail}
                      onTimeUpdate={() => handleTimeUpdate('after')}
                      onLoadedMetadata={() => handleLoadedMetadata('after')}
                    >
                      <source src={selectedPlayer.afterVideo} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    
                    {/* Video Controls */}
                    <div className="video-controls absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleVideoPlay('after')}
                          className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
                        >
                          <i className={`fas ${isPlaying.after ? 'fa-pause' : 'fa-play'} text-sm`}></i>
                        </button>
                        
                        <div className="flex-1">
                          <input
                            type="range"
                            min="0"
                            max={duration.after || 0}
                            value={currentTime.after}
                            onChange={(e) => handleSeek('after', e.target.value)}
                            className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer"
                          />
                        </div>
                        
                        <span className="text-white text-xs">
                          {formatTime(currentTime.after)} / {formatTime(duration.after)}
                        </span>
                        
                        <button
                          onClick={() => handleFullscreen('after')}
                          className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
                          title={isFullscreen.after ? 'Exit Fullscreen' : 'Enter Fullscreen'}
                        >
                          <i className={`fas ${isFullscreen.after ? 'fa-compress' : 'fa-expand'} text-sm`}></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Improvements List */}
            <div className="bg-white dark:bg-secondary-900 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4 flex items-center">
                <i className="fas fa-chart-line text-primary-500 mr-2"></i>
                Key Improvements Achieved
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedPlayer.improvements.map((improvement, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span className="text-secondary-700 dark:text-secondary-300">{improvement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-lg text-secondary-600 dark:text-secondary-300 mb-6">
            Ready to start your own transformation journey?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
            >
              Book Free Assessment
            </Link>
            <Link
              to="/programs"
              className="bg-transparent border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
            >
              View Programs
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterPlayer;
