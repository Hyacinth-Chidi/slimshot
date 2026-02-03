'use client';

import { useEffect } from 'react';

interface KeyboardShortcuts {
  onCmdK?: () => void;
  onEnter?: () => void;
  onEscape?: () => void;
}

/**
 * Hook for handling keyboard shortcuts throughout the app
 */
export function useKeyboardShortcuts({
  onCmdK,
  onEnter,
  onEscape,
}: KeyboardShortcuts) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K: Open file picker or focus search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onCmdK?.();
      }

      // Enter: Confirm/Submit
      if (e.key === 'Enter' && e.ctrlKey) {
        e.preventDefault();
        onEnter?.();
      }

      // Escape: Cancel/Close
      if (e.key === 'Escape') {
        e.preventDefault();
        onEscape?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onCmdK, onEnter, onEscape]);
}
