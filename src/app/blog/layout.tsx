import type { Metadata } from 'next';
import { content } from '@/config/content';

export const metadata: Metadata = {
  title: `Blog | ${content.site.name}`,
  description: `${content.blog.subtitle} Read articles on career advice, skill development, workplace tips, and industry insights to help you succeed in your career transition.`,
  keywords: [
    'career blog',
    'career advice',
    'professional development articles',
    'career tips',
    'skill development blog',
    'workplace advice',
    'career transition blog',
  ],
  openGraph: {
    title: `Blog | ${content.site.name}`,
    description: content.blog.subtitle,
    url: `${content.site.url}/blog`,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: `Blog | ${content.site.name}`,
    description: content.blog.subtitle,
  },
  alternates: {
    canonical: `${content.site.url}/blog`,
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


