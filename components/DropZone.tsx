'use client';

import React, { useState, useCallback } from 'react';
import { Upload, FileUp, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface DropZoneProps {
  onImageDrop: (file: File) => void;
  isProcessing: boolean;
}

export function DropZone({ onImageDrop, isProcessing }: DropZoneProps) {
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);

      const files = e.dataTransfer.files;
      if (files?.[0]) {
        const file = files[0];
        if (file.type.startsWith('image/')) {
          onImageDrop(file);
        }
      }
    },
    [onImageDrop]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files?.[0]) {
      onImageDrop(files[0]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-2xl mx-auto"
    >
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`
          relative group cursor-pointer rounded-3xl overflow-hidden transition-all duration-300
          ${isDragActive ? 'scale-[1.02]' : 'hover:scale-[1.01]'}
        `}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleInputChange}
          disabled={isProcessing}
          className="hidden"
          id="file-input"
          aria-label="Upload image"
        />

        <label htmlFor="file-input" className="block relative z-10 p-16 text-center">
          {/* Main Content */}
          <div className="relative z-20 flex flex-col items-center">
            {/* Icon Container */}
            <motion.div
              animate={isDragActive ? { y: -5, scale: 1.1 } : { y: 0, scale: 1 }}
              className={`
                mb-8 p-6 rounded-2xl backdrop-blur-md border transition-all duration-300
                ${isDragActive 
                  ? 'bg-primary/20 border-primary/50 shadow-[0_0_40px_-10px_rgba(242,78,30,0.5)]' 
                  : 'bg-white/5 border-white/10 group-hover:bg-white/10 group-hover:border-white/20'
                }
              `}
            >
              {isDragActive ? (
                <FileUp className="w-10 h-10 text-primary" />
              ) : (
                <Upload className="w-10 h-10 text-foreground/80 group-hover:text-foreground" />
              )}
            </motion.div>

            {/* Text Content */}
            <div className="space-y-2">
              <h3 className={`text-2xl font-medium tracking-tight transition-colors ${
                isDragActive ? 'text-primary' : 'text-foreground'
              }`}>
                {isDragActive ? 'Release to Enhance' : 'Upload Image'}
              </h3>
              <p className="text-secondary-foreground text-sm max-w-xs mx-auto leading-relaxed">
                Drag and drop your visual assets here, or click to browse.
              </p>
            </div>

            {/* Tags */}
            <div className="mt-8 flex gap-2">
              {['PNG', 'JPG', 'WEBP', 'AVIF'].map((fmt) => (
                <span key={fmt} className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground bg-white/5 px-2 py-1 rounded border border-white/5">
                  {fmt}
                </span>
              ))}
            </div>
          </div>

          {/* Background Effects */}
          <div className={`absolute inset-0 transition-opacity duration-300 ${
            isDragActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`}>
            <div className={`absolute inset-0 bg-gradient-to-b ${
              isDragActive ? 'from-primary/10 to-transparent' : 'from-white/5 to-transparent'
            }`} />
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
          </div>

          {/* Base Background */}
          <div className="absolute inset-0 bg-[#0A0A0C]/80 backdrop-blur-xl border border-white/10 rounded-3xl -z-10" />
          
          {/* Active Border Glow */}
          <div className={`absolute inset-0 rounded-3xl border-2 transition-colors duration-300 pointer-events-none ${
            isDragActive ? 'border-primary/50' : 'border-transparent group-hover:border-white/10'
          }`} />
        </label>
      </div>
    </motion.div>
  );
}
