"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  TrendingUp,
  Layers,
  Star,
} from "lucide-react";

export const IndustryProjects: React.FC = () => {
  const benefits = [
    { text: "Real-world architecture & design patterns", icon: Layers },
    { text: "Mentorship from top MNC engineers", icon: Star },
    { text: "Resume-ready portfolio assets", icon: TrendingUp },
  ];

  return (
    <section className="relative py-20 sm:py-24 overflow-hidden bg-[#0B0F17]">
      {/* Dynamic Background */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3" />
        {/* <div className="absolute inset-0 bg-grid-pattern opacity-10"></div> */}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-6">
              <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-ping"></span>
              Level Up Your Career
            </div> */}

            <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold text-white leading-tight mb-6">
              Already Skilled but <span className="text-red-600">Missing</span> <br />
              <span className="text-red-600">
                Industry-Grade Projects
              </span>
              <br />
              <span className="text-white">
                From MNC Engineers
              </span>
            </h2>

            {/* <p className="text-slate-400 text-lg mb-8 leading-relaxed max-w-xl">
              Explore industry-grade projects in your field, shared by
              experienced engineers from top MNCs. Ideal for skilled
              professionals and freshers who need real-world, resume-ready
              projects to showcase practical expertise, strengthen their
              portfolio, and boost job placement opportunities.
            </p> */}

            <div className="space-y-4 mb-10">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-red-600" />
                  </div>
                  <span className="text-slate-300 font-medium">
                    {benefit.text}
                  </span>
                </motion.div>
              ))}
            </div>

            <Link href="/shop">
              <Button
                variant="primary"
                size="lg"
                className="group relative overflow-hidden bg-gradient-to-r from-red-800 to-red-800 hover:bg-[#84994F] text-white px-8 py-4 rounded-xl shadow-lg shadow-emerald-900/20 hover:shadow-emerald-900/40 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-2 font-semibold">
                  <Briefcase className="w-5 h-5" />
                  Purchase Projects
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </Link>
          </motion.div>

          {/* Visual Side - Abstract Card Stack */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Back Card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-0 right-0 w-3/4 h-3/4 bg-slate-800/50 backdrop-blur-sm rounded-3xl border border-slate-700 transform translate-x-8 -translate-y-8"
              />

              {/* Middle Card */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute top-8 right-8 w-3/4 h-3/4 bg-slate-800/80 backdrop-blur-md rounded-3xl border border-slate-600 shadow-2xl transform translate-x-4 -translate-y-4 flex items-center justify-center"
              >
                <div className="text-center p-6 opacity-30">
                  <div className="w-16 h-16 bg-slate-700 rounded-xl mx-auto mb-4" />
                  <div className="h-4 w-32 bg-slate-700 rounded mx-auto mb-2" />
                  <div className="h-3 w-24 bg-slate-700 rounded mx-auto" />
                </div>
              </motion.div>

              {/* Front Card (Main) */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute top-16 right-16 w-3/4 h-3/4 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl border border-slate-600 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
              >
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-700 flex items-center justify-between">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="px-2 py-0.5 rounded bg-slate-700 text-[10px] text-slate-400 font-mono">
                    Project.tsx
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 rounded-xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                      <Layers className="w-6 h-6 text-indigo-400" />
                    </div>
                    <div>
                      <div className="h-4 w-32 bg-slate-700 rounded mb-2 animate-pulse" />
                      <div className="h-3 w-20 bg-slate-700/50 rounded animate-pulse" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="h-2 w-full bg-slate-700/50 rounded" />
                    <div className="h-2 w-5/6 bg-slate-700/50 rounded" />
                    <div className="h-2 w-4/6 bg-slate-700/50 rounded" />
                  </div>

                  <div className="mt-6 flex gap-2">
                    <div className="px-2 py-1 rounded bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300">
                      React
                    </div>
                    <div className="px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300">
                      Node.js
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Decorative elements */}
              <div className="absolute -bottom-4 right-20 bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-xl shadow-lg z-20">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-700 bg-gradient-to-br from-red-400 to-red-400`}
                      />
                    ))}
                  </div>
                  <div className="text-xs text-white">
                    <span className="font-bold block">500+</span>
                    Engineers
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
