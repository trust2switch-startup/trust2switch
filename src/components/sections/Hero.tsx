'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { CallbackModal } from '@/components/booking/CallbackModal';

export const Hero: React.FC = () => {
  const [isCallbackModalOpen, setIsCallbackModalOpen] = useState(false);

  return (
    <section id="hero" className="pt-8 relative bg-slate-900 overflow-hidden min-h-[600px] flex items-center" style={{ scrollMarginTop: '120px' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Side: Slogan & CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-white relative z-20"
        >
          <p className="text-orange-400 text-lg font-semibold mb-3 tracking-wider uppercase">
            Your Career Transformation Partner
          </p>
          <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight mb-6">
            Trust Your Transition. <span className="text-orange-300">Switch to Success.</span>
          </h1>
          <p className="mb-8 max-w-md text-slate-300">
            Acquire in-demand skills, build industry-level portfolios, and land your dream job with 1-on-1 mentorship.
          </p>
          
          {/* CTA Button with Motion */}
          <button
            onClick={() => setIsCallbackModalOpen(true)}
            className="group relative bg-orange-700 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-xl shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 min-w-[220px] flex items-center justify-center overflow-hidden"
          >
            <span className="text whitespace-nowrap transition-all duration-300 group-hover:opacity-0 group-hover:-translate-x-2">
              Request a Call Back
            </span>
            <Phone className="absolute w-6 h-6 opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
          </button>
        </motion.div>

        {/* Right Side: Video Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="video-container shadow-2xl rounded-xl border-4 border-white/20"
        >
          <iframe 
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?controls=0&autoplay=0&mute=1" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            className="w-full h-full"
          />
        </motion.div>
      </div>
      <CallbackModal
        isOpen={isCallbackModalOpen}
        onClose={() => setIsCallbackModalOpen(false)}
      />
    </section>
  );
};


