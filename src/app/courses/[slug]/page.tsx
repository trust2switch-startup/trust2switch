'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { use } from 'react';
import { Star, Users, Clock, Check, ArrowLeft, Video, Calendar, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';
import { BookDemoModal } from '@/components/booking/BookDemoModal';
import { BookOneOnOneModal } from '@/components/booking/BookOneOnOneModal';
import { courses } from '@/config/courses';
import { formatPrice } from '@/lib/utils';
import { content } from '@/config/content';
import { trackButtonClick, trackModalOpen, trackCourseView } from '@/lib/analytics';

interface CourseDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { slug } = use(params);
  const course = courses.find((c) => c.slug === slug);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isOneOnOneModalOpen, setIsOneOnOneModalOpen] = useState(false);
  const [expandedWeeks, setExpandedWeeks] = useState<Set<number>>(new Set([0]));

  // Track course view
  React.useEffect(() => {
    if (course) {
      trackCourseView(course.slug, course.title);
    }
  }, [course]);

  if (!course) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Course Not Found</h1>
          <Link href="/courses">
            <Button variant="primary" className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-600">
              Back to Courses
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const toggleWeek = (week: number) => {
    setExpandedWeeks((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(week)) {
        newSet.delete(week);
      } else {
        newSet.add(week);
      }
      return newSet;
    });
  };

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.description,
    provider: {
      '@type': 'Organization',
      name: content.site.name,
      url: content.site.url,
    },
    image: course.image,
    courseCode: course.id,
    educationalLevel: course.level,
    inLanguage: course.language,
    offers: {
      '@type': 'Offer',
      price: course.price,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      url: `${content.site.url}/courses/${course.slug}`,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: course.rating,
      reviewCount: course.reviews,
    },
    instructor: {
      '@type': 'Person',
      name: course.instructor.name,
      jobTitle: course.instructor.role,
      image: course.instructor.image,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: content.site.url,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Courses',
        item: `${content.site.url}/courses`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: course.title,
        item: `${content.site.url}/courses/${course.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <section className="bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Link
              href="/courses"
              className="inline-flex items-center text-slate-300 hover:text-orange-400 mb-6 transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Courses
            </Link>
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              <div className="flex-1">
                <Badge variant="default" className="mb-4 bg-orange-500/20 text-orange-300 border-orange-400/30 backdrop-blur-sm">
                  {course.category}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4 leading-tight">
                  {course.title}
                </h1>
                <p className="text-xl text-slate-300 mb-6 leading-relaxed">
                  {course.description}
                </p>
                <div className="flex flex-wrap items-center gap-6 text-white mb-6">
                  <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{course.rating}</span>
                    <span className="text-slate-300">({course.reviews.toLocaleString()} reviews)</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <Users className="w-5 h-5" />
                    <span>{course.students.toLocaleString()} students</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <Clock className="w-5 h-5" />
                    <span>{course.duration}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-4xl font-bold text-white bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
                    {formatPrice(course.price)}
                  </span>
                  {course.originalPrice && (
                    <span className="text-xl text-slate-400 line-through">
                      {formatPrice(course.originalPrice)}
                    </span>
                  )}
                </div>
              </div>
              <div className="w-full lg:w-96">
                <Card className="shadow-2xl border-2 border-slate-200 bg-white">
                  <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <Button 
                      variant="primary" 
                      size="lg" 
                      className="w-full mb-3 hover:scale-105 transition-transform flex items-center justify-center bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white shadow-lg"
                      onClick={() => {
                        trackButtonClick('enroll_course', 'course_detail_page');
                      }}
                    >
                      {content.courses.enroll}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="w-full mb-3 hover:scale-105 transition-transform flex items-center justify-center border-indigo-600 text-indigo-600 hover:bg-indigo-50"
                      onClick={() => {
                        trackButtonClick('book_demo', 'course_detail_page');
                        trackModalOpen('book_demo_modal');
                        setIsDemoModalOpen(true);
                      }}
                    >
                      <Video className="w-5 h-5 mr-2 flex-shrink-0" />
                      <span>Book Demo Session</span>
                    </Button>
                    <Button 
                      variant="secondary" 
                      size="lg" 
                      className="w-full mb-4 hover:scale-105 transition-transform flex items-center justify-center bg-slate-700 text-white hover:bg-slate-800"
                      onClick={() => {
                        trackButtonClick('book_one_on_one', 'course_detail_page');
                        trackModalOpen('book_one_on_one_modal');
                        setIsOneOnOneModalOpen(true);
                      }}
                    >
                      <Calendar className="w-5 h-5 mr-2 flex-shrink-0" />
                      <span>Book 1-on-1 Session</span>
                    </Button>
                    <div className="space-y-3 pt-4 border-t border-slate-200">
                      <div className="text-sm font-semibold text-slate-900 mb-2">
                        Course Includes:
                      </div>
                      {course.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-slate-700">
                          <Check className="w-4 h-4 text-orange-600 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Description */}
                <Card className="hover:shadow-xl transition-shadow border-2 border-slate-200 bg-white">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-heading font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full"></div>
                      About This Course
                    </h2>
                    <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                      {course.longDescription}
                    </p>
                  </CardContent>
                </Card>

                {/* Enhanced Curriculum */}
                <Card className="hover:shadow-xl transition-shadow border-2 border-slate-200 bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-2xl font-heading font-bold text-slate-900">
                        Course Curriculum
                      </h2>
                    </div>
                    <div className="space-y-4">
                      {course.curriculum.map((week, index) => {
                        const isExpanded = expandedWeeks.has(index);
                        return (
                          <div
                            key={index}
                            className="border-2 border-slate-200 rounded-xl overflow-hidden hover:border-indigo-300 transition-all shadow-sm hover:shadow-md"
                          >
                            <button
                              onClick={() => toggleWeek(index)}
                              className="w-full p-4 bg-gradient-to-r from-slate-50 to-white hover:from-indigo-50 hover:to-white transition-all flex items-center justify-between"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-indigo-700 text-white rounded-xl flex items-center justify-center font-bold text-sm shadow-md">
                                  {week.week}
                                </div>
                                <div className="text-left">
                                  <h3 className="font-semibold text-slate-900">
                                    {week.title}
                                  </h3>
                                  <p className="text-sm text-slate-600">
                                    {week.lessons.length} lessons
                                  </p>
                                </div>
                              </div>
                              {isExpanded ? (
                                <ChevronUp className="w-5 h-5 text-indigo-600" />
                              ) : (
                                <ChevronDown className="w-5 h-5 text-slate-600" />
                              )}
                            </button>
                            {isExpanded && (
                              <div className="p-4 bg-white space-y-3 animate-in slide-in-from-top-2 duration-200 border-t border-slate-100">
                                {week.lessons.map((lesson, lessonIndex) => (
                                  <div
                                    key={lessonIndex}
                                    className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-indigo-50 transition-colors group border border-slate-100"
                                  >
                                    <div className="flex items-center gap-3">
                                      <div className={`w-3 h-3 rounded-full ${
                                        lesson.type === 'video' ? 'bg-orange-500' :
                                        lesson.type === 'reading' ? 'bg-indigo-500' :
                                        'bg-green-500'
                                      } shadow-sm`} />
                                      <span className="text-slate-700 group-hover:text-indigo-600 transition-colors font-medium">
                                        {lesson.title}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Badge 
                                        variant="default" 
                                        className={`text-xs ${
                                          lesson.type === 'video' ? 'bg-orange-100 text-orange-700' :
                                          lesson.type === 'reading' ? 'bg-indigo-100 text-indigo-700' :
                                          'bg-green-100 text-green-700'
                                        }`}
                                      >
                                        {lesson.type}
                                      </Badge>
                                      <span className="text-sm text-slate-500">{lesson.duration}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Instructor */}
                <Card className="hover:shadow-xl transition-shadow border-2 border-slate-200 bg-white">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-heading font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <div className="w-1 h-5 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full"></div>
                      Instructor
                    </h3>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-indigo-200 shadow-md">
                        <Image
                          src={course.instructor.image}
                          alt={course.instructor.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">{course.instructor.name}</div>
                        <div className="text-sm text-slate-600">{course.instructor.role}</div>
                      </div>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">{course.instructor.bio}</p>
                  </CardContent>
                </Card>

                {/* Course Info */}
                <Card className="hover:shadow-xl transition-shadow border-2 border-slate-200 bg-white">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-heading font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <div className="w-1 h-5 bg-gradient-to-b from-indigo-500 to-indigo-600 rounded-full"></div>
                      Course Details
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between items-center py-2 border-b border-slate-100">
                        <span className="text-slate-600">Level:</span>
                        <Badge className="bg-indigo-100 text-indigo-700">{course.level}</Badge>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-slate-100">
                        <span className="text-slate-600">Language:</span>
                        <span className="text-slate-900 font-medium">{course.language}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-slate-100">
                        <span className="text-slate-600">Duration:</span>
                        <span className="text-slate-900 font-medium">{course.duration}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-slate-600">Students:</span>
                        <span className="text-slate-900 font-medium">{course.students.toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Booking Modals */}
      <BookDemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        courseTitle={course.title}
      />
      <BookOneOnOneModal
        isOpen={isOneOnOneModalOpen}
        onClose={() => setIsOneOnOneModalOpen(false)}
        courseTitle={course.title}
      />
    </>
  );
}
