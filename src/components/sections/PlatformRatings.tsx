'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';


const ratings = [
  {
    score: '4.8',
    max: '5.0',
    platform: 'Google Reviews',
    color: 'text-blue-600',
    stars: 4.8,
  },
  {
    score: '4.9',
    max: '5.0',
    platform: 'Course Report',
    color: 'text-green-600',
    stars: 4.9,
  },
  {
    score: '4.8',
    max: '5.0',
    platform: 'Switch Up',
    color: 'text-red-500',
    stars: 4.8,
  },
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center space-x-0.5 text-amber-400">
      {[1, 2, 3, 4, 5].map((star) => {
        const isFull = star <= Math.floor(rating);
        const isHalf = !isFull && star === Math.ceil(rating) && rating % 1 >= 0.4; // Simple half logic

        return (
          <span key={star} className="relative">
            {isFull ? (
              <Star className="w-4 h-4 fill-current" />
            ) : isHalf ? (
              <div className="relative">
                <Star className="w-4 h-4 text-gray-300" />
                <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
                  <Star className="w-4 h-4 fill-current text-amber-400" />
                </div>
              </div>
            ) : (
              <Star className="w-4 h-4 text-gray-300" />
            )}
          </span>
        );
      })}
    </div>
  );
};

export const PlatformRatings: React.FC = () => {
  return (
    <section className="py-6 sm:py-8 bg-white border-b border-slate-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 md:gap-12">

          {/* Heading Section - Compact & Left Aligned on Desktop */}
          <div className="text-center md:text-left md:w-1/3 w-full md:w-auto">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 leading-tight">
              Trusted by 1000+ Learners
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              Consistently rated for authenticity & excellence.
            </p>
          </div>

          {/* Ratings Grid - Compact Row */}
          <div className="flex flex-wrap justify-center md:justify-end gap-3 sm:gap-4 md:gap-8 flex-1 w-full md:w-auto">
            {ratings.map((item, index) => (
              <motion.div
                key={item.platform}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                viewport={{ once: true }}
                className="flex flex-col items-center md:items-start p-2 sm:p-3 rounded-xl hover:bg-slate-50 transition-colors duration-200 min-w-[100px] sm:min-w-[120px]"
              >
                <div className="flex items-baseline space-x-1">
                  <span className="text-xl sm:text-2xl font-bold text-slate-900">{item.score}</span>
                  <span className="text-[10px] sm:text-xs text-slate-400 font-medium">/ {item.max}</span>
                </div>

                <StarRating rating={item.stars} />

                <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider mt-1 sm:mt-1.5 ${item.color}`}>
                  {item.platform}
                </span>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

