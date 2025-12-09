import type { Metadata } from 'next';
import { content } from '@/config/content';

export const metadata: Metadata = {
  title: `Contact Us | ${content.site.name}`,
  description: `${content.contact.subtitle} Get in touch with our team for course inquiries, support, or partnership opportunities. We're here to help you succeed.`,
  keywords: [
    'contact trust2switch',
    'course inquiry',
    'support',
    'customer service',
    'help center',
  ],
  openGraph: {
    title: `Contact Us | ${content.site.name}`,
    description: content.contact.subtitle,
    url: `${content.site.url}/contact`,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: `Contact Us | ${content.site.name}`,
    description: content.contact.subtitle,
  },
  alternates: {
    canonical: `${content.site.url}/contact`,
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


