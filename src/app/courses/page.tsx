'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { CourseCard } from '@/components/course/CourseCard';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { content } from '@/config/content';
import { Course } from '@/types';
import { Search, Filter, X, Loader2 } from 'lucide-react';

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
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

  // Extract unique categories and levels from courses
  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    courses.forEach(course => {
      if (course.category) {
        uniqueCategories.add(course.category);
      }
    });
    return ['All', ...Array.from(uniqueCategories).sort()];
  }, [courses]);

  const levels = useMemo(() => {
    const uniqueLevels = new Set<string>();
    courses.forEach(course => {
      if (course.level) {
        uniqueLevels.add(course.level);
      }
    });
    return ['All', ...Array.from(uniqueLevels).sort()];
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

    // Filter by level
    if (selectedLevel !== 'All') {
      filtered = filtered.filter(course => course.level === selectedLevel);
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
  }, [courses, searchQuery, selectedCategory, selectedLevel, sortBy]);

  const hasActiveFilters = selectedCategory !== 'All' || selectedLevel !== 'All' || searchQuery;

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedLevel('All');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="relative bg-slate-900 overflow-hidden min-h-[200px] sm:min-h-[280px] md:min-h-[320px] flex items-center">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-[#84994F]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-[#435663]/10 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-8 sm:py-12 md:py-16 lg:py-20">
          <div className="text-center md:text-left">
            <p className="text-[#84994F] text-xs sm:text-sm md:text-base lg:text-lg font-semibold mb-1.5 sm:mb-2 md:mb-3 tracking-wider uppercase">
              {content.courses.header.badge}
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white mb-2 sm:mb-3 md:mb-4 leading-tight">
              {content.courses.title}
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto md:mx-0">
              {content.courses.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters Section */}
      <section className="py-4 sm:py-6 md:py-8 lg:py-10 bg-white border-b border-slate-200 shadow-sm sticky top-0 z-40 backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          {/* Search Bar */}
          <div className="mb-4 sm:mb-6">
            <div className="relative w-full max-w-2xl mx-auto">
              <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
              <Input
                type="text"
                placeholder={content.courses.search.placeholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-2.5 sm:py-3 md:py-4 text-sm sm:text-base border-2 border-slate-200 focus:border-[#84994F] focus:ring-[#84994F] rounded-lg sm:rounded-xl"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Filter Pills */}
          <div className="space-y-3 sm:space-y-0">
            {/* Mobile: Stack filters vertically, Desktop: Horizontal */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 sm:gap-3 md:gap-4 sm:justify-center">
              {/* Filter Label - Mobile only */}
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-700 sm:hidden pb-2 border-b border-slate-200">
                <Filter className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>{content.courses.filter.label}</span>
              </div>
              
              {/* Desktop Filter Label */}
              <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-slate-700">
                <Filter className="w-4 h-4" />
                <span>{content.courses.filter.label}</span>
              </div>
              
              {/* Category Filters */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                      selectedCategory === category
                        ? 'bg-[#84994F] text-white shadow-md scale-105'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 active:scale-95'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Level Filters */}
              <div className="flex items-center gap-1.5 sm:gap-2 sm:ml-2 md:ml-4 sm:pl-2 md:pl-4 sm:border-l sm:border-slate-200">
                <span className="text-xs text-slate-500 hidden sm:inline">{content.courses.filter.level}</span>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {levels.map((level) => (
                    <button
                      key={level}
                      onClick={() => setSelectedLevel(level)}
                      className={`px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                        selectedLevel === level
                          ? 'bg-[#435663] text-white shadow-md scale-105'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200 active:scale-95'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-1.5 sm:gap-2 sm:ml-2 md:ml-4 sm:pl-2 md:pl-4 sm:border-l sm:border-slate-200 w-full sm:w-auto">
                <span className="text-xs text-slate-500 hidden sm:inline">{content.courses.filter.sort}</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="flex-1 sm:flex-none px-2.5 sm:px-3 md:px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84994F] focus:border-[#84994F] bg-white text-slate-700 text-xs sm:text-sm font-medium cursor-pointer hover:border-slate-300 transition-colors"
                >
                  <option value="popular">{content.courses.filter.sortOptions.popular}</option>
                  <option value="rating">{content.courses.filter.sortOptions.rating}</option>
                  <option value="price-low">{content.courses.filter.sortOptions.priceLow}</option>
                  <option value="price-high">{content.courses.filter.sortOptions.priceHigh}</option>
                </select>
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="w-full sm:w-auto sm:ml-auto flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors border border-slate-200 sm:border-0 rounded-lg sm:rounded-none hover:bg-slate-50 sm:hover:bg-transparent"
                >
                  <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>{content.courses.filter.clearAll}</span>
                </button>
              )}
            </div>

            {/* Active Filters Display */}
            {hasActiveFilters && (
              <div className="pt-3 sm:pt-4 border-t border-slate-200">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                  <span className="text-slate-500 font-medium">{content.courses.filter.activeFilters}</span>
                  {searchQuery && (
                    <Badge variant="default" className="bg-[#84994F]/10 text-[#84994F] border border-[#84994F]/20 text-xs px-2 py-0.5">
                      {content.courses.filter.searchPrefix} &quot;{searchQuery}&quot;
                    </Badge>
                  )}
                  {selectedCategory !== 'All' && (
                    <Badge variant="default" className="bg-[#84994F]/10 text-[#84994F] border border-[#84994F]/20 text-xs px-2 py-0.5">
                      {selectedCategory}
                    </Badge>
                  )}
                  {selectedLevel !== 'All' && (
                    <Badge variant="default" className="bg-[#435663]/10 text-[#435663] border border-[#435663]/20 text-xs px-2 py-0.5">
                      {selectedLevel}
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-6 sm:py-8 md:py-10 lg:py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12 sm:py-16 md:py-20 lg:py-24">
              <div className="max-w-md mx-auto px-4">
                <Loader2 className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 text-[#84994F] animate-spin" />
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 mb-2 sm:mb-3">
                  Loading courses...
                </h3>
                <p className="text-sm sm:text-base text-slate-600">
                  Please wait while we fetch the latest courses
                </p>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-12 sm:py-16 md:py-20 lg:py-24">
              <div className="max-w-md mx-auto px-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-red-100 rounded-full flex items-center justify-center">
                  <X className="w-8 h-8 sm:w-10 sm:h-10 text-red-500" />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 mb-2 sm:mb-3">
                  Error loading courses
                </h3>
                <p className="text-sm sm:text-base text-slate-600 mb-4 sm:mb-6">
                  {error}
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-[#84994F] hover:bg-[#6d7f42] text-white text-sm sm:text-base font-medium rounded-lg transition-colors shadow-md hover:shadow-lg active:scale-95"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Results Count */}
              <div className="mb-4 sm:mb-6 md:mb-8">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900">
                  {filteredCourses.length} {filteredCourses.length === 1 ? content.courses.results.course : content.courses.results.courses} {content.courses.results.found}
                </h2>
                {hasActiveFilters && (
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    {content.courses.results.showingResults}
                  </p>
                )}
              </div>

              {filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
                  {filteredCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 sm:py-16 md:py-20 lg:py-24">
                  <div className="max-w-md mx-auto px-4">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-slate-100 rounded-full flex items-center justify-center">
                      <Search className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400" />
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 mb-2 sm:mb-3">
                      {content.courses.empty.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 mb-4 sm:mb-6">
                      {content.courses.empty.message}
                    </p>
                    {hasActiveFilters && (
                      <button
                        onClick={clearFilters}
                        className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-[#84994F] hover:bg-[#6d7f42] text-white text-sm sm:text-base font-medium rounded-lg transition-colors shadow-md hover:shadow-lg active:scale-95"
                      >
                        <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        {content.courses.empty.clearFilters}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}


