const fs = require('fs');
const path = require('path');

// Auto-generate gallery images list
function generateGalleryImages() {
  const galleryPath = path.join(__dirname, '../public/assets/images/gallery');
  const outputPath = path.join(__dirname, '../public/data/galleryImages.json');
  
  try {
    // Check if gallery folder exists
    if (!fs.existsSync(galleryPath)) {
      console.log('Gallery folder not found, creating empty list...');
      fs.writeFileSync(outputPath, JSON.stringify([], null, 2));
      return;
    }

    // Read all files from gallery folder
    const files = fs.readdirSync(galleryPath);
    
    // Filter only image files
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
    const imageFiles = files.filter(file => 
      imageExtensions.includes(path.extname(file).toLowerCase())
    );

    // Generate image objects
    const galleryImages = imageFiles.map((file, index) => {
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
        filename: file
      };
    });

    // Create data directory if it doesn't exist
    const dataDir = path.dirname(outputPath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Write to JSON file
    fs.writeFileSync(outputPath, JSON.stringify(galleryImages, null, 2));
    
    console.log(`✅ Generated gallery with ${galleryImages.length} images:`);
    galleryImages.forEach(img => console.log(`   - ${img.filename}`));
    
  } catch (error) {
    console.error('❌ Error generating gallery:', error);
    // Create empty array as fallback
    fs.writeFileSync(outputPath, JSON.stringify([], null, 2));
  }
}

// Run the script
generateGalleryImages();
