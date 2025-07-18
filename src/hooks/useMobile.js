import { useState, useEffect } from 'react';

// Hook to detect if we are on mobile
export const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    // Initial check
    checkIsMobile();

    // Listener for size changes
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return isMobile;
};

// Hook to handle dropdown state with transitions
export const useDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const open = () => {
    setIsOpen(true);
    setIsAnimating(true);
  };

  const close = () => {
    setIsAnimating(false);
    // Delay to allow animation to finish before hiding the component
    setTimeout(() => {
      setIsOpen(false);
    }, 300); // Matches CSS transition duration
  };

  const toggle = () => {
    if (isOpen) {
      close();
    } else {
      open();
    }
  };

  return {
    isOpen,
    isAnimating,
    open,
    close,
    toggle
  };
};
