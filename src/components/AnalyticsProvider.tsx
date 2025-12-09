'use client';

// Component to track page views and initialize analytics
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackPageView } from '@/lib/analytics';
import { initClarity } from '@/lib/clarity';

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const clarity_project_id = 'uj0f7g3sgx'
    // Initialize Microsoft Clarity on mount
    initClarity(clarity_project_id);
  }, []);

  useEffect(() => {
    // Track page view on route change
    if (pathname) {
      trackPageView(pathname);
    }
  }, [pathname]);

  return <>{children}</>;
}

