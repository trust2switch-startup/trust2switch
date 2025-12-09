import type { Metadata } from 'next';
import { courses } from '@/config/courses';
import { content } from '@/config/content';

interface CourseLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: CourseLayoutProps): Promise<Metadata> {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);

  if (!course) {
    return {
      title: 'Course Not Found',
    };
  }

  const url = `${content.site.url}/courses/${course.slug}`;

  return {
    title: `${course.title} | ${content.site.name}`,
    description: course.description,
    keywords: [
      ...course.tags,
      course.category,
      course.level,
      'online course',
      'online learning',
      'career development',
    ],
    openGraph: {
      title: course.title,
      description: course.description,
      url,
      type: 'website',
      images: [
        {
          url: course.image,
          width: 1200,
          height: 630,
          alt: course.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: course.title,
      description: course.description,
      images: [course.image],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default function CourseLayout({ children }: CourseLayoutProps) {
  return <>{children}</>;
}

