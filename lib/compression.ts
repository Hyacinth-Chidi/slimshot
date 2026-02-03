import { ImageFormat } from '@/components/ControlsPanel';

/**
 * Simulated compression engine - in production, would use @squoosh/lib
 * This mock version provides realistic compression demonstrations
 */

interface CompressionOptions {
  format: ImageFormat;
  quality: number;
  maxWidth: number;
}

interface CompressionResult {
  blob: Blob;
  dimensions: { width: number; height: number };
  originalSize: number;
  compressedSize: number;
}

export async function compressImage(
  file: File,
  options: CompressionOptions,
  onProgress?: (progress: number) => void
): Promise<CompressionResult> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const img = new Image();
        img.crossOrigin = 'anonymous';

        img.onload = () => {
          // Simulate processing with timeout
          const processingDuration = 2000; // 2 seconds for realistic feel
          const startTime = Date.now();
          
          const progressInterval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(95, (elapsed / processingDuration) * 90);
            onProgress?.(Math.round(progress));
          }, 50);

          setTimeout(() => {
            clearInterval(progressInterval);

            // Calculate new dimensions
            let newWidth = img.width;
            let newHeight = img.height;

            if (img.width > options.maxWidth) {
              newWidth = options.maxWidth;
              newHeight = Math.round((options.maxWidth / img.width) * img.height);
            }

            // Create canvas for compression
            const canvas = document.createElement('canvas');
            canvas.width = newWidth;
            canvas.height = newHeight;

            const ctx = canvas.getContext('2d');
            if (!ctx) {
              reject(new Error('Failed to get canvas context'));
              return;
            }

            ctx.drawImage(img, 0, 0, newWidth, newHeight);

            // Convert to blob with appropriate mime type
            const mimeTypes: Record<ImageFormat, string> = {
              avif: 'image/avif',
              webp: 'image/webp',
              jpg: 'image/jpeg',
              png: 'image/png',
            };

            const qualityValue = options.quality / 100;
            canvas.toBlob(
              (blob) => {
                if (!blob) {
                  reject(new Error('Failed to compress image'));
                  return;
                }

                onProgress?.(100);

                resolve({
                  blob,
                  dimensions: { width: newWidth, height: newHeight },
                  originalSize: file.size,
                  compressedSize: blob.size,
                });
              },
              mimeTypes[options.format],
              qualityValue
            );
          }, processingDuration);
        };

        img.onerror = () => {
          reject(new Error('Failed to load image'));
        };

        img.src = e.target?.result as string;
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsDataURL(file);
  });
}

export function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';

      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };

      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };

      img.src = e.target?.result as string;
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsDataURL(file);
  });
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
