'use client';

// React hook for Firebase Analytics
import { useEffect, useState } from 'react';
import { Analytics } from 'firebase/analytics';
import { getFirebaseAnalytics } from './firebase';

export function useAnalytics(): Analytics | null {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);

  useEffect(() => {
    getFirebaseAnalytics().then((analyticsInstance) => {
      setAnalytics(analyticsInstance);
    });
  }, []);

  return analytics;
}

