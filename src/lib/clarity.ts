'use client';

/**
 * Microsoft Clarity Analytics Setup
 * 
 * SETUP INSTRUCTIONS:
 * 1. Go to https://clarity.microsoft.com/ and sign in with your Microsoft account
 * 2. Create a new project for your website
 * 3. Copy your Project ID from the project settings
 * 4. Create a .env.local file in the root directory (if it doesn't exist)
 * 5. Add the following line to .env.local:
 *    NEXT_PUBLIC_CLARITY_PROJECT_ID=your-project-id-here
 * 6. Restart your development server
 * 
 * Clarity will automatically start tracking once initialized.
 * You can view your analytics dashboard at https://clarity.microsoft.com/
 */
import Clarity from '@microsoft/clarity';

/**
 * Initialize Microsoft Clarity analytics
 * @param projectId - Your Clarity project ID from clarity.microsoft.com
 */
export const initClarity = (projectId?: string) => {
  // Only run on client-side
  if (typeof window === 'undefined') {
    return;
  }

  // Get project ID from environment variable or parameter
  const clarityId = projectId || process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

  if (!clarityId) {
    console.warn(
      'Microsoft Clarity: Project ID not found. Please set NEXT_PUBLIC_CLARITY_PROJECT_ID in your .env file or pass it as a parameter.'
    );
    return;
  }

  try {
    // Initialize Clarity
    Clarity.init(clarityId);
    console.log('Microsoft Clarity initialized successfully');
  } catch (error) {
    console.error('Microsoft Clarity initialization error:', error);
  }
};

/**
 * Track custom events with Clarity
 * @param eventName - Name of the event to track
 * @param eventData - Optional data associated with the event
 */
export const trackClarityEvent = (eventName: string, eventData?: Record<string, any>) => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    // Clarity automatically tracks user interactions, but you can use this for custom events
    // Note: Clarity doesn't have a direct event tracking API like GA, but you can use custom tags
    if (window.clarity) {
      // Clarity tracks events through its session recording
      // For custom tracking, you might want to use custom tags or combine with other analytics
      console.log('Clarity event:', eventName, eventData);
    }
  } catch (error) {
    console.error('Clarity event tracking error:', error);
  }
};

/**
 * Set custom tags for Clarity session
 * @param key - Tag key
 * @param value - Tag value
 */
export const setClarityTag = (key: string, value: string) => {
  if (typeof window === 'undefined' || !window.clarity) {
    return;
  }

  try {
    if (window.clarity.set) {
      window.clarity.set(key, value);
    }
  } catch (error) {
    console.error('Clarity set tag error:', error);
  }
};

/**
 * Identify a user in Clarity
 * @param userId - User identifier
 * @param sessionId - Optional session ID
 * @param pageId - Optional page ID
 * @param userHint - Optional user hint
 */
export const identifyClarityUser = (
  userId: string,
  sessionId?: string,
  pageId?: string,
  userHint?: string
) => {
  if (typeof window === 'undefined' || !window.clarity) {
    return;
  }

  try {
    if (window.clarity.identify) {
      window.clarity.identify(userId, sessionId, pageId, userHint);
    }
  } catch (error) {
    console.error('Clarity identify error:', error);
  }
};

