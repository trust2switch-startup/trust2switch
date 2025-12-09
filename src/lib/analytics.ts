'use client';

// Analytics utility functions for Firebase Analytics
import { logEvent, Analytics } from 'firebase/analytics';
import { analytics } from './firebase';

/**
 * Track a custom event with Firebase Analytics
 */
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  if (analytics) {
    try {
      logEvent(analytics, eventName, eventParams);
    } catch (error) {
      console.error('Analytics tracking error:', error);
    }
  }
};

/**
 * Track page views
 */
export const trackPageView = (pagePath: string, pageTitle?: string) => {
  trackEvent('page_view', {
    page_path: pagePath,
    page_title: pageTitle || document.title,
  });
};

/**
 * Track button clicks
 */
export const trackButtonClick = (buttonName: string, location?: string) => {
  trackEvent('button_click', {
    button_name: buttonName,
    location: location || 'unknown',
  });
};

/**
 * Track navigation clicks
 */
export const trackNavigation = (destination: string, source?: string) => {
  trackEvent('navigation', {
    destination,
    source: source || 'unknown',
  });
};

/**
 * Track form submissions
 */
export const trackFormSubmit = (formName: string, formData?: Record<string, any>) => {
  trackEvent('form_submit', {
    form_name: formName,
    ...formData,
  });
};

/**
 * Track course views
 */
export const trackCourseView = (courseSlug: string, courseTitle?: string) => {
  trackEvent('course_view', {
    course_slug: courseSlug,
    course_title: courseTitle,
  });
};

/**
 * Track search queries
 */
export const trackSearch = (searchQuery: string, resultsCount?: number) => {
  trackEvent('search', {
    search_term: searchQuery,
    results_count: resultsCount,
  });
};

/**
 * Track modal opens
 */
export const trackModalOpen = (modalName: string) => {
  trackEvent('modal_open', {
    modal_name: modalName,
  });
};

/**
 * Track external link clicks
 */
export const trackExternalLink = (url: string, linkText?: string) => {
  trackEvent('external_link_click', {
    link_url: url,
    link_text: linkText,
  });
};

