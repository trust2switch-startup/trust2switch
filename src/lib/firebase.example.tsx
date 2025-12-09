/**
 * Firebase Usage Examples
 * 
 * This file shows how to use Firebase in your Next.js application.
 * You can delete this file after reviewing the examples.
 */

// Example 1: Using Firebase App in any file (server or client)
import { app } from '@/lib/firebase';
// app is now available for use with other Firebase services

// Example 2: Using Analytics in a Client Component
'use client';

import { useAnalytics } from '@/lib/useAnalytics';
import { logEvent } from 'firebase/analytics';

export function ExampleComponent() {
  const analytics = useAnalytics();

  const handleButtonClick = () => {
    if (analytics) {
      logEvent(analytics, 'button_click', {
        button_name: 'example_button',
      });
    }
  };

  return (
    <button onClick={handleButtonClick}>
      Click me
    </button>
  );
}

// Example 3: Direct Analytics Usage (in client components)
'use client';

import { useEffect } from 'react';
import { analytics } from '@/lib/firebase';

export function AnotherComponent() {
  useEffect(() => {
    if (analytics) {
      logEvent(analytics, 'page_view', {
        page_path: window.location.pathname,
      });
    }
  }, []);

  return <div>Content</div>;
}

// Example 4: Using other Firebase services (Authentication, Firestore, etc.)
// import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';
// import { getStorage } from 'firebase/storage';
// 
// const auth = getAuth(app);
// const db = getFirestore(app);
// const storage = getStorage(app);

