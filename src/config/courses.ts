// Centralized Courses Data
// All course information is defined here

export interface ProgramHighlight {
  icon: string;
  title: string;
  description: string;
  gradient: string;
}

export interface Project {
  title: string;
  description: string;
}

export interface ComparisonRow {
  category: string;
  trust2switch: string;
  otherCourses: string;
}

export interface CareerTransition {
  hike: string;
  name: string;
  field: string;
  previousRole: string;
  previousCompany: string;
  newRole: string;
  newCompany: string;
  companyLogo: string | null;
  image: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Skill {
  name: string;
  icon: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  instructor: {
    name: string;
    role: string;
    image: string;
    bio: string;
  };
  image: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  students: number;
  language: string;
  features: string[];
  bulletPoints: string[];
  brochureDownloadLink?: string;
  noCostEMIAmount?: string;
  admissionDeadlineDate?: string;
  whoCanApply?: string[];
  programHighlights?: ProgramHighlight[];
  projects?: Project[];
  skills?: Skill[];
  comparisonData?: ComparisonRow[];
  careerTransitions?: CareerTransition[];
  faqs?: FAQ[];
  jobDescriptionsLink?: string;
  certificate?: {
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
  curriculum: {
    week: number;
    title: string;
    lessons: {
      title: string;
      duration: string;
      type: 'video' | 'reading' | 'assignment';
    }[];
  }[];
  tags: string[];
  isPopular?: boolean;
  isNew?: boolean;
}

export const courses: Course[] = [
  {
    id: '1',
    slug: 'full-stack-web-development',
    title: 'Full Stack Development',
    description: 'Master modern web development with React, Node.js, and MongoDB. Build real-world applications from scratch.',
    longDescription: 'This comprehensive course takes you from zero to hero in full-stack web development. You\'ll learn React for frontend, Node.js for backend, and MongoDB for database management. By the end, you\'ll have built multiple real-world projects and be ready for a career as a full-stack developer.',
    instructor: {
      name: 'John Smith',
      role: 'Senior Full Stack Developer',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
      bio: 'John has 10+ years of experience building scalable web applications. He has worked at companies like Amazon and Netflix.',
    },
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
    category: 'Web Development',
    level: 'Beginner',
    duration: '12 weeks',
    price: 24999,
    originalPrice: 41999,
    rating: 4.8,
    reviews: 1247,
    students: 15234,
    language: 'English',
    features: [
      '50+ hours of video content',
      '10+ real-world projects',
      'Lifetime access',
      'Certificate of completion',
      'Career support',
    ],
    bulletPoints: [
      'Become an Industry-Ready Full Stack Developer in 6-12 Months',
      'Live Online sessions + mentorship from industry-experts.',
      'Resume building, mock interviews, assignment reviews, and 1:1 placement coaching.',
      'Hands-on with React, Node.js, MongoDB, Express, TypeScript, and more',
      'Case studies/Projects from e-commerce, fintech, social media, and SaaS companies.',
    ],
    brochureDownloadLink: 'https://example.com/brochures/full-stack-web-development.pdf',
    noCostEMIAmount: 'from INR 5,999*',
    admissionDeadlineDate: '15-Jan-2026',
    whoCanApply: [
      'Graduates eager to launch a career in web development',
      'Working professionals seeking growth in full-stack development',
      'Frontend/Backend developers wanting to become full-stack engineers',
      'Career switchers aiming to enter the tech industry',
      'Learners who want to build real web applications and a job-ready portfolio',
    ],
    programHighlights: [
      {
        icon: 'TrendingUp',
        title: 'Learning paths',
        description: 'Go slow with up to 6 additional months of handholding, or get your diploma as quickly as 11 months.',
        gradient: 'from-[#84994F] to-[#84994F]',
      },
      {
        icon: 'Code2',
        title: '25+ projects',
        description: 'Learn by doing real web development projects of e-commerce platforms, social media apps, fintech solutions & more!',
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
        description: 'Get help showcasing your projects on GitHub, LinkedIn, and personal portfolio sites. Get noticed, get hired!',
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
        description: 'Learn from industry experts from Google, Amazon, Microsoft, and top startups.',
        gradient: 'from-[#435663] to-[#435663]',
      },
    ],
    projects: [
      {
        title: 'E-Commerce Platform',
        description: 'A full-featured e-commerce platform with user authentication, product catalog, shopping cart, and payment integration.',
      },
      {
        title: 'Social Media Dashboard',
        description: 'A real-time social media dashboard with user profiles, posts, comments, and notifications using WebSockets.',
      },
      {
        title: 'Task Management System',
        description: 'A collaborative task management system with team workspaces, project boards, and real-time updates.',
      },
    ],
    skills: [
      { name: 'React', icon: 'Code2' },
      { name: 'Node.js', icon: 'Server' },
      { name: 'MongoDB', icon: 'Database' },
      { name: 'Express', icon: 'Network' },
      { name: 'TypeScript', icon: 'Code2' },
      { name: 'GitHub', icon: 'GitBranch' },
      { name: 'AWS', icon: 'Cloud' },
      { name: 'RESTful APIs', icon: 'Globe' },
      { name: 'GraphQL', icon: 'Network' },
      { name: 'Docker', icon: 'Box' },
      { name: 'CI/CD', icon: 'Zap' },
      { name: 'Testing', icon: 'FileCheck' },
    ],
    curriculum: [
      {
        week: 1,
        title: 'Introduction to Web Development',
        lessons: [
          { title: 'Course Overview', duration: '15 min', type: 'video' },
          { title: 'Setting Up Your Environment', duration: '20 min', type: 'video' },
          { title: 'HTML & CSS Basics', duration: '45 min', type: 'video' },
        ],
      },
      {
        week: 2,
        title: 'JavaScript Fundamentals',
        lessons: [
          { title: 'Variables and Data Types', duration: '30 min', type: 'video' },
          { title: 'Functions and Scope', duration: '35 min', type: 'video' },
          { title: 'Arrays and Objects', duration: '40 min', type: 'video' },
        ],
      },
    ],
    tags: ['React', 'Node.js', 'MongoDB', 'JavaScript'],
    isPopular: true,
  },
  {
    id: '2',
    slug: 'data-science-mastery',
    title: 'Data Science Mastery',
    description: 'Learn Python, pandas, machine learning, and data visualization. Become a data scientist in 16 weeks.',
    longDescription: 'This intensive course covers everything you need to become a data scientist. From Python programming to advanced machine learning algorithms, you\'ll work with real datasets and build predictive models.',
    instructor: {
      name: 'Dr. Sarah Williams',
      role: 'Lead Data Scientist',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200',
      bio: 'Sarah holds a PhD in Statistics and has led data science teams at Fortune 500 companies.',
    },
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    category: 'Data Science',
    level: 'Intermediate',
    duration: '16 weeks',
    price: 32999,
    originalPrice: 49999,
    rating: 4.9,
    reviews: 892,
    students: 9876,
    language: 'English',
    features: [
      '60+ hours of video content',
      '15+ hands-on projects',
      'Real-world datasets',
      'Jupyter notebooks included',
      'Career guidance',
    ],
    bulletPoints: [
      'Become an Industry-Ready Data Scientist in 6-12 Months',
      'Live Online sessions + mentorship from industry-experts.',
      'Resume building, mock interviews, assignment reviews, and 1:1 placement coaching.',
      'Hands-on with Python, TensorFlow, PyTorch, Power BI, SQL, GitHub, AWS, and more',
      'Case studies/Projects from e-commerce, finance, healthcare, and AI product companies.',
    ],
    brochureDownloadLink: 'https://example.com/brochures/data-science-mastery.pdf',
    noCostEMIAmount: 'from INR 6,148*',
    admissionDeadlineDate: '15-Dec-2025',
    whoCanApply: [
      'Graduates eager to launch a career in Data Science & Analytics',
      'Working professionals seeking growth in data-driven roles',
      'Software / IT professionals aiming to transition into Data Scientist positions',
      'Career switchers looking to enter the data, AI, and analytics industry',
      'Learners who want to build real-world data science projects and a job-ready portfolio',
    ],
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
    projects: [
      {
        title: 'Customer Churn Prediction',
        description: 'Build a machine learning model to predict customer churn using real telecom company data with feature engineering and model optimization.',
      },
      {
        title: 'Sales Forecasting Dashboard',
        description: 'Create an interactive dashboard for sales forecasting using time series analysis and Power BI visualization.',
      },
      {
        title: 'Sentiment Analysis System',
        description: 'Develop a sentiment analysis system for product reviews using NLP techniques and deep learning models.',
      },
    ],
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
    curriculum: [
      {
        week: 1,
        title: 'Python for Data Science',
        lessons: [
          { title: 'Python Basics', duration: '30 min', type: 'video' },
          { title: 'NumPy and Pandas', duration: '45 min', type: 'video' },
          { title: 'Data Cleaning', duration: '40 min', type: 'video' },
        ],
      },
    ],
    tags: ['Python', 'Machine Learning', 'Pandas', 'Data Visualization'],
    isPopular: true,
  },
  {
    id: '3',
    slug: 'ux-ui-design-bootcamp',
    title: 'UX/UI Design Bootcamp',
    description: 'Master user experience and interface design. Learn Figma, design systems, and user research methods.',
    longDescription: 'This bootcamp teaches you everything about UX/UI design. From user research to prototyping, you\'ll learn industry-standard tools and methodologies used by top design teams.',
    instructor: {
      name: 'Emily Chen',
      role: 'Senior UX Designer',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
      bio: 'Emily has designed products for companies like Apple and Airbnb. She specializes in user-centered design.',
    },
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
    category: 'Design',
    level: 'Beginner',
    duration: '10 weeks',
    price: 28999,
    originalPrice: 44999,
    rating: 4.7,
    reviews: 634,
    students: 7654,
    language: 'English',
    features: [
      '40+ hours of video content',
      '8+ design projects',
      'Figma files included',
      'Design system templates',
      'Portfolio review',
    ],
    bulletPoints: [
      'Become an Industry-Ready UX/UI Designer in 6-12 Months',
      'Live Online sessions + mentorship from industry-experts.',
      'Resume building, mock interviews, portfolio reviews, and 1:1 placement coaching.',
      'Hands-on with Figma, Adobe XD, Sketch, Prototyping tools, and Design Systems',
      'Case studies/Projects from fintech, healthcare, e-commerce, and SaaS companies.',
    ],
    brochureDownloadLink: 'https://example.com/brochures/ux-ui-design-bootcamp.pdf',
    noCostEMIAmount: 'from INR 5,499*',
    admissionDeadlineDate: '20-Jan-2026',
    whoCanApply: [
      'Graduates eager to launch a career in UX/UI design',
      'Working professionals seeking growth in design fields',
      'Graphic designers wanting to transition into UX/UI',
      'Product managers aiming to understand user-centered design',
      'Learners who want to build real design projects and a job-ready portfolio',
    ],
    programHighlights: [
      {
        icon: 'TrendingUp',
        title: 'Learning paths',
        description: 'Go slow with up to 6 additional months of handholding, or get your diploma as quickly as 10 months.',
        gradient: 'from-[#84994F] to-[#84994F]',
      },
      {
        icon: 'Code2',
        title: '20+ design projects',
        description: 'Learn by doing real UX/UI design projects for fintech apps, healthcare platforms, e-commerce sites & more!',
        gradient: 'from-[#435663] to-[#435663]',
      },
      {
        icon: 'Target',
        title: 'Capstone Project',
        description: 'Bring a real business problem from your office or dream company, solve it with expert design mentors.',
        gradient: 'from-[#84994F] to-[#84994F]',
      },
      {
        icon: 'FileCheck',
        title: 'A Standout Portfolio',
        description: 'Get help showcasing your designs on Behance, Dribbble, and LinkedIn. Get noticed, get hired!',
        gradient: 'from-[#435663] to-[#435663]',
      },
      {
        icon: 'Briefcase',
        title: 'Complete Career Support',
        description: 'Crack dream jobs with our interview prep, portfolio reviews, personalized coaching and presentation skills.',
        gradient: 'from-[#84994F] to-[#84994F]',
      },
      {
        icon: 'GraduationCap',
        title: 'Top Faculty',
        description: 'Learn from design leaders from Apple, Airbnb, Google, and top design agencies.',
        gradient: 'from-[#435663] to-[#435663]',
      },
    ],
    projects: [
      {
        title: 'Mobile Banking App',
        description: 'Design a complete mobile banking application with user research, wireframes, prototypes, and design system.',
      },
      {
        title: 'E-Commerce Website',
        description: 'Create a responsive e-commerce website design with checkout flow, product pages, and user dashboard.',
      },
      {
        title: 'Healthcare Platform',
        description: 'Design a healthcare platform for patient management with accessibility features and intuitive navigation.',
      },
    ],
    skills: [
      { name: 'Figma', icon: 'Palette' },
      { name: 'Adobe XD', icon: 'Palette' },
      { name: 'Sketch', icon: 'Palette' },
      { name: 'Prototyping', icon: 'Layers' },
      { name: 'User Research', icon: 'Search' },
      { name: 'Wireframing', icon: 'FileText' },
      { name: 'Design Systems', icon: 'Package' },
      { name: 'UI Design', icon: 'Palette' },
      { name: 'UX Design', icon: 'Target' },
      { name: 'Interaction Design', icon: 'Zap' },
      { name: 'Usability Testing', icon: 'FileCheck' },
      { name: 'Design Thinking', icon: 'Target' },
    ],
    curriculum: [
      {
        week: 1,
        title: 'Introduction to UX/UI Design',
        lessons: [
          { title: 'Design Principles', duration: '25 min', type: 'video' },
          { title: 'User Research Basics', duration: '30 min', type: 'video' },
          { title: 'Getting Started with Figma', duration: '35 min', type: 'video' },
        ],
      },
    ],
    tags: ['Figma', 'UX Design', 'UI Design', 'Prototyping'],
    isNew: true,
  },
  {
    id: '4',
    slug: 'cloud-computing-aws',
    title: 'Cloud Computing with AWS',
    description: 'Master Amazon Web Services. Learn EC2, S3, Lambda, and more. Get AWS certified.',
    longDescription: 'This course prepares you for AWS certification while teaching you practical cloud computing skills. You\'ll deploy applications, manage infrastructure, and optimize costs.',
    instructor: {
      name: 'Michael Johnson',
      role: 'Cloud Solutions Architect',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
      bio: 'Michael is an AWS-certified solutions architect with 8+ years of cloud infrastructure experience.',
    },
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
    category: 'Cloud Computing',
    level: 'Intermediate',
    duration: '14 weeks',
    price: 31999,
    originalPrice: 47999,
    rating: 4.6,
    reviews: 456,
    students: 5432,
    language: 'English',
    features: [
      '55+ hours of video content',
      '12+ hands-on labs',
      'AWS free tier access',
      'Practice exams included',
      'Certification prep',
    ],
    bulletPoints: [
      'Become an Industry-Ready Cloud Engineer in 6-12 Months',
      'Live Online sessions + mentorship from industry-experts.',
      'Resume building, mock interviews, assignment reviews, and 1:1 placement coaching.',
      'Hands-on with AWS, Docker, Kubernetes, Terraform, CI/CD, and more',
      'Case studies/Projects from enterprise infrastructure, DevOps, and cloud migration scenarios.',
    ],
    brochureDownloadLink: 'https://example.com/brochures/cloud-computing-aws.pdf',
    noCostEMIAmount: 'from INR 6,299*',
    admissionDeadlineDate: '25-Jan-2026',
    whoCanApply: [
      'Graduates eager to launch a career in cloud computing',
      'Working professionals seeking growth in DevOps and cloud infrastructure',
      'System administrators wanting to transition into cloud engineering',
      'Developers aiming to master cloud deployment and scaling',
      'Learners who want to build real cloud infrastructure projects and get AWS certified',
    ],
    programHighlights: [
      {
        icon: 'TrendingUp',
        title: 'Learning paths',
        description: 'Go slow with up to 6 additional months of handholding, or get your diploma as quickly as 12 months.',
        gradient: 'from-[#84994F] to-[#84994F]',
      },
      {
        icon: 'Code2',
        title: '15+ hands-on labs',
        description: 'Learn by doing real AWS projects: deploying applications, managing infrastructure, optimizing costs & more!',
        gradient: 'from-[#435663] to-[#435663]',
      },
      {
        icon: 'Target',
        title: 'Capstone Project',
        description: 'Build a production-ready cloud infrastructure project with expert guidance and best practices.',
        gradient: 'from-[#84994F] to-[#84994F]',
      },
      {
        icon: 'FileCheck',
        title: 'AWS Certification Prep',
        description: 'Get prepared for AWS certifications with practice exams, mock tests, and certification guidance.',
        gradient: 'from-[#435663] to-[#435663]',
      },
      {
        icon: 'Briefcase',
        title: 'Complete Career Support',
        description: 'Crack dream jobs with our interview prep, resume building, personalized coaching and cloud architecture skills.',
        gradient: 'from-[#84994F] to-[#84994F]',
      },
      {
        icon: 'GraduationCap',
        title: 'Top Faculty',
        description: 'Learn from AWS-certified solutions architects and cloud engineers from top tech companies.',
        gradient: 'from-[#435663] to-[#435663]',
      },
    ],
    projects: [
      {
        title: 'Multi-Tier Web Application',
        description: 'Deploy a scalable multi-tier web application on AWS using EC2, RDS, S3, and CloudFront with auto-scaling.',
      },
      {
        title: 'Serverless Architecture',
        description: 'Build a serverless application using Lambda, API Gateway, DynamoDB, and S3 with CI/CD pipeline.',
      },
      {
        title: 'Containerized Microservices',
        description: 'Deploy containerized microservices using ECS, ECR, and Application Load Balancer with monitoring.',
      },
    ],
    skills: [
      { name: 'AWS', icon: 'Cloud' },
      { name: 'Docker', icon: 'Box' },
      { name: 'Kubernetes', icon: 'Server' },
      { name: 'Terraform', icon: 'Settings' },
      { name: 'CI/CD', icon: 'Zap' },
      { name: 'Linux', icon: 'Terminal' },
      { name: 'Networking', icon: 'Network' },
      { name: 'DevOps', icon: 'Settings' },
      { name: 'Cloud Architecture', icon: 'Layers' },
      { name: 'Infrastructure as Code', icon: 'Code2' },
      { name: 'Monitoring', icon: 'BarChart3' },
      { name: 'Security', icon: 'Shield' },
    ],
    curriculum: [
      {
        week: 1,
        title: 'AWS Fundamentals',
        lessons: [
          { title: 'Introduction to Cloud Computing', duration: '20 min', type: 'video' },
          { title: 'AWS Console Overview', duration: '25 min', type: 'video' },
          { title: 'EC2 Basics', duration: '40 min', type: 'video' },
        ],
      },
    ],
    tags: ['AWS', 'Cloud Computing', 'DevOps', 'Infrastructure'],
  },
  {
    id: '5',
    slug: 'mobile-app-development',
    title: 'Mobile App Development',
    description: 'Build iOS and Android apps with React Native. Create cross-platform mobile applications.',
    longDescription: 'Learn to build native mobile apps for both iOS and Android using React Native. You\'ll create multiple apps and learn to publish them to app stores.',
    instructor: {
      name: 'David Kim',
      role: 'Mobile App Developer',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
      bio: 'David has built 20+ mobile apps with millions of downloads. He specializes in React Native.',
    },
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800',
    category: 'Mobile Development',
    level: 'Intermediate',
    duration: '11 weeks',
    price: 27999,
    originalPrice: 43999,
    rating: 4.8,
    reviews: 723,
    students: 8765,
    language: 'English',
    features: [
      '45+ hours of video content',
      '6+ mobile app projects',
      'App store publishing guide',
      'React Native best practices',
      'State management',
    ],
    bulletPoints: [
      'Become an Industry-Ready Mobile App Developer in 6-12 Months',
      'Live Online sessions + mentorship from industry-experts.',
      'Resume building, mock interviews, assignment reviews, and 1:1 placement coaching.',
      'Hands-on with React Native, iOS, Android, Firebase, App Store deployment, and more',
      'Case studies/Projects from social media, e-commerce, fintech, and productivity apps.',
    ],
    brochureDownloadLink: 'https://example.com/brochures/mobile-app-development.pdf',
    noCostEMIAmount: 'from INR 5,799*',
    admissionDeadlineDate: '30-Jan-2026',
    whoCanApply: [
      'Graduates eager to launch a career in mobile app development',
      'Working professionals seeking growth in mobile development',
      'Web developers wanting to transition into mobile app development',
      'Entrepreneurs aiming to build their own mobile apps',
      'Learners who want to build real mobile applications and publish to app stores',
    ],
    programHighlights: [
      {
        icon: 'TrendingUp',
        title: 'Learning paths',
        description: 'Go slow with up to 6 additional months of handholding, or get your diploma as quickly as 10 months.',
        gradient: 'from-[#84994F] to-[#84994F]',
      },
      {
        icon: 'Code2',
        title: '12+ mobile apps',
        description: 'Learn by building real mobile apps: social media apps, e-commerce apps, productivity tools & more!',
        gradient: 'from-[#435663] to-[#435663]',
      },
      {
        icon: 'Target',
        title: 'Capstone Project',
        description: 'Build a complete mobile app from scratch and publish it to App Store and Google Play Store.',
        gradient: 'from-[#84994F] to-[#84994F]',
      },
      {
        icon: 'FileCheck',
        title: 'App Store Publishing',
        description: 'Get guidance on publishing your apps to iOS App Store and Google Play Store with best practices.',
        gradient: 'from-[#435663] to-[#435663]',
      },
      {
        icon: 'Briefcase',
        title: 'Complete Career Support',
        description: 'Crack dream jobs with our interview prep, resume building, personalized coaching and mobile development skills.',
        gradient: 'from-[#84994F] to-[#84994F]',
      },
      {
        icon: 'GraduationCap',
        title: 'Top Faculty',
        description: 'Learn from mobile app developers who have built apps with millions of downloads.',
        gradient: 'from-[#435663] to-[#435663]',
      },
    ],
    projects: [
      {
        title: 'Social Media App',
        description: 'Build a complete social media app with user profiles, posts, comments, likes, and real-time updates.',
      },
      {
        title: 'E-Commerce Mobile App',
        description: 'Create a full-featured e-commerce mobile app with product catalog, cart, checkout, and payment integration.',
      },
      {
        title: 'Fitness Tracking App',
        description: 'Develop a fitness tracking app with workout plans, progress tracking, and social features.',
      },
    ],
    skills: [
      { name: 'React Native', icon: 'Smartphone' },
      { name: 'iOS Development', icon: 'Smartphone' },
      { name: 'Android Development', icon: 'Smartphone' },
      { name: 'Firebase', icon: 'Cloud' },
      { name: 'Redux', icon: 'Package' },
      { name: 'API Integration', icon: 'Globe' },
      { name: 'App Store Deployment', icon: 'Box' },
      { name: 'Mobile UI/UX', icon: 'Palette' },
      { name: 'State Management', icon: 'Settings' },
      { name: 'Navigation', icon: 'Network' },
      { name: 'Push Notifications', icon: 'MessageSquare' },
      { name: 'Performance Optimization', icon: 'Zap' },
    ],
    curriculum: [
      {
        week: 1,
        title: 'React Native Basics',
        lessons: [
          { title: 'Setting Up React Native', duration: '30 min', type: 'video' },
          { title: 'Components and Props', duration: '35 min', type: 'video' },
          { title: 'Navigation', duration: '40 min', type: 'video' },
        ],
      },
    ],
    tags: ['React Native', 'iOS', 'Android', 'Mobile Development'],
  },
  {
    id: '6',
    slug: 'digital-marketing-mastery',
    title: 'Digital Marketing Mastery',
    description: 'Master SEO, social media, content marketing, and analytics. Grow businesses online.',
    longDescription: 'This comprehensive course covers all aspects of digital marketing. From SEO to paid advertising, you\'ll learn strategies that drive real results.',
    instructor: {
      name: 'Lisa Anderson',
      role: 'Digital Marketing Director',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
      bio: 'Lisa has grown multiple businesses from zero to millions in revenue using digital marketing.',
    },
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    category: 'Marketing',
    level: 'Beginner',
    duration: '9 weeks',
    price: 22999,
    originalPrice: 39999,
    rating: 4.5,
    reviews: 567,
    students: 6543,
    language: 'English',
    features: [
      '35+ hours of video content',
      '5+ marketing campaigns',
      'Analytics tools training',
      'SEO optimization guide',
      'Social media strategies',
    ],
    bulletPoints: [
      'Become an Industry-Ready Digital Marketer in 6-12 Months',
      'Live Online sessions + mentorship from industry-experts.',
      'Resume building, mock interviews, campaign reviews, and 1:1 placement coaching.',
      'Hands-on with SEO, Google Ads, Facebook Ads, Analytics, Content Marketing, and more',
      'Case studies/Projects from e-commerce, SaaS, B2B, and consumer brands.',
    ],
    brochureDownloadLink: 'https://example.com/brochures/digital-marketing-mastery.pdf',
    noCostEMIAmount: 'from INR 4,999*',
    admissionDeadlineDate: '10-Feb-2026',
    whoCanApply: [
      'Graduates eager to launch a career in digital marketing',
      'Working professionals seeking growth in marketing and growth roles',
      'Traditional marketers wanting to transition into digital marketing',
      'Business owners aiming to grow their online presence',
      'Learners who want to run real marketing campaigns and build a portfolio',
    ],
    programHighlights: [
      {
        icon: 'TrendingUp',
        title: 'Learning paths',
        description: 'Go slow with up to 6 additional months of handholding, or get your diploma as quickly as 9 months.',
        gradient: 'from-[#84994F] to-[#84994F]',
      },
      {
        icon: 'Code2',
        title: '10+ marketing campaigns',
        description: 'Learn by running real marketing campaigns: SEO, Google Ads, Facebook Ads, content marketing & more!',
        gradient: 'from-[#435663] to-[#435663]',
      },
      {
        icon: 'Target',
        title: 'Capstone Project',
        description: 'Run a complete marketing campaign for a real business and measure ROI with expert guidance.',
        gradient: 'from-[#84994F] to-[#84994F]',
      },
      {
        icon: 'FileCheck',
        title: 'Certification Prep',
        description: 'Get prepared for Google Ads, Facebook Blueprint, and HubSpot certifications.',
        gradient: 'from-[#435663] to-[#435663]',
      },
      {
        icon: 'Briefcase',
        title: 'Complete Career Support',
        description: 'Crack dream jobs with our interview prep, portfolio building, personalized coaching and marketing skills.',
        gradient: 'from-[#84994F] to-[#84994F]',
      },
      {
        icon: 'GraduationCap',
        title: 'Top Faculty',
        description: 'Learn from marketing directors and growth experts who have scaled businesses to millions in revenue.',
        gradient: 'from-[#435663] to-[#435663]',
      },
    ],
    projects: [
      {
        title: 'SEO Optimization Campaign',
        description: 'Run a complete SEO campaign including keyword research, on-page optimization, and link building strategies.',
      },
      {
        title: 'Google Ads Campaign',
        description: 'Create and manage a Google Ads campaign with budget optimization, A/B testing, and conversion tracking.',
      },
      {
        title: 'Social Media Strategy',
        description: 'Develop a comprehensive social media marketing strategy with content calendar and engagement tactics.',
      },
    ],
    skills: [
      { name: 'SEO', icon: 'Search' },
      { name: 'Google Ads', icon: 'TrendingUp' },
      { name: 'Facebook Ads', icon: 'MessageSquare' },
      { name: 'Content Marketing', icon: 'FileText' },
      { name: 'Analytics', icon: 'BarChart3' },
      { name: 'Email Marketing', icon: 'Mail' },
      { name: 'Social Media Marketing', icon: 'MessageSquare' },
      { name: 'PPC', icon: 'TrendingUp' },
      { name: 'SEM', icon: 'Search' },
      { name: 'Marketing Automation', icon: 'Zap' },
      { name: 'Conversion Optimization', icon: 'Target' },
      { name: 'Growth Hacking', icon: 'Zap' },
    ],
    curriculum: [
      {
        week: 1,
        title: 'Introduction to Digital Marketing',
        lessons: [
          { title: 'Marketing Fundamentals', duration: '25 min', type: 'video' },
          { title: 'SEO Basics', duration: '30 min', type: 'video' },
          { title: 'Content Marketing', duration: '35 min', type: 'video' },
        ],
      },
    ],
    tags: ['SEO', 'Social Media', 'Content Marketing', 'Analytics'],
  },
  {
    id: '7',
    slug: 'generative-ai',
    title: 'Generative AI',
    description: 'Build applications using LLMs, prompt engineering, and Gen AI frameworks.',
    longDescription: 'Master the cutting-edge field of Generative AI. Learn to build applications using Large Language Models, prompt engineering techniques, and Gen AI frameworks. Create intelligent systems that can generate text, images, and more.',
    instructor: {
      name: 'Dr. Alex Chen',
      role: 'AI Research Scientist',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
      bio: 'Alex is a leading researcher in AI with publications in top-tier conferences and experience at leading tech companies.',
    },
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
    category: 'AI & Machine Learning',
    level: 'Intermediate',
    duration: '14 weeks',
    price: 34999,
    originalPrice: 52999,
    rating: 4.9,
    reviews: 456,
    students: 5432,
    language: 'English',
    features: [
      '50+ hours of video content',
      '15+ hands-on projects',
      'LLM integration guides',
      'Prompt engineering masterclass',
      'Career support',
    ],
    bulletPoints: [
      'Master Generative AI and LLM technologies',
      'Learn prompt engineering and fine-tuning',
      'Build real-world Gen AI applications',
      'Hands-on with OpenAI, Hugging Face, and more',
      'Industry projects and case studies',
    ],
    curriculum: [
      {
        week: 1,
        title: 'Introduction to Generative AI',
        lessons: [
          { title: 'What is Generative AI?', duration: '30 min', type: 'video' },
          { title: 'LLMs Overview', duration: '35 min', type: 'video' },
          { title: 'Getting Started', duration: '25 min', type: 'video' },
        ],
      },
    ],
    tags: ['AI', 'Machine Learning', 'LLM', 'Generative AI'],
  },
  {
    id: '8',
    slug: 'devops-cicd',
    title: 'DevOps & CI/CD',
    description: 'Jenkins, Docker, Kubernetes, and continuous deployment practices.',
    longDescription: 'Learn DevOps practices and CI/CD pipelines. Master Jenkins, Docker, Kubernetes, and continuous deployment to streamline software delivery and infrastructure management.',
    instructor: {
      name: 'Mike Rodriguez',
      role: 'DevOps Engineer',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
      bio: 'Mike has 8+ years of experience in DevOps and has helped scale infrastructure for multiple startups.',
    },
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
    category: 'DevOps',
    level: 'Intermediate',
    duration: '12 weeks',
    price: 29999,
    originalPrice: 45999,
    rating: 4.7,
    reviews: 623,
    students: 7654,
    language: 'English',
    features: [
      '45+ hours of video content',
      '10+ hands-on labs',
      'Docker & Kubernetes mastery',
      'CI/CD pipeline setup',
      'Career support',
    ],
    bulletPoints: [
      'Master DevOps tools and practices',
      'Learn Jenkins, Docker, Kubernetes',
      'Build CI/CD pipelines',
      'Infrastructure as Code',
      'Real-world deployment scenarios',
    ],
    curriculum: [
      {
        week: 1,
        title: 'Introduction to DevOps',
        lessons: [
          { title: 'DevOps Fundamentals', duration: '30 min', type: 'video' },
          { title: 'Docker Basics', duration: '40 min', type: 'video' },
          { title: 'Container Orchestration', duration: '35 min', type: 'video' },
        ],
      },
    ],
    tags: ['DevOps', 'CI/CD', 'Docker', 'Kubernetes', 'Jenkins'],
  },
  {
    id: '9',
    slug: 'web-fundamentals',
    title: 'Web Fundamentals',
    description: 'HTML, CSS, & JavaScript. Foundation building blocks for web careers.',
    longDescription: 'Build a solid foundation in web development with HTML, CSS, and JavaScript. Perfect for beginners who want to start their web development journey.',
    instructor: {
      name: 'Sarah Johnson',
      role: 'Frontend Developer',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
      bio: 'Sarah has taught web development to thousands of students and specializes in making complex concepts simple.',
    },
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800',
    category: 'Web Development',
    level: 'Beginner',
    duration: '8 weeks',
    price: 19999,
    originalPrice: 34999,
    rating: 4.6,
    reviews: 892,
    students: 12345,
    language: 'English',
    features: [
      '30+ hours of video content',
      '5+ practical projects',
      'HTML & CSS mastery',
      'JavaScript fundamentals',
      'Certificate of completion',
    ],
    bulletPoints: [
      'Learn HTML, CSS, and JavaScript from scratch',
      'Build responsive websites',
      'Interactive web pages',
      'Foundation for advanced web development',
      'Hands-on projects and exercises',
    ],
    curriculum: [
      {
        week: 1,
        title: 'HTML Basics',
        lessons: [
          { title: 'HTML Structure', duration: '25 min', type: 'video' },
          { title: 'HTML Elements', duration: '30 min', type: 'video' },
          { title: 'Forms and Inputs', duration: '35 min', type: 'video' },
        ],
      },
    ],
    tags: ['HTML', 'CSS', 'JavaScript', 'Web Development'],
  },
  {
    id: '10',
    slug: 'sql-databases',
    title: 'SQL & Databases',
    description: 'Essential skills for data analysis, query optimization and backend development.',
    longDescription: 'Master SQL and database management. Learn to design databases, write efficient queries, and optimize database performance for both data analysis and backend development.',
    instructor: {
      name: 'David Kim',
      role: 'Database Architect',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
      bio: 'David has designed and optimized databases for enterprise applications serving millions of users.',
    },
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800',
    category: 'Database',
    level: 'Beginner',
    duration: '10 weeks',
    price: 22999,
    originalPrice: 38999,
    rating: 4.8,
    reviews: 567,
    students: 8765,
    language: 'English',
    features: [
      '35+ hours of video content',
      '8+ database projects',
      'SQL mastery',
      'Database design principles',
      'Query optimization',
    ],
    bulletPoints: [
      'Master SQL queries and database design',
      'Learn MySQL, PostgreSQL, and MongoDB',
      'Query optimization techniques',
      'Database administration',
      'Real-world database projects',
    ],
    curriculum: [
      {
        week: 1,
        title: 'SQL Fundamentals',
        lessons: [
          { title: 'Introduction to Databases', duration: '25 min', type: 'video' },
          { title: 'SQL Basics', duration: '35 min', type: 'video' },
          { title: 'SELECT Queries', duration: '30 min', type: 'video' },
        ],
      },
    ],
    tags: ['SQL', 'Database', 'MySQL', 'PostgreSQL', 'MongoDB'],
  },
  {
    id: '11',
    slug: 'python-fundamentals',
    title: 'Advanced Professional Python Course',
    description: 'Core programming and scripting for automation and data handling.',
    longDescription: 'Learn Python programming from scratch. Master core concepts, data structures, and scripting for automation and data handling. Perfect foundation for data science and web development.',
    instructor: {
      name: 'Emily Chen',
      role: 'Python Developer',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
      bio: 'Emily has been teaching Python for 5+ years and has helped thousands of students start their programming journey.',
    },
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf95e?w=800',
    category: 'Programming',
    level: 'Beginner',
    duration: '16 weeks',
    price: 18999,
    originalPrice: 32999,
    rating: 4.7,
    reviews: 1234,
    students: 15234,
    language: 'English',
    features: [
      '40+ hours of video content',
      '10+ coding projects',
      'Python basics to advanced',
      'Automation scripts',
      'Certificate of completion',
    ],
    bulletPoints: [
      'Become an Industry-Ready Python Professional in 4 Months,
      'Live Online sessions + mentorship from industry-experts',
      'Resume building, mock interviews, assignment reviews, and 1:1 placement coaching',
      'Hands-on with Python logic, data structures, OOP, FastAPI/Flask, and real projects,
      'Case studies/Projects based on e-commerce, fintech, social media, and SaaS companies',
    ],
    curriculum: [
      {
        week: 1,
        title: 'Python Basics',
        lessons: [
          { title: 'Introduction to Python', duration: '20 min', type: 'video' },
          { title: 'Variables and Data Types', duration: '30 min', type: 'video' },
          { title: 'Control Flow', duration: '35 min', type: 'video' },
        ],
      },
    ],
    tags: ['Python', 'Programming', 'Automation', 'Scripting'],
  },
  {
    id: '12',
    slug: 'java-spring-boot',
    title: 'Java & Spring Boot',
    description: 'Enterprise application development and object-oriented design.',
    longDescription: 'Master Java and Spring Boot for building enterprise-grade applications. Learn object-oriented programming, Spring framework, and microservices architecture.',
    instructor: {
      name: 'Robert Wilson',
      role: 'Java Architect',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
      bio: 'Robert has 12+ years of experience building enterprise Java applications for Fortune 500 companies.',
    },
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
    category: 'Programming',
    level: 'Intermediate',
    duration: '14 weeks',
    price: 31999,
    originalPrice: 47999,
    rating: 4.8,
    reviews: 789,
    students: 9876,
    language: 'English',
    features: [
      '55+ hours of video content',
      '12+ enterprise projects',
      'Spring Boot mastery',
      'Microservices architecture',
      'Career support',
    ],
    bulletPoints: [
      'Master Java and Spring Boot',
      'Build enterprise applications',
      'Learn microservices architecture',
      'RESTful API development',
      'Real-world enterprise projects',
    ],
    curriculum: [
      {
        week: 1,
        title: 'Java Fundamentals',
        lessons: [
          { title: 'Java Basics', duration: '30 min', type: 'video' },
          { title: 'Object-Oriented Programming', duration: '40 min', type: 'video' },
          { title: 'Spring Framework Introduction', duration: '35 min', type: 'video' },
        ],
      },
    ],
    tags: ['Java', 'Spring Boot', 'Enterprise', 'Microservices'],
  },
  {
    id: '13',
    slug: 'excel-mastery',
    title: 'Excel Mastery',
    description: 'Advanced analysis, pivots, and automation with VBA for business.',
    longDescription: 'Master Excel for business analysis. Learn advanced formulas, pivot tables, data visualization, and VBA automation to become a data analysis expert.',
    instructor: {
      name: 'Lisa Anderson',
      role: 'Business Analyst',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
      bio: 'Lisa has used Excel to analyze data for major corporations and has trained hundreds of professionals.',
    },
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    category: 'Business',
    level: 'Beginner',
    duration: '8 weeks',
    price: 14999,
    originalPrice: 27999,
    rating: 4.6,
    reviews: 456,
    students: 6543,
    language: 'English',
    features: [
      '25+ hours of video content',
      '6+ business projects',
      'Advanced Excel formulas',
      'VBA automation',
      'Certificate of completion',
    ],
    bulletPoints: [
      'Master Excel for business analysis',
      'Advanced formulas and functions',
      'Pivot tables and data visualization',
      'VBA automation',
      'Real-world business scenarios',
    ],
    curriculum: [
      {
        week: 1,
        title: 'Excel Basics',
        lessons: [
          { title: 'Excel Interface', duration: '20 min', type: 'video' },
          { title: 'Basic Formulas', duration: '30 min', type: 'video' },
          { title: 'Data Entry and Formatting', duration: '25 min', type: 'video' },
        ],
      },
    ],
    tags: ['Excel', 'Business', 'Data Analysis', 'VBA'],
  },
  {
    id: '14',
    slug: 'artificial-intelligence',
    title: 'Artificial Intelligence',
    description: 'Deep learning and computer vision specialization.',
    longDescription: 'Dive deep into Artificial Intelligence. Learn deep learning, neural networks, computer vision, and natural language processing to build intelligent systems.',
    instructor: {
      name: 'Dr. James Park',
      role: 'AI Researcher',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
      bio: 'Dr. Park holds a PhD in Computer Science and has published research in top AI conferences.',
    },
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
    category: 'AI & Machine Learning',
    level: 'Advanced',
    duration: '16 weeks',
    price: 39999,
    originalPrice: 59999,
    rating: 4.9,
    reviews: 345,
    students: 4321,
    language: 'English',
    features: [
      '60+ hours of video content',
      '15+ AI projects',
      'Deep learning frameworks',
      'Computer vision projects',
      'Career support',
    ],
    bulletPoints: [
      'Master AI and deep learning',
      'Neural networks and CNNs',
      'Computer vision applications',
      'Natural language processing',
      'Industry-grade AI projects',
    ],
    curriculum: [
      {
        week: 1,
        title: 'Introduction to AI',
        lessons: [
          { title: 'AI Fundamentals', duration: '30 min', type: 'video' },
          { title: 'Machine Learning Basics', duration: '35 min', type: 'video' },
          { title: 'Neural Networks Introduction', duration: '40 min', type: 'video' },
        ],
      },
    ],
    tags: ['AI', 'Deep Learning', 'Neural Networks', 'Computer Vision'],
  },
  {
    id: '15',
    slug: 'mathematics',
    title: 'Mathematics',
    description: 'Algebra, Calculus, Geometry',
    longDescription: 'Master mathematics fundamentals including algebra, calculus, and geometry. Perfect for students looking to strengthen their mathematical foundation and excel in exams.',
    instructor: {
      name: 'Prof. Michael Brown',
      role: 'Mathematics Educator',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
      bio: 'Prof. Brown has 15+ years of experience teaching mathematics and has helped thousands of students achieve academic excellence.',
    },
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800',
    category: 'School',
    level: 'Beginner',
    duration: '12 weeks',
    price: 9999,
    originalPrice: 17999,
    rating: 4.8,
    reviews: 567,
    students: 8765,
    language: 'English',
    features: [
      '30+ hours of video content',
      'Practice problems and solutions',
      'Exam preparation',
      'Interactive learning',
      'Certificate of completion',
    ],
    bulletPoints: [
      'Master algebra, calculus, and geometry',
      'Step-by-step problem solving',
      'Exam preparation strategies',
      'Interactive practice sessions',
      'Personalized mentorship',
    ],
    curriculum: [
      {
        week: 1,
        title: 'Algebra Fundamentals',
        lessons: [
          { title: 'Introduction to Algebra', duration: '25 min', type: 'video' },
          { title: 'Linear Equations', duration: '30 min', type: 'video' },
          { title: 'Quadratic Equations', duration: '35 min', type: 'video' },
        ],
      },
    ],
    tags: ['Mathematics', 'Algebra', 'Calculus', 'Geometry'],
  },
  {
    id: '16',
    slug: 'physics',
    title: 'Physics',
    description: 'Mechanics, Optics, Modern Physics',
    longDescription: 'Learn physics from mechanics to modern physics. Understand fundamental concepts, solve complex problems, and excel in physics exams with expert guidance.',
    instructor: {
      name: 'Dr. Sarah Martinez',
      role: 'Physics Professor',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
      bio: 'Dr. Martinez holds a PhD in Physics and has been teaching for over 12 years at top institutions.',
    },
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800',
    category: 'School',
    level: 'Beginner',
    duration: '14 weeks',
    price: 10999,
    originalPrice: 18999,
    rating: 4.7,
    reviews: 432,
    students: 6543,
    language: 'English',
    features: [
      '35+ hours of video content',
      'Physics problem solving',
      'Lab demonstrations',
      'Exam preparation',
      'Certificate of completion',
    ],
    bulletPoints: [
      'Master mechanics, optics, and modern physics',
      'Problem-solving techniques',
      'Visual demonstrations',
      'Exam preparation',
      'Expert mentorship',
    ],
    curriculum: [
      {
        week: 1,
        title: 'Mechanics Basics',
        lessons: [
          { title: 'Introduction to Mechanics', duration: '30 min', type: 'video' },
          { title: 'Kinematics', duration: '35 min', type: 'video' },
          { title: 'Forces and Motion', duration: '40 min', type: 'video' },
        ],
      },
    ],
    tags: ['Physics', 'Mechanics', 'Optics', 'Modern Physics'],
  },
  {
    id: '17',
    slug: 'chemistry',
    title: 'Chemistry',
    description: 'Organic, Inorganic, Physical',
    longDescription: 'Comprehensive chemistry course covering organic, inorganic, and physical chemistry. Master chemical reactions, periodic table, and molecular structures.',
    instructor: {
      name: 'Dr. Robert Lee',
      role: 'Chemistry Educator',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
      bio: 'Dr. Lee has a PhD in Chemistry and specializes in making complex chemistry concepts easy to understand.',
    },
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800',
    category: 'School',
    level: 'Beginner',
    duration: '13 weeks',
    price: 10499,
    originalPrice: 18499,
    rating: 4.6,
    reviews: 389,
    students: 5432,
    language: 'English',
    features: [
      '32+ hours of video content',
      'Chemical reaction demonstrations',
      'Periodic table mastery',
      'Exam preparation',
      'Certificate of completion',
    ],
    bulletPoints: [
      'Master organic, inorganic, and physical chemistry',
      'Chemical reactions and equations',
      'Periodic table understanding',
      'Lab safety and procedures',
      'Expert guidance',
    ],
    curriculum: [
      {
        week: 1,
        title: 'Chemistry Fundamentals',
        lessons: [
          { title: 'Introduction to Chemistry', duration: '25 min', type: 'video' },
          { title: 'Atomic Structure', duration: '30 min', type: 'video' },
          { title: 'Chemical Bonding', duration: '35 min', type: 'video' },
        ],
      },
    ],
    tags: ['Chemistry', 'Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry'],
  },
  {
    id: '18',
    slug: 'programming-for-beginners',
    title: 'Programming',
    description: 'Python, C++, Java for Beginners',
    longDescription: 'Start your programming journey with Python, C++, and Java. Learn fundamental programming concepts, syntax, and problem-solving skills perfect for beginners.',
    instructor: {
      name: 'Alex Thompson',
      role: 'Programming Instructor',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
      bio: 'Alex has been teaching programming to students for 8+ years and specializes in beginner-friendly instruction.',
    },
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
    category: 'School',
    level: 'Beginner',
    duration: '10 weeks',
    price: 11999,
    originalPrice: 19999,
    rating: 4.8,
    reviews: 678,
    students: 9876,
    language: 'English',
    features: [
      '40+ hours of video content',
      'Coding exercises and projects',
      'Multiple programming languages',
      'Problem-solving practice',
      'Certificate of completion',
    ],
    bulletPoints: [
      'Learn Python, C++, and Java',
      'Programming fundamentals',
      'Hands-on coding practice',
      'Problem-solving skills',
      'Beginner-friendly approach',
    ],
    curriculum: [
      {
        week: 1,
        title: 'Programming Basics',
        lessons: [
          { title: 'Introduction to Programming', duration: '25 min', type: 'video' },
          { title: 'Python Basics', duration: '30 min', type: 'video' },
          { title: 'Variables and Data Types', duration: '35 min', type: 'video' },
        ],
      },
    ],
    tags: ['Programming', 'Python', 'C++', 'Java', 'Beginner'],
    skills: []
  },
  {
    id: '19',
    slug: 'english',
    title: 'English',
    description: 'Grammar, Literature, Essay Writing',
    longDescription: 'Improve your English skills with comprehensive lessons on grammar, literature analysis, and essay writing. Perfect for students looking to excel in English exams.',
    instructor: {
      name: 'Ms. Jennifer White',
      role: 'English Language Educator',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
      bio: 'Ms. White has been teaching English for 10+ years and specializes in helping students improve their writing and comprehension skills.',
    },
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800',
    category: 'School',
    level: 'Beginner',
    duration: '11 weeks',
    price: 8999,
    originalPrice: 15999,
    rating: 4.7,
    reviews: 456,
    students: 7654,
    language: 'English',
    features: [
      '28+ hours of video content',
      'Grammar exercises',
      'Literature analysis',
      'Essay writing practice',
      'Certificate of completion',
    ],
    bulletPoints: [
      'Master grammar and composition',
      'Literature analysis skills',
      'Essay writing techniques',
      'Vocabulary building',
      'Exam preparation',
    ],
    curriculum: [
      {
        week: 1,
        title: 'English Fundamentals',
        lessons: [
          { title: 'Grammar Basics', duration: '25 min', type: 'video' },
          { title: 'Parts of Speech', duration: '30 min', type: 'video' },
          { title: 'Sentence Structure', duration: '35 min', type: 'video' },
        ],
      },
    ],
    tags: ['English', 'Grammar', 'Literature', 'Essay Writing'],
  },
  {
    id: '20',
    slug: 'regular-subjects',
    title: 'Regular Subjects',
    description: 'History, Geography, Biology',
    longDescription: 'Comprehensive coverage of history, geography, and biology. Learn key concepts, important dates, geographical features, and biological processes.',
    instructor: {
      name: 'Dr. Patricia Davis',
      role: 'Social Studies & Science Educator',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
      bio: 'Dr. Davis has a PhD in Education and specializes in teaching multiple subjects with engaging methods.',
    },
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
    category: 'School',
    level: 'Beginner',
    duration: '15 weeks',
    price: 12999,
    originalPrice: 21999,
    rating: 4.6,
    reviews: 523,
    students: 8765,
    language: 'English',
    features: [
      '45+ hours of video content',
      'Multiple subjects coverage',
      'Interactive learning',
      'Exam preparation',
      'Certificate of completion',
    ],
    bulletPoints: [
      'Master history, geography, and biology',
      'Key concepts and facts',
      'Visual learning aids',
      'Exam preparation strategies',
      'Comprehensive coverage',
    ],
    curriculum: [
      {
        week: 1,
        title: 'Introduction to Regular Subjects',
        lessons: [
          { title: 'History Overview', duration: '30 min', type: 'video' },
          { title: 'Geography Basics', duration: '30 min', type: 'video' },
          { title: 'Biology Fundamentals', duration: '30 min', type: 'video' },
        ],
      },
    ],
    tags: ['History', 'Geography', 'Biology', 'Social Studies'],
  },
];

export const categories = ['All', 'Web Development', 'Data Science', 'Design', 'Cloud Computing', 'Mobile Development', 'Marketing', 'AI & Machine Learning', 'DevOps', 'Database', 'Programming', 'Business', 'School'];

export const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];


