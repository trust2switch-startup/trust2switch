'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Briefcase, Code2 } from 'lucide-react';

export const KeyHighlights: React.FC = () => {
  const highlights = [
    { 
      icon: Award, 
      title: 'World-Class Industry Instructors',
      gradient: "from-[#435663] to-[#435663]",
      bgGradient: 'from-orange-50 to-orange-100/50',
    },
    { 
      icon: Users, 
      title: '1-on-1 Dedicated Doubt Session',
      gradient: "from-[#84994F] to-[#84994F]",
      bgGradient: 'from-indigo-50 to-indigo-100/50',
    },
    { 
      icon: Briefcase, 
      title: 'Guaranteed Job Assistance Program',
      gradient: "from-[#435663] to-[#435663]",
      bgGradient: 'from-orange-50 to-orange-100/50',
    },
    { 
      icon: Code2, 
      title: 'Build 5+ Industry-Level Projects',
      gradient: "from-[#84994F] to-[#84994F]",
      bgGradient: 'from-indigo-50 to-indigo-100/50',
    },
  ];

  // Duplicate highlights for seamless loop (3 sets for smooth animation)
  const duplicatedHighlights = [...highlights, ...highlights, ...highlights];

  return (
    <section id="key-highlights" className="py-6 bg-gradient-to-b from-slate-50 to-white relative overflow-x-hidden" style={{ scrollMarginTop: '120px' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Compact Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-5"
        >
          <h2 className="text-xl md:text-2xl font-heading font-bold text-slate-900">
            Our Pillars of Success
          </h2>
        </motion.div>

        {/* Continuous Marquee Animation */}
        <div className="relative overflow-x-hidden py-2">
          {/* Gradient Fade Edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent z-10 pointer-events-none"></div>
          
          {/* Marquee Wrapper for seamless loop */}
          <div className="flex animate-marquee-smooth items-start">
            {duplicatedHighlights.map((highlight, index) => {
              const Icon = highlight.icon;
              return (
                <motion.div
                  key={`marquee-${index}`}
                  className="group flex-shrink-0 relative mx-2.5"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-[200px] sm:w-[220px] md:w-[240px] lg:w-[260px] h-[120px] sm:h-[130px] md:h-[140px] lg:h-[150px] p-3 sm:p-4 lg:p-5 rounded-xl bg-white border border-slate-200 hover:border-transparent shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden cursor-pointer group flex flex-col">
                    {/* Gradient Background on Hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${highlight.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl`}></div>
                    
                    {/* Content Container - flex column with proper spacing */}
                    <div className="relative z-10 flex flex-col items-center justify-center text-center h-full">
                      {/* Icon Container */}
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br ${highlight.gradient} rounded-xl flex items-center justify-center mb-2 sm:mb-3 shadow-md group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg transition-all duration-300 flex-shrink-0`}>
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
                      </div>
                      
                      {/* Title with proper text handling - ensures text fits and wraps */}
                      <div className="flex-1 flex items-center justify-center w-full px-1 sm:px-2">
                        <h3 className="text-[10px] sm:text-xs lg:text-sm font-semibold text-slate-900 group-hover:text-slate-800 transition-colors duration-300 leading-tight break-words text-center">
                          {highlight.title}
                        </h3>
                      </div>
                    </div>

                    {/* Decorative Corner Accent */}
                    <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${highlight.gradient} opacity-0 group-hover:opacity-10 rounded-bl-full transition-opacity duration-300 pointer-events-none`}></div>
                    
                    {/* Shine Effect on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-xl pointer-events-none"></div>
                    
                    {/* Top Border Glow on Hover */}
                    <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${highlight.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-xl pointer-events-none`}></div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

