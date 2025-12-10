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
      whileHover={{ y: -8 }}
    >
      <Card hover className="h-full flex flex-col group">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={course.image}
            alt={course.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {course.isPopular && (
            <div className="absolute top-4 left-4">
              <Badge variant="primary">Popular</Badge>
            </div>
          )}
          {course.isNew && (
            <div className="absolute top-4 left-4">
              <Badge variant="success">New</Badge>
            </div>
          )}
        </div>
        <CardContent className="flex-1 flex flex-col">
          <div className="mb-4">
            <Badge variant="default" className="mb-2 bg-[#84994F]/10 text-[#84994F] border border-[#84994F]/20">{course.category}</Badge>
            <h3 className="text-xl font-semibold text-slate-900 mb-2 line-clamp-2 group-hover:text-[#84994F] transition-colors">
              {course.title}
            </h3>
            <p className="text-slate-600 text-sm mb-4 line-clamp-2">
              {course.description}
            </p>
          </div>

          <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{course.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{course.students.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{course.duration}</span>
            </div>
          </div>

          <div className="mt-auto pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-[#84994F]">
                  {formatPrice(course.price)}
                </span>
                {course.originalPrice && (
                  <span className="text-sm text-slate-500 line-through">
                    {formatPrice(course.originalPrice)}
                  </span>
                )}
              </div>
            </div>
            <Link 
              href={`/courses/${course.slug}`} 
              className="block"
              onClick={() => {
                trackCourseView(course.slug, course.title);
                trackButtonClick('view_course_details', 'course_card');
              }}
            >
              <Button variant="primary" className="w-full hover:scale-105 transition-transform bg-[#84994F] hover:bg-[#6d7f42] text-white shadow-lg">
                View Details
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};


