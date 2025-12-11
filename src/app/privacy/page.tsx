'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/Card';
import { Shield, Mail, MapPin } from 'lucide-react';

export default function PrivacyPage() {
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
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white">
              Privacy Policy
            </h1>
          </div>
          <p className="text-xl text-slate-300">
            Last updated: {currentDate}
          </p>
        </div>
      </section>

      {/* Privacy Content */}
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
                  <p className="text-slate-700 leading-relaxed mb-4">
                    Welcome to Trust2Switch ("Trust2Switch", "we", "our", "us").
                  </p>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    We are an education and career transformation platform, and we respect your right to privacy.
                  </p>
                  <p className="text-slate-700 leading-relaxed mb-0">
                    This Privacy Policy explains how we collect, use, store, and protect your information when you:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-slate-700 mt-4 ml-4">
                    <li>Visit our website</li>
                    <li>Fill any form or enquiry</li>
                    <li>Enrol in a course or program</li>
                    <li>Communicate with our team, trainers, or mentors</li>
                  </ul>
                  <p className="text-slate-700 leading-relaxed mt-4 mb-0 font-semibold">
                    By using our website or services, you agree to this Privacy Policy. If you do not agree, please stop using our website and services.
                  </p>
                </div>

                {/* Section 1 */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-[#84994F] to-green-700 rounded-full"></div>
                    1. Who We Are
                  </h2>
                  <div className="space-y-3 text-slate-700">
                    <p>
                      Trust2Switch is an online learning and career transition platform based in India. We provide training, mentorship, and career-related services through online classes, content, and tools.
                    </p>
                    <p>
                      Since we are in the early stages and not yet formally registered as a company, all data is presently managed and controlled by the Trust2Switch management team.
                    </p>
                    <p>
                      You can contact us at:
                    </p>
                    <a
                      href="mailto:info@trust2switch.com"
                      className="flex items-center gap-2 text-[#84994F] hover:text-green-700 transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                      <span>info@trust2switch.com</span>
                    </a>
                  </div>
                </div>

                {/* Section 2 */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-[#84994F] to-green-700 rounded-full"></div>
                    2. What Information We Collect
                  </h2>
                  <p className="text-slate-700 mb-4">
                    The type of information we collect depends on how you interact with us.
                  </p>

                  <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">2.1 Information You Share With Us</h3>
                  <p className="text-slate-700 mb-3">When you use our website or services, you may provide:</p>
                  <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                    <li><strong>Contact details</strong> – Name, email address, phone number, city</li>
                    <li><strong>Profile details</strong> – Education, work experience, current role, industry, career goals</li>
                    <li><strong>Course-related data</strong> – Programs you are interested in or enrolled for</li>
                    <li><strong>Assignments & learning activity</strong> – Quiz submissions, projects, feedback, chats with trainers or mentors</li>
                    <li><strong>Support & communication</strong> – Messages you send via email, WhatsApp, forms, or chat</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">2.2 Payment Information</h3>
                  <p className="text-slate-700 mb-3">When you pay for a course:</p>
                  <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                    <li>We may collect your name, email, phone number, and basic billing information needed to confirm your order.</li>
                    <li>We do NOT store your full card/UPI/bank details. All sensitive payment data is handled securely by third-party payment gateways.</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">2.3 Automatically Collected Data</h3>
                  <p className="text-slate-700 mb-3">When you visit our website, certain information is collected automatically, such as:</p>
                  <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                    <li>IP address</li>
                    <li>Browser type and device type</li>
                    <li>Pages visited, time spent, clicks and navigation</li>
                    <li>Referring website or ad (if any)</li>
                  </ul>
                  <p className="text-slate-700 mt-3">
                    This is generally collected using cookies and analytics tools (explained in Section 6).
                  </p>

                  <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">2.4 Data From Third-Party Platforms</h3>
                  <p className="text-slate-700 mb-3">If you log in or interact using platforms like Google, Facebook, LinkedIn, etc., we may receive information like:</p>
                  <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                    <li>Name</li>
                    <li>Email address</li>
                    <li>Profile picture</li>
                    <li>Public profile information (depending on permissions you grant)</li>
                  </ul>
                </div>

                {/* Section 3 */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-[#84994F] to-green-700 rounded-full"></div>
                    3. Why We Collect Your Data (How We Use It)
                  </h2>
                  <p className="text-slate-700 mb-3">We use your information for purposes such as:</p>
                  <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                    <li>To create and manage your learner account</li>
                    <li>To help you enrol in courses and access learning content</li>
                    <li>To enable live classes, doubt sessions, and mentorship</li>
                    <li>To send you important updates about batches, schedules, exams, tasks, or platform changes</li>
                    <li>To provide support when you contact us</li>
                    <li>To understand your background and suggest suitable courses or career paths</li>
                    <li>To improve our website, services, content, and learner experience</li>
                    <li>To send relevant offers, course information, and marketing communication (you can opt out anytime)</li>
                    <li>To prevent fraud or misuse and to keep our platform safe</li>
                    <li>To comply with legal or regulatory requirements, if applicable</li>
                  </ul>
                </div>

                {/* Section 4 */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-[#84994F] to-green-700 rounded-full"></div>
                    4. Legal Basis for Using Your Data
                  </h2>
                  <p className="text-slate-700 mb-3">Depending on your location and applicable law, we process your data based on:</p>
                  <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                    <li><strong>Your consent</strong> – e.g., when you fill a form or subscribe to updates</li>
                    <li><strong>Contractual necessity</strong> – e.g., to deliver a course you have enrolled in</li>
                    <li><strong>Legitimate interests</strong> – e.g., improving services, preventing abuse, sending relevant communication</li>
                    <li><strong>Compliance with law</strong> – if disclosure is required by authorities</li>
                  </ul>
                </div>

                {/* Section 5 */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-[#84994F] to-green-700 rounded-full"></div>
                    5. How Long We Keep Your Data
                  </h2>
                  <p className="text-slate-700 mb-3">We keep your information only for as long as it is reasonably needed for:</p>
                  <ul className="list-disc list-inside space-y-2 text-slate-700 mb-4 ml-4">
                    <li>Providing and improving our services</li>
                    <li>Keeping academic and transaction records</li>
                    <li>Handling complaints, queries, or legal obligations</li>
                  </ul>
                  <p className="text-slate-700">
                    If you request deletion of your account or data (see Section 9), we will remove or anonymise it, unless we are required to keep certain information for legal, accounting, or security purposes.
                  </p>
                </div>

                {/* Section 6 */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-[#84994F] to-green-700 rounded-full"></div>
                    6. Cookies, Analytics & Online Tracking
                  </h2>
                  <p className="text-slate-700 mb-3">We use cookies and similar technologies to:</p>
                  <ul className="list-disc list-inside space-y-2 text-slate-700 mb-4 ml-4">
                    <li>Keep you logged in</li>
                    <li>Remember your preferences</li>
                    <li>Understand how users use our website</li>
                    <li>Improve performance and user experience</li>
                    <li>Show relevant promotions or ads (where applicable)</li>
                  </ul>
                  <p className="text-slate-700 mb-3">Cookies may be set by:</p>
                  <ul className="list-disc list-inside space-y-2 text-slate-700 mb-4 ml-4">
                    <li>Trust2Switch directly</li>
                    <li>Third-party tools such as analytics, marketing, or chat tools</li>
                  </ul>
                  <p className="text-slate-700 mb-3">
                    You can control cookies from your browser settings. If you disable cookies, some features of our website may not work properly.
                  </p>
                  <p className="text-slate-700">
                    We may also use tools like Google Analytics, Meta (Facebook) tools, or similar to understand visitor behaviour and improve our services. These tools may collect anonymised or pseudonymised information.
                  </p>
                </div>

                {/* Section 7 */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-[#84994F] to-green-700 rounded-full"></div>
                    7. When & With Whom We Share Your Data
                  </h2>
                  <p className="text-slate-700 mb-4 font-semibold">
                    We do not sell your personal data.
                  </p>
                  <p className="text-slate-700 mb-3">We may share your information only in the following cases:</p>
                  
                  <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Trainers, mentors, and support team</h3>
                  <p className="text-slate-700 mb-4">
                    To help deliver classes, resolve doubts, review assignments, or guide your learning.
                  </p>

                  <h3 className="text-xl font-semibold text-slate-900 mb-3">Technology and service partners</h3>
                  <p className="text-slate-700 mb-3">For hosting, email delivery, analytics, payment processing, communication tools, etc.</p>
                  <p className="text-slate-700 mb-4">
                    These partners are expected to use the data only to provide services to us.
                  </p>

                  <h3 className="text-xl font-semibold text-slate-900 mb-3">Legal, safety, or compliance reasons</h3>
                  <ul className="list-disc list-inside space-y-2 text-slate-700 mb-4 ml-4">
                    <li>If required by law, court order, or government authority</li>
                    <li>To detect or prevent fraud, misuse, or security threats</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-slate-900 mb-3">Business transitions (in future)</h3>
                  <p className="text-slate-700 mb-4">
                    If Trust2Switch is converted into a formal company, merged, acquired, or restructured, your data may be transferred to the new entity, subject to similar privacy protections.
                  </p>

                  <p className="text-slate-700">
                    We may also use aggregated or anonymised data (that does not identify you personally) for analytics, research, and business reports.
                  </p>
                </div>

                {/* Section 8 */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-[#84994F] to-green-700 rounded-full"></div>
                    8. How We Protect Your Data
                  </h2>
                  <p className="text-slate-700 mb-3">We use reasonable technical and organisational measures to safeguard your information, such as:</p>
                  <ul className="list-disc list-inside space-y-2 text-slate-700 mb-4 ml-4">
                    <li>Encrypted connections (SSL) on our website wherever possible</li>
                    <li>Secure handling of login credentials</li>
                    <li>Restricted access to personal data within our team</li>
                    <li>Use of reputed third-party tools and gateways</li>
                  </ul>
                  <p className="text-slate-700">
                    However, no method of transmission or storage over the internet is completely risk-free. You share and use information at your own risk.
                  </p>
                </div>

                {/* Section 9 */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-[#84994F] to-green-700 rounded-full"></div>
                    9. Your Rights & Choices
                  </h2>
                  <p className="text-slate-700 mb-3">Depending on your country and local law, you may have the following rights:</p>
                  <ul className="list-disc list-inside space-y-2 text-slate-700 mb-4 ml-4">
                    <li><strong>Access</strong> – Ask what data we hold about you</li>
                    <li><strong>Correction</strong> – Ask us to correct inaccurate or incomplete information</li>
                    <li><strong>Deletion</strong> – Request deletion of your data or account (subject to legal limits)</li>
                    <li><strong>Restriction</strong> – Request limited use of your data in certain cases</li>
                    <li><strong>Opt-out</strong> – Unsubscribe from promotional emails, messages, or marketing</li>
                  </ul>
                  <p className="text-slate-700 mb-3">You can:</p>
                  <ul className="list-disc list-inside space-y-2 text-slate-700 mb-4 ml-4">
                    <li>Unsubscribe from marketing emails via the "unsubscribe" link (where available)</li>
                    <li>Contact us via email for any privacy-related request</li>
                  </ul>
                  <div className="space-y-2 text-slate-700">
                    <a
                      href="mailto:privacy@trust2switch.com"
                      className="flex items-center gap-2 text-[#84994F] hover:text-green-700 transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                      <span>privacy@trust2switch.com</span>
                    </a>
                    <span className="text-slate-600 text-sm">(or info@trust2switch.com)</span>
                  </div>
                  <p className="text-slate-700 mt-4">
                    We may need to verify your identity before acting on certain requests.
                  </p>
                </div>

                {/* Section 10 */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-[#84994F] to-green-700 rounded-full"></div>
                    10. Children's Data
                  </h2>
                  <p className="text-slate-700 mb-3">
                    Our services are primarily intended for adults and working professionals.
                  </p>
                  <p className="text-slate-700 mb-3">
                    We do not knowingly collect personal data from children under 16 years of age.
                  </p>
                  <p className="text-slate-700">
                    If you believe a child has provided their data to us without guardian consent, please contact us. We will delete such information after verification.
                  </p>
                </div>

                {/* Section 11 */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-[#84994F] to-green-700 rounded-full"></div>
                    11. Users Outside India
                  </h2>
                  <p className="text-slate-700 mb-3">
                    Our systems and key service providers may be located in India and possibly other countries.
                  </p>
                  <p className="text-slate-700 mb-3">
                    By using our website or services from outside India, you agree that your data may be transferred to, stored, and processed in India or other jurisdictions, where data protection laws may differ from those in your country.
                  </p>
                  <p className="text-slate-700">
                    We will always take reasonable steps to keep your data secure, irrespective of where it is processed.
                  </p>
                </div>

                {/* Section 12 */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-[#84994F] to-green-700 rounded-full"></div>
                    12. Links to Other Websites
                  </h2>
                  <p className="text-slate-700 mb-3">
                    Our website may contain links to third-party websites or platforms (for example: YouTube, LinkedIn, other tools).
                  </p>
                  <p className="text-slate-700 mb-3">
                    We are not responsible for the privacy practices or content of those external sites.
                  </p>
                  <p className="text-slate-700">
                    We recommend you review the privacy policies of every site you visit through our links.
                  </p>
                </div>

                {/* Section 13 */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-[#84994F] to-green-700 rounded-full"></div>
                    13. Updates to This Privacy Policy
                  </h2>
                  <p className="text-slate-700 mb-3">
                    We may revise this Privacy Policy from time to time as we grow and add new features or services.
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                    <li>The "Last updated" date at the top will show the latest version.</li>
                    <li>Significant changes may be notified through website notice, email, or other suitable means.</li>
                    <li>Your continued use of our website or services after changes means you accept the updated policy.</li>
                  </ul>
                </div>

                {/* Section 14 */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-[#84994F] to-green-700 rounded-full"></div>
                    14. How to Contact Us
                  </h2>
                  <p className="text-slate-700 mb-4">
                    If you have any questions, concerns, or complaints about this Privacy Policy or how we handle your data, you can reach us at:
                  </p>
                  <a
                    href="mailto:info@trust2switch.com"
                    className="flex items-center gap-2 text-[#84994F] hover:text-green-700 transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    <span>info@trust2switch.com</span>
                  </a>
                  <p className="text-slate-600 text-sm mt-2">
                    (You can later replace this with a dedicated privacy or grievance officer email once your business is formally registered.)
                  </p>
                </div>

                {/* Section 15 */}
                <div className="mt-12 p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg border border-slate-200">
                  <h2 className="text-xl font-bold text-slate-900 mb-4">15. Grievance Officer / Contact for Data Concerns</h2>
                  <p className="text-slate-700 mb-4">
                    In accordance with applicable data protection laws in India, if you have questions, concerns, complaints, or requests regarding your personal data or this Privacy Policy, you may contact our designated Data & Privacy Grievance Officer:
                  </p>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-slate-900">Grievance Officer</p>
                      <p className="text-slate-700">Trust2Switch – Data Protection & Privacy Team</p>
                    </div>
                    <div className="flex items-start gap-3 text-slate-700">
                      <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                      <span>City: Bangalore, India</span>
                    </div>
                    <a
                      href="mailto:legal@trust2switch.com"
                      className="flex items-center gap-2 text-[#84994F] hover:text-green-700 transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                      <span>legal@trust2switch.com</span>
                    </a>
                  </div>
                  <p className="text-slate-700 mt-4">
                    We aim to acknowledge all privacy-related requests within 7 working days and resolve them within 30 working days, depending on the nature of the request.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

