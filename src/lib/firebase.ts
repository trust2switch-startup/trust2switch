// Firebase configuration and initialization
import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAnalytics, Analytics, isSupported } from 'firebase/analytics';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCv3XcWU6XfthtHDbfqaQuTNQcR-ZdTS_c",
  authDomain: "trust2switch-63929.firebaseapp.com",
  projectId: "trust2switch-63929",
  storageBucket: "trust2switch-63929.firebasestorage.app",
  messagingSenderId: "894073684108",
  appId: "1:894073684108:web:77c30f40961d3bdf8dfba9",
  measurementId: "G-HTKLPEWQ3S"
};

// Initialize Firebase
// Check if Firebase is already initialized to avoid duplicate initialization
let app: FirebaseApp;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Initialize Analytics only on client-side
// This function should be called from client components
export const getFirebaseAnalytics = async (): Promise<Analytics | null> => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const supported = await isSupported();
    if (supported) {
      return getAnalytics(app);
    }
    return null;
  } catch (error) {
    console.error('Firebase Analytics initialization error:', error);
    return null;
  }
};

// Get analytics instance (for direct use in client components)
let analytics: Analytics | null = null;

if (typeof window !== 'undefined') {
  // Initialize analytics on client-side
  isSupported()
    .then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
      }
    })
    .catch((error) => {
      console.error('Firebase Analytics initialization error:', error);
    });
}

export { app, analytics };
export default app;

