const fs = require('fs');
const path = require('path');

const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.heic', '.heif'];

function toUrlPath(filePath) {
  return filePath.split(path.sep).join('/');
}

function getImageFiles(folderPath) {
  if (!fs.existsSync(folderPath)) {
    return [];
  }

  const files = [];

  function walk(currentPath) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });

    entries.forEach((entry) => {
      const entryPath = path.join(currentPath, entry.name);

      if (entry.isDirectory()) {
        walk(entryPath);
        return;
      }

      if (entry.isFile() && imageExtensions.includes(path.extname(entry.name).toLowerCase())) {
        files.push(toUrlPath(path.relative(folderPath, entryPath)));
      }
    });
  }

  walk(folderPath);
  return files.sort((a, b) => a.localeCompare(b));
}

function sortGalleryFiles(files) {
  return files.sort((a, b) => {
    const aIsIttangur = a.startsWith('ittangur/');
    const bIsIttangur = b.startsWith('ittangur/');

    if (aIsIttangur !== bIsIttangur) {
      return aIsIttangur ? -1 : 1;
    }

    return a.localeCompare(b);
  });
}

function getTitleFromFile(file) {
  const name = path.parse(file).name;

  return name.split(/[-_\s]+/).map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

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

    // Read all images from gallery folder, including nested folders.
    const galleryImageFiles = sortGalleryFiles(getImageFiles(galleryPath));
    const announcementImageFiles = getImageFiles(announcementsPath);

    // Generate image objects for gallery images
    const galleryImages = galleryImageFiles.map((file, index) => {
      const title = getTitleFromFile(file);

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
      let title = getTitleFromFile(file);
      
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
