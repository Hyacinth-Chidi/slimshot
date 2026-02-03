# SlimShot - AI Image Compressor

A high-end, production-grade image compression web application with a dark cyber-premium aesthetic. Built with Next.js 16, React 19, Tailwind CSS 4, and Framer Motion.

## Features

- **100% Client-Side Processing**: No data leaves your device. Privacy first.
- **Multiple Format Support**: AVIF, WebP, JPEG, PNG with advanced quality controls
- **Real-Time Compression**: Instant results with progress indication
- **Before/After Comparison**: Interactive slider to compare original vs. compressed
- **Dimension Scaling**: Resize images while preserving aspect ratio
- **3D Animation**: Engaging particle system and 3D hero scene
- **Dark Cyber Aesthetic**: Premium design with glassmorphism and red accents
- **Fully Responsive**: Optimized for mobile, tablet, and desktop

## Tech Stack

- **Framework**: Next.js 16+ with App Router & React 19
- **Styling**: Tailwind CSS 4 with custom glass utilities
- **Animation**: Framer Motion 12+ for smooth, cinematic transitions
- **Icons**: Lucide React for consistent iconography
- **Image Compression**: Canvas API (production version uses @squoosh/lib)
- **Type Safety**: Full TypeScript support

## Project Structure

```
slimshot/
├── app/
│   ├── page.tsx              # Main compressor page with state management
│   ├── layout.tsx            # Root layout with metadata and theme
│   └── globals.css           # Theme tokens, glass utilities, animations
├── components/
│   ├── DropZone.tsx         # Image upload with drag-and-drop
│   ├── ControlsPanel.tsx    # Format, quality, and dimension controls
│   ├── PreviewCompare.tsx   # Before/after slider and statistics
│   ├── ProgressIndicator.tsx # Animated compression progress
│   └── Hero3D.tsx           # Particle-based 3D animation hero
├── lib/
│   └── compression.ts       # Image compression logic and utilities
└── public/                  # Static assets
```

## Getting Started

### Installation

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Design System

### Color Palette

- **Primary**: Deep Black (#0A0A0A)
- **Accent**: Vivid Red (#EF4444)
- **Text**: Off-White (#F5F5F5)
- **Muted**: Gray (#A0A0A0)
- **Glass**: Frosted glass with `backdrop-blur-lg` and `border-red-900/30`

### Typography

- **Headlines**: Geist (font-sans)
- **Monospace**: Geist Mono (font-mono)
- All fonts from Google Fonts via `next/font/google`

### Animations

- **Glass UI**: Smooth glassmorphism transitions
- **Micro-interactions**: Button presses with glow effects
- **Stagger animations**: Sequenced component reveals
- **Progress indicator**: Smooth circular progress with gradient
- **Particle system**: Dynamic background particles responding to mouse

## Key Components

### DropZone
Drag-and-drop file upload with animated feedback. Supports all common image formats.

```tsx
<DropZone onImageDrop={handleImageDrop} isProcessing={isProcessing} />
```

### ControlsPanel
Format selection and compression settings (quality, dimensions).

```tsx
<ControlsPanel
  format="avif"
  quality={85}
  maxWidth={1920}
  onFormatChange={setFormat}
  onQualityChange={setQuality}
  onMaxWidthChange={setMaxWidth}
/>
```

### PreviewCompare
Interactive before/after slider with detailed compression statistics.

```tsx
<PreviewCompare
  originalImage={originalUrl}
  compressedImage={compressedUrl}
  originalSize={1024000}
  compressedSize={256000}
  originalDimensions={{ width: 4000, height: 3000 }}
  compressedDimensions={{ width: 1920, height: 1440 }}
  onDownload={handleDownload}
/>
```

## Performance Optimizations

- **Lazy component loading**: Hero3D with demand rendering
- **Canvas-based compression**: Efficient client-side processing
- **Minimal bundle size**: Tree-shaken dependencies
- **Responsive design**: Mobile-first approach
- **Image optimization**: Proper format selection for web

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android)

## Production Considerations

For production deployment with real @squoosh/lib integration:

1. Install `@squoosh/lib` and configure it properly
2. Add optional chaining for WebAssembly module loading
3. Implement service worker for offline support
4. Add analytics tracking
5. Consider adding rate limiting for compression tasks

## Environment Variables

No environment variables required for this client-side version.

## License

MIT

## Credits

Built as a next-generation web application showcasing modern web standards, premium design patterns, and advanced animation techniques.

---

**SlimShot** - Compress images like a scalpel. Fast. Precise. Beautiful.
