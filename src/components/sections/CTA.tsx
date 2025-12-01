'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { content } from '@/config/content';

export const CTA: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
            {content.home.cta.title}
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            {content.home.cta.subtitle}
          </p>
          <Link href="/courses" className="inline-block">
            <Button variant="secondary" size="lg" className="bg-white text-primary-600 hover:bg-neutral-100 shadow-lg hover:shadow-xl hover:scale-105 transition-all">
              {content.home.cta.button}
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};


