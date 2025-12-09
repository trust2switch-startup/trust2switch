import type { Metadata } from 'next';
import { content } from '@/config/content';

export const metadata: Metadata = {
  title: `About Us | ${content.site.name}`,
  description: `${content.about.subtitle} Learn about our mission, vision, and values. Discover how Trust2Switch empowers career transitions through quality education.`,
  keywords: [
    'about trust2switch',
    'career education',
    'online learning platform',
    'edtech company',
    'career transition support',
    'professional development',
  ],
  openGraph: {
    title: `About Us | ${content.site.name}`,
    description: `${content.about.subtitle} Learn about our mission, vision, and values.`,
    url: `${content.site.url}/about`,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: `About Us | ${content.site.name}`,
    description: content.about.subtitle,
  },
  alternates: {
    canonical: `${content.site.url}/about`,
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


