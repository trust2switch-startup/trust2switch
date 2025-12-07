'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export const ScrollHandler: React.FC = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    // Check if there's a hash in the URL
    const hash = window.location.hash;
    
    if (hash) {
      // Small delay to ensure page is fully rendered
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          const headerOffset = 120; // Match scroll-margin-top
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 200);
    }
  }, [pathname]);

  return null;
};

