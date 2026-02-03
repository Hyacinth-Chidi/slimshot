# SlimShot Component API Reference

## Overview

Complete reference for all SlimShot components, their props, and usage examples.

---

## DropZone

File upload component with drag-and-drop support.

### Props

```typescript
interface DropZoneProps {
  onImageDrop: (file: File) => void;
  isProcessing: boolean;
}
```

### Example

```tsx
import { DropZone } from '@/components/DropZone';

export function MyComponent() {
  const handleImageDrop = (file: File) => {
    console.log('Uploading:', file.name);
  };

  return (
    <DropZone 
      onImageDrop={handleImageDrop} 
      isProcessing={false} 
    />
  );
}
```

### Features
- Drag-and-drop support
- Click to browse
- File type validation
- Visual feedback on hover/drag
- Animated glow effects
- Accessible with ARIA labels

---

## ControlsPanel

Compression settings controls.

### Props

```typescript
type ImageFormat = 'avif' | 'webp' | 'jpg' | 'png';

interface ControlsPanelProps {
  format: ImageFormat;
  quality: number;
  maxWidth: number;
  onFormatChange: (format: ImageFormat) => void;
  onQualityChange: (quality: number) => void;
  onMaxWidthChange: (width: number) => void;
}
```

### Example

```tsx
import { ControlsPanel } from '@/components/ControlsPanel';

export function MyComponent() {
  const [format, setFormat] = useState('avif');
  const [quality, setQuality] = useState(85);
  const [maxWidth, setMaxWidth] = useState(1920);

  return (
    <ControlsPanel
      format={format}
      quality={quality}
      maxWidth={maxWidth}
      onFormatChange={setFormat}
      onQualityChange={setQuality}
      onMaxWidthChange={setMaxWidth}
    />
  );
}
```

### Features
- Format dropdown (AVIF, WebP, JPEG, PNG)
- Quality slider (0-100%)
- Max width slider (100-3840px)
- Format-specific info text
- Staggered animations
- Glass panel styling

### Default Values
- Format: 'avif'
- Quality: 85
- Max Width: 1920

---

## PreviewCompare

Before/after comparison slider.

### Props

```typescript
interface PreviewCompareProps {
  originalImage: string;
  compressedImage: string;
  originalSize: number;
  compressedSize: number;
  originalDimensions: { width: number; height: number };
  compressedDimensions: { width: number; height: number };
  onDownload: () => void;
  isLoading?: boolean;
}
```

### Example

```tsx
import { PreviewCompare } from '@/components/PreviewCompare';

export function MyComponent() {
  return (
    <PreviewCompare
      originalImage="blob:http://localhost:3000/abc123"
      compressedImage="blob:http://localhost:3000/def456"
      originalSize={1024000}
      compressedSize={256000}
      originalDimensions={{ width: 4000, height: 3000 }}
      compressedDimensions={{ width: 1920, height: 1440 }}
      onDownload={() => console.log('Downloading...')}
      isLoading={false}
    />
  );
}
```

### Features
- Interactive slider
- Mouse and touch support
- Smooth spring animations
- Real-time size calculations
- Dimension display
- Download button
- Stats grid layout
- Savings percentage

### Statistics Displayed
- Original Size
- Compressed Size
- Space Saved (%)
- Final Dimensions

---

## ProgressIndicator

Animated progress display during compression.

### Props

```typescript
interface ProgressIndicatorProps {
  progress: number;
  status: 'idle' | 'processing' | 'complete';
  message?: string;
}
```

### Example

```tsx
import { ProgressIndicator } from '@/components/ProgressIndicator';

export function MyComponent() {
  const [progress, setProgress] = useState(45);

  return (
    <ProgressIndicator
      progress={progress}
      status="processing"
      message="Compressing image..."
    />
  );
}
```

### Features
- Circular progress ring
- Gradient stroke
- Smooth transitions
- Three states: idle, processing, complete
- Animated percentage counter
- Loading dots animation
- Success checkmark

### States
- **idle**: No visible indicator
- **processing**: Animated progress 0-100%
- **complete**: Checkmark with "Compression Complete!"

---

## Hero3D

Particle-based 3D animation hero section.

### Props

```typescript
// No props - standalone component
```

### Example

```tsx
import { Hero3D } from '@/components/Hero3D';

export function MyComponent() {
  return <Hero3D />;
}
```

### Features
- Particle system (Canvas API)
- Mouse tracking
- Connection lines between particles
- Smooth particle physics
- Responsive sizing
- Memory-efficient
- Fade-out effects
- Overlay text animation

### Technical Details
- Uses Canvas 2D context
- RequestAnimationFrame loop
- Auto-cleanup on unmount
- Gravity simulation
- Distance-based connections
- Smooth fade effect

---

## Custom Hooks

### useKeyboardShortcuts

Handles keyboard shortcut logic.

```typescript
interface KeyboardShortcuts {
  onCmdK?: () => void;
  onEnter?: () => void;
  onEscape?: () => void;
}

useKeyboardShortcuts(shortcuts: KeyboardShortcuts): void
```

### Example

```tsx
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

export function MyComponent() {
  useKeyboardShortcuts({
    onCmdK: () => console.log('Open upload'),
    onEnter: () => console.log('Confirm'),
    onEscape: () => console.log('Cancel'),
  });

  return <div>Press Cmd/Ctrl+K, Enter, or Esc</div>;
}
```

### Shortcuts
- `Cmd/Ctrl + K`: onCmdK callback
- `Ctrl + Enter`: onEnter callback
- `Escape`: onEscape callback

---

## Utility Functions

### compressImage

Compresses image using Canvas API.

```typescript
async function compressImage(
  file: File,
  options: {
    format: ImageFormat;
    quality: number;
    maxWidth: number;
  },
  onProgress?: (progress: number) => void
): Promise<CompressionResult>

interface CompressionResult {
  blob: Blob;
  dimensions: { width: number; height: number };
  originalSize: number;
  compressedSize: number;
}
```

### Example

```tsx
import { compressImage } from '@/lib/compression';

const result = await compressImage(
  file,
  { format: 'webp', quality: 85, maxWidth: 1920 },
  (progress) => console.log(`${progress}%`)
);

console.log(`Reduced from ${result.originalSize} to ${result.compressedSize}`);
```

### Parameters
- `file`: Image file to compress
- `options`: Compression settings
- `onProgress`: Optional callback for progress updates (0-100)

### Return Value
- `blob`: Compressed image as Blob
- `dimensions`: Final image dimensions
- `originalSize`: Original file size in bytes
- `compressedSize`: Compressed file size in bytes

---

### getImageDimensions

Gets original image dimensions.

```typescript
async function getImageDimensions(
  file: File
): Promise<{ width: number; height: number }>
```

### Example

```tsx
import { getImageDimensions } from '@/lib/compression';

const dimensions = await getImageDimensions(imageFile);
console.log(`Image is ${dimensions.width}x${dimensions.height}`);
```

---

### downloadBlob

Triggers browser download of a Blob.

```typescript
function downloadBlob(
  blob: Blob,
  filename: string
): void
```

### Example

```tsx
import { downloadBlob } from '@/lib/compression';

const blob = new Blob(['image data'], { type: 'image/png' });
downloadBlob(blob, 'my-image.png');
```

---

## Type Definitions

### ImageFormat

```typescript
type ImageFormat = 'avif' | 'webp' | 'jpg' | 'png';
```

### AppState

```typescript
type AppState = 'idle' | 'processing' | 'complete';
```

### CompressedData

```typescript
interface CompressedData {
  blob: Blob;
  originalSize: number;
  compressedSize: number;
  originalDimensions: { width: number; height: number };
  compressedDimensions: { width: number; height: number };
  originalImage: string;
  compressedImage: string;
}
```

---

## Component Styling

All components use:
- **Tailwind CSS 4** classes
- **Custom design tokens** from globals.css
- **Glass utilities** (.glass, .glass-subtle)
- **Glow utilities** (.glow-red, .glow-red-intense)
- **Animation utilities** (.animate-*)

### Glass Component Example

```tsx
<div className="glass glow-red rounded-xl p-6">
  Content here
</div>
```

---

## Performance Tips

1. **Memoization**
   ```tsx
   const handleImageDrop = useCallback((file) => {
     // Process file
   }, [dependencies]);
   ```

2. **Lazy Loading**
   ```tsx
   const Hero3D = lazy(() => import('@/components/Hero3D'));
   ```

3. **Avoid Inline Objects**
   ```tsx
   // Good
   const options = { format: 'webp', quality: 85, maxWidth: 1920 };
   
   // Avoid
   <Component options={{ format: 'webp', quality: 85, maxWidth: 1920 }} />
   ```

---

## Accessibility

All components follow WCAG AA standards:
- Semantic HTML
- ARIA labels
- Keyboard navigation
- High contrast
- Focus management
- Screen reader support

---

## Browser Support

All components work in:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile Safari 14+
- Chrome Mobile

---

**Component API Version**: 1.0
**Last Updated**: 2/2/2026
