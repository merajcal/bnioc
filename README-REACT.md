# BNIOC - Bengaluru Nex-Gen Institute of Cricket (React App)

A modern, responsive React Progressive Web Application (PWA) for Bengaluru Nex-Gen Institute of Cricket, featuring comprehensive cricket training programs, expert coaching profiles, and seamless user experience.

## 🚀 Features

- **React 18**: Modern React application with functional components
- **Responsive Design**: Optimized for all devices and screen sizes
- **PWA Functionality**: Installable app with offline support
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Hero Carousel**: Dynamic slideshow showcasing key programs and achievements
- **Interactive Sections**: Programs, facilities, gallery, testimonials, and more
- **Contact Integration**: Easy enrollment and inquiry system with Google Forms
- **SEO Optimized**: Complete meta tags and structured data

## 🛠️ Technology Stack

- **Frontend**: React 18.2.0
- **Build Tool**: Create React App (react-scripts 5.0.1)
- **Styling**: Custom CSS with CSS Variables
- **Icons**: Font Awesome 6.4.0
- **Fonts**: Google Fonts (Montserrat, Source Sans Pro)
- **PWA**: Service Worker, Web App Manifest

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## 🚀 Getting Started

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Start the development server:**
```bash
npm start
```

3. **Build for production:**
```bash
npm run build
```

4. **Test the production build:**
```bash
npm run build && npx serve -s build
```

## 📁 Project Structure

```
bnioc/
├── public/
│   ├── index.html          # Main HTML template
│   ├── manifest.json       # PWA manifest
│   └── assets/            # Static assets
│       ├── images/
│       └── logo.png
├── src/
│   ├── App.js             # Main React component
│   ├── index.js           # React entry point
│   └── css/
│       └── style.css      # All styles
├── package.json           # Dependencies and scripts
└── README.md             # This file
```

## 🧩 React Components

- **App.js**: Main application component containing all sections
  - **Header**: Navigation with responsive menu
  - **Hero Section**: Main banner with statistics
  - **Summer Camp**: Featured program section
  - **About**: Academy information and features
  - **Gallery**: Photo gallery with Instagram integration
  - **Contact**: Contact information and Google Forms integration
  - **Footer**: Site links and social media

## 🏏 Programs Offered

1. **Summer Camp 2025** - ₹45,000 (45 Days, Ages 8-18)
2. **Annual Academy** - ₹75,000 (12 Months, Ages 10-20) - Most Popular
3. **Weekend Coaching** - ₹25,000 (3 Months, Ages 6-16)
4. **Individual Coaching** - ₹2,000/session (Per Session, All Ages)

## 📞 Contact Information

- **Location**: Global White Pearl, Panditana Agrahara, Bengaluru, Karnataka 562125
- **Phone**: +91 79740 94110, +91 88811 13107
- **Email**: info@batkhelo.com, admissions@batkhelo.com
- **Instagram**: @bnioc_cricketers
- **Training Hours**: Monday-Saturday: 6:00 AM - 8:00 PM, Sunday: 7:00 AM - 6:00 PM

## 📜 Available Scripts

In the project directory, you can run:

- `npm start` - Runs the app in development mode on http://localhost:3000
- `npm run build` - Builds the app for production to the `build` folder
- `npm test` - Launches the test runner in interactive watch mode
- `npm run eject` - Ejects from Create React App (⚠️ one-way operation)

## 🚀 Deployment

The app can be deployed to any static hosting service:

### Netlify
1. Connect your Git repository
2. Set build command: `npm run build`
3. Set publish directory: `build`

### Vercel
1. Import your Git repository
2. Vercel will automatically detect it's a React app
3. Deploy with zero configuration

### GitHub Pages
```bash
npm install --save-dev gh-pages
# Add to package.json scripts: "deploy": "gh-pages -d build"
npm run build
npm run deploy
```

### Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

## 🔧 Development

### Adding New Sections
1. Add the JSX content to `App.js`
2. Add corresponding CSS to `src/css/style.css`
3. Update navigation links if needed

### Customizing Styles
- All styles are in `src/css/style.css`
- Uses CSS custom properties for theming
- Responsive design with mobile-first approach

### Adding Images
- Place images in `public/assets/images/`
- Reference them as `./assets/images/filename.jpg` in JSX

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- Cricket images from Unsplash
- Icons from Font Awesome
- Fonts from Google Fonts
- React community for excellent documentation and tools
