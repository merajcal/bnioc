# BNIOC Announcement System

## Overview
The BNIOC website now includes a powerful announcement system that displays breaking news, important declarations, and announcements to users when they launch the app. The system is mobile-first, responsive, and supports multiple announcements with images.

## Features
- **Mobile-First Design**: Optimized for mobile devices with responsive scaling
- **Multiple Announcements**: Support for multiple announcements with navigation
- **Priority System**: High, medium, and low priority announcements
- **Image Support**: Each announcement can include an image
- **Smart Display**: Announcements respect publish/expiry dates
- **User Tracking**: "Show once" announcements are tracked via localStorage
- **Accessibility**: Full keyboard navigation and screen reader support
- **Dark/Light Theme**: Matches the website's theme system

## How to Add New Announcements

### 1. Edit the Announcements Data File
Edit `/src/data/announcements.json` to add new announcements:

```json
{
  "id": "unique-announcement-id",
  "type": "breaking_news", // or "announcement"
  "priority": "high", // "high", "medium", or "low"
  "title": "Your Announcement Title",
  "message": "Your detailed announcement message here.",
  "image": "/images/announcements/your-image.jpg",
  "imageAlt": "Alt text for your image",
  "badge": "🏏 BREAKING NEWS", // Emoji + text
  "publishDate": "2024-12-13T19:00:00.000Z",
  "expiryDate": "2024-12-20T23:59:59.000Z",
  "isActive": true,
  "showOnce": false, // true = show only once per user
  "category": "achievement", // "achievement", "program", "facility", etc.
  "actionButton": { // Optional
    "text": "Learn More",
    "link": "/programs"
  }
}
```

### 2. Add Images
Place announcement images in `/public/images/announcements/`

### 3. Announcement Properties

#### Required Fields
- `id`: Unique identifier for the announcement
- `type`: "breaking_news" or "announcement"
- `priority`: "high", "medium", or "low"
- `title`: Main headline
- `message`: Detailed message
- `publishDate`: When to start showing (ISO 8601 format)
- `expiryDate`: When to stop showing (ISO 8601 format)
- `isActive`: Boolean to enable/disable

#### Optional Fields
- `image`: Path to announcement image
- `imageAlt`: Alt text for accessibility
- `badge`: Display badge with emoji and text
- `showOnce`: Show only once per user (tracked in localStorage)
- `category`: For organization/filtering
- `actionButton`: Call-to-action button with text and link

### 4. Priority System
- **High Priority**: Red gradient badge with pulsing animation, shown first
- **Medium Priority**: Green gradient badge, shown after high priority
- **Low Priority**: Blue gradient badge, shown last

### 5. Display Logic
Announcements are displayed based on:
1. Active status (`isActive: true`)
2. Current date within publish/expiry range
3. "Show once" tracking (if enabled)
4. Priority order (high → medium → low)
5. Publish date (newest first within same priority)

## Example Announcements

### Breaking News Example
```json
{
  "id": "player-debut-2024",
  "type": "breaking_news",
  "priority": "high",
  "title": "Syed Mushtaq Ali Trophy Debut",
  "message": "Congratulations to Ishant Bhardwaj on his Syed Mushtaq Ali Trophy debut against Vadodara. A proud moment for our academy!",
  "image": "/images/announcements/ishant-debut.jpg",
  "badge": "🏏 BREAKING NEWS",
  "publishDate": "2024-12-13T19:00:00.000Z",
  "expiryDate": "2024-12-20T23:59:59.000Z",
  "isActive": true,
  "showOnce": false,
  "category": "achievement"
}
```

### Program Announcement Example
```json
{
  "id": "winter-camp-2025",
  "type": "announcement",
  "priority": "medium",
  "title": "Winter Training Camp 2025",
  "message": "Registration now open for our intensive Winter Training Camp starting January 2025. Limited seats available!",
  "image": "/images/announcements/winter-camp.jpg",
  "badge": "📢 ANNOUNCEMENT",
  "publishDate": "2024-12-10T00:00:00.000Z",
  "expiryDate": "2024-12-31T23:59:59.000Z",
  "isActive": true,
  "showOnce": true,
  "category": "program",
  "actionButton": {
    "text": "Register Now",
    "link": "/contact"
  }
}
```

## Technical Implementation

### Components
- `AnnouncementModal.js`: Main modal component
- `AnnouncementModal.css`: Responsive styling
- `announcements.json`: Data file

### Integration
The system is integrated into `App.js` and automatically loads announcements on app start with a 1-second delay.

### Storage
User viewing history is stored in `localStorage` under the key `bnioc_viewed_announcements`.

### Responsive Design
- Mobile: 400px max width, optimized touch interactions
- Tablet: 500px max width, enhanced spacing
- Desktop: 600px max width, larger images and text

## Maintenance

### Regular Tasks
1. Update expiry dates for time-sensitive announcements
2. Set `isActive: false` for outdated announcements
3. Add new announcements as needed
4. Optimize images for web (recommended: 800x600px, WebP format)

### Image Guidelines
- Recommended size: 800x600px (4:3 aspect ratio)
- Format: WebP or JPG
- File size: Under 200KB for fast loading
- Alt text: Always provide descriptive alt text

### Testing
Test announcements by:
1. Clearing localStorage: `localStorage.removeItem('bnioc_viewed_announcements')`
2. Refreshing the page
3. Checking mobile responsiveness
4. Verifying dark/light theme compatibility

## Troubleshooting

### Announcements Not Showing
1. Check `isActive: true`
2. Verify publish/expiry dates
3. Clear localStorage for "show once" announcements
4. Check browser console for errors

### Image Not Loading
1. Verify image path in `/public/images/announcements/`
2. Check image file permissions
3. Ensure image format is supported (JPG, PNG, WebP)
4. Check browser network tab for 404 errors

### Styling Issues
1. Clear browser cache
2. Check CSS file is properly imported
3. Verify theme compatibility (dark/light mode)
4. Test on different screen sizes
