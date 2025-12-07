'use client';

import React from 'react';

export const KeyHighlights: React.FC = () => {
  const highlights = [
    { icon: '⭐', title: 'World-Class Industry Instructors', color: 'text-orange-600' },
    { icon: '🧠', title: '1-on-1 Dedicated Doubt Session', color: 'text-slate-600' },
    { icon: '💼', title: 'Guaranteed Job Assistance Program', color: 'text-orange-600' },
    { icon: '🛠️', title: 'Build 5+ Industry-Level Projects', color: 'text-slate-600' },
  ];

  return (
    <section id="key-highlights" className="py-8 bg-slate-100 overflow-hidden" style={{ scrollMarginTop: '120px' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-slate-800">Our Pillars of Success</h2>
        </div>
      </div>
      <div className="whitespace-nowrap flex animate-marquee">
        <div className="marquee-content inline-flex gap-8 lg:gap-12 py-3">
          {/* First set */}
          {highlights.map((highlight, index) => (
            <div key={`first-${index}`} className="flex items-center space-x-3">
              <span className="text-2xl text-orange-500">{highlight.icon}</span>
              <h3 className={`text-lg font-semibold ${highlight.color}`}>{highlight.title}</h3>
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {highlights.map((highlight, index) => (
            <div key={`second-${index}`} className="flex items-center space-x-3">
              <span className="text-2xl text-orange-500">{highlight.icon}</span>
              <h3 className={`text-lg font-semibold ${highlight.color}`}>{highlight.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

