'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

const testimonials = [
  {
    name: 'Jane Nandy',
    role: 'Software Engineer, Amazon',
    image: 'https://placehold.co/50x50/4f46e5/ffffff?text=JN',
    quote: 'What they said: The 1-on-1 sessions were a game-changer. I was able to transition from an outdated tech stack to a full-stack role in just 8 months. The project portfolio built here truly opened doors during interviews.',
  },
  {
    name: 'Samir Khan',
    role: 'Data Analyst, Fintech Startup',
    image: 'https://placehold.co/50x50/10b981/ffffff?text=SK',
    quote: 'The curriculum for Data Science was incredibly detailed and up-to-date. The instructors are clearly veterans. I felt truly prepared to handle real-world challenges immediately after graduating.',
  },
  {
    name: 'Ravi Varma',
    role: 'School Student (Grade 11)',
    image: 'https://placehold.co/50x50/f97316/ffffff?text=RV',
    quote: 'My Physics scores shot up after enrolling in the school mentorship program. My mentor explained concepts way better than my school teacher, and the dedicated time slot really helped me stay on track.',
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section id="learner-success" className="py-16 lg:py-24 bg-indigo-50" style={{ scrollMarginTop: '120px' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-indigo-800 mb-4">
            Hear From Our Successful Learners
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-orange-400 transform transition duration-300 hover:shadow-2xl"
            >
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4 ring-2 ring-orange-400">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={50}
                    height={50}
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-slate-800">{testimonial.name}</p>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
                <Link
                  href="#"
                  target="_blank"
                  className="ml-auto text-indigo-600 hover:text-indigo-800"
                  aria-label="LinkedIn Profile"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.447 20.452h-3.529v-5.599c0-1.339-.023-3.064-1.861-3.064-1.862 0-2.14 1.458-2.14 2.978v5.685h-3.529V9.249h3.38v1.569h.045c.471-.899 1.625-1.84 3.32-1.84 3.56 0 4.21 2.373 4.21 5.424l-.001 6.059zM7.915 6.791c-1.164 0-2.105-.941-2.105-2.105s.941-2.105 2.105-2.105 2.105.941 2.105 2.105-.941 2.105-2.105 2.105zm-.397 13.661h3.529V9.249H7.518v11.203zM22.225 0H1.775C.794 0 0 .794 0 1.775v20.449C0 23.206.794 24 1.775 24h20.449c.981 0 1.776-.794 1.776-1.775V1.775C24 .794 23.206 0 22.225 0z" />
                  </svg>
                </Link>
              </div>
              <p className="italic text-slate-700 leading-relaxed">
                "{testimonial.quote}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


