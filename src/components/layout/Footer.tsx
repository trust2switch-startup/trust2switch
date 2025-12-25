"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Instagram,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import trust2SwitchLogo from '@/app/trust2switch_logo.jpg';
import { footerConfig } from '@/config/footer';

// Calculate year once to ensure consistency
const CURRENT_YEAR = new Date().getFullYear();

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    setEmail("");
  };

  return (
    <footer
      id="footer"
      className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden"
      style={{ scrollMarginTop: "120px" }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-8 sm:mb-10 lg:mb-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <div className="relative overflow-hidden w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center shadow-lg">
                  <Image
                    src={trust2SwitchLogo}
                    alt="Trust2Switch"
                    fill
                    className="w-4 h-4"
                  />
                </div>
                <h4 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  {footerConfig.brand.name}<span className="text-[#84994F]">{footerConfig.brand.nameHighlight}</span>Switch
                </h4>
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
                {footerConfig.brand.description}
              </p>

              {/* Contact Info */}
              <div className="space-y-2 sm:space-y-3">
                <a
                  href={`mailto:${footerConfig.contact.email}`}
                  className="flex items-center gap-2 sm:gap-3 text-slate-300 hover:font-semibold transition-colors group"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-slate-700 rounded-lg flex items-center justify-center group-hover:bg-[#84994F] transition-colors flex-shrink-0">
                    <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <span className="text-xs sm:text-sm break-all">
                    {footerConfig.contact.email}
                  </span>
                </a>
                <a
                  href={`tel:${footerConfig.contact.phone}`}
                  className="flex items-center gap-2 sm:gap-3 text-slate-300 hover:font-semibold transition-colors group"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-slate-700 rounded-lg flex items-center justify-center group-hover:bg-[#84994F] transition-colors flex-shrink-0">
                    <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <span className="text-xs sm:text-sm">{footerConfig.contact.phoneDisplay}</span>
                </a>
                <div className="flex items-start gap-2 sm:gap-3 text-slate-300">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-slate-700 rounded-lg flex items-center justify-center mt-0.5 flex-shrink-0">
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <span className="text-xs sm:text-sm">
                    {footerConfig.contact.address}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h5 className="font-bold text-white mb-4 sm:mb-6 text-base sm:text-lg flex items-center gap-2">
                <div className="w-1 h-4 sm:h-5 bg-gradient-to-b from-[#84994F] to-green-700 rounded-full"></div>
                {footerConfig.quickLinks.title}
              </h5>
              <ul className="space-y-2 sm:space-y-3">
                {footerConfig.quickLinks.links.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-slate-300 hover:text-[#84994F] transition-all duration-200 flex items-center gap-2 group"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-[#84994F] transition-all duration-200"></span>
                      <span className="text-sm">{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Policies & Support */}
            <div>
              <h5 className="font-bold text-white mb-4 sm:mb-6 text-base sm:text-lg flex items-center gap-2">
                <div className="w-1 h-4 sm:h-5 bg-gradient-to-b from-[#84994F] to-green-700 rounded-full"></div>
                {footerConfig.policies.title}
              </h5>
              <ul className="space-y-2 sm:space-y-3">
                {footerConfig.policies.links.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-slate-300 hover:text-[#84994F] transition-all duration-200 flex items-center gap-2 group"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-[#84994F] transition-all duration-200"></span>
                      <span className="text-sm">{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter & Social */}
            <div>
              <h5 className="font-bold text-white mb-4 sm:mb-6 text-base sm:text-lg flex items-center gap-2">
                <div className="w-1 h-4 sm:h-5 bg-gradient-to-b from-[#84994F] to-green-700 rounded-full"></div>
                {footerConfig.newsletter.title}
              </h5>
              <p className="text-slate-300 text-xs sm:text-sm mb-3 sm:mb-4">
                {footerConfig.newsletter.description}
              </p>
              <form onSubmit={handleNewsletterSubmit} className="mb-4 sm:mb-6">
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={footerConfig.newsletter.placeholder}
                    className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#435663] focus:border-transparent text-xs sm:text-sm"
                    required
                    suppressHydrationWarning={true}
                  />
                  <button
                    type="submit"
                    className="px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-green-900 to-[#84994F] hover:from-[#84994F] hover:to-green-900 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex-shrink-0"
                    aria-label={footerConfig.newsletter.submitButtonLabel}
                  >
                    <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </form>

              {/* Social Media */}
              <div>
                <h6 className="font-semibold text-white mb-4 text-sm">
                  {footerConfig.socialMedia.title}
                </h6>
                <div className="flex gap-3">
                  {footerConfig.socialMedia.links.map((social, index) => {
                    const getIcon = () => {
                      switch (social.icon) {
                        case 'facebook':
                          return (
                            <svg
                              className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.2 0-4.192 1.547-4.192 4.015v2.985z" />
                            </svg>
                          );
                        case 'linkedin':
                          return (
                            <svg
                              className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M22.223 0H1.777C.794 0 0 .794 0 1.777v20.446C0 23.206.794 24 1.777 24h20.446c.983 0 1.777-.794 1.777-1.777V1.777C24 .794 23.206 0 22.223 0zM7.51 20.455H4.15V9.245h3.36v11.21zM5.83 7.828c-1.163 0-2.102-.94-2.102-2.103 0-1.163.939-2.102 2.102-2.102 1.164 0 2.103.939 2.103 2.102 0 1.163-.939 2.103-2.103 2.103zm14.625 12.627h-3.36v-5.467c0-1.3-.024-2.96-.867-3.606-.843-.645-1.942-1.282-3.14-.384-1.198.898-1.745 2.112-1.745 4.31v5.147h-3.36V9.245h3.36v1.442h.05c.47-.899 1.625-1.84 3.32-1.84 3.56 0 4.21 2.373 4.21 5.424v6.188z" />
                            </svg>
                          );
                        case 'twitter':
                          return (
                            <svg
                              className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.795-1.574 2.164-2.722-.951.564-2.005.974-3.127 1.195-.89-.954-2.172-1.55-3.596-1.55-2.712 0-4.914 2.203-4.914 4.915 0 .385.043.76.126 1.121-4.085-.205-7.718-2.161-10.14-5.138-.423.727-.665 1.573-.665 2.478 0 1.706.868 3.209 2.188 4.098-.809-.026-1.566-.246-2.228-.615v.062c0 2.383 1.696 4.378 3.945 4.831-.413.111-.849.17-1.295.17-.318 0-.629-.03-.929-.088.63 1.954 2.449 3.376 4.606 3.414-1.685 1.321-3.807 2.107-6.111 2.107-.397 0-.79-.022-1.17-.068 2.179 1.397 4.768 2.212 7.548 2.212 9.052 0 14.01-7.502 14.01-14.01 0-.213-.005-.425-.015-.636.962-.695 1.797-1.562 2.457-2.548z" />
                            </svg>
                          );
                        case 'instagram':
                          return <Instagram className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors" />;
                        case 'youtube':
                          return <Youtube className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors" />;
                        default:
                          return null;
                      }
                    };

                    const getHoverClass = (hoverColor: string): string => {
                      const hoverClassMap: Record<string, string> = {
                        'blue-600': 'hover:bg-blue-600',
                        'blue-500': 'hover:bg-blue-500',
                        'sky-500': 'hover:bg-sky-500',
                        'pink-600': 'hover:bg-pink-600',
                        'red-600': 'hover:bg-red-600',
                      };
                      return hoverClassMap[hoverColor] || 'hover:bg-slate-600';
                    };

                    const baseClasses = 'w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center transition-all duration-200 transform hover:scale-110 hover:shadow-lg group';
                    const hoverClass = getHoverClass(social.hoverColor);

                    return (
                      <Link
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${baseClasses} ${hoverClass}`}
                        aria-label={social.ariaLabel}
                      >
                        {getIcon()}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-700 pt-6 sm:pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
              <div className="text-slate-400 text-xs sm:text-sm text-center md:text-left">
                &copy; {CURRENT_YEAR} {footerConfig.bottomBar.copyright}. All rights reserved.
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 text-slate-400 text-xs sm:text-sm">
                <span>{footerConfig.bottomBar.builtWith.prefix}</span>
                <span className="text-[#84994F]">{footerConfig.bottomBar.builtWith.emoji}</span>
                <span>{footerConfig.bottomBar.builtWith.suffix}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
