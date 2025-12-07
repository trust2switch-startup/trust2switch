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
    <section id="learner-success" className="py-12 sm:py-16 lg:py-24 bg-indigo-50" style={{ scrollMarginTop: '120px' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10 lg:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-indigo-800 mb-3 sm:mb-4 px-2">
            Hear From Our Successful Learners
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white p-4 sm:p-5 lg:p-6 rounded-xl shadow-lg border-t-4 border-orange-400 transform transition duration-300 hover:shadow-2xl"
            >
              <div className="flex items-center mb-3 sm:mb-4">
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden mr-3 sm:mr-4 ring-2 ring-orange-400 flex-shrink-0">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={50}
                    height={50}
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm sm:text-base text-slate-800 truncate">{testimonial.name}</p>
                  <p className="text-xs sm:text-sm text-slate-500 truncate">{testimonial.role}</p>
                </div>
                <Link
                  href="#"
                  target="_blank"
                  className="ml-2 sm:ml-auto text-indigo-600 hover:text-indigo-800 flex-shrink-0"
                  aria-label="LinkedIn Profile"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.447 20.452h-3.529v-5.599c0-1.339-.023-3.064-1.861-3.064-1.862 0-2.14 1.458-2.14 2.978v5.685h-3.529V9.249h3.38v1.569h.045c.471-.899 1.625-1.84 3.32-1.84 3.56 0 4.21 2.373 4.21 5.424l-.001 6.059zM7.915 6.791c-1.164 0-2.105-.941-2.105-2.105s.941-2.105 2.105-2.105 2.105.941 2.105 2.105-.941 2.105-2.105 2.105zm-.397 13.661h3.529V9.249H7.518v11.203zM22.225 0H1.775C.794 0 0 .794 0 1.775v20.449C0 23.206.794 24 1.775 24h20.449c.981 0 1.776-.794 1.776-1.775V1.775C24 .794 23.206 0 22.225 0z" />
                  </svg>
                </Link>
              </div>
              <p className="italic text-sm sm:text-base text-slate-700 leading-relaxed">
                "{testimonial.quote}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


