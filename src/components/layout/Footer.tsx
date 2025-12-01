'use client';

import React from 'react';
import Link from 'next/link';
import { content } from '@/config/content';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <span className="text-2xl font-heading font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                {content.site.name}
              </span>
            </Link>
            <p className="text-neutral-400 mb-4 max-w-md">
              {content.footer.description}
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">{content.footer.links.company.title}</h3>
            <ul className="space-y-2">
              {content.footer.links.company.items.map((item, index) => (
                <li key={index}>
                  <Link href="#" className="hover:text-primary-400 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">{content.footer.links.courses.title}</h3>
            <ul className="space-y-2">
              {content.footer.links.courses.items.map((item, index) => (
                <li key={index}>
                  <Link href="#" className="hover:text-primary-400 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">{content.footer.links.support.title}</h3>
            <ul className="space-y-2">
              {content.footer.links.support.items.map((item, index) => (
                <li key={index}>
                  <Link href="#" className="hover:text-primary-400 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-neutral-400 text-sm text-center md:text-left">{content.footer.copyright}</p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {content.footer.links.social.items.map((item, index) => (
              <Link
                key={index}
                href="#"
                className="text-neutral-400 hover:text-primary-400 transition-colors text-sm"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};


