# SlimShot Quick Start Guide

## 🚀 Get Up and Running in Minutes

### Prerequisites
- Node.js 18+ installed
- npm or yarn or pnpm

### Installation

```bash
# 1. Clone or download the project
cd slimshot

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open browser to http://localhost:3000
```

Done! SlimShot is now running locally.

## 📋 Project Structure Quick Reference

```
slimshot/
├── app/
│   ├── page.tsx          ← Main app logic and state
│   ├── layout.tsx        ← Root layout & metadata
│   └── globals.css       ← Theme tokens & animations
│
├── components/
│   ├── DropZone.tsx      ← File upload with drag-drop
│   ├── ControlsPanel.tsx ← Format & quality settings
│   ├── PreviewCompare.tsx← Before/after slider
│   ├── ProgressIndicator.tsx ← Compression progress
│   └── Hero3D.tsx        ← Particle animation
│
├── lib/
│   └── compression.ts    ← Image compression logic
│
├── hooks/
│   └── useKeyboardShortcuts.ts ← Keyboard handling
│
└── public/
    └── (static assets)
```

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd/Ctrl + K` | Open file upload dialog |
| `Escape` | Reset to initial state |

## 🎨 Customizing Colors

Edit `/app/globals.css` to change colors:

```css
:root {
  --background: #0A0A0A;  /* Background */
  --foreground: #F5F5F5;  /* Text */
  --primary: #EF4444;     /* Red accent */
  /* ... more tokens ... */
}
```

## 🎬 Customizing Animations

Add or modify animations in `/app/globals.css` under `@layer utilities`:

```css
@layer utilities {
  .your-animation {
    animation: your-keyframe 1s ease-out;
  }
}
```

## 📱 Testing on Different Devices

### Mobile Testing
```bash
# Get your machine IP
ipconfig getifaddr en0  # macOS
# or
hostname -I           # Linux/WSL

# Access on mobile: http://<YOUR_IP>:3000
```

### Responsive Testing in Browser
```
Chrome DevTools → F12 → Toggle Device Toolbar (Ctrl+Shift+M)
```

## 🏗️ Building for Production

```bash
# Create optimized production build
npm run build

# Test production build locally
npm start
# Open http://localhost:3000
```

## 📊 Performance Monitoring

### Check Build Size
```bash
npm run build
# Look for: "λ route size" and "○ static" in output
```

### DevTools Performance
1. Open Chrome DevTools (F12)
2. Go to Performance tab
3. Click Record
4. Compress an image
5. Click Stop
6. Analyze the timeline

### Lighthouse Audit
1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Click "Analyze page load"
4. Review Performance, Accessibility, Best Practices

## 🐛 Debugging

### Enable Debug Logging

Add console.log statements:

```typescript
// In compression.ts or page.tsx
console.log("[v0] Compression started:", { format, quality });
```

### Check Network in DevTools
1. Open DevTools → Network tab
2. Perform compression
3. Check for failed requests

### Monitor Memory
1. DevTools → Memory tab
2. Take heap snapshot before compression
3. Compress image
4. Take heap snapshot after
4. Compare to find memory leaks

## 🎯 Common Development Tasks

### Add New Format Support

In `/lib/compression.ts`:

```typescript
const mimeTypes: Record<ImageFormat, string> = {
  avif: 'image/avif',
  webp: 'image/webp',
  jpg: 'image/jpeg',
  png: 'image/png',
  // Add new format here
  webp2: 'image/webp2',
};
```

### Change Default Quality

In `/app/page.tsx`:

```typescript
const [quality, setQuality] = useState(85); // Change this value
```

### Modify DropZone Behavior

In `/components/DropZone.tsx`, update the file types:

```typescript
accept="image/*"  // Change to specific types like "image/jpeg,image/png"
```

### Adjust Animation Speed

In `/app/globals.css`:

```css
@keyframes float {
  /* Change duration or keyframes */
}
```

## 🚀 Deploying to Vercel

### One-Click Deploy
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Select your repository
5. Click "Deploy"

### Manual Deploy
```bash
npm install -g vercel
vercel login
vercel
```

## 📚 Learning Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)
- [Radix UI](https://www.radix-ui.com)

## 🆘 Troubleshooting

### "Port 3000 already in use"
```bash
npm run dev -- -p 3001  # Use different port
```

### "Module not found"
```bash
npm install  # Reinstall dependencies
rm -rf node_modules .next  # Clean install
npm install
```

### "Build fails"
```bash
npm run lint  # Check for errors
npm run build -- --debug  # Get more details
```

### "Images not showing"
Check browser console for CORS errors. Ensure images are properly accessible.

## 📞 Getting Help

1. Check the README.md
2. Review ARCHITECTURE.md for system design
3. Look at CHECKLIST.md for known issues
4. Check browser console for errors
5. Use DevTools Performance tab
6. Try clearing cache: `npm run build && npm start`

## ✅ Next Steps

1. Run the dev server
2. Upload an image
3. Explore different formats
4. Adjust quality and dimensions
5. Download the result
6. Check the difference in file size
7. Customize colors and animations
8. Deploy to production!

---

**Happy compressing! 🎉**

For detailed information, see:
- `README.md` - Feature overview
- `ARCHITECTURE.md` - System design
- `CHECKLIST.md` - Testing guide
