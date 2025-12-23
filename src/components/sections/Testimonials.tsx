'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Jane Nandy',
    role: 'Software Engineer, Amazon',
    image: 'https://placehold.co/50x50/4f46e5/ffffff?text=JN',
    quote: 'What they said: The 1-on-1 sessions were a game-changer. I was able to transition from an outdated tech stack to a full-stack role in just 8 months. The project portfolio built here truly opened doors during interviews.',
    rating: 5,
  },
  {
    name: 'Samir Khan',
    role: 'Data Analyst, Fintech Startup',
    image: 'https://placehold.co/50x50/10b981/ffffff?text=SK',
    quote: 'The curriculum for Data Science was incredibly detailed and up-to-date. The instructors are clearly veterans. I felt truly prepared to handle real-world challenges immediately after graduating.',
    rating: 5,
  },
  {
    name: 'Ravi Varma',
    role: 'School Student (Grade 11)',
    image: 'https://placehold.co/50x50/f97316/ffffff?text=RV',
    quote: 'My Physics scores shot up after enrolling in the school mentorship program. My mentor explained concepts way better than my school teacher, and the dedicated time slot really helped me stay on track.',
    rating: 5,
  },
];

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying]);

  return (
    <section id="learner-success" className="py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-indigo-50 via-white to-orange-50 relative overflow-hidden" style={{ scrollMarginTop: '120px' }}>
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10 lg:mb-16"
        >
          <div className="inline-flex items-center justify-center mb-4">
            <div className="w-12 h-1 bg-gradient-to-r from-transparent via-[#84994F] to-transparent"></div>
            <Quote className="w-8 h-8 text-[#84994F] mx-4" />
            <div className="w-12 h-1 bg-gradient-to-r from-transparent via-[#84994F] to-transparent"></div>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold bg-[#435663] bg-clip-text text-transparent mb-3 sm:mb-4 px-2">
            Hear From Our Successful Learners
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
            Real stories from real people who transformed their careers with us
          </p>
        </motion.div>

        {/* Desktop Grid View */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6 sm:gap-8 mb-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ scale: 1.05, y: -8 }}
              onHoverStart={() => setIsAutoPlaying(false)}
              onHoverEnd={() => setIsAutoPlaying(true)}
              className="group relative bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-100 hover:border-orange-300 transform transition-all duration-300 hover:shadow-2xl overflow-hidden"
            >
              {/* Gradient Border Effect */}
              {/* <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-indigo-500 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0 blur-xl"></div> */}

              {/* Top Accent Bar */}
              {/* <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 via-indigo-500 to-orange-400"></div> */}

              {/* Quote Icon */}
              <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="w-16 h-16 text-[#84994F]" />
              </div>

              <div className="relative z-10">
                {/* Star Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-slate-700 leading-relaxed mb-6 text-sm sm:text-base relative z-10">
                  <Quote className="w-5 h-5 text-[#84994F] inline-block mr-2 -mt-1" />
                  {testimonial.quote}
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden ring-2 ring-orange-400/50 group-hover:ring-orange-400 transition-all duration-300 flex-shrink-0">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={56}
                      height={56}
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm sm:text-base text-slate-900 truncate">{testimonial.name}</p>
                    <p className="text-xs sm:text-sm text-slate-500 truncate">{testimonial.role}</p>
                  </div>
                  <Link
                    href="#"
                    target="_blank"
                    className="text-indigo-600 hover:text-indigo-800 hover:scale-110 transition-transform duration-300 flex-shrink-0"
                    aria-label="LinkedIn Profile"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.447 20.452h-3.529v-5.599c0-1.339-.023-3.064-1.861-3.064-1.862 0-2.14 1.458-2.14 2.978v5.685h-3.529V9.249h3.38v1.569h.045c.471-.899 1.625-1.84 3.32-1.84 3.56 0 4.21 2.373 4.21 5.424l-.001 6.059zM7.915 6.791c-1.164 0-2.105-.941-2.105-2.105s.941-2.105 2.105-2.105 2.105.941 2.105 2.105-.941 2.105-2.105 2.105zm-.397 13.661h3.529V9.249H7.518v11.203zM22.225 0H1.775C.794 0 0 .794 0 1.775v20.449C0 23.206.794 24 1.775 24h20.449c.981 0 1.776-.794 1.776-1.775V1.775C24 .794 23.206 0 22.225 0z" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile/Tablet Carousel View */}
        <div className="lg:hidden relative">
          <div className="relative overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-100 relative overflow-hidden"
              >
                {/* Top Accent Bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 via-indigo-500 to-orange-400"></div>

                {/* Quote Icon */}
                <div className="absolute top-4 right-4 opacity-10">
                  <Quote className="w-16 h-16 text-indigo-600" />
                </div>

                <div className="relative z-10">
                  {/* Star Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  {/* Quote Text */}
                  <p className="text-slate-700 leading-relaxed mb-6 text-base sm:text-lg relative z-10">
                    <Quote className="w-6 h-6 text-orange-400/50 inline-block mr-2 -mt-1" />
                    {testimonials[currentIndex].quote}
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-orange-400/50 flex-shrink-0">
                      <Image
                        src={testimonials[currentIndex].image}
                        alt={testimonials[currentIndex].name}
                        width={56}
                        height={56}
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-base text-slate-900 truncate">{testimonials[currentIndex].name}</p>
                      <p className="text-sm text-slate-500 truncate">{testimonials[currentIndex].role}</p>
                    </div>
                    <Link
                      href="#"
                      target="_blank"
                      className="text-indigo-600 hover:text-indigo-800 transition-transform duration-300 hover:scale-110 flex-shrink-0"
                      aria-label="LinkedIn Profile"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.447 20.452h-3.529v-5.599c0-1.339-.023-3.064-1.861-3.064-1.862 0-2.14 1.458-2.14 2.978v5.685h-3.529V9.249h3.38v1.569h.045c.471-.899 1.625-1.84 3.32-1.84 3.56 0 4.21 2.373 4.21 5.424l-.001 6.059zM7.915 6.791c-1.164 0-2.105-.941-2.105-2.105s.941-2.105 2.105-2.105 2.105.941 2.105 2.105-.941 2.105-2.105 2.105zm-.397 13.661h3.529V9.249H7.518v11.203zM22.225 0H1.775C.794 0 0 .794 0 1.775v20.449C0 23.206.794 24 1.775 24h20.449c.981 0 1.776-.794 1.776-1.775V1.775C24 .794 23.206 0 22.225 0z" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-indigo-600 hover:text-indigo-800 rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-20"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={nextTestimonial}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-indigo-600 hover:text-indigo-800 rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-20"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
                className={`transition-all duration-300 rounded-full ${index === currentIndex
                    ? 'w-8 h-2 bg-gradient-to-r from-orange-400 to-indigo-500'
                    : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};


