'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/Card';
import { RefreshCw, Mail } from 'lucide-react';

export default function RefundPage() {
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
              <RefreshCw className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white">
              Refund & Rescheduling Policy
            </h1>
          </div>
        </div>
      </section>

      {/* Refund Policy Content */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Introduction */}
            <Card className="border-2 border-slate-200">
              <CardContent className="prose prose-slate max-w-none">
                <div className="mb-8 p-6 bg-slate-50 rounded-lg border-l-4 border-[#84994F]">
                  <p className="text-slate-700 leading-relaxed mb-4">
                    Thank you for choosing Trust2Switch to accelerate your professional growth.
                  </p>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    We are committed to ensuring a transparent, fair, and learner-friendly experience.
                  </p>
                  <p className="text-slate-700 leading-relaxed mb-0">
                    By enrolling in any Trust2Switch program, you acknowledge and agree to our Refund Policy, Rescheduling Policy, Privacy Policy, and Terms of Use explained below.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Section 1 */}
            <Card className="border-2 border-slate-200">
              <CardContent className="prose prose-slate max-w-none">
                <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-gradient-to-b from-[#84994F] to-green-700 rounded-full"></div>
                  1. Refund Policy: Online Instructor-Led Courses
                </h2>
                <p className="text-slate-700 mb-6">
                  Learners enrolled in standard (non-partnered) instructor-led online courses may request a refund only if all of the following conditions are fulfilled:
                </p>

                <div className="overflow-x-auto mb-6">
                  <table className="w-full border-collapse border border-slate-300 rounded-lg">
                    <thead>
                      <tr className="bg-gradient-to-r from-[#84994F] to-green-700">
                        <th className="border border-slate-300 px-4 py-3 text-left text-white font-semibold">Eligibility Criteria</th>
                        <th className="border border-slate-300 px-4 py-3 text-left text-white font-semibold">Requirement</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white hover:bg-slate-50">
                        <td className="border border-slate-300 px-4 py-3 text-slate-700 font-medium">Refund Request Window</td>
                        <td className="border border-slate-300 px-4 py-3 text-slate-700">Within 7 days of course purchase</td>
                      </tr>
                      <tr className="bg-slate-50 hover:bg-slate-100">
                        <td className="border border-slate-300 px-4 py-3 text-slate-700 font-medium">Class Attendance</td>
                        <td className="border border-slate-300 px-4 py-3 text-slate-700">Attended no more than 1 live class</td>
                      </tr>
                      <tr className="bg-white hover:bg-slate-50">
                        <td className="border border-slate-300 px-4 py-3 text-slate-700 font-medium">Course Materials</td>
                        <td className="border border-slate-300 px-4 py-3 text-slate-700">Have not downloaded / accessed study materials or recordings</td>
                      </tr>
                      <tr className="bg-slate-50 hover:bg-slate-100">
                        <td className="border border-slate-300 px-4 py-3 text-slate-700 font-medium">Exam Resources</td>
                        <td className="border border-slate-300 px-4 py-3 text-slate-700">Have not requested or used any exam voucher / kit</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded">
                  <p className="text-slate-700 font-semibold mb-0">
                    If any of the conditions above are not met, the refund request will be automatically rejected.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Section 2 */}
            <Card className="border-2 border-slate-200">
              <CardContent className="prose prose-slate max-w-none">
                <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-gradient-to-b from-[#84994F] to-green-700 rounded-full"></div>
                  2. Refund Policy: Joint Certification / Partner Programs
                </h2>
                <p className="text-slate-700 mb-4">
                  Programs conducted collaboratively with institutes, universities, or companies are <strong>strictly non-refundable</strong>.
                </p>
                <p className="text-slate-700 mb-6">
                  However, as a rare exception, refund requests may be reviewed only if all of the following criteria are satisfied:
                </p>

                <div className="overflow-x-auto mb-6">
                  <table className="w-full border-collapse border border-slate-300 rounded-lg">
                    <thead>
                      <tr className="bg-gradient-to-r from-[#84994F] to-green-700">
                        <th className="border border-slate-300 px-4 py-3 text-left text-white font-semibold">Eligibility Criteria</th>
                        <th className="border border-slate-300 px-4 py-3 text-left text-white font-semibold">Requirement</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white hover:bg-slate-50">
                        <td className="border border-slate-300 px-4 py-3 text-slate-700 font-medium">Refund Request Window</td>
                        <td className="border border-slate-300 px-4 py-3 text-slate-700">Within 7 days of course purchase</td>
                      </tr>
                      <tr className="bg-slate-50 hover:bg-slate-100">
                        <td className="border border-slate-300 px-4 py-3 text-slate-700 font-medium">Live Session Attendance</td>
                        <td className="border border-slate-300 px-4 py-3 text-slate-700">Attended no more than 1 live class</td>
                      </tr>
                      <tr className="bg-white hover:bg-slate-50">
                        <td className="border border-slate-300 px-4 py-3 text-slate-700 font-medium">Course Materials</td>
                        <td className="border border-slate-300 px-4 py-3 text-slate-700">Have not downloaded / accessed any content or recordings</td>
                      </tr>
                      <tr className="bg-slate-50 hover:bg-slate-100">
                        <td className="border border-slate-300 px-4 py-3 text-slate-700 font-medium">Exam Resources</td>
                        <td className="border border-slate-300 px-4 py-3 text-slate-700">Have not received / requested any voucher or kit</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded">
                  <p className="text-slate-700 font-semibold mb-0">
                    Any failure to meet even one of the above conditions will result in immediate rejection of the refund request.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Section 3 */}
            <Card className="border-2 border-slate-200">
              <CardContent className="prose prose-slate max-w-none">
                <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-gradient-to-b from-[#84994F] to-green-700 rounded-full"></div>
                  3. General Terms & Processing
                </h2>
                <div className="space-y-4 text-slate-700">
                  <p>
                    Approved refunds will be processed within <strong>30 working days</strong> after internal approval.
                  </p>
                  <p>
                    If the learner has opted for loan-based financing, any loan cancellation costs, interest, penalty, or processing charges imposed by the lending partner will be borne solely by the learner.
                  </p>
                  <p>
                    Trust2Switch reserves full discretion to postpone or cancel a class due to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Instructor unavailability</li>
                    <li>Platform / technical downtime</li>
                    <li>Natural calamities or force-majeure events (floods, earthquakes, pandemics, political unrest, etc.)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Section 4 */}
            <Card className="border-2 border-slate-200">
              <CardContent className="prose prose-slate max-w-none">
                <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-gradient-to-b from-[#84994F] to-green-700 rounded-full"></div>
                  4. Batch Deferral / Rescheduling Policy
                </h2>
                <p className="text-slate-700 mb-6">
                  Learners may request to move to a new batch under the following conditions:
                </p>

                <div className="overflow-x-auto mb-6">
                  <table className="w-full border-collapse border border-slate-300 rounded-lg">
                    <thead>
                      <tr className="bg-gradient-to-r from-[#84994F] to-green-700">
                        <th className="border border-slate-300 px-4 py-3 text-left text-white font-semibold">Requirement</th>
                        <th className="border border-slate-300 px-4 py-3 text-left text-white font-semibold">Policy</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white hover:bg-slate-50">
                        <td className="border border-slate-300 px-4 py-3 text-slate-700 font-medium">How to Request</td>
                        <td className="border border-slate-300 px-4 py-3 text-slate-700">Via email to <a href="mailto:info@trust2switch.com" className="text-[#84994F] hover:text-green-700">info@trust2switch.com</a></td>
                      </tr>
                      <tr className="bg-slate-50 hover:bg-slate-100">
                        <td className="border border-slate-300 px-4 py-3 text-slate-700 font-medium">Number of Attempts</td>
                        <td className="border border-slate-300 px-4 py-3 text-slate-700">One-time deferral only</td>
                      </tr>
                      <tr className="bg-white hover:bg-slate-50">
                        <td className="border border-slate-300 px-4 py-3 text-slate-700 font-medium">Seat Availability</td>
                        <td className="border border-slate-300 px-4 py-3 text-slate-700">Rescheduling subject to availability in future batches</td>
                      </tr>
                      <tr className="bg-slate-50 hover:bg-slate-100">
                        <td className="border border-slate-300 px-4 py-3 text-slate-700 font-medium">Time Window</td>
                        <td className="border border-slate-300 px-4 py-3 text-slate-700">New batch must begin within 7 days of the original batch start date</td>
                      </tr>
                      <tr className="bg-white hover:bg-slate-50">
                        <td className="border border-slate-300 px-4 py-3 text-slate-700 font-medium">Learning Progress</td>
                        <td className="border border-slate-300 px-4 py-3 text-slate-700">Learner must have completed less than 2% of the program content</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="p-4 bg-amber-50 border-l-4 border-amber-500 rounded">
                  <p className="text-slate-700 font-semibold mb-0">
                    Requests failing to meet the above conditions will not be approved.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Section 5 */}
            <Card className="border-2 border-slate-200">
              <CardContent className="prose prose-slate max-w-none">
                <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-gradient-to-b from-[#84994F] to-green-700 rounded-full"></div>
                  5. Zero-Tolerance Policy for Misuse
                </h2>
                <p className="text-slate-700 mb-3">Refund requests will be instantly rejected if:</p>
                <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                  <li>The learner creates fraudulent claims regarding participation or attendance</li>
                  <li>Login credentials / study materials are shared with others</li>
                  <li>Screen recordings / course content is distributed or misused</li>
                </ul>
              </CardContent>
            </Card>

            {/* Section 6 */}
            <Card className="border-2 border-slate-200">
              <CardContent className="prose prose-slate max-w-none">
                <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-gradient-to-b from-[#84994F] to-green-700 rounded-full"></div>
                  6. Acceptance of Policy
                </h2>
                <p className="text-slate-700 mb-3">
                  By paying for or accessing any course or learning material through the Trust2Switch website/platform, the learner agrees that:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                  <li>They have read, understood, and accepted this policy</li>
                  <li>They will not dispute the policy terms after purchase</li>
                </ul>
              </CardContent>
            </Card>

            {/* Contact Section */}
            <Card className="border-2 border-slate-200">
              <CardContent className="prose prose-slate max-w-none">
                <div className="mt-8 p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg border border-slate-200">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Need Help?</h3>
                  <p className="text-slate-700 mb-4">
                    If you have questions about refunds or rescheduling, please contact us:
                  </p>
                  <a
                    href="mailto:info@trust2switch.com"
                    className="flex items-center gap-2 text-[#84994F] hover:text-green-700 transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    <span>info@trust2switch.com</span>
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}


