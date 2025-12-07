'use client';

import React from 'react';

export const PlatformRatings: React.FC = () => {
  const ratings = [
    {
      score: '4.6/5.0',
      platform: 'GOOGLE REVIEWS',
      color: 'text-blue-500',
      stars: 4.6,
    },
    {
      score: '4.6/5.0',
      platform: 'COURSE REPORT',
      color: 'text-green-600',
      stars: 4.6,
    },
    {
      score: '4.6/5.0',
      platform: 'SWITCH UP',
      color: 'text-red-500',
      stars: 4.6,
    },
  ];

  const renderStars = (rating: number, index: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    const gradientId = `halfOutline-${index}`;

    return (
      <div className="flex justify-center text-orange-400 mb-1 space-x-1 text-lg">
        {[...Array(fullStars)].map((_, i) => (
          <svg
            key={`full-${i}`}
            width="1.0em"
            height="1.0em"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              fill="currentColor"
              d="M12 .587l3.668 7.568L24 9.748l-6 5.848 1.416 8.268L12 19.771l-7.416 4.093L6 15.596 0 9.748l8.332-1.593z"
            />
          </svg>
        ))}
        {hasHalfStar && (
          <svg width="1.0em" height="1.0em" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <defs>
              <linearGradient id={gradientId}>
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <path
              fill={`url(#${gradientId})`}
              d="M12 .587l3.668 7.568L24 9.748l-6 5.848 1.416 8.268L12 19.771l-7.416 4.093L6 15.596 0 9.748l8.332-1.593z"
            />
          </svg>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <svg
            key={`empty-${i}`}
            width="1.0em"
            height="1.0em"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              d="M12 .587l3.668 7.568L24 9.748l-6 5.848 1.416 8.268L12 19.771l-7.416 4.093L6 15.596 0 9.748l8.332-1.593z"
            />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <section id="ratings" className="py-6 bg-slate-100" style={{ scrollMarginTop: '120px' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4">
          <h3 className="text-4xl md:text-3xl font-semibold text-slate-800 tracking-wide">
            Trusted by 1000+ Learners Worldwide for Authenticity & Excellence
          </h3>
        </div>
        <br />
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center">
          {ratings.map((rating, index) => (
            <div key={index} className="text-center p-2">
              <p className="text-3xl font-bold text-black mb-1">{rating.score}</p>
              {renderStars(rating.stars, index)}
              <p className={`text-sm ${rating.color} uppercase tracking-wider font-semibold`}>
                {rating.platform}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

