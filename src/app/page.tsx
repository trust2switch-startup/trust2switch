import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { KeyHighlights } from '@/components/sections/KeyHighlights';
import { PlatformRatings } from '@/components/sections/PlatformRatings';
import { CareerAdviceSection } from '@/components/sections/CareerAdviceSection';
import { IndustryProjects } from '@/components/sections/IndustryProjects';
import { CourseSections } from '@/components/sections/CourseSections';
import { Testimonials } from '@/components/sections/Testimonials';
import { content as fallbackContent } from '@/config/content';

// Helper to get base URL for server-side fetch
function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return 'http://localhost:3000';
}

// Generate metadata dynamically
export async function generateMetadata(): Promise<Metadata> {
  let siteData = fallbackContent.site;
  
  try {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/api/content`, {
      cache: 'no-store',
    });
    
    if (response.ok) {
      const data = await response.json();
      if (data.success && data.data?.site) {
        siteData = data.data.site;
      }
    }
  } catch (error) {
    console.error('Error fetching content for metadata:', error);
  }

  return {
    title: `${siteData.name} - ${siteData.tagline}`,
    description: siteData.description,
    keywords: [
      'career switch',
      'online courses',
      'edtech',
      'professional development',
      'career transition',
      'skill development',
      'web development courses',
      'data science courses',
      'coding bootcamp',
      'online learning',
      'career coaching',
      'job placement',
      'mentorship',
      'portfolio building',
      'tech careers',
    ],
    openGraph: {
      title: `${siteData.name} - ${siteData.tagline}`,
      description: siteData.description,
      url: siteData.url,
      type: 'website',
      images: [
        {
          url: `${siteData.url}/trust2switch_logo.jpg`,
          width: 1200,
          height: 630,
          alt: siteData.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${siteData.name} - ${siteData.tagline}`,
      description: siteData.description,
      images: [`${siteData.url}/trust2switch_logo.jpg`],
    },
    alternates: {
      canonical: siteData.url,
    },
  };
}

export default async function Home() {
  // Fetch content and courses from API
  let content = fallbackContent;
  let courses: any[] = [];

  try {
    const baseUrl = getBaseUrl();
    
    // Fetch content
    const contentResponse = await fetch(`${baseUrl}/api/content`, {
      cache: 'no-store',
    });
    
    if (contentResponse.ok) {
      const contentData = await contentResponse.json();
      if (contentData.success && contentData.data) {
        content = contentData.data;
      }
    }

    // Fetch courses
    const coursesResponse = await fetch(`${baseUrl}/api/courses?limit=6`, {
      cache: 'no-store',
    });
    
    if (coursesResponse.ok) {
      const coursesData = await coursesResponse.json();
      if (coursesData.success && Array.isArray(coursesData.data)) {
        courses = coursesData.data;
      }
    }
  } catch (error) {
    console.error('Error fetching data for home page:', error);
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: content.site.name,
    description: content.site.description,
    url: content.site.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${content.site.url}/courses?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  const courseListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: courses.slice(0, 6).map((course: any, index: number) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Course',
        name: course.title,
        description: course.description,
        url: `${content.site.url}/courses/${course.slug}`,
        provider: {
          '@type': 'Organization',
          name: content.site.name,
        },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseListSchema) }}
      />
      <Hero />
      <KeyHighlights />
      <CareerAdviceSection content={content} />
      <PlatformRatings />
      <IndustryProjects />
      <CourseSections />
      <Testimonials />
    </>
  );
}

