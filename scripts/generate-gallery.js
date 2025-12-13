const fs = require('fs');
const path = require('path');

// Auto-generate gallery images list
function generateGalleryImages() {
  const galleryPath = path.join(__dirname, '../public/assets/images/gallery');
  const announcementsPath = path.join(__dirname, '../public/assets/images/announcements');
  const outputPath = path.join(__dirname, '../public/data/galleryImages.json');
  
  try {
    // Check if gallery folder exists
    if (!fs.existsSync(galleryPath)) {
      console.log('Gallery folder not found, creating empty list...');
      fs.writeFileSync(outputPath, JSON.stringify([], null, 2));
      return;
    }

    // Read all files from gallery folder
    const galleryFiles = fs.readdirSync(galleryPath);
    
    // Read announcement images if folder exists
    let announcementFiles = [];
    if (fs.existsSync(announcementsPath)) {
      announcementFiles = fs.readdirSync(announcementsPath);
    }
    
    // Filter only image files
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
    const galleryImageFiles = galleryFiles.filter(file => 
      imageExtensions.includes(path.extname(file).toLowerCase())
    );
    const announcementImageFiles = announcementFiles.filter(file => 
      imageExtensions.includes(path.extname(file).toLowerCase())
    );

    // Generate image objects for gallery images
    const galleryImages = galleryImageFiles.map((file, index) => {
      const name = path.parse(file).name;
      const title = name.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');

      return {
        id: index + 1,
        src: `/assets/images/gallery/${file}`,
        alt: title,
        title: title,
        description: `BNIOC ${title}`,
        filename: file,
        category: 'gallery'
      };
    });

    // Generate image objects for announcement images
    const announcementImages = announcementImageFiles.map((file, index) => {
      const name = path.parse(file).name;
      let title = name.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
      
      // Special handling for announcement images
      if (name.includes('ishant')) {
        if (name.includes('debut')) {
          title = 'Ishant Bharadwaj SMAT Debut';
        } else if (name.includes('mom')) {
          title = 'Ishant Bharadwaj Man of the Match';
        }
      }

      return {
        id: galleryImages.length + index + 1,
        src: `/assets/images/announcements/${file}`,
        alt: title,
        title: title,
        description: `BNIOC Achievement - ${title}`,
        filename: file,
        category: 'achievements'
      };
    });

    // Combine both arrays
    const allImages = [...galleryImages, ...announcementImages];

    // Create data directory if it doesn't exist
    const dataDir = path.dirname(outputPath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Write to JSON file
    fs.writeFileSync(outputPath, JSON.stringify(allImages, null, 2));
    
    console.log(`✅ Generated gallery with ${allImages.length} images:`);
    console.log(`   Gallery images: ${galleryImages.length}`);
    console.log(`   Achievement images: ${announcementImages.length}`);
    allImages.forEach(img => console.log(`   - ${img.filename} (${img.category})`));
    
  } catch (error) {
    console.error('❌ Error generating gallery:', error);
    // Create empty array as fallback
    fs.writeFileSync(outputPath, JSON.stringify([], null, 2));
  }
}

// Run the script
generateGalleryImages();
