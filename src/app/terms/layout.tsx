import type { Metadata } from 'next';
import { content } from '@/config/content';

export const metadata: Metadata = {
  title: `Terms & Conditions | ${content.site.name}`,
  description: `Read Trust2Switch Terms & Conditions. Understand your rights and responsibilities when using our services, courses, and learning platform.`,
  keywords: [
    'terms and conditions',
    'trust2switch terms',
    'user agreement',
    'service terms',
    'legal terms',
    'course terms',
  ],
  openGraph: {
    title: `Terms & Conditions | ${content.site.name}`,
    description: `Read Trust2Switch Terms & Conditions. Understand your rights and responsibilities when using our services.`,
    url: `${content.site.url}/terms`,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: `Terms & Conditions | ${content.site.name}`,
    description: `Read Trust2Switch Terms & Conditions. Understand your rights and responsibilities when using our services.`,
  },
  alternates: {
    canonical: `${content.site.url}/terms`,
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

