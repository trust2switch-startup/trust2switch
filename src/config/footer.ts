// Footer Configuration
// All footer content, links, and contact information are defined here

export interface ContactInfo {
  email: string;
  phone: string;
  phoneDisplay: string;
  address: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface SocialMediaLink {
  name: string;
  href: string;
  ariaLabel: string;
  hoverColor: string;
  icon: 'facebook' | 'linkedin' | 'twitter' | 'instagram' | 'youtube';
}

export interface FooterConfig {
  brand: {
    name: string;
    nameHighlight: string;
    description: string;
  };
  contact: ContactInfo;
  quickLinks: {
    title: string;
    links: FooterLink[];
  };
  policies: {
    title: string;
    links: FooterLink[];
  };
  newsletter: {
    title: string;
    description: string;
    placeholder: string;
    submitButtonLabel: string;
  };
  socialMedia: {
    title: string;
    links: SocialMediaLink[];
  };
  bottomBar: {
    copyright: string;
    builtWith: {
      prefix: string;
      emoji: string;
      suffix: string;
    };
  };
}

export const footerConfig: FooterConfig = {
  brand: {
    name: 'Trust',
    nameHighlight: '2',
    description: 'Empowering Your Future. Transform your career with expert-led courses and 1-on-1 mentorship.',
  },
  contact: {
    email: 'support@trust2switch.com',
    phone: '0000000000',
    phoneDisplay: '+1 (000) 000-0000',
    address: '123 Education Street, Learning City, LC 12345',
  },
  quickLinks: {
    title: 'Quick Links',
    links: [
      {
        label: 'Home',
        href: '/#hero',
      },
      {
        label: 'Pro Courses',
        href: '/#professional-section',
      },
      {
        label: 'School Mentorship',
        href: '/#school-mentorship',
      },
      {
        label: 'Student Reviews',
        href: '/#learner-success',
      },
      {
        label: 'Blog',
        href: '/blog',
      },
      {
        label: 'About Us',
        href: '/about',
      },
    ],
  },
  policies: {
    title: 'Policies',
    links: [
      {
        label: 'Privacy Policy',
        href: '/privacy',
      },
      {
        label: 'Terms & Conditions',
        href: '/terms',
      },
      {
        label: 'Refund Policy',
        href: '/refund',
      },
      {
        label: 'Career Assistance T&C',
        href: '#',
      },
      {
        label: 'Contact Us',
        href: '/contact',
      },
    ],
  },
  newsletter: {
    title: 'Stay Updated',
    description: 'Subscribe to our newsletter for course updates and career tips.',
    placeholder: 'Your email',
    submitButtonLabel: 'Subscribe',
  },
  socialMedia: {
    title: 'Follow Us',
    links: [
      {
        name: 'Facebook',
        href: 'https://www.facebook.com/profile.php?id=61585003405097',
        ariaLabel: 'Facebook',
        hoverColor: 'blue-600',
        icon: 'facebook',
      },
      {
        name: 'LinkedIn',
        href: '#',
        ariaLabel: 'LinkedIn',
        hoverColor: 'blue-500',
        icon: 'linkedin',
      },
      {
        name: 'Twitter',
        href: '#',
        ariaLabel: 'Twitter',
        hoverColor: 'sky-500',
        icon: 'twitter',
      },
      {
        name: 'Instagram',
        href: 'https://www.instagram.com/trust2switch/',
        ariaLabel: 'Instagram',
        hoverColor: 'pink-600',
        icon: 'instagram',
      },
      {
        name: 'YouTube',
        href: '#',
        ariaLabel: 'YouTube',
        hoverColor: 'red-600',
        icon: 'youtube',
      },
    ],
  },
  bottomBar: {
    copyright: 'Trust2Switch',
    builtWith: {
      prefix: 'Built with',
      emoji: '❤️',
      suffix: 'Trust and Ambition',
    },
  },
};

