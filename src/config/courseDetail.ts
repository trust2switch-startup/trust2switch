// Course Detail Page Content Configuration
// All content for the course detail page is defined here for easy customization

import {
  ProgramHighlight,
  Project,
  ComparisonRow,
  CareerTransition,
  FAQ,
} from "@/types";

export interface CourseDetailConfig {
  // Section Titles and Headings
  sections: {
    topSection: {
      backButton: string;
      downloadBrochure: string;
      applyNow: string;
      secureSpotTitle: string;
      noCostEMI: string;
      noCostEMIAmount: string;
      duration: string;
      admissionDeadline: string;
      admissionDeadlineDate: string;
      viewSyllabus: string;
      checkEligibility: string;
    };
    ratings: {
      title: string;
      subtitle: string;
    };
    whoCanApply: {
      title: string;
      items: string[];
    };
    guidance: {
      title: string;
      titleHighlight: string;
      description: string;
      connectButton: string;
      phoneNumber: string;
    };
    programHighlights: {
      title: string;
      subtitle: string;
      subtitleHighlight: string;
    };
    jobDescriptions: {
      title: string;
    };
    credentials: {
      title: string;
      description: string;
    };
    skills: {
      title: string;
    };
    projects: {
      title: string;
    };
    comparison: {
      title: string;
      categoryColumn: string;
      trust2switchColumn: string;
      otherCoursesColumn: string;
    };
    careerTransition: {
      title: string;
    };
    faq: {
      title: string;
      subtitle: string;
      contactText: string;
      contactButton: string;
    };
  };
  programHighlights: ProgramHighlight[];
  ratings: {
    score: string;
    max: string;
    platform: string;
    stars: number;
  }[];
  projects: Project[];
  comparisonData: ComparisonRow[];
  careerTransitions: CareerTransition[];
  faqs: FAQ[];
  jobDescriptionsLink: string;
  certificate: {
    serialNumber: string;
    instituteName: string;
    instituteSubtitle: string;
    diplomaTitle: string;
    certificateText: string;
    directorName: string;
    directorTitle: string;
    deanName: string;
    deanTitle: string;
    address: string;
  };
  skills: Array<{ name: string; icon: string }>;
}

export const courseDetailConfig: CourseDetailConfig = {
  sections: {
    topSection: {
      backButton: 'Back to Courses',
      downloadBrochure: 'Download Brochure',
      applyNow: 'Apply Now',
      secureSpotTitle: 'Secure your spot now!',
      noCostEMI: 'No-cost EMI',
      noCostEMIAmount: 'from INR 6,148*',
      duration: 'Duration',
      admissionDeadline: 'Admission Deadline',
      admissionDeadlineDate: '15-Dec-2025',
      viewSyllabus: 'View Syllabus',
      checkEligibility: 'Check Eligibility',
    },
    ratings: {
      title: 'Trusted by 1000+ Learners',
      subtitle: 'Consistently rated for authenticity & excellence.',
    },
    whoCanApply: {
      title: 'Who Can Apply this Course?',
      items: [
        'Graduates eager to launch a career in data-driven roles',
        'Working professionals seeking growth in analytics or AI fields',
        'Tech and IT employees wanting to shift into Data Science roles',
        'Managers aiming to make smarter, data-backed decisions',
        'Learners who want to build real Data Science projects and a job-ready portfolio',
      ],
    },
    guidance: {
      title: 'Need guidance?',
      titleHighlight: 'Talk to our career expert!',
      description: 'Get in touch with our program advisor & get your queries resolved.',
      connectButton: 'Connect with us',
      phoneNumber: 'Reach out to our expert 0800-3410345',
    },
    programHighlights: {
      title: 'Program Highlights',
      subtitle: 'Built for techies',
      subtitleHighlight: 'made easy for everyone.',
    },
    jobDescriptions: {
      title: 'Mapped to Real Job Descriptions from Top Tech Employers',
    },
    credentials: {
      title: 'Earn valuable credentials and recognition',
      description: 'Complete the program and unlock a certificate that proves you\'re equipped with the skills top Data Science and Analytics roles demand.',
    },
    skills: {
      title: 'Skills and Tools To Master',
    },
    projects: {
      title: 'Projects',
    },
    comparison: {
      title: 'What sets this program apart?',
      categoryColumn: 'Category',
      trust2switchColumn: 'Trust2Switch',
      otherCoursesColumn: 'Other Courses',
    },
    careerTransition: {
      title: 'Career Transition',
    },
    faq: {
      title: 'Frequently Asked Questions',
      subtitle: 'Get answers to common questions about the program',
      contactText: 'Still have questions? We\'re here to help!',
      contactButton: 'Contact Us',
    },
  },
  programHighlights: [
    {
      icon: 'TrendingUp',
      title: 'Learning paths',
      description: 'Go slow with up to 6 additional months of handholding, or get your diploma as quickly as 11 months.',
      gradient: 'from-[#84994F] to-[#84994F]',
    },
    {
      icon: 'Code2',
      title: '30+ projects',
      description: 'Learn by doing real data science projects of Amazon, Blinkit, HDFC Bank, Porter, Spotify, Wikipedia & more!',
      gradient: 'from-[#435663] to-[#435663]',
    },
    {
      icon: 'Target',
      title: 'Capstone Project',
      description: 'Bring a real business problem from your office or dream company, solve it with expert project guides.',
      gradient: 'from-[#84994F] to-[#84994F]',
    },
    {
      icon: 'FileCheck',
      title: 'A Standout Portfolio',
      description: 'Get help showcasing your projects on Kaggle, GitHub, and LinkedIn. Get noticed, get hired!',
      gradient: 'from-[#435663] to-[#435663]',
    },
    {
      icon: 'Briefcase',
      title: 'Complete Career Support',
      description: 'Crack dream jobs with our interview prep, resume building, personalized coaching and soft skills training.',
      gradient: 'from-[#84994F] to-[#84994F]',
    },
    {
      icon: 'GraduationCap',
      title: 'Top Faculty',
      description: 'Learn from IIIT-B\'s top professors, and data scientists from Meta, Microsoft, and Myntra.',
      gradient: 'from-[#435663] to-[#435663]',
    },
  ],

  ratings: [
    { score: '4.8', max: '5.0', platform: 'GOOGLE REVIEWS', stars: 4.8 },
    { score: '4.9', max: '5.0', platform: 'COURSE REPORT', stars: 4.9 },
    { score: '4.8', max: '5.0', platform: 'SWITCH UP', stars: 4.8 },
  ],

  projects: [
    {
      title: 'Booking System',
      description: 'A reservation system for various resources, featuring a calendar view, user authentication, and email booking confirmations.',
    },
    {
      title: 'Interactive Data Visualization Dashboard',
      description: 'A dashboard presenting complex data through interactive charts and graphs, pulling real-time data from various APIs.',
    },
    {
      title: 'Custom CMS',
      description: 'A tailored content management system allowing for content creation, role-based permissions, and a front-end API for content retrieval.',
    },
  ],

  comparisonData: [
    {
      category: 'Breadth & Depth of Curriculum',
      trust2switch: 'Comprehensive coverage of Python, BI, Statistics, ML, DL, Cloud & more',
      otherCourses: 'Miss key in-demand topics; limited hands-on exposure',
    },
    {
      category: 'Bootcamp for Beginners',
      trust2switch: 'Structured 3-month foundation bootcamp in math & coding',
      otherCourses: 'No organised support for beginners',
    },
    {
      category: 'GenAI Infusion',
      trust2switch: 'GenAI integrated with real use-cases, tools & projects',
      otherCourses: 'Mostly conceptual; minimal practical GenAI training',
    },
    {
      category: 'Specialisations',
      trust2switch: 'Tracks in Data Analytics & Data Engineering with industry scenarios',
      otherCourses: 'Limited tracks; low alignment with real hiring needs',
    },
    {
      category: 'Projects',
      trust2switch: 'Multiple end-to-end project pathways simulating real industry workflows',
      otherCourses: 'Basic or narrow project options',
    },
    {
      category: 'Capstone Projects',
      trust2switch: 'Learner-chosen capstones with advanced, real-world problem statements',
      otherCourses: 'Few, fixed capstones with limited depth',
    },
    {
      category: 'Alumni & Legacy',
      trust2switch: 'Growing network backed by strong industry partnerships',
      otherCourses: 'Small or closed alumni networks',
    },
    {
      category: 'Hands-on Learning',
      trust2switch: '60+ case studies & 12+ capstones for deep practical mastery',
      otherCourses: 'Dependence on pre-built datasets; limited real-world practice',
    },
  ],

  careerTransitions: [
    {
      hike: '567%',
      name: 'Antara Laha',
      field: 'Data Science',
      previousRole: 'Testing Trainee',
      previousCompany: 'Magic Software',
      newRole: 'Data Analyst',
      newCompany: 'Indegene',
      companyLogo: null,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      review: "The curriculum is very well structured and the mentors are extremely helpful. The projects gave me real-world experience.",
    },
    {
      hike: '483%',
      name: 'Kamini Sahu',
      field: 'Data Science',
      previousRole: 'Business Development Executive',
      previousCompany: 'Dynamo Consulting Services Limited',
      newRole: 'Associate Business Analyst',
      newCompany: 'Cotiviti',
      companyLogo: 'COTIVITI',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      review: "Trust2Switch helped me transition from a non-tech role to Data Science seamlessly. The career support was exceptional.",
    },
    {
      hike: '303%',
      name: 'Vignesh Ramana',
      field: 'Data Science',
      previousRole: 'Digital Associate',
      previousCompany: 'Amazon',
      newRole: 'Business Analyst',
      newCompany: 'EXL',
      companyLogo: null,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      review: "I was able to crack a job at EXL thanks to the rigorous training and mock interviews. Highly recommend this program.",
    },
    {
      hike: '192%',
      name: 'Rajat Dekate',
      field: 'Data Science',
      previousRole: 'Entrepreneur',
      previousCompany: 'MMKR POLYPLAST PVT. LTD.',
      newRole: 'Associate Business Analyst',
      newCompany: 'Cotiviti',
      companyLogo: 'COTIVITI',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      review: "The best investment for my career. The hands-on learning approach made complex topics easy to understand.",
    },
  ],

  faqs: [
    {
      question: 'What is the duration of the Advance Certification in Data Science program?',
      answer: 'The program typically takes 6–12 months to complete, depending on your learning pace and the time you dedicate each week. It includes live classes, mentorship, projects, and career preparation.',
    },
    {
      question: 'Do I need prior coding or technical experience to enroll?',
      answer: 'No. The program is designed for beginners as well as professionals. If you\'re new to coding, the included 3-month foundation bootcamp in math and programming ensures you\'re fully prepared.',
    },
    {
      question: 'What skills and tools will I learn in this program?',
      answer: 'You will gain hands-on experience with: Python, SQL, Power BI, TensorFlow, PyTorch, NumPy, Pandas, GitHub, AWS, and key Data Science, ML, and GenAI concepts.',
    },
    {
      question: 'Will I get to work on real projects?',
      answer: 'Yes. You will build multiple industry-grade projects across e-commerce, finance, healthcare, retail, and AI-driven products, plus a capstone project that strengthens your portfolio.',
    },
    {
      question: 'What makes Trust2Switch\'s Data Science program different?',
      answer: 'Our program stands out because it is:\n\n• Mapped to real job descriptions from top tech employers\n• Includes GenAI-infused curriculum\n• Offers specialised tracks (Data Analytics & Data Engineering)\n• Provides 1:1 mentorship and placement coaching\n• Delivers deep hands-on learning with 60+ case studies and 12+ capstones',
    },
    {
      question: 'Who is eligible for this course?',
      answer: 'The program is ideal for:\n\n• Graduates starting their analytics or AI career\n• Working professionals seeking growth\n• IT/Tech employees transitioning into Data Science\n• Managers needing data-driven decision skills\n• Learners aiming to build a professional DS/ML portfolio',
    },
    {
      question: 'Do I get a certificate after completion?',
      answer: 'Yes. After completing all program requirements, you will receive an industry-recognised Data Science certificate that validates your job-ready skills.',
    },
    {
      question: 'What career support do you offer?',
      answer: 'We provide comprehensive placement assistance including:\n\n• Resume and LinkedIn optimisation\n• Mock interviews with experts\n• 1:1 career mentorship\n• Portfolio review\n• Referrals through hiring partners (where available)',
    },
    {
      question: 'What job roles can I apply for after completing the program?',
      answer: 'You\'ll be eligible for roles such as:\n\n• Data Scientist\n• Data Analyst\n• Business Analyst\n• Machine Learning Engineer\n• AI/ML Associate\n• Data Engineer (with specialisation)',
    },
    {
      question: 'Are the sessions live or recorded?',
      answer: 'The program offers live online classes with industry faculty. All live sessions are recorded and available for later viewing.',
    },
    {
      question: 'Can I learn while working a full-time job?',
      answer: 'Absolutely. The program is structured for working professionals with flexible schedules, weekend live classes, and self-paced content.',
    },
    {
      question: 'How are the projects evaluated?',
      answer: 'Projects are reviewed by industry mentors, and you receive detailed feedback to help you improve your technical and presentation skills.',
    },
    {
      question: 'Is Generative AI included in the curriculum?',
      answer: 'Yes. The program integrates GenAI tools, case studies, and real-world applications, preparing you for the AI-driven job market.',
    },
    {
      question: 'What if I get stuck during learning?',
      answer: 'You get access to doubt-clearing mentors, community support, and 1:1 guidance during project work.',
    },
    {
      question: 'What is the admission process?',
      answer: 'Enrollment is simple — register, attend the orientation call, complete your onboarding, and begin learning immediately.',
    },
  ],

  jobDescriptionsLink: 'https://docs.google.com/spreadsheets/d/1DgRQzCvVwXniNfFuOETMPFhwC9qxikltpvE2aGNAHcE/edit?gid=0#gid=0',

  certificate: {
    serialNumber: 'S. No.: 2023/1001',
    instituteName: 'International Institute of Information Technology Bangalore',
    instituteSubtitle: '(Deemed to be University)',
    diplomaTitle: 'Executive Diploma in Data Science and Artificial Intelligence',
    certificateText: 'This is to certify that <<Student_Name>> has successfully completed the Executive Diploma in Data Science and Artificial Intelligence on <<Date>> with specialization in «Branch».',
    directorName: 'Debabrata Das',
    directorTitle: 'Director',
    deanName: 'Chandrashekar Ramanathan',
    deanTitle: 'Dean (Academics)',
    address: '26/C, Electronics City, Hosur Road, Bengaluru 560 100 INDIA | www.iiitb.ac.in',
  },

  skills: [
    { name: 'Python', icon: 'Code2' },
    { name: 'TensorFlow', icon: 'Zap' },
    { name: 'PyTorch', icon: 'Zap' },
    { name: 'Power BI', icon: 'BarChart3' },
    { name: 'SQL', icon: 'Database' },
    { name: 'GitHub', icon: 'GitBranch' },
    { name: 'AWS', icon: 'Cloud' },
    { name: 'Machine Learning', icon: 'Target' },
    { name: 'Deep Learning', icon: 'Layers' },
    { name: 'Data Analytics', icon: 'BarChart3' },
    { name: 'Statistics', icon: 'BarChart3' },
    { name: 'Cloud Computing', icon: 'Cloud' },
  ],
};

