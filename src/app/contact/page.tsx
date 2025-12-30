'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { content } from '@/config/content';
import { useContactInfo } from '@/hooks/useContactInfo';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { visibleContactInfo } = useContactInfo();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to send message. Please try again.');
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (error: any) {
      console.error('Error submitting contact form:', error);
      setSubmitError(error.message || content.contact.form.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  interface ContactItem {
    icon: typeof Mail;
    title: string;
    content: string;
    href: string | null;
    color: string;
  }

  const contactItems: ContactItem[] = [
    visibleContactInfo.email && {
      icon: Mail,
      title: 'Email',
      content: visibleContactInfo.email,
      href: `mailto:${visibleContactInfo.email}`,
      color: 'from-[#84994F] to-[#6d7f42]',
    },
    visibleContactInfo.phone && visibleContactInfo.phoneDisplay && {
      icon: Phone,
      title: 'Phone',
      content: visibleContactInfo.phoneDisplay,
      href: `tel:${visibleContactInfo.phone}`,
      color: 'from-orange-500 to-orange-600',
    },
    visibleContactInfo.address && {
      icon: MapPin,
      title: 'Address',
      content: visibleContactInfo.address,
      href: null,
      color: 'from-[#435663] to-[#384752]',
    },
  ].filter((item): item is ContactItem => Boolean(item));

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Ultra Compact Header */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8 sm:py-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#84994F]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center sm:text-left"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white mb-2">
              {content.contact.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-300">
              {content.contact.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Compact Contact Section */}
      <section className="py-8 sm:py-12 -mt-6 sm:-mt-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-6">
            {/* Contact Info - Compact Sidebar */}
            {contactItems.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="lg:col-span-2 space-y-3"
              >
                {contactItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <div className="group bg-white border border-slate-200 rounded-lg p-4 hover:border-[#84994F]/40 hover:shadow-md transition-all duration-200">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                              {item.title}
                            </h3>
                            {item.href ? (
                              <a
                                href={item.href}
                                className="text-sm font-medium text-slate-900 hover:text-[#84994F] transition-colors break-words block"
                              >
                                {item.content}
                              </a>
                            ) : (
                              <p className="text-sm text-slate-700 break-words">
                                {item.content}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}

            {/* Contact Form - Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className={contactItems.length > 0 ? 'lg:col-span-3' : 'lg:col-span-5'}
            >
              <div className="bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-5 sm:p-6">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-green-50 rounded-full mb-3">
                      <CheckCircle2 className="w-7 h-7 text-green-600" />
                    </div>
                    <h3 className="text-lg font-heading font-bold text-slate-900 mb-1.5">
                      Message Sent!
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600">
                      {content.contact.form.success}
                    </p>
                  </motion.div>
                ) : (
                  <>
                    <div className="mb-5">
                      <h2 className="text-lg sm:text-xl font-heading font-bold text-slate-900 mb-1 flex items-center gap-2">
                        <div className="w-1 h-5 bg-gradient-to-b from-[#84994F] to-[#6d7f42] rounded-full"></div>
                        Send us a Message
                      </h2>
                      <p className="text-xs text-slate-500 ml-3">
                        We'll respond within 24 hours
                      </p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-3.5">
                      <div className="grid sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="block text-xs font-medium text-slate-700 mb-1.5">
                            {content.contact.form.name}
                          </label>
                          <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84994F]/20 focus:border-[#84994F] transition-all bg-white ${
                              errors.name ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' : 'border-slate-300'
                            }`}
                          />
                          {errors.name && (
                            <p className="mt-1 text-xs text-red-600">{errors.name}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-700 mb-1.5">
                            {content.contact.form.email}
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84994F]/20 focus:border-[#84994F] transition-all bg-white ${
                              errors.email ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' : 'border-slate-300'
                            }`}
                          />
                          {errors.email && (
                            <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                          )}
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1.5">
                          {content.contact.form.subject}
                        </label>
                        <input
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84994F]/20 focus:border-[#84994F] transition-all bg-white ${
                            errors.subject ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' : 'border-slate-300'
                          }`}
                        />
                        {errors.subject && (
                          <p className="mt-1 text-xs text-red-600">{errors.subject}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1.5">
                          {content.contact.form.message}
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={4}
                          required
                          className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84994F]/20 focus:border-[#84994F] transition-all resize-none bg-white ${
                            errors.message ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' : 'border-slate-300'
                          }`}
                        />
                        {errors.message && (
                          <p className="mt-1 text-xs text-red-600">{errors.message}</p>
                        )}
                      </div>
                      {submitError && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                          <p className="text-xs text-red-600">{submitError}</p>
                        </div>
                      )}
                      <div className="pt-1">
                        <Button
                          type="submit"
                          variant="primary"
                          size="md"
                          className="w-full sm:w-auto min-w-[160px] flex items-center justify-center text-sm"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              {content.contact.form.sending}
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4 mr-1.5 flex-shrink-0" />
                              <span>{content.contact.form.submit}</span>
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

