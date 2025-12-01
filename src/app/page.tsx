import type { Metadata } from 'next';
import Link from 'next/link';
import { Hero } from '@/components/sections/Hero';
import { Features } from '@/components/sections/Features';
import { Testimonials } from '@/components/sections/Testimonials';
import { Newsletter } from '@/components/sections/Newsletter';
import { CTA } from '@/components/sections/CTA';
import { CourseCard } from '@/components/course/CourseCard';
import { Button } from '@/components/ui/Button';
import { courses } from '@/config/courses';
import { content } from '@/config/content';

export const metadata: Metadata = {
  title: `${content.site.name} - ${content.site.tagline}`,
  description: content.site.description,
};

export default function Home() {
  const popularCourses = courses.filter(course => course.isPopular).slice(0, 3);

  return (
    <>
      <Hero />
      <Features />
      
      {/* Popular Courses Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-neutral-900 mb-4">
              {content.home.courses.title}
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              {content.home.courses.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {popularCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          <div className="text-center">
            <Link href="/courses">
              <Button variant="outline" size="lg">
                {content.home.courses.viewAll}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Testimonials />
      <Newsletter />
      <CTA />
    </>
  );
}

