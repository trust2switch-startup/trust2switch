'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/Card';
import { FileText, Mail, MapPin } from 'lucide-react';

export default function TermsPage() {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#84994F] to-green-700 rounded-xl flex items-center justify-center shadow-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white">
              Terms & Conditions
            </h1>
          </div>
          <p className="text-xl text-slate-300">
            Last Updated: {currentDate}
          </p>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="border-2 border-slate-200">
              <CardContent className="prose prose-slate max-w-none">
                {/* Introduction */}
                <div className="mb-8 p-6 bg-slate-50 rounded-lg border-l-4 border-[#84994F]">
                  <p className="text-slate-700 leading-relaxed mb-0">
                    Welcome to Trust2Switch. By accessing or using our website, digital content, live classes, learning portal, or any services we offer ("Services"), you agree to the following Terms & Conditions.
                  </p>
                  <p className="text-slate-700 leading-relaxed mt-4 mb-0 font-semibold">
                    If you do not agree, please stop using our Services immediately.
                  </p>
                </div>

                {/* Section 1 */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-[#84994F] to-green-700 rounded-full"></div>
                    1. Definitions
                  </h2>
                  <div className="space-y-3 text-slate-700">
                    <p>
                      <strong>"Learner/Student/User/You"</strong> – Any individual accessing or using Trust2Switch Services.
                    </p>
                    <p>
                      <strong>"Courses/Programs"</strong> – Online instructor-led, self-paced, joint certification, or mentorship programs offered by Trust2Switch.
                    </p>
                    <p>
                      <strong>"Website"</strong> – trust2switch.com and all related digital portals.
                    </p>
                  </div>
                </div>

                {/* Section 2 */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-[#84994F] to-green-700 rounded-full"></div>
                    2. Use of Services
                  </h2>
                  <p className="text-slate-700 mb-4">By using our platform, you confirm that:</p>
                  <ul className="list-disc list-inside space-y-2 text-slate-700 mb-4 ml-4">
                    <li>You are 18+ or using under parental/guardian supervision.</li>
                    <li>You will not share your login credentials, class access, course materials, or videos with others.</li>
                    <li>You will not record, reproduce, or distribute course content.</li>
                  </ul>
                  <p className="text-slate-700 mb-2">Violation of these conditions may result in:</p>
                  <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                    <li>Permanent account suspension</li>
                    <li>Legal action</li>
                    <li>No refund eligibility</li>
                  </ul>
                </div>

                {/* Section 3 */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-[#84994F] to-green-700 rounded-full"></div>
                    3. Payments & EMI Loans
                  </h2>
                  <div className="space-y-3 text-slate-700">
                    <p>
                      All payments made toward course purchases are final and non-transferable.
                    </p>
                    <p>
                      For EMI or loan-based enrollments, repayment terms are governed by the financial institution, not Trust2Switch.
                    </p>
                    <p>
                      Loan cancellation charges, interest, or penalties are borne by the learner.
                    </p>
                  </div>
                </div>

                {/* Section 4 */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-[#84994F] to-green-700 rounded-full"></div>
                    4. Refunds & Rescheduling
                  </h2>
                  <p className="text-slate-700">
                    Refund and rescheduling eligibility is governed strictly by the Refund & Rescheduling Policy available on the website. By enrolling, you acknowledge and agree to those terms.
                  </p>
                </div>

                {/* Section 5 */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-[#84994F] to-green-700 rounded-full"></div>
                    5. Intellectual Property
                  </h2>
                  <p className="text-slate-700 mb-4">
                    All course videos, documents, recordings, quizzes, projects, images, and platform content belong to Trust2Switch or partnering institutions.
                  </p>
                  <p className="text-slate-700 mb-2">You agree NOT to:</p>
                  <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                    <li>Reproduce, sell, distribute, share publicly, or publish any learning content.</li>
                    <li>Use Trust2Switch content to create a competing product or service.</li>
                  </ul>
                </div>

                {/* Section 6 */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-[#84994F] to-green-700 rounded-full"></div>
                    6. Student Conduct
                  </h2>
                  <p className="text-slate-700 mb-4">Learners must maintain professional behavior, including:</p>
                  <ul className="list-disc list-inside space-y-2 text-slate-700 mb-4 ml-4">
                    <li>Respectful communication with trainers, mentors, and peers</li>
                    <li>No abusive language or harassment</li>
                    <li>No cheating or plagiarism in projects or exams</li>
                  </ul>
                  <p className="text-slate-700">
                    Violation may lead to suspension without refund.
                  </p>
                </div>

                {/* Section 7 */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-[#84994F] to-green-700 rounded-full"></div>
                    7. Placement / Career Services
                  </h2>
                  <p className="text-slate-700">
                    Career support services (resume, LinkedIn, mock interviews, job alerts, etc.) are assistance only and not a guarantee of employment unless explicitly mentioned in a separate written agreement.
                  </p>
                </div>

                {/* Section 8 */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-[#84994F] to-green-700 rounded-full"></div>
                    8. Limitation of Liability
                  </h2>
                  <p className="text-slate-700 mb-2">Trust2Switch is not responsible for:</p>
                  <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                    <li>Internet failure, technical issues, or device problems on the user side</li>
                    <li>Any financial loss, employment loss, or missed opportunities</li>
                    <li>External job portals or third-party hiring decisions</li>
                  </ul>
                </div>

                {/* Section 9 */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-[#84994F] to-green-700 rounded-full"></div>
                    9. Modifications
                  </h2>
                  <p className="text-slate-700">
                    Trust2Switch reserves the right to modify these Terms at any time. Continued use of Services means acceptance of updated terms.
                  </p>
                </div>

                {/* Section 10 */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-[#84994F] to-green-700 rounded-full"></div>
                    10. Governing Law
                  </h2>
                  <p className="text-slate-700">
                    These Terms are governed by the laws of India. Any dispute will fall under jurisdiction of Bengaluru, Karnataka courts only.
                  </p>
                </div>

                {/* Contact Section */}
                <div className="mt-12 p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg border border-slate-200">
                  <h2 className="text-xl font-bold text-slate-900 mb-4">Contact</h2>
                  <div className="space-y-3">
                    <a
                      href="mailto:legal@trust2switch.com"
                      className="flex items-center gap-3 text-slate-700 hover:text-[#84994F] transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                      <span>legal@trust2switch.com</span>
                    </a>
                    <div className="flex items-start gap-3 text-slate-700">
                      <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                      <span>Bangalore, India</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}


