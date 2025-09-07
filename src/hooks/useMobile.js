import { useState, useEffect } from "react";

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
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return isMobile;
};

// Hook to handle dropdown state with smooth transitions
export const useDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const open = () => {
    setIsOpen(true);
    // Pequeño delay para asegurar que el DOM esté listo
    setTimeout(() => {
      setIsAnimating(true);
    }, 10);
  };

  const close = () => {
    setIsAnimating(false);
    // Delay aumentado para permitir que las animaciones terminen
    setTimeout(() => {
      setIsOpen(false);
    }, 500); // Matches CSS transition duration
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
    toggle,
  };
};
