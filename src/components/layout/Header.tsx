'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Search, Phone, BookOpen, GraduationCap, Users, ChevronDown, ShoppingCart } from 'lucide-react';
import { CallbackModal } from '@/components/booking/CallbackModal';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCallbackModalOpen, setIsCallbackModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="fixed top-0 left-0 w-full bg-gradient-to-r from-orange-600 to-orange-500 text-white text-xs py-2 z-[60] shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-2">
          <span className="font-semibold">🎓</span>
          <span>New Batch Starting Soon! Limited Seats Available</span>
          <Link href="/#professional-section" className="underline font-bold hover:text-orange-200 ml-2">
            Enroll Now →
          </Link>
        </div>
      </div>

      <nav 
        id="navbar" 
        className={`fixed top-8 left-0 w-full z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-slate-800/95 backdrop-blur-sm'
            : 'bg-slate-900 backdrop-blur-md' 
            // : 'bg-slate-900 backdrop-blur-md shadow-xl' 
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link 
              href="/#hero" 
              className="flex-shrink-0 flex items-center space-x-2 group"
            >
              <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Trust<span className="text-orange-400">2</span>Switch
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-1">
              {/* All Courses Dropdown */}
              <div
                className="relative group"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button className="flex items-center gap-1 text-white hover:text-orange-400 font-medium text-sm py-1.5 px-3 rounded-lg hover:bg-slate-600/50 transition-all duration-200 focus:outline-none">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>All Courses</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {dropdownOpen && (
                  <div className="absolute z-10 w-80 mt-2 rounded-xl shadow-2xl bg-white ring-1 ring-black ring-opacity-5 p-3 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <h4 className="text-xs font-bold uppercase text-indigo-600 mb-2 flex items-center gap-1.5">
                          <GraduationCap className="w-3 h-3" />
                          Professional Tracks
                        </h4>
                        <div className="space-y-1">
                          <Link href="/#professional-section" className="block px-2.5 py-1.5 text-xs text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors font-medium">
                            Full Stack Development
                          </Link>
                          <Link href="/#professional-section" className="block px-2.5 py-1.5 text-xs text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors font-medium">
                            Data Science & ML
                          </Link>
                          <Link href="/#professional-section" className="block px-2.5 py-1.5 text-xs text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors font-medium">
                            Generative AI
                          </Link>
                          <Link href="/#professional-section" className="block px-2.5 py-1.5 text-xs text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors font-medium">
                            Cloud (AWS/Azure)
                          </Link>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold uppercase text-orange-600 mb-2 flex items-center gap-1.5">
                          <Users className="w-3 h-3" />
                          School & Mentorship
                        </h4>
                        <div className="space-y-1">
                          <Link href="/#school-mentorship" className="block px-2.5 py-1.5 text-xs text-slate-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors font-medium">
                            K-12 Subjects
                          </Link>
                          <Link href="/#school-mentorship" className="block px-2.5 py-1.5 text-xs text-slate-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors font-medium">
                            Advanced Coding
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link 
                href="/#professional-section" 
                className="text-white hover:text-orange-400 font-medium text-sm py-1.5 px-3 rounded-lg hover:bg-slate-600/50 transition-all duration-200"
              >
                Professionals
              </Link>
              <Link 
                href="/#school-mentorship" 
                className="text-white hover:text-orange-400 font-medium text-sm py-1.5 px-3 rounded-lg hover:bg-slate-600/50 transition-all duration-200"
              >
                School Mentorship
              </Link>
              <Link 
                href="/blog" 
                className="text-white hover:text-orange-400 font-medium text-sm py-1.5 px-3 rounded-lg hover:bg-slate-600/50 transition-all duration-200"
              >
                Blog
              </Link>
              <Link 
                href="/shop" 
                className="text-white hover:text-orange-400 font-medium text-sm py-1.5 px-3 rounded-lg hover:bg-slate-600/50 transition-all duration-200"
              >
                Buy
              </Link>
              <Link 
                href="/#footer" 
                className="text-white hover:text-orange-400 font-medium text-sm py-1.5 px-3 rounded-lg hover:bg-slate-600/50 transition-all duration-200"
              >
                Contact
              </Link>

              {/* Enhanced Search Input Field */}
              <div className={`relative ml-4 transition-all duration-300 ${searchFocused ? 'w-64' : 'w-48'}`}>
                <input
                  type="text"
                  placeholder="Search Courses..."
                  className="w-full py-2 pl-10 pr-4 rounded-full text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white/90 backdrop-blur-sm transition-all duration-300"
                  aria-label="Search Courses"
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
              </div>

              {/* CTA Button */}
              <button
                onClick={() => setIsCallbackModalOpen(true)}
                className="ml-4 flex items-center gap-2 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-semibold text-sm py-2 px-5 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-orange-300"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Get Started</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              id="mobile-menu-button"
              className="lg:hidden p-2 text-white hover:text-orange-400 hover:bg-slate-600/50 rounded-lg focus:outline-none transition-all duration-200"
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
              className="lg:hidden bg-slate-800/98 backdrop-blur-md border-t border-slate-600 pb-4 animate-in slide-in-from-top duration-300"
            >
              <div className="px-4 pt-4 pb-3 space-y-2">
                {/* Mobile Search */}
                <div className="relative mb-4">
                  <input
                    type="text"
                    placeholder="Search Courses..."
                    className="w-full py-2 pl-10 pr-4 rounded-full text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
                    aria-label="Search Courses"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                </div>

                <Link
                  href="/#professional-section"
                  className="flex items-center gap-3 block px-4 py-2.5 rounded-lg text-sm font-medium text-white hover:bg-slate-700 hover:text-orange-400 transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <GraduationCap className="w-4 h-4" />
                  Professionals/College Students
                </Link>
                <Link
                  href="/#school-mentorship"
                  className="flex items-center gap-3 block px-4 py-2.5 rounded-lg text-sm font-medium text-white hover:bg-slate-700 hover:text-orange-400 transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Users className="w-4 h-4" />
                  School Mentorship
                </Link>
                <Link
                  href="/blog"
                  className="flex items-center gap-3 block px-4 py-2.5 rounded-lg text-sm font-medium text-white hover:bg-slate-700 hover:text-orange-400 transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <BookOpen className="w-4 h-4" />
                  Blog
                </Link>
                <Link
                  href="/shop"
                  className="flex items-center gap-3 block px-4 py-2.5 rounded-lg text-sm font-medium text-white hover:bg-slate-700 hover:text-orange-400 transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <ShoppingCart className="w-4 h-4" />
                  Buy
                </Link>
                <Link
                  href="/#footer"
                  className="flex items-center gap-3 block px-4 py-2.5 rounded-lg text-sm font-medium text-white hover:bg-slate-700 hover:text-orange-400 transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                <button
                  onClick={() => {
                    setIsCallbackModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full mt-4 flex items-center justify-center gap-2 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-semibold text-sm py-2.5 px-5 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  <Phone className="w-4 h-4" />
                  <span>Get Started</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
      <CallbackModal
        isOpen={isCallbackModalOpen}
        onClose={() => setIsCallbackModalOpen(false)}
      />
    </>
  );
};


