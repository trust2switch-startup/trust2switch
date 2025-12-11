import type { Metadata } from 'next';
import { content } from '@/config/content';

export const metadata: Metadata = {
  title: `Privacy Policy | ${content.site.name}`,
  description: `Read Trust2Switch Privacy Policy. Learn how we collect, use, store, and protect your personal information when you use our services and platform.`,
  keywords: [
    'privacy policy',
    'trust2switch privacy',
    'data protection',
    'privacy statement',
    'data privacy',
    'user privacy',
  ],
  openGraph: {
    title: `Privacy Policy | ${content.site.name}`,
    description: `Read Trust2Switch Privacy Policy. Learn how we collect, use, store, and protect your personal information.`,
    url: `${content.site.url}/privacy`,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: `Privacy Policy | ${content.site.name}`,
    description: `Read Trust2Switch Privacy Policy. Learn how we collect, use, store, and protect your personal information.`,
  },
  alternates: {
    canonical: `${content.site.url}/privacy`,
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

