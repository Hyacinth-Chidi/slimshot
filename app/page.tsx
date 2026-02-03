'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DropZone } from '@/components/DropZone';
import { ControlsPanel, ImageFormat } from '@/components/ControlsPanel';
import { PreviewCompare } from '@/components/PreviewCompare';
import { ProgressIndicator } from '@/components/ProgressIndicator';
import { compressImage, downloadBlob, getImageDimensions } from '@/lib/compression';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { Zap, RefreshCw, Command, ShieldCheck, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';

type AppState = 'idle' | 'processing' | 'complete';

interface CompressedData {
  blob: Blob;
  originalSize: number;
  compressedSize: number;
  originalDimensions: { width: number; height: number };
  compressedDimensions: { width: number; height: number };
  originalImage: string;
  compressedImage: string;
}

export default function Home() {
  const [state, setState] = useState<AppState>('idle');
  const [format, setFormat] = useState<ImageFormat>('jpg'); // Default to JPG as requested
  const [quality, setQuality] = useState(85);
  const [maxWidth, setMaxWidth] = useState(1920);
  const [progress, setProgress] = useState(0);
  const [sourceFile, setSourceFile] = useState<File | null>(null); // Store source file for re-compression
  const [compressedData, setCompressedData] = useState<CompressedData | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [originalDimensions, setOriginalDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcuts
  useKeyboardShortcuts({
    onCmdK: () => fileInputRef.current?.click(),
    onEscape: () => handleReset(),
  });

  // Centralized compression handler
  const processImage = useCallback(
    async (file: File, currentFormat: ImageFormat, currentQuality: number, currentMaxWidth: number) => {
      // Don't set state to processing if we are already complete (live update)
      // unless it's a fresh drop
      if (!sourceFile) {
         setState('processing');
      }
      
      setProgress(0);
      
      try {
        // Store original image preview if not already set
        if (!originalImageUrl) {
          const originalUrl = URL.createObjectURL(file);
          setOriginalImageUrl(originalUrl);
        }

        // Get original dimensions if not already set
        let dimensions = originalDimensions;
        if (!dimensions) {
          dimensions = await getImageDimensions(file);
          setOriginalDimensions(dimensions);
        }

        // Compress image
        const result = await compressImage(file, { format: currentFormat, quality: currentQuality, maxWidth: currentMaxWidth }, (p) => {
          setProgress(p);
        });

        // Create preview URL for compressed image
        const compressedUrl = URL.createObjectURL(result.blob);

        setCompressedData({
          blob: result.blob,
          originalSize: result.originalSize,
          compressedSize: result.compressedSize,
          originalDimensions: dimensions!,
          compressedDimensions: result.dimensions,
          originalImage: originalImageUrl || URL.createObjectURL(file), // Ensure we have the url
          compressedImage: compressedUrl,
        });

        setState('complete');
      } catch (error) {
        console.error('Compression failed:', error);
        setState('idle');
        setProgress(0);
      }
    },
    [originalImageUrl, originalDimensions, sourceFile]
  );


  const handleImageDrop = useCallback(
    (file: File) => {
      setSourceFile(file);
      // Reset original data for new file
      setOriginalImageUrl(null);
      setOriginalDimensions(null);
      setCompressedData(null);
      
      // Trigger compression with current settings
      processImage(file, format, quality, maxWidth);
    },
    [format, quality, maxWidth, processImage]
  );

  // Debounced settings change handler or direct? 
  // For sliders, usually debouncing is better, but since this is local/wasm, we can try direct first.
  // We'll wrap it in a useEffect or just call it directly.
  
  const handleCompressionSettingsChange = useCallback(
    (newFormat: ImageFormat, newQuality: number, newMaxWidth: number) => {
      setFormat(newFormat);
      setQuality(newQuality);
      setMaxWidth(newMaxWidth);
    },
    []
  );

  // Effect to trigger re-compression when settings change AND we have a source file
  useEffect(() => {
    if (sourceFile && state === 'complete') {
      const timer = setTimeout(() => {
        processImage(sourceFile, format, quality, maxWidth);
      }, 100); // Small debounce to avoid thrashing on slider drag
      return () => clearTimeout(timer);
    }
  }, [format, quality, maxWidth, sourceFile, state, processImage]);


  const handleDownload = useCallback(() => {
    if (!compressedData) return;

    const ext = format === 'jpg' ? 'jpg' : format;
    downloadBlob(compressedData.blob, `compressed-image.${ext}`);
  }, [compressedData, format]);

  const handleReset = useCallback(() => {
    setState('idle');
    setProgress(0);
    setSourceFile(null);
    setCompressedData(null);
    setOriginalImageUrl(null);
    setOriginalDimensions(null);
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/20">
      
      {/* Floating Header */}
      <div className="fixed top-6 left-0 right-0 z-50 px-4 flex justify-center pointer-events-none">
        <motion.header
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="pointer-events-auto glass rounded-full px-6 py-3 flex items-center gap-6"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-orange-500 flex items-center justify-center shadow-lg shadow-primary/20">
              <Zap className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="font-bold tracking-tight text-lg">SlimShot</span>
          </div>
          <div className="h-4 w-px bg-white/10" />
          <p className="text-xs font-medium text-muted-foreground hidden sm:block">
            High-Fidelity Image Compression
          </p>
        </motion.header>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <AnimatePresence mode="wait">
          {state === 'idle' && !compressedData && (
            <motion.div
              key="idle-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, filter: 'blur(10px)' }}
              className="space-y-16"
            >
              {/* Hero Section */}
              <div className="text-center max-w-4xl mx-auto space-y-8 pt-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs font-medium text-secondary-foreground backdrop-blur-sm"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/40 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  V1.0 Private Beta
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-6xl sm:text-8xl font-bold tracking-tighter text-foreground"
                >
                  Precision <span className="text-gradient-primary">Compression</span>
                </motion.h2>

                <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed font-light">
                  Engineering-grade image optimization running 100% in your browser. <br className="hidden sm:block"/>
                  Privacy-focused, zero latency, and uncompromising quality.
                </p>
              </div>

              {/* Drop Zone Area - Prominent & Accessible */}
              <div className="relative z-10 w-full max-w-5xl mx-auto mt-12 mb-20">
                {/* Decorative Glow */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-primary/10 blur-[120px] rounded-full pointer-events-none opacity-50" />
                
                <DropZone onImageDrop={handleImageDrop} isProcessing={false} />
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {[
                  { icon: ShieldCheck, title: 'Zero-Knowledge', desc: 'Images never leave your device. 100% client-side processing.' },
                  { icon: Cpu, title: 'Neural Engine', desc: 'Next-gen algorithms for maximum savings with minimal artifacts.' },
                  { icon: Zap, title: 'Instantaneous', desc: 'No upload waits. Real-time feedback and processing.' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="glass-subtle p-6 rounded-2xl border border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <item.icon className="w-6 h-6 text-primary mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {state === 'processing' && (
            <motion.div
              key="processing-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-[60vh] flex flex-col items-center justify-center max-w-xl mx-auto"
            >
              <ProgressIndicator progress={progress} status="processing" />
              <p className="mt-8 text-muted-foreground animate-pulse text-sm">
                Optimizing pixels with quantum precision...
              </p>
            </motion.div>
          )}

          {state === 'complete' && compressedData && (
            <motion.div
              key="complete-state"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Preview Area (Larger) */}
                <div className="xl:col-span-2">
                  <PreviewCompare
                    originalImage={compressedData.originalImage}
                    compressedImage={compressedData.compressedImage}
                    originalSize={compressedData.originalSize}
                    compressedSize={compressedData.compressedSize}
                    originalDimensions={compressedData.originalDimensions}
                    compressedDimensions={compressedData.compressedDimensions}
                    onDownload={handleDownload}
                  />
                </div>

                {/* Sidebar Controls */}
                <div className="space-y-6">
                  <ControlsPanel
                    format={format}
                    quality={quality}
                    maxWidth={maxWidth}
                    onFormatChange={(newFormat) =>
                      handleCompressionSettingsChange(newFormat, quality, maxWidth)
                    }
                    onQualityChange={(newQuality) =>
                      handleCompressionSettingsChange(format, newQuality, maxWidth)
                    }
                    onMaxWidthChange={(newMaxWidth) =>
                      handleCompressionSettingsChange(format, quality, newMaxWidth)
                    }
                  />

                  <Button
                    onClick={handleReset}
                    variant="outline"
                    className="w-full h-12 rounded-xl border-white/10 hover:bg-white/5 text-muted-foreground hover:text-foreground"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Process Another Image
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Hidden file input for keyboard shortcut */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.currentTarget.files?.[0]) {
            handleImageDrop(e.currentTarget.files[0]);
          }
        }}
        className="hidden"
      />

      {/* Footer */}
      <footer className="border-t border-white/5 bg-black/20 backdrop-blur-lg mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © 2026 SlimShot AI. All rights reserved.
          </p>
          
          <div className="flex gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5">
              <span className="text-xs font-medium text-muted-foreground">Open File</span>
              <div className="flex gap-1">
                <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-foreground">⌘</span>
                <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-foreground">K</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
