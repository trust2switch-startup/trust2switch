import type { Metadata } from 'next';
import { content } from '@/config/content';

export const metadata: Metadata = {
  title: `Shop - ${content.site.name}`,
  description: 'Browse and purchase projects, research papers, templates, and more. High-quality digital products for developers, researchers, and students.',
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

