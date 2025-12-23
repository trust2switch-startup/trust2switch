'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, Users, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';
import { Course } from '@/types';
import { trackCourseView, trackButtonClick } from '@/lib/analytics';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card hover className="h-full flex flex-col group overflow-hidden border-slate-200 transition-shadow duration-300 hover:shadow-xl rounded-xl">
        <div className="relative h-44 w-full overflow-hidden">
          <Image
            src={course.image}
            alt={course.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {course.isPopular && (
              <Badge variant="primary" className="shadow-sm backdrop-blur-md bg-white/90 text-[#84994F] border-none text-[10px] px-2 py-0.5 font-bold uppercase tracking-wider">
                Popular
              </Badge>
            )}
            {course.isNewCourse && (
              <Badge variant="success" className="shadow-sm backdrop-blur-md bg-[#84994F] text-white border-none text-[10px] px-2 py-0.5 font-bold uppercase tracking-wider">
                New
              </Badge>
            )}
          </div>
        </div>

        <CardContent className="flex-1 flex flex-col p-4 sm:p-5">
          <div className="mb-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#84994F] bg-[#84994F]/10 px-2 py-1 rounded-full">
                {course.category}
              </span>
              <div className="flex items-center gap-1 text-amber-400">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="text-xs font-bold text-slate-700">{course.rating}</span>
              </div>
            </div>

            <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 leading-tight group-hover:text-[#84994F] transition-colors">
              {course.title}
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm line-clamp-2 leading-relaxed">
              {course.description}
            </p>
          </div>

          <div className="mt-auto pt-3 border-t border-slate-100 flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                <span>{course.students.toLocaleString()} students</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{course.duration}</span>
              </div>
            </div>

            <div className="flex items-end justify-between gap-3">
              <div className="flex flex-col">
                {course.originalPrice && (
                  <span className="text-[10px] text-slate-400 line-through leading-none mb-0.5">
                    {formatPrice(course.originalPrice)}
                  </span>
                )}
                <span className="text-xl font-bold text-slate-900 leading-none">
                  {formatPrice(course.price)}
                </span>
              </div>

              <Link
                href={`/courses/${course.slug}`}
                className="flex-1"
                onClick={() => {
                  trackCourseView(course.slug, course.title);
                  trackButtonClick('view_course_details', 'course_card');
                }}
              >
                <Button size="sm" className="w-full bg-[#84994F] hover:bg-slate-900 text-white text-xs font-medium h-9 rounded-lg transition-colors shadow-none hover:shadow-md">
                  View Course
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};


