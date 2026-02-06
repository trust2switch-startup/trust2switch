import type { Metadata } from 'next';
import { content } from '@/config/content';

export const metadata: Metadata = {
  title: `Projects | ${content.site.name}`,
  description: 'Browse and purchase projects, research papers, templates, and more. High-quality digital products for developers, researchers, and students.',
  keywords: [
    'digital products',
    'project templates',
    'research papers',
    'code templates',
    'developer resources',
    'student resources',
  ],
  openGraph: {
    title: `Projects | ${content.site.name}`,
    description: 'Browse and purchase projects, research papers, templates, and more.',
    url: `${content.site.url}/projects`,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: `Projects | ${content.site.name}`,
    description: 'Browse and purchase projects, research papers, templates, and more.',
  },
  alternates: {
    canonical: `${content.site.url}/projects`,
  },
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

