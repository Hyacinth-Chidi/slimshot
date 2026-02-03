'use client';

import React from "react"

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Download, ArrowRight, FileCheck, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

export function PreviewCompare({
  originalImage,
  compressedImage,
  originalSize,
  compressedSize,
  originalDimensions,
  compressedDimensions,
  onDownload,
  isLoading = false,
}: PreviewCompareProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const savings = originalSize > 0
    ? Math.round(((originalSize - compressedSize) / originalSize) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="space-y-8"
    >
      {/* Before/After Slider */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="glass rounded-xl overflow-hidden cursor-col-resize relative h-96 group"
      >
        {/* Original Image */}
        <div className="absolute inset-0">
          <img
            src={originalImage || "/placeholder.svg"}
            alt="Original"
            className="w-full h-full object-contain bg-black/50"
          />
          <div className="absolute top-3 left-3 bg-black/60 px-3 py-1 rounded-lg text-xs font-medium text-white">
            Original
          </div>
        </div>

        {/* Compressed Image */}
        <motion.div
          animate={{ width: `${sliderPosition}%` }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="absolute inset-0 overflow-hidden"
        >
          <img
            src={compressedImage || "/placeholder.svg"}
            alt="Compressed"
            className="w-screen h-full object-contain bg-black/50"
          />
          <div className="absolute top-3 right-3 bg-red-500/90 px-3 py-1 rounded-lg text-xs font-medium text-white">
            Compressed
          </div>
        </motion.div>

        {/* Slider Handle */}
        <motion.div
          animate={{ left: `${sliderPosition}%` }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-red-400 via-red-500 to-red-600 group-hover:w-2 transition-all"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full p-2 shadow-lg">
            <div className="flex items-center gap-1">
              <ChevronLeft className="w-4 h-4 text-white" />
              <ChevronRight className="w-4 h-4 text-white" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: 'Original Size',
            value: formatFileSize(originalSize),
            highlight: false,
          },
          {
            label: 'Compressed Size',
            value: formatFileSize(compressedSize),
            highlight: true,
          },
          {
            label: 'Space Saved',
            value: `${savings}%`,
            highlight: true,
          },
          {
            label: 'Dimensions',
            value: `${compressedDimensions.width}×${compressedDimensions.height}`,
            highlight: false,
          },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + i * 0.1 }}
            className={`glass rounded-lg p-4 text-center ${
              stat.highlight ? 'glow-red' : ''
            }`}
          >
            <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
            <p
              className={`text-lg font-bold font-mono ${
                stat.highlight ? 'text-red-400' : 'text-foreground'
              }`}
            >
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Download Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          onClick={onDownload}
          disabled={isLoading}
          className="w-full bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 glow-red hover:glow-red-intense disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download className="w-5 h-5" />
          Download Compressed Image
        </Button>
      </motion.div>
    </motion.div>
  );
}
