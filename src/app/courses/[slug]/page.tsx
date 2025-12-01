'use client';

import React, { useState } from 'react';
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

  if (!course) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">Course Not Found</h1>
          <Link href="/courses">
            <Button variant="primary">Back to Courses</Button>
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

  return (
    <>
      <div className="min-h-screen bg-neutral-50">
        {/* Header */}
        <section className="bg-gradient-to-r from-primary-600 via-primary-700 to-secondary-600 py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Link
              href="/courses"
              className="inline-flex items-center text-primary-100 hover:text-white mb-6 transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Courses
            </Link>
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              <div className="flex-1">
                <Badge variant="default" className="mb-4 bg-white/20 text-white border-white/30">
                  {course.category}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4 leading-tight">
                  {course.title}
                </h1>
                <p className="text-xl text-primary-100 mb-6 leading-relaxed">
                  {course.description}
                </p>
                <div className="flex flex-wrap items-center gap-6 text-white mb-6">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{course.rating}</span>
                    <span className="text-primary-100">({course.reviews.toLocaleString()} reviews)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    <span>{course.students.toLocaleString()} students</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>{course.duration}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-4xl font-bold text-white">
                    {formatPrice(course.price)}
                  </span>
                  {course.originalPrice && (
                    <span className="text-xl text-primary-200 line-through">
                      {formatPrice(course.originalPrice)}
                    </span>
                  )}
                </div>
              </div>
              <div className="w-full lg:w-96">
                <Card className="shadow-2xl">
                  <div className="relative h-48 w-full overflow-hidden">
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
                      className="w-full mb-3 hover:scale-105 transition-transform flex items-center justify-center"
                    >
                      {content.courses.enroll}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="w-full mb-3 hover:scale-105 transition-transform flex items-center justify-center"
                      onClick={() => setIsDemoModalOpen(true)}
                    >
                      <Video className="w-5 h-5 mr-2 flex-shrink-0" />
                      <span>Book Demo Session</span>
                    </Button>
                    <Button 
                      variant="secondary" 
                      size="lg" 
                      className="w-full mb-4 hover:scale-105 transition-transform flex items-center justify-center"
                      onClick={() => setIsOneOnOneModalOpen(true)}
                    >
                      <Calendar className="w-5 h-5 mr-2 flex-shrink-0" />
                      <span>Book 1-on-1 Session</span>
                    </Button>
                    <div className="space-y-3 pt-4 border-t border-neutral-200">
                      <div className="text-sm font-semibold text-neutral-900 mb-2">
                        Course Includes:
                      </div>
                      {course.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-neutral-700">
                          <Check className="w-4 h-4 text-primary-600 flex-shrink-0" />
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
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Description */}
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent>
                    <h2 className="text-2xl font-heading font-bold text-neutral-900 mb-4">
                      About This Course
                    </h2>
                    <p className="text-neutral-700 leading-relaxed whitespace-pre-line">
                      {course.longDescription}
                    </p>
                  </CardContent>
                </Card>

                {/* Enhanced Curriculum */}
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-primary-600" />
                      </div>
                      <h2 className="text-2xl font-heading font-bold text-neutral-900">
                        Course Curriculum
                      </h2>
                    </div>
                    <div className="space-y-4">
                      {course.curriculum.map((week, index) => {
                        const isExpanded = expandedWeeks.has(index);
                        return (
                          <div
                            key={index}
                            className="border border-neutral-200 rounded-lg overflow-hidden hover:border-primary-300 transition-colors"
                          >
                            <button
                              onClick={() => toggleWeek(index)}
                              className="w-full p-4 bg-neutral-50 hover:bg-neutral-100 transition-colors flex items-center justify-between"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                                  {week.week}
                                </div>
                                <div className="text-left">
                                  <h3 className="font-semibold text-neutral-900">
                                    {week.title}
                                  </h3>
                                  <p className="text-sm text-neutral-600">
                                    {week.lessons.length} lessons
                                  </p>
                                </div>
                              </div>
                              {isExpanded ? (
                                <ChevronUp className="w-5 h-5 text-neutral-600" />
                              ) : (
                                <ChevronDown className="w-5 h-5 text-neutral-600" />
                              )}
                            </button>
                            {isExpanded && (
                              <div className="p-4 bg-white space-y-3 animate-in slide-in-from-top-2 duration-200">
                                {week.lessons.map((lesson, lessonIndex) => (
                                  <div
                                    key={lessonIndex}
                                    className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg hover:bg-primary-50 transition-colors group"
                                  >
                                    <div className="flex items-center gap-3">
                                      <div className={`w-2 h-2 rounded-full ${
                                        lesson.type === 'video' ? 'bg-primary-600' :
                                        lesson.type === 'reading' ? 'bg-blue-600' :
                                        'bg-green-600'
                                      }`} />
                                      <span className="text-neutral-700 group-hover:text-primary-600 transition-colors">
                                        {lesson.title}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Badge variant="default" className="text-xs">
                                        {lesson.type}
                                      </Badge>
                                      <span className="text-sm text-neutral-500">{lesson.duration}</span>
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
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent>
                    <h3 className="text-xl font-heading font-bold text-neutral-900 mb-4">
                      Instructor
                    </h3>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-primary-200">
                        <Image
                          src={course.instructor.image}
                          alt={course.instructor.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-neutral-900">{course.instructor.name}</div>
                        <div className="text-sm text-neutral-600">{course.instructor.role}</div>
                      </div>
                    </div>
                    <p className="text-sm text-neutral-700 leading-relaxed">{course.instructor.bio}</p>
                  </CardContent>
                </Card>

                {/* Course Info */}
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent>
                    <h3 className="text-xl font-heading font-bold text-neutral-900 mb-4">
                      Course Details
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between items-center py-2 border-b border-neutral-100">
                        <span className="text-neutral-600">Level:</span>
                        <Badge variant="primary">{course.level}</Badge>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-neutral-100">
                        <span className="text-neutral-600">Language:</span>
                        <span className="text-neutral-900 font-medium">{course.language}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-neutral-100">
                        <span className="text-neutral-600">Duration:</span>
                        <span className="text-neutral-900 font-medium">{course.duration}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-neutral-600">Students:</span>
                        <span className="text-neutral-900 font-medium">{course.students.toLocaleString()}</span>
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
