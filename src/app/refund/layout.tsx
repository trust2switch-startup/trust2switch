import type { Metadata } from 'next';
import { content } from '@/config/content';

export const metadata: Metadata = {
  title: `Refund & Rescheduling Policy | ${content.site.name}`,
  description: `Read Trust2Switch Refund & Rescheduling Policy. Understand refund eligibility, rescheduling conditions, and terms for online courses and partner programs.`,
  keywords: [
    'refund policy',
    'trust2switch refund',
    'rescheduling policy',
    'course refund',
    'refund terms',
    'money back guarantee',
  ],
  openGraph: {
    title: `Refund & Rescheduling Policy | ${content.site.name}`,
    description: `Read Trust2Switch Refund & Rescheduling Policy. Understand refund eligibility and rescheduling conditions.`,
    url: `${content.site.url}/refund`,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: `Refund & Rescheduling Policy | ${content.site.name}`,
    description: `Read Trust2Switch Refund & Rescheduling Policy. Understand refund eligibility and rescheduling conditions.`,
  },
  alternates: {
    canonical: `${content.site.url}/refund`,
  },
};

export default function RefundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

