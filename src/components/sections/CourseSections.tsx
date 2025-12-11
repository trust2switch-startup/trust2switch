'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Code, Database, Brain, Cloud, Settings, Palette, Globe, FileText, Briefcase, BarChart3, Sparkles } from 'lucide-react';
import { BookOpen, Calculator, Atom, FlaskConical, Laptop, BookMarked } from 'lucide-react';
import professionalCoursesData from '@/config/professionalCourses.json';
import schoolSubjectsData from '@/config/schoolSubjects.json';

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Code,
  Database,
  Brain,
  Cloud,
  Settings,
  Palette,
  Globe,
  FileText,
  Briefcase,
  BarChart3,
  Sparkles,
  Calculator,
  Atom,
  FlaskConical,
  Laptop,
  BookMarked,
  BookOpen,
};

// Map JSON data to include icon components
const professionalCourses = professionalCoursesData.map((course) => ({
  ...course,
  icon: iconMap[course.icon],
}));

const schoolSubjects = schoolSubjectsData.map((subject) => ({
  ...subject,
  icon: iconMap[subject.icon],
}));

export const CourseSections: React.FC = () => {
  const [showMore, setShowMore] = useState(false);
  const visibleCourses = showMore ? professionalCourses : professionalCourses.slice(0, 8);

  return (
    <section id="program-categories" className="py-12 sm:py-16 lg:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mb-3 sm:mb-4 px-2">
            Choose Your Path to <span className="bg-[#84994F] bg-clip-text text-transparent">Mastery</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-2xl mx-auto px-4">
            Explore our comprehensive range of professional courses and school mentorship programs designed to accelerate your learning journey.
          </p>
        </div>

        {/* Professional/College Students Section */}
        <div id="professional-section" className="mb-12 sm:mb-16 lg:mb-20" style={{ scrollMarginTop: '120px' }}>
          <div className="flex items-center gap-2 sm:gap-4 mb-6 sm:mb-8 lg:mb-10 px-2">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent"></div>
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 flex items-center gap-2 whitespace-nowrap">
              {/* <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">Pro</span> */}
              <span className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">Professionals & College Students</span>
            </h3>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
            {visibleCourses.map((course, index) => {
              const Icon = course.icon;
              return (
                <Link
                  key={index}
                  href={`/courses/${course.slug}`}
                  className="group"
                >
                  <div className="bg-white p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl shadow-lg border-2 border-slate-100 transition-all duration-300 transform hover:scale-[1.03] hover:shadow-2xl flex flex-col justify-between h-full min-h-[260px] sm:min-h-[280px] lg:min-h-[300px] hover:border-indigo-200 relative overflow-hidden">
                    {/* Gradient Background on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-indigo-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0"></div>
                    
                    {/* Top Icon */}
                    <div className="relative z-10 mb-3 sm:mb-4">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#435663] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex-1">
                      <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-2 sm:mb-3 group-hover:text-indigo-900 transition-colors">{course.title}</h4>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors">{course.description}</p>
                    </div>

                    {/* Button */}
                    <div className="relative z-10 mt-4 sm:mt-6">
                      <div className="w-full text-xs sm:text-sm font-semibold text-white bg-[#84994F] hover:from-green-500 hover:to-green-600 hover:shadow-lg py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg sm:rounded-xl transition-all duration-200 text-center group-hover:scale-105">
                        View Details
                      </div>
                    </div>

                    {/* Decorative Corner */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-indigo-500 to-indigo-600 opacity-5 rounded-bl-full"></div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* View More Button */}
          {professionalCourses.length > 8 && (
            <div className="text-center mt-12">
              <button
                onClick={() => {
                  setShowMore(!showMore);
                  if (showMore) {
                    setTimeout(() => {
                      document.getElementById('professional-section')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }
                }}
                className="group relative inline-flex items-center gap-2 text-[#435663] border-2 border-[#435663] hover:bg-gradient-to-r hover:bg-[#435663] hover:text-white hover:border-transparent font-semibold py-3 px-8 rounded-full transition-all duration-300 focus:outline-none shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <span>{showMore ? 'View Less' : 'View More Courses'}</span>
                <span className={`transition-transform duration-300 ${showMore ? 'rotate-180' : ''}`}>
                  ↓
                </span>
              </button>
            </div>
          )}
        </div>

        {/* School Mentorship Section */}
        <div id="school-mentorship" style={{ scrollMarginTop: '120px' }}>
          <div className="flex items-center gap-2 sm:gap-4 mb-6 sm:mb-8 lg:mb-10 px-2">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-indigo-400 to-transparent"></div>
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 flex items-center gap-2 whitespace-nowrap">
              {/* <span className="bg-gradient-to-r from-indigo-500 to-indigo-600 bg-clip-text text-transparent">School</span> */}
              <span className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">School Mentorship & Tutoring</span>
            </h3>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-indigo-400 to-transparent"></div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
            {schoolSubjects.map((subject, index) => {
              const Icon = subject.icon;
              return (
                <Link
                  key={index}
                  href={`/courses/${subject.slug}`}
                  className="group"
                >
                  <div className="bg-white p-3 sm:p-4 lg:p-6 text-center rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-slate-100 hover:border-orange-200 flex flex-col justify-between h-full min-h-[180px] sm:min-h-[200px] lg:min-h-[220px] relative overflow-hidden">
                    {/* Gradient Background on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-orange-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0"></div>
                    
                    {/* Icon */}
                    <div className="relative z-10 mb-2 sm:mb-3 lg:mb-4 flex justify-center">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-[#435663] rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex-1">
                      <p className="text-xs sm:text-sm lg:text-base font-bold text-slate-900 mb-1 sm:mb-2 group-hover:text-orange-900 transition-colors">{subject.title}</p>
                      <p className="text-[10px] sm:text-xs text-slate-600 group-hover:text-slate-700 transition-colors leading-relaxed">{subject.description}</p>
                    </div>

                    {/* Button */}
                    <div className="relative z-10 mt-2 sm:mt-3 lg:mt-4">
                      <div className="w-full text-[10px] sm:text-xs font-semibold text-white bg-[#84994F] hover:from-green-500 hover:to-green-600 py-1.5 sm:py-2 rounded-lg sm:rounded-xl transition-all duration-200 group-hover:shadow-lg group-hover:scale-105">
                        View Details
                      </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-2 right-2 w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 opacity-10 rounded-full blur-sm"></div>
                    <div className="absolute bottom-2 left-2 w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 opacity-10 rounded-full blur-sm"></div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

