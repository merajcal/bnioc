// Utility functions for dynamic video handling

/**
 * Convert player name to filename format
 * Example: "Arjun Sharma" -> "arjun_sharma"
 */
export const nameToFilename = (name) => {
  return name.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
};

/**
 * Generate video paths for a player
 */
export const generateVideoPaths = (playerName) => {
  const filename = nameToFilename(playerName);
  return {
    before: `/assets/videos/progress/before/${filename}.mov`,
    after: `/assets/videos/progress/after/${filename}.mov`,
    beforeThumbnail: `/assets/images/thumbnails/${filename}_before.jpg`,
    afterThumbnail: `/assets/images/thumbnails/${filename}_after.jpg`
  };
};

/**
 * Check if video file exists (for fallback handling)
 */
export const checkVideoExists = async (videoPath) => {
  try {
    const response = await fetch(videoPath, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    return false;
  }
};

/**
 * Get available video formats for a player
 * Checks multiple video formats and returns the first available one
 */
export const getAvailableVideoPath = async (playerName, type) => {
  const filename = nameToFilename(playerName);
  const formats = ['mp4', 'webm', 'mov'];
  
  for (const format of formats) {
    const path = `/assets/videos/progress/${type}/${filename}.${format}`;
    const exists = await checkVideoExists(path);
    if (exists) {
      return path;
    }
  }
  
  // Return default path if no video found
  return `/assets/videos/progress/${type}/${filename}.mp4`;
};

/**
 * Scan directory for available player videos
 * This would be used if you want to auto-discover players from video files
 */
export const scanForPlayerVideos = async () => {
  // This would require a backend API to scan the directory
  // For now, we'll use the static player list
  // In a real implementation, you could have an API endpoint that scans the video directory
  return [];
};

/**
 * Generate player data with dynamic video paths
 */
export const generatePlayerData = (players) => {
  return players.map(player => {
    const videoPaths = generateVideoPaths(player.name);
    console.log('Video paths for', player.name, videoPaths);
    return {
      ...player,
      beforeVideo: videoPaths.before,
      afterVideo: videoPaths.after,
      beforeThumbnail: videoPaths.beforeThumbnail,
      afterThumbnail: videoPaths.afterThumbnail
    };
  });
};
