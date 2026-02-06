"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  Search,
  Phone,
  BookOpen,
  GraduationCap,
  Users,
  ChevronDown,
  ShoppingCart,
  Code,
  BarChart3,
  Sparkles,
  Cloud,
  Settings,
  Palette,
  Globe,
  Database,
  Briefcase,
  FileText,
  Brain,
  Laptop,
  Calculator,
  Atom,
  FlaskConical,
  BookMarked,
  ArrowRight,
} from "lucide-react";
import { CallbackModal } from "@/components/booking/CallbackModal";
import { trackButtonClick, trackNavigation, trackModalOpen, trackSearch } from "@/lib/analytics";
import trust2SwitchLogo from "@/app/trust2switch_logo.jpg";
import professionalCourses from "@/config/professionalCourses.json";

// Icon mapping for courses
const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Code,
  BarChart3,
  Sparkles,
  Cloud,
  Settings,
  Palette,
  Globe,
  Database,
  Briefcase,
  FileText,
  Brain,
  Laptop,
  Calculator,
  Atom,
  FlaskConical,
  BookMarked,
};

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCallbackModalOpen, setIsCallbackModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeout) {
        clearTimeout(dropdownTimeout);
      }
    };
  }, [dropdownTimeout]);

  // Handle dropdown hover with delay to prevent sudden closing
  const handleMouseEnter = () => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setDropdownOpen(false);
    }, 200); // 200ms delay before closing
    setDropdownTimeout(timeout);
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50">
        {/* Top Announcement Bar */}
        <div className="bg-gradient-to-r from-green-900 to-[#84994F] text-white text-[10px] sm:text-xs py-1.5 sm:py-2 z-[60] shadow-md leading-tight">
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 flex items-center justify-center gap-1 sm:gap-2 flex-wrap">
            <span className="font-semibold hidden xs:inline">🎓</span>
            <span className="text-center px-1">
              New Batch Starting Soon! Limited Seats Available
            </span>
            <button
              onClick={() => {
                trackButtonClick('enroll_now', 'announcement_bar');
                trackModalOpen('callback_modal');
                setIsCallbackModalOpen(true);
              }}
              className="underline font-extrabold hover:text-orange-200 ml-1 sm:ml-2 whitespace-nowrap cursor-pointer"
            >
              Enroll Now →
            </button>
          </div>
        </div>
        <nav
          id="navbar"
          className={`transition-all duration-300 ${
            !scrolled
              ? "bg-slate-800/95 backdrop-blur-sm"
              : // : 'bg-slate-900 backdrop-blur-md'
                "bg-slate-900 backdrop-blur-md shadow-xl"
          }`}
        >
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
            <div className="flex justify-between items-center h-14 sm:h-16">
              {/* Logo */}
              <Link
                href="/"
                className="flex-shrink-0 flex items-center space-x-1.5 sm:space-x-2 group"
              >
                <div className="relative w-7 h-7 sm:w-9 sm:h-9 rounded-lg overflow-hidden transform group-hover:scale-110 transition-transform">
                  <Image
                    src={trust2SwitchLogo}
                    alt="Trust2Switch"
                    fill
                    className="w-4 h-4"
                  />
                </div>
                <span className="text-base sm:text-xl font-bold tracking-tight text-white">
                  Trust<span className="text-[#84994F]">2</span>Switch
                </span>
              </Link>

              {/* Desktop Menu */}
              <div className="hidden lg:flex items-center space-x-0.5 xl:space-x-1">
                {/* All Courses Dropdown */}
                <div
                  className="relative group"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href="/courses"
                    onClick={() => trackNavigation('/courses', 'header')}
                    className="flex items-center gap-1 text-white hover:text-white font-medium text-xs xl:text-sm py-1.5 px-2 xl:px-3 rounded-lg hover:bg-slate-600/50 transition-all duration-200 focus:outline-none"
                  >
                    <BookOpen className="w-3 xl:w-3.5 h-3 xl:h-3.5" />
                    <span className="hidden xl:inline">All Courses</span>
                    <span className="xl:hidden">Courses</span>
                    <ChevronDown
                      className={`w-3 xl:w-3.5 h-3 xl:h-3.5 transition-transform duration-200 ${
                        dropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </Link>
                  {dropdownOpen && (
                    <div 
                      className="absolute z-10 w-[520px] lg:w-[600px] xl:w-[700px] mt-2 left-0 rounded-2xl shadow-2xl bg-white ring-1 ring-slate-200/50 p-5 lg:p-6 animate-in fade-in slide-in-from-top-2 duration-200"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      {/* Header */}
                      <div className="mb-5 pb-4 border-b border-slate-200">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-[#84994F]" />
                            Browse All Courses
                          </h3>
                          <Link
                            href="/courses"
                            onClick={() => {
                              trackNavigation('/courses', 'dropdown');
                              setDropdownOpen(false);
                            }}
                            className="text-sm font-semibold text-[#84994F] hover:text-[#6d7f42] flex items-center gap-1 transition-colors"
                          >
                            View All
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>

                      {/* Professional Courses Section */}
                      <div className="mb-5">
                        <h4 className="text-xs font-bold uppercase text-[#84994F] mb-3 flex items-center gap-2 tracking-wider">
                          <GraduationCap className="w-4 h-4" />
                          Professional Tracks
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          {professionalCourses.slice(0, 8).map((course, index) => {
                            const IconComponent = iconMap[course.icon] || Code;
                            return (
                              <Link
                                key={index}
                                href={`/courses/${course.slug}`}
                                onClick={() => {
                                  trackNavigation(`/courses/${course.slug}`, 'dropdown');
                                  setDropdownOpen(false);
                                }}
                                className="group flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-200 border border-transparent hover:border-green-100"
                              >
                                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-[#84994F]/10 to-[#84994F]/5 flex items-center justify-center group-hover:from-[#84994F]/20 group-hover:to-[#84994F]/10 transition-colors">
                                  <IconComponent className="w-4 h-4 text-[#84994F]" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-semibold text-slate-900 group-hover:text-[#84994F] transition-colors line-clamp-1">
                                    {course.title}
                                  </p>
                                  <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                                    {course.description}
                                  </p>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                        {professionalCourses.length > 8 && (
                          <Link
                            href="/courses"
                            onClick={() => {
                              trackNavigation('/courses', 'dropdown');
                              setDropdownOpen(false);
                            }}
                            className="mt-3 block text-center text-sm font-medium text-[#84994F] hover:text-[#6d7f42] transition-colors"
                          >
                            View All Professional Courses →
                          </Link>
                        )}
                      </div>

                      {/* School & Mentorship Section */}
                      {/* <div className="pt-4 border-t border-slate-200">
                        <h4 className="text-xs font-bold uppercase text-[#435663] mb-3 flex items-center gap-2 tracking-wider">
                          <Users className="w-4 h-4" />
                          School & Mentorship
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          <Link
                            href="/#school-mentorship"
                            onClick={() => {
                              trackNavigation('/#school-mentorship', 'dropdown');
                              setDropdownOpen(false);
                            }}
                            className="group flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 border border-transparent hover:border-blue-100"
                          >
                            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-[#435663]/10 to-[#435663]/5 flex items-center justify-center group-hover:from-[#435663]/20 group-hover:to-[#435663]/10 transition-colors">
                              <Laptop className="w-4 h-4 text-[#435663]" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-slate-900 group-hover:text-[#435663] transition-colors">
                                K-12 Subjects
                              </p>
                              <p className="text-xs text-slate-500 mt-0.5">
                                Mathematics, Science, Programming
                              </p>
                            </div>
                          </Link>
                          <Link
                            href="/#school-mentorship"
                            onClick={() => {
                              trackNavigation('/#school-mentorship', 'dropdown');
                              setDropdownOpen(false);
                            }}
                            className="group flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 border border-transparent hover:border-blue-100"
                          >
                            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-[#435663]/10 to-[#435663]/5 flex items-center justify-center group-hover:from-[#435663]/20 group-hover:to-[#435663]/10 transition-colors">
                              <Code className="w-4 h-4 text-[#435663]" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-slate-900 group-hover:text-[#435663] transition-colors">
                                Advanced Coding
                              </p>
                              <p className="text-xs text-slate-500 mt-0.5">
                                Python, C++, Java for Beginners
                              </p>
                            </div>
                          </Link>
                        </div>
                      </div> */}
                    </div>
                  )}
                </div>

                <Link
                  href="/courses"
                  onClick={() => trackNavigation('/courses', 'header')}
                  className="text-white hover:text-white font-medium text-xs xl:text-sm py-1.5 px-2 xl:px-3 rounded-lg hover:bg-slate-600/50 transition-all duration-200 whitespace-nowrap"
                >
                  Professionals
                </Link>
                {/* <Link
                  href="/#school-mentorship"
                  onClick={() => trackNavigation('/#school-mentorship', 'header')}
                  className="text-white hover:text-white font-medium text-xs xl:text-sm py-1.5 px-2 xl:px-3 rounded-lg hover:bg-slate-600/50 transition-all duration-200 whitespace-nowrap"
                >
                  <span className="hidden 2xl:inline">School Mentorship</span>
                  <span className="2xl:hidden">Mentorship</span>
                </Link> */}
                <Link
                  href="/blog"
                  onClick={() => trackNavigation('/blog', 'header')}
                  className="text-white hover:text-white font-medium text-xs xl:text-sm py-1.5 px-2 xl:px-3 rounded-lg hover:bg-slate-600/50 transition-all duration-200"
                >
                  Blog
                </Link>
                <Link
                  href="/projects"
                  onClick={() => trackNavigation('/projects', 'header')}
                  className="text-white hover:text-white font-medium text-xs xl:text-sm py-1.5 px-2 xl:px-3 rounded-lg hover:bg-slate-600/50 transition-all duration-200"
                >
                  Buy
                </Link>
                <Link
                  href="/contact"
                  onClick={() => trackNavigation('/contact', 'header')}
                  className="text-white hover:text-white font-medium text-xs xl:text-sm py-1.5 px-2 xl:px-3 rounded-lg hover:bg-slate-600/50 transition-all duration-200"
                >
                  Contact
                </Link>

                {/* Enhanced Search Input Field */}
                <div
                  className={`relative ml-2 xl:ml-4 transition-all duration-300 ${
                    searchFocused ? "w-56 xl:w-64" : "w-40 xl:w-48"
                  }`}
                >
                  <input
                    type="text"
                    placeholder="Search Courses..."
                    className="w-full py-1.5 xl:py-2 pl-8 xl:pl-10 pr-3 xl:pr-4 rounded-full text-slate-800 text-[10px] xl:text-xs focus:outline-none focus:ring-2 focus:ring-white bg-white/90 backdrop-blur-sm transition-all duration-300"
                    aria-label="Search Courses"
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const query = (e.target as HTMLInputElement).value;
                        if (query.trim()) {
                          trackSearch(query);
                        }
                      }
                    }}
                  />
                  <Search className="absolute left-2.5 xl:left-3 top-1/2 transform -translate-y-1/2 w-3 xl:w-3.5 h-3 xl:h-3.5 text-slate-500" />
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => {
                    trackButtonClick('get_started', 'header');
                    trackModalOpen('callback_modal');
                    setIsCallbackModalOpen(true);
                  }}
                  className="ml-2 xl:ml-4 flex items-center gap-1.5 xl:gap-2 bg-gradient-to-r from-[#84994F] to-[#84994F] hover:from-[#435663] hover:to-[#435663] text-white font-semibold text-xs xl:text-sm py-1.5 xl:py-2 px-3 xl:px-5 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-orange-300 whitespace-nowrap"
                >
                  <Phone className="w-3 xl:w-3.5 h-3 xl:h-3.5" />
                  <span className="hidden lg:inline">Get Started</span>
                  <span className="lg:hidden">Start</span>
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                id="mobile-menu-button"
                className="lg:hidden p-2.5 min-w-[44px] min-h-[44px] text-white hover:text-white hover:bg-slate-600/50 rounded-lg focus:outline-none transition-all duration-200 flex items-center justify-center"
                aria-label="Toggle Menu"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

            {/* Enhanced Mobile Menu Content */}
            {mobileMenuOpen && (
              <div
                id="mobile-menu"
                className="lg:hidden bg-slate-800/98 backdrop-blur-md border-t border-slate-600 pb-4 animate-in slide-in-from-top duration-300 max-h-[calc(100vh-120px)] overflow-y-auto"
              >
                <div className="px-3 sm:px-4 pt-3 sm:pt-4 pb-3 space-y-2">
                  {/* Mobile Search */}
                  <div className="relative mb-3 sm:mb-4">
                    <input
                      type="text"
                      placeholder="Search Courses..."
                      className="w-full py-2 pl-9 sm:pl-10 pr-4 rounded-full text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-white bg-white"
                      aria-label="Search Courses"
                    />
                    <Search className="absolute left-2.5 sm:left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                  </div>

                  <Link
                    href="/courses"
                    className="flex items-center gap-3 px-4 py-3 min-h-[44px] rounded-lg text-sm font-medium text-white hover:bg-slate-700 hover:text-white transition-all"
                    onClick={() => {
                      trackNavigation('/courses', 'mobile_menu');
                      setMobileMenuOpen(false);
                    }}
                  >
                    <BookOpen className="w-4 h-4 flex-shrink-0" />
                    All Courses
                  </Link>
                  <Link
                    href="/courses"
                    className="flex items-center gap-3 px-4 py-3 min-h-[44px] rounded-lg text-sm font-medium text-white hover:bg-slate-700 hover:text-white transition-all"
                    onClick={() => {
                      trackNavigation('/courses', 'mobile_menu');
                      setMobileMenuOpen(false);
                    }}
                  >
                    <GraduationCap className="w-4 h-4 flex-shrink-0" />
                    Professionals/College Students
                  </Link>
                  {/* <Link
                    href="/#school-mentorship"
                    className="flex items-center gap-3 px-4 py-3 min-h-[44px] rounded-lg text-sm font-medium text-white hover:bg-slate-700 hover:text-white transition-all"
                    onClick={() => {
                      trackNavigation('/#school-mentorship', 'mobile_menu');
                      setMobileMenuOpen(false);
                    }}
                  >
                    <Users className="w-4 h-4 flex-shrink-0" />
                    School Mentorship
                  </Link> */}
                  <Link
                    href="/blog"
                    className="flex items-center gap-3 px-4 py-3 min-h-[44px] rounded-lg text-sm font-medium text-white hover:bg-slate-700 hover:text-white transition-all"
                    onClick={() => {
                      trackNavigation('/blog', 'mobile_menu');
                      setMobileMenuOpen(false);
                    }}
                  >
                    <BookOpen className="w-4 h-4 flex-shrink-0" />
                    Blog
                  </Link>
                  <Link
                    href="/projects"
                    className="flex items-center gap-3 px-4 py-3 min-h-[44px] rounded-lg text-sm font-medium text-white hover:bg-slate-700 hover:text-white transition-all"
                    onClick={() => {
                      trackNavigation('/projects', 'mobile_menu');
                      setMobileMenuOpen(false);
                    }}
                  >
                    <ShoppingCart className="w-4 h-4 flex-shrink-0" />
                    Buy
                  </Link>
                  <Link
                    href="/contact"
                    className="flex items-center gap-3 px-4 py-3 min-h-[44px] rounded-lg text-sm font-medium text-white hover:bg-slate-700 hover:text-white transition-all"
                    onClick={() => {
                      trackNavigation('/contact', 'mobile_menu');
                      setMobileMenuOpen(false);
                    }}
                  >
                    Contact
                  </Link>
                  <button
                    onClick={() => {
                      trackButtonClick('get_started', 'mobile_menu');
                      trackModalOpen('callback_modal');
                      setIsCallbackModalOpen(true);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full mt-4 flex items-center justify-center gap-2 bg-gradient-to-r from-[#84994F] to-[#84994F] hover:from-[#435663] hover:to-[#435663] text-white font-semibold text-sm py-3 px-5 min-h-[44px] rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Get Started</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
      <CallbackModal
        isOpen={isCallbackModalOpen}
        onClose={() => setIsCallbackModalOpen(false)}
      />
    </>
  );
};
