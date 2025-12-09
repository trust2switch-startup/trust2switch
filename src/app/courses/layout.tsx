import type { Metadata } from 'next';
import { content } from '@/config/content';

export const metadata: Metadata = {
  title: `Courses | ${content.site.name}`,
  description: `${content.courses.subtitle} Browse our comprehensive catalog of online courses in web development, data science, design, cloud computing, and more. Start your career transition today.`,
  keywords: [
    'online courses',
    'web development courses',
    'data science courses',
    'coding bootcamp',
    'online learning',
    'career courses',
    'professional courses',
    'skill development courses',
    'tech courses',
  ],
  openGraph: {
    title: `Courses | ${content.site.name}`,
    description: content.courses.subtitle,
    url: `${content.site.url}/courses`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Courses | ${content.site.name}`,
    description: content.courses.subtitle,
  },
  alternates: {
    canonical: `${content.site.url}/courses`,
  },
};

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


