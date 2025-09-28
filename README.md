# Bengaluru Nex-Gen Institute of Cricket (BNIOC)

A modern, responsive Progressive Web Application (PWA) for Bengaluru Nex-Gen Institute of Cricket, featuring comprehensive cricket training programs, expert coaching profiles, and seamless user experience.

## 🏏 Features

### Core Features
- **Responsive Design**: Optimized for all devices (desktop, tablet, mobile)
- **Progressive Web App**: Installable, offline-capable, and app-like experience
- **Modern UI/UX**: Clean, professional design with cricket academy branding
- **Fast Performance**: Optimized loading times and smooth animations

### Sections
- **Home**: Hero section with academy highlights and statistics
- **About**: Academy information and key features
- **Programs**: Detailed training programs with pricing
- **Coaches**: Expert coaching staff profiles
- **Gallery**: Photo gallery with lightbox functionality
- **News & Events**: Latest updates and announcements
- **Fee Structure**: Transparent pricing table
- **Contact**: Contact form and academy information

### Technical Features
- **PWA Capabilities**: Service worker, manifest, offline support
- **Smooth Scrolling**: Enhanced navigation experience
- **Form Validation**: Client-side form validation with notifications
- **Lazy Loading**: Optimized image loading
- **SEO Optimized**: Meta tags, structured data, and semantic HTML
- **Accessibility**: WCAG compliant design

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional for development)

### Installation

1. **Clone or Download**
   ```bash
   git clone <repository-url>
   cd bnioc
   ```

2. **Serve the Application**
   
   **Option A: Using Python (if installed)**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```
   
   **Option B: Using Node.js (if installed)**
   ```bash
   npx serve .
   ```
   
   **Option C: Using PHP (if installed)**
   ```bash
   php -S localhost:8000
   ```
   
   **Option D: Using Live Server (VS Code Extension)**
   - Install "Live Server" extension in VS Code
   - Right-click on `index.html` and select "Open with Live Server"

3. **Access the Application**
   - Open your browser and navigate to `http://localhost:8000`
   - The application will load with full functionality

## 📱 PWA Installation

### Desktop
1. Open the website in Chrome/Edge
2. Look for the install icon in the address bar
3. Click "Install" to add to your desktop

### Mobile
1. Open the website in Chrome/Safari
2. Tap the share button
3. Select "Add to Home Screen"
4. The app will be available on your home screen

## 🎨 Design System

### Color Palette
- **Primary**: #FF6B35 (Orange)
- **Secondary**: #1a1a1a (Dark)
- **Accent**: #FFA500 (Light Orange)
- **Text**: #333333 (Dark Gray)
- **Background**: #ffffff (White)

### Typography
- **Primary Font**: Montserrat (Headings)
- **Secondary Font**: Source Sans Pro (Body text)

## 📁 Project Structure

```
bnioc/
├── index.html              # Main HTML file
├── manifest.json           # PWA manifest
├── sw.js                  # Service worker
├── css/
│   └── style.css          # Main stylesheet
├── js/
│   └── main.js            # JavaScript functionality
├── public/
│   └── assets/
│       ├── logo.png       # Academy logo
│       └── theme and content.png  # Design reference
└── README.md              # This file
```

## 🔧 Customization

### Content Updates
- **Academy Information**: Edit the content in `index.html`
- **Programs & Pricing**: Update the programs section with current offerings
- **Coach Profiles**: Replace coach information and photos
- **Contact Details**: Update contact information and address

### Styling
- **Colors**: Modify CSS variables in `:root` selector in `style.css`
- **Fonts**: Update font imports in HTML head and CSS font-family declarations
- **Layout**: Adjust grid layouts and spacing in CSS

## 📱 Browser Support

- **Chrome**: 60+
- **Firefox**: 60+
- **Safari**: 12+
- **Edge**: 79+
- **Mobile Browsers**: iOS Safari 12+, Chrome Mobile 60+

## 🚀 Deployment

### GitHub Pages
1. Push code to GitHub repository
2. Enable GitHub Pages in repository settings
3. Select source branch (usually `main` or `gh-pages`)

### Netlify
1. Connect GitHub repository to Netlify
2. Set build command: (none needed for static site)
3. Set publish directory: `/`

## 📞 Support

For support and inquiries:
- **Email**: info@bnioc.com
- **Phone**: +91 79740 94110
- **Address**: Global White Pearl, Panditana Agrahara, Bengaluru, Karnataka 562125

---

**Built with ❤️ for Bengaluru Nex-Gen Institute of Cricket**
