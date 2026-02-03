'use client';

import { motion } from 'framer-motion';

interface ProgressIndicatorProps {
  progress: number;
  status: 'idle' | 'processing' | 'complete';
  message?: string;
}

export function ProgressIndicator({
  progress,
  status,
  message = 'Compressing image...',
}: ProgressIndicatorProps) {
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="flex flex-col items-center justify-center py-12"
    >
      <div className="relative w-32 h-32 mb-6">
        {/* Background Circle */}
        <svg
          className="absolute inset-0 transform -rotate-90"
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(239, 68, 68, 0.1)"
            strokeWidth="3"
          />
        </svg>

        {/* Progress Circle */}
        <motion.svg
          className="absolute inset-0 transform -rotate-90"
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
        >
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{
              strokeDashoffset: offset,
            }}
            transition={{
              duration: 0.5,
              ease: 'easeInOut',
            }}
            strokeDasharray={circumference}
          />
          <defs>
            <linearGradient
              id="gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#EF4444" />
              <stop offset="100%" stopColor="#DC2626" />
            </linearGradient>
          </defs>
        </motion.svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <motion.div
              animate={
                status === 'processing'
                  ? { scale: [1, 1.1, 1] }
                  : { scale: 1 }
              }
              transition={{
                repeat: status === 'processing' ? Infinity : 0,
                duration: 0.8,
              }}
              className="text-3xl font-bold text-red-500 font-mono"
            >
              {status === 'complete' ? '✓' : `${progress}%`}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Status Message */}
      <motion.div
        animate={
          status === 'processing'
            ? { opacity: [0.6, 1, 0.6] }
            : { opacity: 1 }
        }
        transition={{
          repeat: status === 'processing' ? Infinity : 0,
          duration: 1.5,
        }}
        className="text-center"
      >
        <p className="text-foreground font-medium text-lg">
          {status === 'complete' ? 'Compression Complete!' : message}
        </p>
        {status === 'processing' && (
          <div className="flex justify-center gap-1 mt-2">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                repeat: Infinity,
                duration: 0.6,
                delay: 0,
              }}
              className="w-2 h-2 bg-red-500 rounded-full"
            />
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                repeat: Infinity,
                duration: 0.6,
                delay: 0.2,
              }}
              className="w-2 h-2 bg-red-500 rounded-full"
            />
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                repeat: Infinity,
                duration: 0.6,
                delay: 0.4,
              }}
              className="w-2 h-2 bg-red-500 rounded-full"
            />
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
