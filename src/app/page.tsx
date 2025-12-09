import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { KeyHighlights } from '@/components/sections/KeyHighlights';
import { PlatformRatings } from '@/components/sections/PlatformRatings';
import { CareerAdviceSection } from '@/components/sections/CareerAdviceSection';
import { IndustryProjects } from '@/components/sections/IndustryProjects';
import { CourseSections } from '@/components/sections/CourseSections';
import { Testimonials } from '@/components/sections/Testimonials';
import { content } from '@/config/content';
import { courses } from '@/config/courses';

export const metadata: Metadata = {
  title: `${content.site.name} - ${content.site.tagline}`,
  description: content.site.description,
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
    title: `${content.site.name} - ${content.site.tagline}`,
    description: content.site.description,
    url: content.site.url,
    type: 'website',
    images: [
      {
        url: `${content.site.url}/trust2switch_logo.jpg`,
        width: 1200,
        height: 630,
        alt: content.site.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${content.site.name} - ${content.site.tagline}`,
    description: content.site.description,
    images: [`${content.site.url}/trust2switch_logo.jpg`],
  },
  alternates: {
    canonical: content.site.url,
  },
};

export default function Home() {
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
    itemListElement: courses.slice(0, 6).map((course, index) => ({
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
      <CareerAdviceSection />
      <PlatformRatings />
      <IndustryProjects />
      <CourseSections />
      <Testimonials />
    </>
  );
}

