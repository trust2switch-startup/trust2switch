'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CallbackModal } from '@/components/booking/CallbackModal';
import { content } from '@/config/content';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCallbackModalOpen, setIsCallbackModalOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-heading font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              {content.site.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <Link href="/" className="text-neutral-700 hover:text-primary-600 transition-colors font-medium px-2 py-1">
              {content.navigation.home}
            </Link>
            <Link href="/courses" className="text-neutral-700 hover:text-primary-600 transition-colors font-medium px-2 py-1">
              {content.navigation.courses}
            </Link>
            <Link href="/about" className="text-neutral-700 hover:text-primary-600 transition-colors font-medium px-2 py-1">
              {content.navigation.about}
            </Link>
            <Link href="/blog" className="text-neutral-700 hover:text-primary-600 transition-colors font-medium px-2 py-1">
              {content.navigation.blog}
            </Link>
            <Link href="/contact" className="text-neutral-700 hover:text-primary-600 transition-colors font-medium px-2 py-1">
              {content.navigation.contact}
            </Link>
            <div className="flex items-center gap-2 ml-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsCallbackModalOpen(true)}
                className="border-primary-600 text-primary-600 hover:bg-primary-50 whitespace-nowrap"
              >
                <Phone className="w-4 h-4 mr-1.5" />
                <span className="hidden lg:inline">Request Callback</span>
                <span className="lg:hidden">Callback</span>
              </Button>
              <Link href="/courses">
                <Button variant="primary" size="sm" className="shadow-md hover:shadow-lg transition-shadow whitespace-nowrap">
                  {content.navigation.cta}
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-neutral-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-neutral-200">
            <Link
              href="/"
              className="block px-2 py-2 text-neutral-700 hover:text-primary-600 hover:bg-neutral-50 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {content.navigation.home}
            </Link>
            <Link
              href="/courses"
              className="block px-2 py-2 text-neutral-700 hover:text-primary-600 hover:bg-neutral-50 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {content.navigation.courses}
            </Link>
            <Link
              href="/about"
              className="block px-2 py-2 text-neutral-700 hover:text-primary-600 hover:bg-neutral-50 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {content.navigation.about}
            </Link>
            <Link
              href="/blog"
              className="block px-2 py-2 text-neutral-700 hover:text-primary-600 hover:bg-neutral-50 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {content.navigation.blog}
            </Link>
            <Link
              href="/contact"
              className="block px-2 py-2 text-neutral-700 hover:text-primary-600 hover:bg-neutral-50 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {content.navigation.contact}
            </Link>
            <div className="pt-2 space-y-2 border-t border-neutral-200">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsCallbackModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full border-primary-600 text-primary-600"
              >
                <Phone className="w-4 h-4 mr-1.5" />
                Request Callback
              </Button>
              <Link href="/courses" className="block" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" size="sm" className="w-full">
                  {content.navigation.cta}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
      <CallbackModal
        isOpen={isCallbackModalOpen}
        onClose={() => setIsCallbackModalOpen(false)}
      />
    </header>
  );
};


