"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { CallbackModal } from "@/components/booking/CallbackModal";
import { trackButtonClick, trackModalOpen } from "@/lib/analytics";

export const Hero: React.FC = () => {
  const [isCallbackModalOpen, setIsCallbackModalOpen] = useState(false);

  return (
    <section
      id="hero"
      className="relative bg-slate-900 overflow-hidden min-h-[500px] sm:min-h-[600px] flex items-center"
      style={{ scrollMarginTop: "120px" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 sm:py-16 lg:py-20 grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
        {/* Left Side: Slogan & CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-white relative z-20 text-center md:text-left"
        >
          <p className="text-[#84994F] text-sm sm:text-base lg:text-lg font-semibold mb-2 sm:mb-3 tracking-wider uppercase">
            Your Career Transformation Partner
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 sm:mb-6">
            Trust Your Transition.{" "}
            <span className="text-[#84994F]">Switch to Success.</span>
          </h1>
          <p className="mb-6 sm:mb-8 max-w-md mx-auto md:mx-0 text-xs sm:text-sm md:text-base text-slate-300">
            Acquire in-demand skills, build industry-level portfolios, and land
            your dream job with 1-on-1 mentorship.
          </p>

          {/* CTA Button with Motion */}
          <button
            onClick={() => {
              trackButtonClick("hero_cta", "hero_section");
              trackModalOpen("callback_modal");
              setIsCallbackModalOpen(true);
            }}
            className="group relative bg-[#84994F] hover:bg-[#435663] text-white font-bold py-2.5 sm:py-3 px-6 sm:px-8 rounded-xl shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 w-full sm:w-auto sm:min-w-[220px] flex items-center justify-center overflow-hidden mx-auto md:mx-0"
          >
            <span className="text-sm sm:text-base whitespace-nowrap transition-all duration-300 group-hover:opacity-0 group-hover:-translate-x-2">
              Request a Call Back
            </span>
            <Phone className="absolute w-5 h-5 sm:w-6 sm:h-6 opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
          </button>
        </motion.div>

        {/* Right Side: Video Section */}
        {/* <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="video-container shadow-2xl rounded-xl border-2 sm:border-4 border-white/20 mt-6 md:mt-0"
        >
          <iframe 
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?controls=0&autoplay=0&mute=1" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            className="w-full h-full"
          />
        </motion.div> */}
        
        {/* Right Side: Animated Stats Cards */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative h-[400px] sm:h-[500px]"
        >
          {/* Floating Cards */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-0 bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20 w-48 sm:w-56"
          >
            <div className="text-[#84994F] text-4xl sm:text-5xl font-bold mb-2">
              95%
            </div>
            <p className="text-white text-sm sm:text-base font-medium">
              Job Placement Rate
            </p>
            <div className="mt-3 flex items-center gap-2">
              <div className="w-full bg-white/20 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "95%" }}
                  transition={{ duration: 2, delay: 0.5 }}
                  className="bg-[#84994F] h-2 rounded-full"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute top-32 sm:top-40 left-0 bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20 w-48 sm:w-56"
          >
            <div className="text-[#84994F] text-4xl sm:text-5xl font-bold mb-2">
              500+
            </div>
            <p className="text-white text-sm sm:text-base font-medium">
              Students Placed
            </p>
            <div className="flex -space-x-2 mt-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-[#84994F] to-[#435663] border-2 border-white"
                />
              ))}
              <div className="w-8 h-8 rounded-full bg-[#84994F] border-2 border-white flex items-center justify-center text-xs text-white font-bold">
                +
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="absolute bottom-0 right-4 sm:right-8 bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20 w-48 sm:w-56"
          >
            <div className="text-[#84994F] text-4xl sm:text-5xl font-bold mb-2">
              ₹8L+
            </div>
            <p className="text-white text-sm sm:text-base font-medium">
              Average Package
            </p>
            <div className="mt-3">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-flex items-center gap-1 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-semibold"
              >
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
                +25% YoY
              </motion.div>
            </div>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-[#84994F]/20 rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border-2 border-white/10 rounded-full"
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
