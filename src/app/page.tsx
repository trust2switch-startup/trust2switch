import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { KeyHighlights } from '@/components/sections/KeyHighlights';
import { PlatformRatings } from '@/components/sections/PlatformRatings';
import { CareerAdviceSection } from '@/components/sections/CareerAdviceSection';
import { IndustryProjects } from '@/components/sections/IndustryProjects';
import { CourseSections } from '@/components/sections/CourseSections';
import { Testimonials } from '@/components/sections/Testimonials';
import { content } from '@/config/content';

export const metadata: Metadata = {
  title: `${content.site.name} - ${content.site.tagline}`,
  description: content.site.description,
};

export default function Home() {
  return (
    <>
      <Hero />
      <KeyHighlights />
      <PlatformRatings />
      <IndustryProjects />
      <CareerAdviceSection />
      <CourseSections />
      <Testimonials />
    </>
  );
}

