import React, { useState, useEffect, useRef, useCallback } from 'react';

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  
  // Load gallery items (images and videos)
  useEffect(() => {
    const loadGalleryItems = async () => {
      setLoading(true);
      try {
        console.log('🖼️ Loading gallery items from /data/galleryImages.json...');
        const response = await fetch('/data/galleryImages.json');
        if (response.ok) {
          const items = await response.json();
          console.log(`✅ Loaded ${items.length} items from auto-generated gallery`);
          setGalleryItems(items);
          setFilteredItems(items);
        } else {
          console.log('❌ Auto-generated gallery not found, using fallback items');
          loadFallbackItems();
        }
      } catch (error) {
        console.log('❌ Loading fallback items due to error:', error);
        loadFallbackItems();
      } finally {
        setLoading(false);
      }
    };

    const loadFallbackItems = () => {
      const fallbackItems = [
        {
          id: 1,
          src: '/assets/images/gallery/training-1.jpg',
          alt: 'Training Session',
          title: 'Professional Training',
          description: 'Students learning batting techniques',
          type: 'image',
          category: 'training'
        },
        {
          id: 2,
          src: '/assets/images/gallery/match-1.jpg',
          alt: 'Match Practice',
          title: 'Match Practice',
          description: 'Live match simulation',
          type: 'image',
          category: 'matches'
        },
        {
          id: 3,
          src: '/assets/images/gallery/facilities-1.jpg',
          alt: 'Academy Facilities',
          title: 'World-Class Facilities',
          description: 'Our premium training grounds',
          type: 'image',
          category: 'facilities'
        },
        {
          id: 4,
          src: '/assets/images/gallery/coaching-1.jpg',
          alt: 'Coaching Session',
          title: 'Expert Coaching',
          description: 'One-on-one guidance',
          type: 'image',
          category: 'training'
        },
        // Add more fallback items for demonstration
        ...Array.from({ length: 20 }, (_, i) => ({
          id: i + 5,
          src: `https://images.unsplash.com/photo-${1540747913346 + i}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`,
          alt: `Cricket Training ${i + 1}`,
          title: `Training Session ${i + 1}`,
          description: `Professional cricket training session ${i + 1}`,
          type: 'image',
          category: ['training', 'matches', 'facilities'][i % 3]
        }))
      ];
      setGalleryItems(fallbackItems);
      setFilteredItems(fallbackItems);
    };

    loadGalleryItems();
  }, []);

  // Filter functionality
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setCurrentPage(1);
    
    if (filter === 'all') {
      setFilteredItems(galleryItems);
    } else {
      const filtered = galleryItems.filter(item => item.category === filter);
      setFilteredItems(filtered);
    }
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, endIndex);
  const featuredItem = filteredItems.length > 0 ? filteredItems[0] : null;

  // Pagination handlers
  const goToPage = (page) => {
    if (page === currentPage) return;
    setCurrentPage(page);
    
    // Smooth scroll to gallery grid
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

  // Simple image component with native lazy loading
  const LazyImage = ({ item, className = "" }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
      setImageError(true);
      setImageLoaded(true);
    };

    const handleImageLoad = () => {
      setImageLoaded(true);
    };

    const fallbackSrc = 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';

    return (
      <div className={`relative overflow-hidden bg-gray-200 dark:bg-secondary-700 ${className}`}>
        <img
          src={imageError ? fallbackSrc : item.src}
          alt={item.alt}
          className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onError={handleImageError}
          onLoad={handleImageLoad}
          loading="lazy"
        />
        
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
          </div>
        )}
      </div>
    );
  };
  if (loading) {
    return (
      <section className="py-16 lg:py-24 bg-white dark:bg-secondary-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="gallery" className="py-16 lg:py-24 bg-white dark:bg-secondary-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-900 dark:text-white mb-4 font-primary">
            Gallery
          </h2>
          <p className="text-lg md:text-xl text-secondary-600 dark:text-secondary-300 max-w-3xl mx-auto font-secondary mb-8">
            Capturing moments of excellence and passion for cricket
          </p>
          
          {/* Gallery Stats */}
          <div className="flex flex-wrap justify-center gap-4 text-sm text-secondary-600 dark:text-secondary-400">
            <span className="flex items-center gap-2">
              <i className="fas fa-images text-primary-500"></i>
              {filteredItems.length} items
            </span>
            <span className="flex items-center gap-2">
              <i className="fas fa-layer-group text-primary-500"></i>
              Page {currentPage} of {totalPages}
            </span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {[
            { key: 'all', label: 'All', icon: 'fas fa-th' },
            { key: 'training', label: 'Training', icon: 'fas fa-dumbbell' },
            { key: 'matches', label: 'Matches', icon: 'fas fa-trophy' },
            { key: 'facilities', label: 'Facilities', icon: 'fas fa-building' }
          ].map((filter) => (
            <button
              key={filter.key}
              onClick={() => handleFilterChange(filter.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === filter.key
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-secondary-800 text-secondary-600 dark:text-secondary-300 hover:bg-primary-100 dark:hover:bg-secondary-700 hover:text-primary-600 dark:hover:text-primary-400'
              }`}
            >
              <i className={filter.icon}></i>
              {filter.label}
            </button>
          ))}
        </div>

        {/* Featured Item */}
        {featuredItem && (
          <div className="mb-16">
            <div className="relative group overflow-hidden rounded-2xl shadow-2xl h-96 lg:h-[500px]">
              <LazyImage 
                item={featuredItem} 
                className="absolute inset-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <div className="max-w-4xl">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 font-primary">
                    🏏 BNIOC Cricket Academy
                  </h3>
                  <p className="text-lg md:text-xl mb-6 opacity-90 font-secondary">
                    Where champions are made through dedication, training, and passion
                  </p>
                  <div className="flex flex-wrap gap-6">
                    <div className="flex items-center gap-2">
                      <i className="fas fa-users text-primary-400"></i>
                      <span className="font-semibold">100+ Students</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="fas fa-trophy text-primary-400"></i>
                      <span className="font-semibold">15+ Tournaments</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="fas fa-medal text-primary-400"></i>
                      <span className="font-semibold">50+ Awards</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Gallery Grid */}
        <div className="gallery-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {currentItems.map((item) => (
            <div 
              key={item.id} 
              className="group relative bg-white dark:bg-secondary-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="aspect-square">
                <LazyImage 
                  item={item} 
                  className="absolute inset-0"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h4 className="font-bold text-lg mb-1 font-primary">{item.title}</h4>
                  <p className="text-sm opacity-90 font-secondary">{item.description}</p>
                </div>
              </div>
              {item.type === 'video' && (
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full p-2">
                  <i className="fas fa-play text-white text-sm"></i>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                currentPage === 1
                  ? 'text-secondary-400 dark:text-secondary-600 cursor-not-allowed'
                  : 'text-secondary-600 dark:text-secondary-300 hover:bg-primary-100 dark:hover:bg-secondary-800 hover:text-primary-600 dark:hover:text-primary-400'
              }`}
            >
              <i className="fas fa-chevron-left"></i>
              Previous
            </button>

            <div className="flex gap-2">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, index) => {
                let page;
                if (totalPages <= 5) {
                  page = index + 1;
                } else if (currentPage <= 3) {
                  page = index + 1;
                } else if (currentPage >= totalPages - 2) {
                  page = totalPages - 4 + index;
                } else {
                  page = currentPage - 2 + index;
                }

                return (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`w-10 h-10 rounded-lg font-medium transition-all duration-300 ${
                      currentPage === page
                        ? 'bg-primary-500 text-white shadow-lg'
                        : 'text-secondary-600 dark:text-secondary-300 hover:bg-primary-100 dark:hover:bg-secondary-800 hover:text-primary-600 dark:hover:text-primary-400'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>

            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                currentPage === totalPages
                  ? 'text-secondary-400 dark:text-secondary-600 cursor-not-allowed'
                  : 'text-secondary-600 dark:text-secondary-300 hover:bg-primary-100 dark:hover:bg-secondary-800 hover:text-primary-600 dark:hover:text-primary-400'
              }`}
            >
              Next
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        )}

        {/* Instagram Integration */}
        <div className="text-center bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl p-8 lg:p-12 text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 font-primary flex items-center justify-center gap-3">
            <span className="text-3xl">📸</span>
            Follow Us on Instagram
          </h3>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto font-secondary">
            Stay updated with daily training highlights and student achievements
          </p>
          <a 
            href="https://instagram.com/bnioc_cricket" 
            className="inline-flex items-center gap-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 font-semibold"
            target="_blank" 
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram text-xl"></i>
            @bnioc_cricket
          </a>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
