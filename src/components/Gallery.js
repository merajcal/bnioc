import React, { useState, useEffect } from 'react';

const Gallery = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [imagesPerPage] = useState(8); // Show 8 images per page
  
  // Auto-load all images from gallery folder
  useEffect(() => {
    const loadGalleryImages = async () => {
      try {
        // Try to load auto-generated gallery list
        console.log('🖼️ Loading gallery images from /data/galleryImages.json...');
        const response = await fetch('/data/galleryImages.json');
        if (response.ok) {
          const images = await response.json();
          console.log(`✅ Loaded ${images.length} images from auto-generated gallery`);
          setGalleryImages(images);
        } else {
          // Fallback to manual list if auto-generated file doesn't exist
          console.log('❌ Auto-generated gallery not found, using fallback images');
          loadFallbackImages();
        }
      } catch (error) {
        console.log('❌ Loading fallback images due to error:', error);
        loadFallbackImages();
      }
    };

    const loadFallbackImages = () => {
      // Fallback images if auto-generation fails
      const fallbackImages = [
        {
          id: 1,
          src: '/assets/images/gallery/training-1.jpg',
          alt: 'Training Session',
          title: 'Professional Training',
          description: 'Students learning batting techniques'
        },
        {
          id: 2,
          src: '/assets/images/gallery/match-1.jpg',
          alt: 'Match Practice',
          title: 'Match Practice',
          description: 'Live match simulation'
        },
        {
          id: 3,
          src: '/assets/images/gallery/facilities-1.jpg',
          alt: 'Academy Facilities',
          title: 'World-Class Facilities',
          description: 'Our premium training grounds'
        },
        {
          id: 4,
          src: '/assets/images/gallery/coaching-1.jpg',
          alt: 'Coaching Session',
          title: 'Expert Coaching',
          description: 'One-on-one guidance'
        }
      ];
      setGalleryImages(fallbackImages);
    };

    loadGalleryImages();
  }, []);

  // Pagination calculations
  const totalPages = Math.ceil(galleryImages.length / imagesPerPage);
  const startIndex = (currentPage - 1) * imagesPerPage;
  const endIndex = startIndex + imagesPerPage;
  const currentImages = galleryImages.slice(startIndex, endIndex);
  const featuredImage = galleryImages.length > 0 ? galleryImages[0] : null;

  // Pagination handlers
  const goToPage = (page) => {
    if (page === currentPage) return;
    
    // Add fade effect
    const galleryGrid = document.querySelector('.gallery-grid');
    if (galleryGrid) {
      galleryGrid.style.opacity = '0.5';
      
      setTimeout(() => {
        setCurrentPage(page);
        galleryGrid.style.opacity = '1';
      }, 150);
    } else {
      setCurrentPage(page);
    }
    
    // Smooth scroll to gallery grid (not the top of gallery section)
    setTimeout(() => {
      document.querySelector('.gallery-grid')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };
  return (
    <section id="gallery" className="gallery">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Gallery</h2>
          <p className="section-subtitle">Capturing moments of excellence and passion for cricket</p>
          {/* Pagination info */}
          <div className="gallery-info">
            <p style={{fontSize: '0.9rem', color: '#666', marginTop: '1rem'}}>
              📸 {galleryImages.length} images • Page {currentPage} of {totalPages}
            </p>
          </div>
        </div>
        
        <div className="gallery-container">
          {/* Featured Large Image - Always show first image */}
          {featuredImage && (
            <div className="gallery-featured">
              <div className="featured-image">
                <img 
                  src={featuredImage.src} 
                  alt={featuredImage.alt}
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <div className="featured-overlay">
                  <div className="featured-content">
                    <h3>🏏 BNIOC Cricket Academy</h3>
                    <p>Where champions are made through dedication, training, and passion</p>
                    <div className="featured-stats">
                      <span><i className="fas fa-users"></i> 100+ Students</span>
                      <span><i className="fas fa-trophy"></i> 15+ Tournaments</span>
                      <span><i className="fas fa-medal"></i> 50+ Awards</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Paginated Gallery Grid */}
          <div className="gallery-grid">
            {currentImages.map((image) => (
              <div key={image.id} className="gallery-item">
                <img 
                  src={image.src} 
                  alt={image.alt}
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
                  }}
                />
                <div className="gallery-overlay">
                  <h4>{image.title}</h4>
                  <p>{image.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="gallery-pagination">
              <button 
                className={`pagination-btn prev ${currentPage === 1 ? 'disabled' : ''}`}
                onClick={goToPrevPage}
                disabled={currentPage === 1}
              >
                <i className="fas fa-chevron-left"></i>
                Previous
              </button>
              
              <div className="pagination-numbers">
                {Array.from({ length: totalPages }, (_, index) => {
                  const page = index + 1;
                  return (
                    <button
                      key={page}
                      className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                      onClick={() => goToPage(page)}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>
              
              <button 
                className={`pagination-btn next ${currentPage === totalPages ? 'disabled' : ''}`}
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
              >
                Next
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          )}
          
          {/* Instagram Integration */}
          <div className="gallery-social">
            <h3>📸 Follow Us on Instagram</h3>
            <p>Stay updated with daily training highlights and student achievements</p>
            <a href="https://instagram.com/bnioc_cricket" className="btn btn-primary" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
              @bnioc_cricket
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
