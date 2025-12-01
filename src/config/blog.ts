// Centralized Blog Data
import { BlogPost } from '@/types';

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'how-to-switch-careers-successfully',
    title: 'How to Switch Careers Successfully: A Complete Guide',
    excerpt: 'Thinking about switching careers? Learn the essential steps, strategies, and mindset shifts needed to make a successful career transition.',
    content: `# How to Switch Careers Successfully: A Complete Guide

Switching careers can be one of the most rewarding decisions you make, but it requires careful planning and execution. Here's a comprehensive guide to help you navigate this transition successfully.

## 1. Self-Assessment

Before making any moves, take time to understand yourself:
- Identify your transferable skills
- Assess your interests and values
- Consider your financial situation
- Evaluate your timeline

## 2. Research Your Target Industry

Thorough research is crucial:
- Understand industry trends
- Identify required skills and qualifications
- Network with professionals in the field
- Attend industry events and webinars

## 3. Skill Development

Bridge the gap between where you are and where you want to be:
- Take relevant courses
- Get certifications
- Build a portfolio
- Gain practical experience through projects

## 4. Network Strategically

Building connections in your new field:
- Join professional associations
- Attend networking events
- Connect on LinkedIn
- Find a mentor

## 5. Make the Transition

When you're ready:
- Update your resume and LinkedIn
- Start applying strategically
- Consider freelance or contract work
- Be patient and persistent

Remember, career switching is a journey, not a destination. Stay committed to your goals and be open to learning along the way.`,
    author: {
      name: 'Sarah Johnson',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
      role: 'Career Coach',
    },
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800',
    category: 'Career Advice',
    tags: ['Career Switch', 'Career Development', 'Professional Growth'],
    publishedAt: '2024-01-15',
    readTime: '8 min read',
  },
  {
    id: '2',
    slug: 'top-skills-in-demand-2024',
    title: 'Top Skills in Demand for 2024',
    excerpt: 'Discover the most sought-after skills in today\'s job market and how to develop them to advance your career.',
    content: `# Top Skills in Demand for 2024

The job market is constantly evolving, and staying ahead requires understanding which skills are most valuable. Here are the top skills employers are looking for in 2024.

## Technical Skills

1. **Cloud Computing**
   - AWS, Azure, Google Cloud
   - Infrastructure as Code
   - Cloud security

2. **Data Science & Analytics**
   - Python, R
   - Machine Learning
   - Data visualization

3. **Cybersecurity**
   - Network security
   - Ethical hacking
   - Risk assessment

## Soft Skills

1. **Communication**
   - Written and verbal
   - Cross-cultural communication
   - Presentation skills

2. **Problem-Solving**
   - Critical thinking
   - Analytical skills
   - Creativity

3. **Adaptability**
   - Learning agility
   - Resilience
   - Flexibility

## How to Develop These Skills

- Take online courses
- Work on real projects
- Join professional communities
- Seek mentorship
- Practice consistently

Investing in these skills will significantly boost your career prospects in 2024 and beyond.`,
    author: {
      name: 'Michael Chen',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
      role: 'Tech Recruiter',
    },
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
    category: 'Skills Development',
    tags: ['Skills', 'Career Growth', 'Professional Development'],
    publishedAt: '2024-01-10',
    readTime: '6 min read',
  },
  {
    id: '3',
    slug: 'remote-work-best-practices',
    title: 'Remote Work Best Practices for Success',
    excerpt: 'Master the art of remote work with these proven strategies for productivity, communication, and work-life balance.',
    content: `# Remote Work Best Practices for Success

Remote work has become the new normal for many professionals. Here's how to excel in a remote work environment.

## Setting Up Your Workspace

- Dedicated workspace
- Ergonomic setup
- Good lighting
- Minimal distractions

## Time Management

- Set clear boundaries
- Use time-blocking
- Take regular breaks
- Maintain a routine

## Communication

- Over-communicate
- Use video calls effectively
- Document everything
- Be responsive

## Staying Productive

- Set daily goals
- Eliminate distractions
- Use productivity tools
- Take care of your health

## Building Relationships

- Schedule virtual coffee chats
- Participate in team activities
- Show your personality
- Be proactive

Remote work offers flexibility and freedom, but it requires discipline and intentional effort to succeed.`,
    author: {
      name: 'Emily Rodriguez',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
      role: 'Productivity Expert',
    },
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800',
    category: 'Workplace',
    tags: ['Remote Work', 'Productivity', 'Work-Life Balance'],
    publishedAt: '2024-01-05',
    readTime: '7 min read',
  },
  {
    id: '4',
    slug: 'building-your-online-portfolio',
    title: 'Building Your Online Portfolio: A Step-by-Step Guide',
    excerpt: 'Learn how to create a compelling online portfolio that showcases your skills and attracts potential employers or clients.',
    content: `# Building Your Online Portfolio: A Step-by-Step Guide

An online portfolio is essential for showcasing your work and skills. Here's how to create one that stands out.

## Planning Your Portfolio

- Define your goals
- Identify your target audience
- Choose your best work
- Plan your structure

## Essential Sections

1. **About Me**
   - Your story
   - Skills and expertise
   - Professional photo

2. **Projects**
   - Case studies
   - Process documentation
   - Results and impact

3. **Contact**
   - Email
   - Social links
   - Contact form

## Design Principles

- Keep it simple
- Make it responsive
- Use high-quality images
- Ensure fast loading

## Content Tips

- Tell a story
- Show your process
- Include testimonials
- Keep it updated

## Platforms to Consider

- Personal website
- Behance (for designers)
- GitHub (for developers)
- LinkedIn

Your portfolio is your digital business card. Make it count!`,
    author: {
      name: 'David Kim',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
      role: 'Designer',
    },
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800',
    category: 'Career Advice',
    tags: ['Portfolio', 'Career Development', 'Personal Branding'],
    publishedAt: '2024-01-01',
    readTime: '5 min read',
  },
];

export const blogCategories = ['All', 'Career Advice', 'Skills Development', 'Workplace'];

