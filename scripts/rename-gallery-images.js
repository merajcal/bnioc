const fs = require('fs');
const path = require('path');

// Rename gallery images with short, meaningful names
function renameGalleryImages() {
  const galleryPath = path.join(__dirname, '../public/assets/images/gallery');
  
  try {
    if (!fs.existsSync(galleryPath)) {
      console.log('❌ Gallery folder not found');
      return;
    }

    // Read all files from gallery folder
    const files = fs.readdirSync(galleryPath);
    
    // Filter only image files
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
    const imageFiles = files.filter(file => 
      imageExtensions.includes(path.extname(file).toLowerCase())
    );

    console.log(`📸 Found ${imageFiles.length} images to rename...`);

    // Meaningful names for BNIOC cricket academy
    const newNames = [
      'training-session-1.jpg',
      'batting-practice.jpg', 
      'bowling-technique.jpg',
      'fielding-drills.jpg',
      'match-practice.jpg',
      'team-celebration.jpg',
      'coaching-session.jpg',
      'tournament-action.jpg',
      'academy-facilities.jpg',
      'student-achievement.jpg',
      'group-training.jpg',
      'cricket-skills.jpg',
      'practice-ground.jpg',
      'team-photo.jpg',
      'winning-moment.jpg',
      'cricket-coaching.jpg',
      'sports-training.jpg',
      'academy-life.jpg',
      'cricket-match.jpg',
      'training-ground.jpg',
      'student-success.jpg',
      'cricket-academy.jpg',
      'team-spirit.jpg',
      'championship.jpg',
      'cricket-excellence.jpg'
    ];

    // Rename files
    imageFiles.forEach((oldFile, index) => {
      if (index < newNames.length) {
        const oldPath = path.join(galleryPath, oldFile);
        const newPath = path.join(galleryPath, newNames[index]);
        
        try {
          // Check if new name already exists
          if (fs.existsSync(newPath)) {
            console.log(`⚠️  ${newNames[index]} already exists, skipping...`);
            return;
          }
          
          fs.renameSync(oldPath, newPath);
          console.log(`✅ ${oldFile} → ${newNames[index]}`);
        } catch (error) {
          console.log(`❌ Failed to rename ${oldFile}: ${error.message}`);
        }
      }
    });

    console.log('\n🎉 Gallery images renamed successfully!');
    console.log('📝 Now run: npm run generate-gallery');
    
  } catch (error) {
    console.error('❌ Error renaming gallery images:', error);
  }
}

// Run the script
renameGalleryImages();
