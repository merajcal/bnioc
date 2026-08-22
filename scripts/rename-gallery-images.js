const fs = require('fs');
const path = require('path');

const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.heic', '.heif'];

// Meaningful names for BNIOC cricket academy images.
const baseNames = [
  'training-session-1',
  'batting-practice',
  'bowling-technique',
  'fielding-drills',
  'match-practice',
  'team-celebration',
  'coaching-session',
  'tournament-action',
  'academy-facilities',
  'student-achievement',
  'group-training',
  'cricket-skills',
  'practice-ground',
  'team-photo',
  'winning-moment',
  'cricket-coaching',
  'sports-training',
  'academy-life',
  'cricket-match',
  'training-ground',
  'student-success',
  'cricket-academy',
  'team-spirit',
  'championship',
  'cricket-excellence',
  'net-practice',
  'batting-drills',
  'bowling-practice',
  'fielding-practice',
  'fitness-training',
  'warmup-session',
  'practice-match',
  'coach-guidance',
  'academy-ground',
  'team-huddle',
  'skills-workshop',
  'cricket-camp',
  'match-moment',
  'player-practice',
  'training-drills'
];

const shouldDryRun = process.argv.includes('--dry-run');
const shouldRenameAll = process.argv.includes('--all');

function toDisplayPath(filePath) {
  return filePath.split(path.sep).join('/');
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getImageFiles(folderPath) {
  const imageFiles = [];

  function walk(currentPath) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true })
      .sort((a, b) => a.name.localeCompare(b.name));

    entries.forEach((entry) => {
      const entryPath = path.join(currentPath, entry.name);

      if (entry.isDirectory()) {
        walk(entryPath);
        return;
      }

      if (entry.isFile() && imageExtensions.includes(path.extname(entry.name).toLowerCase())) {
        imageFiles.push({
          absolutePath: entryPath,
          relativePath: path.relative(folderPath, entryPath)
        });
      }
    });
  }

  walk(folderPath);
  return imageFiles;
}

function groupImagesByFolder(imageFiles) {
  return imageFiles.reduce((groups, image) => {
    const folder = path.dirname(image.relativePath);

    if (!groups.has(folder)) {
      groups.set(folder, []);
    }

    groups.get(folder).push(image);
    return groups;
  }, new Map());
}

function shouldRename(fileName) {
  const name = path.parse(fileName).name;

  return [
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    /^[0-9a-f]{16,}$/i,
    /^img[-_]?\d+/i,
    /^dsc[-_]?\d+/i,
    /^pxl[-_]?\d+/i,
    /^vid[-_]?\d+/i,
    /^\d{8}[-_]?\d{6}/
  ].some((pattern) => pattern.test(name));
}

function getFolderPrefix(relativeFolder) {
  if (relativeFolder === '.') {
    return '';
  }

  return slugify(toDisplayPath(relativeFolder));
}

function getBaseName(index, folderPrefix) {
  const baseName = baseNames[index] || `gallery-image-${index + 1}`;
  return folderPrefix ? `${folderPrefix}-${baseName}` : baseName;
}

function getAvailablePath(folderPath, baseName, extension, currentPath) {
  let suffix = 1;
  let fileName = `${baseName}${extension}`;
  let nextPath = path.join(folderPath, fileName);

  while (fs.existsSync(nextPath) && path.resolve(nextPath) !== path.resolve(currentPath)) {
    suffix += 1;
    fileName = `${baseName}-${suffix}${extension}`;
    nextPath = path.join(folderPath, fileName);
  }

  return { fileName, nextPath };
}

// Rename gallery images with short, meaningful names
function renameGalleryImages() {
  const galleryPath = path.join(__dirname, '../public/assets/images/gallery');
  
  try {
    if (!fs.existsSync(galleryPath)) {
      console.log('Gallery folder not found');
      return;
    }

    const imageFiles = getImageFiles(galleryPath);
    const groupedImages = groupImagesByFolder(imageFiles);
    let renamedCount = 0;
    let skippedCount = 0;

    console.log(`Found ${imageFiles.length} images in gallery folders.`);
    console.log(`Mode: ${shouldDryRun ? 'dry run' : 'rename files'}`);
    console.log(`Rename scope: ${shouldRenameAll ? 'all images' : 'camera/default file names only'}\n`);

    groupedImages.forEach((images, relativeFolder) => {
      const folderPath = relativeFolder === '.'
        ? galleryPath
        : path.join(galleryPath, relativeFolder);
      const folderPrefix = getFolderPrefix(relativeFolder);
      let renameIndex = 0;

      console.log(`Folder: ${toDisplayPath(relativeFolder)}`);

      images.forEach((image) => {
        const oldFileName = path.basename(image.relativePath);

        if (!shouldRenameAll && !shouldRename(oldFileName)) {
          skippedCount += 1;
          console.log(`  skip ${oldFileName}`);
          return;
        }

        const extension = path.extname(oldFileName).toLowerCase();
        const baseName = getBaseName(renameIndex, folderPrefix);
        const { fileName: newFileName, nextPath: newPath } = getAvailablePath(
          folderPath,
          baseName,
          extension,
          image.absolutePath
        );

        renameIndex += 1;

        if (path.resolve(image.absolutePath) === path.resolve(newPath)) {
          skippedCount += 1;
          console.log(`  skip ${oldFileName}`);
          return;
        }

        try {
          if (!shouldDryRun) {
            fs.renameSync(image.absolutePath, newPath);
          }

          renamedCount += 1;
          console.log(`  ${shouldDryRun ? 'would rename' : 'renamed'} ${oldFileName} -> ${newFileName}`);
        } catch (error) {
          console.log(`  failed ${oldFileName}: ${error.message}`);
        }
      });

      console.log('');
    });

    console.log(`Done. Renamed: ${renamedCount}. Skipped: ${skippedCount}.`);
    console.log('Now run: npm run generate-gallery');
    
  } catch (error) {
    console.error('Error renaming gallery images:', error);
  }
}

// Run the script
renameGalleryImages();
