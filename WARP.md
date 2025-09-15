# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is Kevin Nshuti's personal portfolio website - a modern, responsive single-page application built with vanilla HTML, CSS, and JavaScript. The site showcases a Software Engineering student's skills, education, and projects without any build tools or frameworks.

## Common Commands

### Development Server
```bash
# Serve the website locally using Python 3
python -m http.server 8000

# Serve using Node.js live-server (if installed)
npx live-server

# For PowerShell on Windows - simple alternative
Start-Process "index.html"
```

### File Watching & Live Reload
```bash
# Install and use live-server for automatic reload during development
npm install -g live-server
live-server --port=8000
```

### Testing & Validation
```bash
# No formal test suite - manually test by:
# 1. Opening index.html in multiple browsers
# 2. Testing responsive design at different screen sizes
# 3. Validating HTML at https://validator.w3.org/
# 4. Validating CSS at https://jigsaw.w3.org/css-validator/
```

## Code Architecture

### File Structure & Purpose
- `index.html` - Single-page application containing all sections (hero, about, education, skills, projects, contact)
- `css/styles.css` - Complete styling with responsive design, animations, and component styles
- `js/script.js` - All interactive functionality including navigation, animations, and form handling

### Key Architectural Patterns

**Single-Page Application (SPA) Structure:**
- All content sections are in one HTML file with anchor-based navigation
- Smooth scrolling between sections using JavaScript
- Fixed navigation with active section highlighting

**CSS Architecture:**
- Mobile-first responsive design with breakpoints at 768px and 480px
- CSS Grid and Flexbox for layout systems
- Component-based styling (hero, about, skills, projects, contact, footer)
- CSS custom properties for consistent colors (#3498db, #2980b9 gradient theme)

**JavaScript Module Pattern:**
- Everything wrapped in DOMContentLoaded event listener
- Functional programming approach with separate functions for each feature
- Event-driven architecture for user interactions

### Core Interactive Features

**Navigation System (`js/script.js` lines 3-51):**
- Smooth scroll to sections with navbar height compensation
- Active section highlighting based on scroll position
- Dynamic navbar background opacity on scroll

**Animation System (`js/script.js` lines 68-95):**
- Scroll-triggered fade-in animations for cards and sections
- CSS keyframe animations for hero section
- Hover effects for interactive elements

**Form Handling (`js/script.js` lines 97-142):**
- Client-side validation with regex email checking
- Notification system for user feedback
- Simulated form submission (no backend integration)

**Mobile Responsiveness (`js/script.js` lines 234-298):**
- Dynamic mobile menu creation and toggle
- Responsive navigation that adapts to screen size

## Development Guidelines

### When Modifying Styles
- Colors follow the blue gradient theme (#3498db to #2980b9)
- All animations use CSS transitions with 0.3s ease timing
- Maintain responsive design with mobile-first approach
- Grid layouts use `auto-fit` with minimum 300px columns

### When Adding New Sections
1. Add HTML structure to `index.html` following existing pattern
2. Add corresponding navigation link in `.nav-menu`
3. Style the new section in `styles.css` following component structure
4. Add any interactive JavaScript to `script.js` within the DOMContentLoaded listener

### When Working with Animations
- All scroll animations are controlled by the `animateOnScroll()` function
- New animated elements should be added to the selector in line 70 of `script.js`
- CSS animations use `fadeInUp` keyframe defined in `styles.css`

### Browser Compatibility
- Uses modern CSS features (Grid, Flexbox, backdrop-filter)
- Vanilla JavaScript with ES6+ features
- No polyfills included - targets modern browsers
- External dependency: Font Awesome 6.0.0 via CDN

### Asset Management
- No image assets currently used (placeholder icons via Font Awesome)
- All styles are inline (no CSS preprocessors)
- No build process required - direct file editing

## Contact Form Integration

The contact form is currently client-side only with validation. To integrate with a backend:
1. Replace the simulated submission in `script.js` lines 123-141
2. Add actual form submission endpoint
3. Update the success/error handling based on server response
4. Consider adding CSRF protection for production

## Performance Considerations

- Lightweight vanilla approach (no framework overhead)
- CSS and JS are not minified (suitable for development)
- All assets loaded synchronously (consider async/defer for production)
- Font Awesome loaded from CDN (consider local hosting for production)