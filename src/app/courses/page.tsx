'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { CourseCard } from '@/components/course/CourseCard';
import { Input } from '@/components/ui/Input';
import { content } from '@/config/content';
import { Course } from '@/types';
import { Search, X, Loader2 } from 'lucide-react';

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popular');

  // Fetch courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);
        // Request a high limit to get all courses (max is 500)
        const response = await fetch('/api/courses?limit=500');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
          // Ensure data.data is an array
          const coursesData = Array.isArray(data.data) ? data.data : [];

          if (coursesData.length === 0) {
            console.warn('No courses found in API response. Total:', data.total);
            setCourses([]);
            return;
          }

          // Map API response to Course type (convert _id to id)
          const mappedCourses: Course[] = coursesData.map((course: any) => ({
            ...course,
            id: course._id || course.id || course.slug, // Fallback to slug if no id
          }));

          console.log(`Successfully loaded ${mappedCourses.length} courses (Total in DB: ${data.total || 'unknown'})`);
          setCourses(mappedCourses);
        } else {
          console.error('API returned unsuccessful response:', data);
          setError(data.message || 'Failed to fetch courses');
        }
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('An error occurred while fetching courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Extract unique categories from courses
  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    courses.forEach(course => {
      if (course.category) {
        uniqueCategories.add(course.category);
      }
    });
    return ['All', ...Array.from(uniqueCategories).sort()];
  }, [courses]);

  const filteredCourses = useMemo(() => {
    let filtered = [...courses];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        course =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(course => course.category === selectedCategory);
    }

    // Sort
    if (sortBy === 'popular') {
      filtered.sort((a, b) => b.students - a.students);
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [courses, searchQuery, selectedCategory, sortBy]);

  const hasActiveFilters = selectedCategory !== 'All' || searchQuery;

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header - Ultra Compact */}
      <section className="relative bg-slate-900 pb-4 pt-20 sm:pt-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#84994F]/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#435663]/10 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
            <div>
              <p className="text-[#84994F] text-[10px] sm:text-xs font-semibold mb-0.5 tracking-wider uppercase">
                {content.courses.header.badge}
              </p>
              <h1 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                {content.courses.title}
              </h1>
            </div>
            <p className="text-sm text-slate-400 max-w-lg md:text-right hidden sm:block leading-snug">
              {content.courses.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters Section - Compact & Sticky */}
      <section className="bg-white border-b border-slate-200 shadow-sm sticky top-[60px] z-30">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-2">
          <div className="flex flex-col md:flex-row items-center gap-2">
            {/* Search Bar - Compact */}
            <div className="relative w-full md:w-56 lg:w-64 shrink-0">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <Input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-8 py-1 text-sm border-slate-200 focus:border-[#84994F] focus:ring-[#84994F] rounded-md bg-slate-50 focus:bg-white transition-colors h-8"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Separator - Desktop */}
            <div className="hidden md:block w-px h-5 bg-slate-200 mx-1"></div>

            {/* Filters Row */}
            <div className="flex items-center gap-2 w-full overflow-x-auto no-scrollbar pb-1 md:pb-0">
              {/* Categories */}
              <div className="flex items-center gap-1.5 flex-1">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors whitespace-nowrap border ${selectedCategory === category
                      ? 'bg-[#84994F] text-white border-[#84994F]'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Sort - Compact */}
              <div className="flex items-center gap-2 shrink-0 ml-auto pl-2 border-l border-slate-200">
                <span className="text-xs text-slate-500 whitespace-nowrap hidden lg:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="py-0.5 pl-1.5 pr-6 text-xs font-medium border-none bg-transparent focus:ring-0 text-slate-700 cursor-pointer hover:text-slate-900"
                >
                  <option value="popular">Popular</option>
                  <option value="rating">Rating</option>
                  <option value="price-low">Low Price</option>
                  <option value="price-high">High Price</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid - Immediate Visibility */}
      <section className="flex-1 py-6 bg-slate-50 min-h-[500px]">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="w-8 h-8 text-[#84994F] animate-spin" />
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500 mb-4">{error}</p>
              <button onClick={() => window.location.reload()} className="text-[#84994F] hover:underline">Try Again</button>
            </div>
          ) : (
            <>
              {/* Results Info - Subtle */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-slate-700">
                  {filteredCourses.length} Courses
                </h2>
                {hasActiveFilters && (
                  <button onClick={clearFilters} className="text-xs text-red-500 hover:text-red-600 font-medium">
                    Clear Filters
                  </button>
                )}
              </div>

              {filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
                  {filteredCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-slate-500">No courses match your filters.</p>
                  <button onClick={clearFilters} className="text-[#84994F] hover:underline mt-2 text-sm">Clear all filters</button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}


