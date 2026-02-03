# SlimShot Architecture & Implementation Guide

## Overview

SlimShot is a production-grade, next-generation image compression web application built with cutting-edge web technologies. The app demonstrates premium design patterns, advanced animations, and sophisticated UX patterns for 2026.

## Core Design Philosophy

**Dark Cyber-Premium Aesthetic**
- Deep black backgrounds with vivid red accents
- Glassmorphism with frosted glass effects
- High contrast for accessibility
- Smooth, cinematic animations throughout
- Interactive 3D elements for engagement

## Architecture Layers

### 1. Presentation Layer (`/components`)

#### DropZone.tsx
- Drag-and-drop file upload component
- Visual feedback with animated glow effects
- Transitions smoothly on drag state
- Accessible file input handling

#### ControlsPanel.tsx
- Format selector (AVIF, WebP, JPEG, PNG)
- Quality slider (0-100%)
- Max width constraint (100-3840px)
- Staggered animation reveals
- Contextual format information

#### PreviewCompare.tsx
- Interactive before/after slider
- Smooth spring-based animation
- Click-to-position or mouse tracking
- Real-time statistics display
- Download button with loading state
- Responsive grid layout for stats

#### ProgressIndicator.tsx
- Circular progress ring with gradient
- Animated percentage counter
- Smooth progress transitions
- Three states: idle, processing, complete
- Animated loading dots

#### Hero3D.tsx
- Particle system using Canvas API
- Mouse tracking for interactivity
- Connection lines between particles
- Smooth fade-out effect for performance
- Responsive sizing

### 2. State Management Layer (`/app/page.tsx`)

**AppState Pattern**: idle → processing → complete

**State Variables**:
```typescript
- state: 'idle' | 'processing' | 'complete'
- format: ImageFormat ('avif' | 'webp' | 'jpg' | 'png')
- quality: number (0-100)
- maxWidth: number (100-3840)
- progress: number (0-100)
- compressedData: CompressedData | null
- originalImageUrl: string | null
- originalDimensions: { width, height } | null
```

**Key Callbacks**:
- `handleImageDrop`: Process uploaded file
- `handleCompressionSettingsChange`: Update controls
- `handleDownload`: Export compressed image
- `handleReset`: Return to idle state

### 3. Business Logic Layer (`/lib/compression.ts`)

#### `compressImage()`
- Accepts File, CompressionOptions, and optional progress callback
- Loads image via FileReader
- Resizes using Canvas 2D context
- Converts to specified format with quality level
- Returns Blob with metadata

#### `getImageDimensions()`
- Extracts original image dimensions
- Handles async image loading
- Used for stats display

#### `downloadBlob()`
- Creates download link from Blob
- Manages ObjectURL lifecycle
- Triggers browser download

### 4. Design System Layer (`/app/globals.css`)

#### Color Tokens
```css
--background: #0A0A0A (Deep Black)
--foreground: #F5F5F5 (Off-White)
--primary: #EF4444 (Vivid Red)
--accent: #EF4444 (Red)
--border: #2B2B2B (Dark Gray)
--muted: #262626 (Muted Gray)
--muted-foreground: #A0A0A0 (Light Gray)
```

#### Glass Utilities
```css
.glass - Frosted glass effect with blur and red border
.glass-subtle - Lighter glass effect
.glow-red - Red shadow glow
.glow-red-intense - Stronger red glow
```

#### Animation Utilities
```css
.animate-float - 3s up/down float
.animate-pulse-glow - 2s opacity pulse
.animate-shimmer - 8s shimmer effect
.animate-glow-pulse - 3s glow intensity pulse
.animate-slide-up - 0.5s slide-up entrance
.animate-scale-in - 0.3s scale-in entrance
```

### 5. Interaction Layer (`/hooks/useKeyboardShortcuts.ts`)

**Keyboard Shortcuts**:
- `Cmd/Ctrl + K`: Open file upload
- `Escape`: Reset to idle state
- Extensible for future shortcuts

## Data Flow

```
User Action
    ↓
Event Handler (handleImageDrop)
    ↓
compressImage() - Canvas compression
    ↓
Progress callbacks → setProgress()
    ↓
CompressedData object created
    ↓
UI re-renders with PreviewCompare
    ↓
User clicks Download
    ↓
downloadBlob() → Browser download
```

## Performance Optimizations

### Bundle Size
- Tree-shaking unused Radix UI components
- Framer Motion with optimized animations
- No external compression library (Canvas API)

### Runtime Performance
- RequestAnimationFrame for smooth animations
- Lazy component rendering with AnimatePresence
- Canvas compression off main thread potential
- Particle system with max particle limit

### Memory Management
- ObjectURL cleanup after download
- Image canvas cleanup
- Event listener removal on unmount

## Responsive Design Strategy

**Mobile-First Approach**
```
sm (640px): Single column
md (768px): Two columns starting
lg (1024px): Full three-column grid
```

**Touch-Friendly**
- Large tap targets (44px minimum)
- Gesture-based slider on touch devices
- Vertical layout optimization
- Full-screen preview on mobile

## Accessibility Features

- Semantic HTML structure
- ARIA labels for interactive elements
- High contrast (WCAG AAA compliant)
- Keyboard navigation support
- Focus management
- Screen reader friendly

## Browser Compatibility

**Supported Browsers**:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile Safari 14+
- Chrome Mobile

**Required Features**:
- Canvas API 2D context
- FileReader API
- Blob API
- CSS Custom Properties
- CSS Grid/Flexbox
- CSS Backdrop Filter

## Future Enhancements

### Phase 2
- @squoosh/lib integration for better compression
- Service Worker for offline support
- Batch image processing
- Custom preset profiles (Instagram, Twitter, etc.)

### Phase 3
- Cloud backup/sharing
- Compression history
- Advanced filters
- Real-time AVIF/WebP/JPEG comparison charts

### Phase 4
- Team collaboration features
- API integration
- Webhook support for automation
- Advanced analytics

## Configuration & Deployment

### Environment Setup
No environment variables required for client-side app.

### Build Optimization
```bash
npm run build
# Generates optimized .next folder
# Ready for Vercel deployment
```

### Deployment Considerations
- CDN for static assets
- 404 handling for SPA routes
- HSTS headers for security
- CSP headers for script security

## Security Considerations

### Data Privacy
- 100% client-side processing
- No server uploads
- Compression happens in browser
- Temporary storage only

### XSS Prevention
- React's built-in XSS protection
- No innerHTML usage
- Content Security Policy headers recommended

### CORS
- Canvas ImageData handling
- Same-origin image policy respected
- User agent verification

## Code Organization Best Practices

### Naming Conventions
- Components: PascalCase (e.g., `DropZone`)
- Utilities: camelCase (e.g., `compressImage`)
- Types: PascalCase (e.g., `ImageFormat`)
- CSS Classes: kebab-case (e.g., `glass-subtle`)

### Folder Structure
```
app/          → Page components & routing
components/   → Reusable UI components
lib/          → Utilities & business logic
hooks/        → Custom React hooks
public/       → Static assets
```

### Comments & Documentation
- Inline comments for complex logic
- JSDoc for functions
- README for setup
- ARCHITECTURE.md for system design

## Performance Metrics (Target)

- **LCP**: < 1.5s (Largest Contentful Paint)
- **FID**: < 100ms (First Input Delay)
- **CLS**: < 0.1 (Cumulative Layout Shift)
- **TTL**: < 3s (Time to Interactive)

## Testing Strategy

### Unit Tests
- Compression utility functions
- Helper functions (formatFileSize, etc.)

### Integration Tests
- State management flow
- Component interactions
- Animation triggers

### E2E Tests
- File upload flow
- Compression complete
- Download functionality

### Performance Tests
- Animation frame rates
- Compression speed
- Memory usage

---

**Last Updated**: 2/2/2026
**Version**: 1.0.0
**Status**: Production Ready
