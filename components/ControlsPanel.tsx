'use client';

import { motion } from 'framer-motion';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Settings2, Zap, Image as ImageIcon, MonitorSmartphone, Layers } from 'lucide-react';

export type ImageFormat = 'avif' | 'webp' | 'jpg' | 'png';

interface ControlsPanelProps {
  format: ImageFormat;
  quality: number;
  maxWidth: number;
  onFormatChange: (format: ImageFormat) => void;
  onQualityChange: (quality: number) => void;
  onMaxWidthChange: (width: number) => void;
}

export function ControlsPanel({
  format,
  quality,
  maxWidth,
  onFormatChange,
  onQualityChange,
  onMaxWidthChange,
}: ControlsPanelProps) {
  const containerVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="glass rounded-3xl p-8 space-y-8 h-full"
    >
      <div className="flex items-center gap-2 mb-2">
        <Settings2 className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground tracking-tight">Configuration</h3>
      </div>

      {/* Format Selector (Segmented Control style) */}
      <motion.div variants={itemVariants} className="space-y-4">
        <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
          <Layers className="w-3 h-3" /> Output Format
        </Label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { id: 'avif', label: 'AVIF', desc: 'Best Ratio' },
            { id: 'webp', label: 'WebP', desc: 'Modern' },
            { id: 'jpg', label: 'JPEG', desc: 'Universal' },
            { id: 'png', label: 'PNG', desc: 'Lossless' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onFormatChange(item.id as ImageFormat)}
              className={`
                relative p-3 rounded-xl border text-left transition-all duration-200 outline-none
                ${format === item.id 
                  ? 'bg-primary/10 border-primary/50 ring-1 ring-primary/20' 
                  : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.04] hover:border-white/10'
                }
              `}
            >
              <div className="flex justify-between items-start mb-1">
                <span className={`text-sm font-semibold ${format === item.id ? 'text-primary' : 'text-foreground'}`}>
                  {item.label}
                </span>
                {format === item.id && (
                  <motion.div layoutId="active-dot" className="w-1.5 h-1.5 rounded-full bg-primary" />
                )}
              </div>
              <span className="text-[10px] text-muted-foreground block">{item.desc}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Quality Slider */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex justify-between items-end">
          <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <Zap className="w-3 h-3" /> Quality
          </Label>
          <span className="text-sm font-mono text-primary bg-primary/10 px-2 py-0.5 rounded">
            {quality}%
          </span>
        </div>
        <Slider
          min={10}
          max={100}
          step={5}
          value={[quality]}
          onValueChange={(value) => onQualityChange(value[0])}
          className="cursor-pointer py-1"
        />
        <div className="flex justify-between text-[10px] text-muted-foreground px-1">
          <span>Speed</span>
          <span>Balance</span>
          <span>Detail</span>
        </div>
      </motion.div>

      {/* Max Width Slider */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex justify-between items-end">
          <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
             <MonitorSmartphone className="w-3 h-3" /> Max Width
          </Label>
          <span className="text-sm font-mono text-primary bg-primary/10 px-2 py-0.5 rounded">
            {maxWidth}px
          </span>
        </div>
        <Slider
          min={400}
          max={3840}
          step={100}
          value={[maxWidth]}
          onValueChange={(value) => onMaxWidthChange(value[0])}
          className="cursor-pointer py-1"
        />
        <p className="text-[11px] text-muted-foreground border-t border-white/5 pt-3 mt-2 leading-relaxed">
          Images larger than {maxWidth}px will be resized while maintaining aspect ratio. 
          Smaller images are kept original.
        </p>
      </motion.div>
    </motion.div>
  );
}
