import React, { useState, useEffect } from 'react';
import './AnnouncementModal.css';

const AnnouncementModal = ({ announcements = [], onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [activeAnnouncements, setActiveAnnouncements] = useState([]);
  const [isMinimized, setIsMinimized] = useState(() => typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches);
  const [autoScrollInterval, setAutoScrollInterval] = useState(null);

  useEffect(() => {
    console.log('AnnouncementModal received announcements:', announcements);
    
    // Filter active announcements that haven't expired
    const now = new Date();
    console.log('Current date:', now);
    
    const validAnnouncements = announcements.filter(announcement => {
      const publishDate = new Date(announcement.publishDate);
      const expiryDate = new Date(announcement.expiryDate);
      
      console.log(`Checking announcement ${announcement.id}:`, {
        isActive: announcement.isActive,
        publishDate,
        expiryDate,
        now,
        publishCheck: now >= publishDate,
        expiryCheck: now <= expiryDate
      });
      
      // Check if announcement is active and within date range
      if (!announcement.isActive || now < publishDate || now > expiryDate) {
        console.log(`Announcement ${announcement.id} filtered out - not active or outside date range`);
        return false;
      }

      // Check if it's a "show once" announcement and if user has already seen it
      if (announcement.showOnce) {
        const viewedAnnouncements = JSON.parse(localStorage.getItem('bnioc_viewed_announcements') || '[]');
        const hasBeenViewed = viewedAnnouncements.includes(announcement.id);
        console.log(`Announcement ${announcement.id} show once check:`, { hasBeenViewed, viewedAnnouncements });
        return !hasBeenViewed;
      }

      console.log(`Announcement ${announcement.id} passed all filters`);
      return true;
    });

    // Sort by priority (high -> medium -> low) and then by publish date (newest first)
    const sortedAnnouncements = validAnnouncements.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      return new Date(b.publishDate) - new Date(a.publishDate);
    });

    console.log('Valid announcements after filtering:', validAnnouncements);
    console.log('Sorted announcements:', sortedAnnouncements);
    
    setActiveAnnouncements(sortedAnnouncements);

    if (sortedAnnouncements.length > 0) {
      console.log('Setting modal visible - found', sortedAnnouncements.length, 'announcements');
      setIsVisible(true);
      
      // Start auto-scroll if multiple announcements
      if (sortedAnnouncements.length > 1) {
        const interval = setInterval(() => {
          setCurrentIndex(prevIndex => {
            const nextIndex = (prevIndex + 1) % sortedAnnouncements.length;
            return nextIndex;
          });
        }, 50000); // Auto-scroll every 5 seconds
        
        setAutoScrollInterval(interval);
      }
    } else {
      console.log('No valid announcements to display');
    }
  }, [announcements]);

  // Cleanup auto-scroll on unmount
  useEffect(() => {
    return () => {
      if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
      }
    };
  }, [autoScrollInterval]);

  const handleClose = () => {
    // Mark current announcement as viewed if it's a "show once" type
    if (activeAnnouncements[currentIndex]?.showOnce) {
      const viewedAnnouncements = JSON.parse(localStorage.getItem('bnioc_viewed_announcements') || '[]');
      viewedAnnouncements.push(activeAnnouncements[currentIndex].id);
      localStorage.setItem('bnioc_viewed_announcements', JSON.stringify(viewedAnnouncements));
    }

    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleNext = () => {
    // Clear auto-scroll when user manually navigates
    if (autoScrollInterval) {
      clearInterval(autoScrollInterval);
      setAutoScrollInterval(null);
    }
    
    if (currentIndex < activeAnnouncements.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Loop back to first
    }
  };

  const handlePrevious = () => {
    // Clear auto-scroll when user manually navigates
    if (autoScrollInterval) {
      clearInterval(autoScrollInterval);
      setAutoScrollInterval(null);
    }
    
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(activeAnnouncements.length - 1); // Loop to last
    }
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleActionClick = (actionButton) => {
    if (actionButton?.link) {
      window.location.href = actionButton.link;
    }
    handleClose();
  };

  // Don't render if no active announcements
  if (activeAnnouncements.length === 0) {
    return null;
  }

  const currentAnnouncement = activeAnnouncements[currentIndex];

  return (
    <div className={`announcement-popover ${isVisible ? 'visible' : ''} ${isMinimized ? 'minimized' : ''}`}>
      {/* Minimized state */}
      {isMinimized ? (
        <div className="announcement-minimized" onClick={handleMinimize}>
          <div className="announcement-mini-badge">
            <i className="fas fa-bell"></i>
            <span className="announcement-count">{activeAnnouncements.length}</span>
          </div>
          <span className="announcement-mini-text">News</span>
        </div>
      ) : (
        <>
          {/* Header with controls */}
          <div className="announcement-header">
            <div className={`announcement-badge ${currentAnnouncement.priority}`}>
              {currentAnnouncement.badge}
            </div>
            <div className="announcement-controls">
              <button 
                className="announcement-control-btn minimize"
                onClick={handleMinimize}
                aria-label="Minimize announcement"
              >
                <i className="fas fa-minus"></i>
              </button>
              <button 
                className="announcement-control-btn close"
                onClick={handleClose}
                aria-label="Close announcement"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>

          {/* Image */}
          {currentAnnouncement.image && (
            <div className="announcement-image-container">
              <img 
                src={currentAnnouncement.image} 
                alt={currentAnnouncement.imageAlt || currentAnnouncement.title}
                className="announcement-image"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          )}

          {/* Content */}
          <div className="announcement-content">
            <h3 className="announcement-title">{currentAnnouncement.title}</h3>
            <p className="announcement-message">{currentAnnouncement.message}</p>
          </div>

          {/* Action button */}
          {currentAnnouncement.actionButton && (
            <button 
              className="announcement-action-btn"
              onClick={() => handleActionClick(currentAnnouncement.actionButton)}
            >
              {currentAnnouncement.actionButton.text}
            </button>
          )}

          {/* Navigation footer */}
          {activeAnnouncements.length > 1 && (
            <div className="announcement-footer">
              <button 
                className="announcement-nav-btn prev"
                onClick={handlePrevious}
                aria-label="Previous announcement"
              >
                <i className="fas fa-chevron-left"></i>
              </button>

              <div className="announcement-indicators">
                {activeAnnouncements.map((_, index) => (
                  <button
                    key={index}
                    className={`announcement-indicator ${index === currentIndex ? 'active' : ''}`}
                    onClick={() => {
                      if (autoScrollInterval) {
                        clearInterval(autoScrollInterval);
                        setAutoScrollInterval(null);
                      }
                      setCurrentIndex(index);
                    }}
                    aria-label={`Go to announcement ${index + 1}`}
                  />
                ))}
              </div>

              <button 
                className="announcement-nav-btn next"
                onClick={handleNext}
                aria-label="Next announcement"
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          )}

          {/* Auto-scroll indicator */}
          {activeAnnouncements.length > 1 && autoScrollInterval && (
            <div className="announcement-auto-scroll">
              <i className="fas fa-play"></i>
              <span>Auto-scrolling</span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AnnouncementModal;
