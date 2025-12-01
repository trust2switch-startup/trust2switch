'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { content } from '@/config/content';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail('');
    }, 3000);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6">
            <Mail className="w-8 h-8 text-primary-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-neutral-900 mb-4">
            {content.home.newsletter.title}
          </h2>
          <p className="text-xl text-neutral-600 mb-8">
            {content.home.newsletter.subtitle}
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder={content.home.newsletter.placeholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 w-full sm:w-auto"
            />
            <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto whitespace-nowrap">
              {submitted ? content.home.newsletter.success : content.home.newsletter.button}
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};


