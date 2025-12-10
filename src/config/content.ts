// Centralized Content Configuration
// All website text, CTAs, meta descriptions, and content are defined here

export const content = {
  site: {
    name: 'Trust2Switch',
    tagline: 'Your Path to Career Success | World-Class Ed-Tech',
    description: 'Trust Your Transition. Switch to Success. Acquire in-demand skills, build industry-level portfolios, and land your dream job with 1-on-1 mentorship.',
    url: 'https://trust2switch.com',
  },
  navigation: {
    home: 'Home',
    courses: 'Courses',
    about: 'About',
    blog: 'Blog',
    contact: 'Contact',
    cta: 'Get Started',
  },
  home: {
    hero: {
      title: 'Trust Your Transition. Switch to Success.',
      subtitle: 'Acquire in-demand skills, build industry-level portfolios, and land your dream job with 1-on-1 mentorship.',
      ctaPrimary: 'Request a Call Back',
      ctaSecondary: 'Book Free Demo',
      stats: [
        { value: '1000+', label: 'Learners Worldwide' },
        { value: '4.6/5.0', label: 'Average Rating' },
        { value: '50+', label: 'Expert Instructors' },
        { value: '95%', label: 'Success Rate' },
      ],
    },
    features: {
      title: 'Why Choose Trust2Switch?',
      subtitle: 'Everything you need to succeed in your career switch',
      items: [
        {
          title: 'Industry Expert Instructors',
          description: 'Learn from senior developers, architects, and tech leaders from top companies',
          icon: 'users',
        },
        {
          title: 'Real-World Projects',
          description: 'Build portfolio-worthy projects using industry-standard tools and technologies',
          icon: 'code',
        },
        {
          title: 'Career Placement Support',
          description: 'Get resume reviews, mock interviews, and direct connections to tech companies',
          icon: 'briefcase',
        },
        {
          title: 'Lifetime Access',
          description: 'Access your courses forever with lifetime updates and new content',
          icon: 'infinity',
        },
        {
          title: 'Community Access',
          description: 'Join a vibrant community of learners and network with peers',
          icon: 'message-circle',
        },
        {
          title: 'Flexible Learning',
          description: 'Learn at your own pace with flexible schedules and mobile access',
          icon: 'clock',
        },
      ],
    },
    courses: {
      title: 'Popular Courses',
      subtitle: 'Start your journey with our most popular courses',
      viewAll: 'View All Courses',
    },
    testimonials: {
      title: 'Success Stories',
      subtitle: 'Hear from our students who successfully switched careers',
      items: [
        {
          name: 'Sarah Johnson',
          role: 'Software Engineer at Google',
          image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
          quote: 'Trust2Switch helped me transition from marketing to software engineering. The courses are comprehensive and the support is incredible.',
          rating: 5,
        },
        {
          name: 'Michael Chen',
          role: 'Data Scientist at Microsoft',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
          quote: 'I landed my dream job within 6 months of completing the Data Science course. The hands-on projects were exactly what employers were looking for.',
          rating: 5,
        },
        {
          name: 'Emily Rodriguez',
          role: 'UX Designer at Airbnb',
          image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
          quote: 'The UX Design course gave me the skills and confidence to switch careers. The community support was amazing throughout my journey.',
          rating: 5,
        },
      ],
    },
    newsletter: {
      title: 'Stay Updated',
      subtitle: 'Get the latest courses, tips, and career advice delivered to your inbox',
      placeholder: 'Enter your email',
      button: 'Subscribe',
      success: 'Thank you for subscribing!',
    },
    cta: {
      title: 'Ready to Switch Your Career?',
      subtitle: 'Join thousands of students who have successfully transformed their careers',
      button: 'Start Learning Today',
    },
    careerAdvice: {
      headline: "Trying to Figure Out Which Tech Role Matches Your Skills and Ambitions?",
      content: "Get FREE, expert-backed career advice tailored to today’s tech market. Learn which roles offer the best salaries, growth, and future demand—whether it’s Full Stack, Data Science, Cloud, or AI/ML—and make a confident, future-proof decision.",
      ctaPrimary: "Free",
      ctaSecondary: "Take 10 seconds: click and tell us a bit..",
    },
  },
  courses: {
    title: 'All Courses',
    subtitle: 'Browse our comprehensive catalog of courses',
    header: {
      badge: 'Explore Our Courses',
    },
    search: {
      placeholder: 'Search courses by title, description, or tags...',
    },
    filter: {
      label: 'Filters:',
      level: 'Level:',
      sort: 'Sort:',
      clearAll: 'Clear All',
      activeFilters: 'Active filters:',
      searchPrefix: 'Search:',
      sortOptions: {
        popular: 'Most Popular',
        rating: 'Highest Rated',
        priceLow: 'Price: Low to High',
        priceHigh: 'Price: High to Low',
      },
    },
    results: {
      found: 'Found',
      course: 'Course',
      courses: 'Courses',
      showingResults: 'Showing results for your selected filters',
    },
    empty: {
      title: 'No courses found',
      message: "We couldn't find any courses matching your criteria. Try adjusting your filters.",
      clearFilters: 'Clear All Filters',
    },
    viewDetails: 'View Details',
    enroll: 'Enroll Now',
    free: 'Free',
    popular: 'Popular',
    new: 'New',
  },
  about: {
    title: 'About Trust2Switch',
    subtitle: 'Empowering career transitions through quality education',
    mission: {
      title: 'Our Mission',
      description: 'To provide accessible, high-quality education that empowers individuals to switch careers and achieve their professional dreams. We believe everyone deserves the opportunity to pursue work they love.',
    },
    vision: {
      title: 'Our Vision',
      description: 'To become the leading platform for career transitions, helping millions of people worldwide find fulfilling careers through expert-led education and comprehensive support.',
    },
    values: [
      {
        title: 'Quality First',
        description: 'We maintain the highest standards in course content and instruction.',
      },
      {
        title: 'Student Success',
        description: 'Your success is our success. We\'re committed to your career transformation.',
      },
      {
        title: 'Innovation',
        description: 'We continuously improve our platform and courses based on industry trends.',
      },
      {
        title: 'Community',
        description: 'We foster a supportive learning community where everyone can thrive.',
      },
    ],
  },
  contact: {
    title: 'Get in Touch',
    subtitle: 'Have questions? We\'d love to hear from you',
    form: {
      name: 'Name',
      email: 'Email',
      subject: 'Subject',
      message: 'Message',
      submit: 'Send Message',
      sending: 'Sending...',
      success: 'Thank you! We\'ll get back to you soon.',
      error: 'Something went wrong. Please try again.',
    },
    info: {
      email: 'hello@trust2switch.com',
      phone: '+1 (555) 123-4567',
      address: '123 Education Street, Learning City, LC 12345',
    },
  },
  blog: {
    title: 'Blog',
    subtitle: 'Latest articles, tips, and insights',
    readMore: 'Read More',
    related: 'Related Posts',
    backToBlog: 'Back to Blog',
    author: 'By',
    date: 'Published on',
  },
  shop: {
    title: 'Shop',
    subtitle: 'Browse and purchase projects, research papers, and templates',
    empty: 'No products found',
    addToCart: 'Add to Cart',
    viewDetails: 'View Details',
    checkout: 'Proceed to Checkout',
    cart: 'Shopping Cart',
    cartEmpty: 'Your cart is empty',
    total: 'Total',
    filters: {
      all: 'All Products',
      category: 'Category',
      sort: 'Sort By',
    },
  },
  footer: {
    description: 'Transform your career with expert-led courses. Join thousands of successful career switchers.',
    links: {
      company: {
        title: 'Company',
        items: ['About Us', 'Careers', 'Contact', 'Blog'],
      },
      courses: {
        title: 'Courses',
        items: ['All Courses', 'Popular Courses', 'New Courses', 'Free Courses'],
      },
      support: {
        title: 'Support',
        items: ['Help Center', 'FAQ', 'Privacy Policy', 'Terms of Service'],
      },
      social: {
        title: 'Follow Us',
        items: ['Twitter', 'LinkedIn', 'Facebook', 'Instagram'],
      },
    },
    copyright: '© 2024 Trust2Switch. All rights reserved.',
  },
} as const;

export type Content = typeof content;


