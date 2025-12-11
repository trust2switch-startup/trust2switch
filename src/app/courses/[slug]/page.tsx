"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { use } from "react";
import {
  Star,
  Users,
  Clock,
  Check,
  ArrowLeft,
  Calendar,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Download,
  FileText,
  CreditCard,
  Phone,
  TrendingUp,
  Target,
  Briefcase,
  Code2,
  FileCheck,
  GraduationCap,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Linkedin,
  ArrowDown,
  Database,
  Cloud,
  Zap,
  Settings,
  BarChart3,
  Globe,
  Smartphone,
  Palette,
  Search,
  Mail,
  MessageSquare,
  Layers,
  Box,
  Terminal,
  Server,
  Network,
  Shield,
  Lock,
  GitBranch,
  Package,
  Maximize2,
  Award,
  Sparkles,
} from "lucide-react";
import {
  SiPython,
  SiTensorflow,
  SiPytorch,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiGithub,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiTypescript,
  SiDocker,
  SiKubernetes,
  SiJenkins,
  SiTerraform,
  SiLinux,
  SiFigma,
  SiAdobexd,
  SiSketch,
  SiGoogleads,
  SiFacebook,
  SiGoogleanalytics,
  SiOpenjdk,
  SiSpring,
  SiCplusplus,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiRedux,
  SiFirebase,
  SiGraphql,
  SiGit,
  SiPandas,
  SiNumpy,
  SiJupyter,
  SiScikitlearn,
  SiApachespark,
  SiTableau,
  SiGo,
  SiRust,
  SiSwift,
  SiKotlin,
  SiPhp,
  SiRuby,
  SiScala,
  SiElixir,
  SiVuedotjs,
  SiAngular,
  SiSvelte,
  SiNextdotjs,
  SiNuxtdotjs,
  SiTailwindcss,
  SiBootstrap,
  SiSass,
  SiLess,
  SiWebpack,
  SiVite,
  SiNpm,
  SiYarn,
  SiPostman,
  SiJira,
  SiConfluence,
  SiSlack,
  SiNotion,
} from "react-icons/si";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { BookDemoModal } from "@/components/booking/BookDemoModal";
import { BookOneOnOneModal } from "@/components/booking/BookOneOnOneModal";
import { CareerAdviceModal } from "@/components/booking/CareerAdviceModal";
import { courses } from "@/config/courses";
import { formatPrice } from "@/lib/utils";
import { content } from "@/config/content";
import { courseDetailConfig } from "@/config/courseDetail";
import {
  trackButtonClick,
  trackModalOpen,
  trackCourseView,
} from "@/lib/analytics";
import { PlatformRatings } from "@/components/sections/PlatformRatings";

interface CourseDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { slug } = use(params);
  const course = courses.find((c) => c.slug === slug);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isOneOnOneModalOpen, setIsOneOnOneModalOpen] = useState(false);
  const [isCareerAdviceModalOpen, setIsCareerAdviceModalOpen] = useState(false);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const [expandedWeeks, setExpandedWeeks] = useState<Set<number>>(new Set([0]));
  const [expandedFAQs, setExpandedFAQs] = useState<Set<number>>(new Set());
  const projectsScrollRef = useRef<HTMLDivElement>(null);
  const careerTransitionScrollRef = useRef<HTMLDivElement>(null);

  // Track course view
  React.useEffect(() => {
    if (course) {
      trackCourseView(course.slug, course.title);
    }
  }, [course]);

  if (!course) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">
            Course Not Found
          </h1>
          <Link href="/courses">
            <Button
              variant="primary"
              className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-600"
            >
              Back to Courses
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const toggleWeek = (week: number) => {
    setExpandedWeeks((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(week)) {
        newSet.delete(week);
      } else {
        newSet.add(week);
      }
      return newSet;
    });
  };

  // Icon mapping function to convert icon names to components
  const getIcon = (iconName: string) => {
    const iconMap: Record<string, React.ComponentType<any>> = {
      TrendingUp,
      Code2,
      Target,
      FileCheck,
      Briefcase,
      GraduationCap,
      Database,
      Cloud,
      Zap,
      Settings,
      BarChart3,
      Globe,
      Smartphone,
      Palette,
      Search,
      Mail,
      MessageSquare,
      Layers,
      Box,
      Terminal,
      Server,
      Network,
      Shield,
      Lock,
      GitBranch,
      Package,
    };
    return iconMap[iconName] || Code2; // Default to Code2 if icon not found
  };

  // Brand icon mapping function for skills - maps skill names to real brand icons with colors
  const getBrandIcon = (skillName: string) => {
    const brandIconMap: Record<string, React.ComponentType<any>> = {
      // Programming Languages
      Python: SiPython,
      'Python Programming': SiPython,
      Java: SiOpenjdk,
      'Java Programming': SiOpenjdk,
      JavaScript: SiJavascript,
      TypeScript: SiTypescript,
      'C++': SiCplusplus,
      Cpp: SiCplusplus,
      Go: SiGo,
      Rust: SiRust,
      Swift: SiSwift,
      Kotlin: SiKotlin,
      PHP: SiPhp,
      Ruby: SiRuby,
      Scala: SiScala,
      Elixir: SiElixir,
      
      // Web Technologies
      React: SiReact,
      'React.js': SiReact,
      'React Native': SiReact,
      'Node.js': SiNodedotjs,
      Nodejs: SiNodedotjs,
      Express: SiExpress,
      'Express.js': SiExpress,
      HTML: SiHtml5,
      HTML5: SiHtml5,
      CSS: SiCss3,
      CSS3: SiCss3,
      Vue: SiVuedotjs,
      Angular: SiAngular,
      Svelte: SiSvelte,
      'Next.js': SiNextdotjs,
      Nextjs: SiNextdotjs,
      Nuxt: SiNuxtdotjs,
      Tailwind: SiTailwindcss,
      'Tailwind CSS': SiTailwindcss,
      Bootstrap: SiBootstrap,
      Sass: SiSass,
      Less: SiLess,
      Webpack: SiWebpack,
      Vite: SiVite,
      NPM: SiNpm,
      Yarn: SiYarn,
      
      // Databases
      SQL: SiMysql,
      MySQL: SiMysql,
      PostgreSQL: SiPostgresql,
      MongoDB: SiMongodb,
      
      // Cloud & DevOps
      AWS: Cloud,
      'Amazon AWS': Cloud,
      Docker: SiDocker,
      Kubernetes: SiKubernetes,
      Terraform: SiTerraform,
      Jenkins: SiJenkins,
      Linux: SiLinux,
      
      // Data Science & ML
      TensorFlow: SiTensorflow,
      PyTorch: SiPytorch,
      Pandas: SiPandas,
      NumPy: SiNumpy,
      Jupyter: SiJupyter,
      'Jupyter Notebook': SiJupyter,
      'Scikit-learn': SiScikitlearn,
      ScikitLearn: SiScikitlearn,
      'Apache Spark': SiApachespark,
      Spark: SiApachespark,
      'Power BI': SiTableau,
      PowerBI: SiTableau,
      Tableau: SiTableau,
      Excel: BarChart3,
      'Machine Learning': SiTensorflow,
      'Deep Learning': SiPytorch,
      'Data Analytics': SiTableau,
      Statistics: SiNumpy,
      
      // Design Tools
      Figma: SiFigma,
      'Adobe XD': SiAdobexd,
      Sketch: SiSketch,
      
      // Version Control
      GitHub: SiGithub,
      Git: SiGit,
      
      // Other Tools
      Redux: SiRedux,
      Firebase: SiFirebase,
      GraphQL: SiGraphql,
      Postman: SiPostman,
      Jira: SiJira,
      Confluence: SiConfluence,
      Slack: SiSlack,
      Notion: SiNotion,
      
      // Marketing
      'Google Ads': SiGoogleads,
      'Facebook Ads': SiFacebook,
      Analytics: SiGoogleanalytics,
      'Google Analytics': SiGoogleanalytics,
      
      // Cloud Computing
      'Cloud Computing': Cloud,
    };
    
    // Try exact match first
    if (brandIconMap[skillName]) {
      return brandIconMap[skillName];
    }
    
    // Try case-insensitive match
    const lowerSkillName = skillName.toLowerCase();
    for (const [key, Icon] of Object.entries(brandIconMap)) {
      if (key.toLowerCase() === lowerSkillName) {
        return Icon;
      }
    }
    
    // Try partial match for common patterns
    if (lowerSkillName.includes('python')) return SiPython;
    if (lowerSkillName.includes('react')) return SiReact;
    if (lowerSkillName.includes('node')) return SiNodedotjs;
    if (lowerSkillName.includes('aws') || lowerSkillName.includes('amazon')) return Cloud;
    if (lowerSkillName.includes('docker')) return SiDocker;
    if (lowerSkillName.includes('kubernetes') || lowerSkillName.includes('k8s')) return SiKubernetes;
    if (lowerSkillName.includes('tensorflow')) return SiTensorflow;
    if (lowerSkillName.includes('pytorch')) return SiPytorch;
    if (lowerSkillName.includes('power bi') || lowerSkillName.includes('powerbi')) return SiTableau;
    if (lowerSkillName.includes('github')) return SiGithub;
    if (lowerSkillName.includes('git') && !lowerSkillName.includes('github')) return SiGit;
    if (lowerSkillName.includes('mysql') || (lowerSkillName.includes('sql') && !lowerSkillName.includes('postgres'))) return SiMysql;
    if (lowerSkillName.includes('postgres')) return SiPostgresql;
    if (lowerSkillName.includes('mongodb') || lowerSkillName.includes('mongo')) return SiMongodb;
    if (lowerSkillName.includes('figma')) return SiFigma;
    if (lowerSkillName.includes('java') && !lowerSkillName.includes('javascript') && !lowerSkillName.includes('script')) return SiOpenjdk;
    if (lowerSkillName.includes('typescript') || lowerSkillName.includes('ts ')) return SiTypescript;
    if (lowerSkillName.includes('express')) return SiExpress;
    if (lowerSkillName.includes('redux')) return SiRedux;
    if (lowerSkillName.includes('firebase')) return SiFirebase;
    if (lowerSkillName.includes('graphql')) return SiGraphql;
    if (lowerSkillName.includes('terraform')) return SiTerraform;
    if (lowerSkillName.includes('jenkins')) return SiJenkins;
    if (lowerSkillName.includes('linux')) return SiLinux;
    if (lowerSkillName.includes('pandas')) return SiPandas;
    if (lowerSkillName.includes('numpy') || lowerSkillName.includes('num py')) return SiNumpy;
    if (lowerSkillName.includes('jupyter')) return SiJupyter;
    if (lowerSkillName.includes('scikit') || lowerSkillName.includes('sklearn')) return SiScikitlearn;
    if (lowerSkillName.includes('spark') && lowerSkillName.includes('apache')) return SiApachespark;
    if (lowerSkillName.includes('tableau')) return SiTableau;
    if (lowerSkillName.includes('excel')) return BarChart3;
    if (lowerSkillName.includes('machine learning') || lowerSkillName.includes('ml ')) return SiTensorflow;
    if (lowerSkillName.includes('deep learning') || lowerSkillName.includes('dl ')) return SiPytorch;
    if (lowerSkillName.includes('data analytics') || lowerSkillName.includes('analytics')) return SiTableau;
    if (lowerSkillName.includes('statistics') || lowerSkillName.includes('stats')) return SiNumpy;
    if (lowerSkillName.includes('cloud')) return Cloud;
    if (lowerSkillName.includes('vue')) return SiVuedotjs;
    if (lowerSkillName.includes('angular')) return SiAngular;
    if (lowerSkillName.includes('next.js') || lowerSkillName.includes('nextjs')) return SiNextdotjs;
    if (lowerSkillName.includes('tailwind')) return SiTailwindcss;
    if (lowerSkillName.includes('bootstrap')) return SiBootstrap;
    if (lowerSkillName.includes('sass') && !lowerSkillName.includes('pass')) return SiSass;
    if (lowerSkillName.includes('webpack')) return SiWebpack;
    if (lowerSkillName.includes('vite')) return SiVite;
    if (lowerSkillName.includes('postman')) return SiPostman;
    
    // Default fallback to a generic icon
    return Code2;
  };

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.description,
    provider: {
      "@type": "Organization",
      name: content.site.name,
      url: content.site.url,
    },
    image: course.image,
    courseCode: course.id,
    educationalLevel: course.level,
    inLanguage: course.language,
    offers: {
      "@type": "Offer",
      price: course.price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: `${content.site.url}/courses/${course.slug}`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: course.rating,
      reviewCount: course.reviews,
    },
    instructor: {
      "@type": "Person",
      name: course.instructor.name,
      jobTitle: course.instructor.role,
      image: course.instructor.image,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: content.site.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Courses",
        item: `${content.site.url}/courses`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: course.title,
        item: `${content.site.url}/courses/${course.slug}`,
      },
    ],
  };

  // Use config data with course-specific overrides
  const {
    sections,
    programHighlights: defaultProgramHighlights,
    ratings,
    projects: defaultProjects,
    comparisonData: defaultComparisonData,
    careerTransitions: defaultCareerTransitions,
    faqs: defaultFaqs,
    jobDescriptionsLink: defaultJobDescriptionsLink,
    certificate: defaultCertificate,
    skills: defaultSkills,
  } = courseDetailConfig;

  // Use course-specific data if available, otherwise fall back to default config
  const programHighlights = course.programHighlights || defaultProgramHighlights;
  const projects = course.projects || defaultProjects;
  const comparisonData = course.comparisonData || defaultComparisonData;
  const careerTransitions = course.careerTransitions || defaultCareerTransitions;
  const faqs = course.faqs || defaultFaqs;
  const jobDescriptionsLink = course.jobDescriptionsLink || defaultJobDescriptionsLink;
  const certificate = course.certificate || defaultCertificate;
  const skills = course.skills || defaultSkills;
  const whoCanApply = course.whoCanApply || sections.whoCanApply.items;

  const toggleFAQ = (index: number) => {
    setExpandedFAQs((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex items-center space-x-0.5 text-amber-400">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFull = star <= Math.floor(rating);
          const isHalf =
            !isFull && star === Math.ceil(rating) && rating % 1 >= 0.4;
          return (
            <span key={star} className="relative">
              {isFull ? (
                <Star className="w-4 h-4 fill-current" />
              ) : isHalf ? (
                <div className="relative">
                  <Star className="w-4 h-4 text-gray-300" />
                  <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
                    <Star className="w-4 h-4 fill-current text-amber-400" />
                  </div>
                </div>
              ) : (
                <Star className="w-4 h-4 text-gray-300" />
              )}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="min-h-screen bg-white">
        {/* Top Section - Two Columns */}
        <section className="bg-white py-8 sm:py-10 lg:py-12 xl:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/courses"
              className="inline-flex items-center text-[#435663] hover:text-[#84994F] mb-4 sm:mb-6 transition-colors group text-sm sm:text-base"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              {sections.topSection.backButton}
            </Link>

            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
              {/* Left Column - Course Overview */}
              <div className="space-y-4 sm:space-y-6">
                <Badge
                  variant="default"
                  className="mb-2 sm:mb-4 bg-[#84994F]/10 text-[#84994F] border-[#84994F]/20 text-xs sm:text-sm"
                >
                  {course.category}
                </Badge>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-slate-900 leading-tight">
                  {course.title}
                </h1>

                {/* Bullet Points */}
                <ul className="space-y-2 sm:space-y-3 text-slate-700 text-sm sm:text-base">
                  {course.bulletPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-2 sm:gap-3">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-[#84994F] flex-shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
                  {course.brochureDownloadLink ? (
                    <a
                      href={course.brochureDownloadLink}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center border-2 border-[#435663] text-[#435663] hover:bg-[#435663] hover:text-white text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all"
                      onClick={() =>
                        trackButtonClick(
                          "download_brochure",
                          "course_detail_page"
                        )
                      }
                    >
                      <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      {sections.topSection.downloadBrochure}
                    </a>
                  ) : (
                    <Button
                      variant="outline"
                      size="lg"
                      className="flex items-center justify-center border-[#435663] text-[#435663] hover:bg-[#435663] hover:text-white text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
                      onClick={() =>
                        trackButtonClick(
                          "download_brochure",
                          "course_detail_page"
                        )
                      }
                    >
                      <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      {sections.topSection.downloadBrochure}
                    </Button>
                  )}
                  <Button
                    variant="primary"
                    size="lg"
                    className="flex items-center justify-center bg-gradient-to-r from-[#84994F] to-[#84994F] hover:from-[#6d7f42] hover:to-[#6d7f42] text-white text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
                    onClick={() =>
                      trackButtonClick("apply_now", "course_detail_page")
                    }
                  >
                    {sections.topSection.applyNow}
                  </Button>
                </div>
              </div>

              {/* Right Column - Secure Your Spot */}
              <div className="lg:sticky lg:top-8 h-fit">
                <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-0 shadow-2xl">
                  <CardContent className="p-4 sm:p-6 lg:p-8">
                    <h2 className="text-xl sm:text-2xl font-heading font-bold text-white mb-4 sm:mb-6">
                      {sections.topSection.secureSpotTitle}
                    </h2>

                    {/* Key Information */}
                    <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                      <div className="flex items-center gap-3 sm:gap-4 bg-white/10 backdrop-blur-sm p-3 sm:p-4 rounded-lg">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#84994F]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-[#84994F]" />
                        </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-xs sm:text-sm text-slate-300">
                              {sections.topSection.noCostEMI}
                            </div>
                            <div className="text-base sm:text-lg font-semibold text-white truncate">
                              {course.noCostEMIAmount || sections.topSection.noCostEMIAmount}
                            </div>
                          </div>
                      </div>

                      <div className="flex items-center gap-3 sm:gap-4 bg-white/10 backdrop-blur-sm p-3 sm:p-4 rounded-lg">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#84994F]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-[#84994F]" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs sm:text-sm text-slate-300">
                            {sections.topSection.duration}
                          </div>
                          <div className="text-base sm:text-lg font-semibold text-white">
                            {course.duration}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 sm:gap-4 bg-white/10 backdrop-blur-sm p-3 sm:p-4 rounded-lg">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#84994F]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-[#84994F]" />
                        </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-xs sm:text-sm text-slate-300">
                              {sections.topSection.admissionDeadline}
                            </div>
                            <div className="text-base sm:text-lg font-semibold text-white">
                              {course.admissionDeadlineDate || sections.topSection.admissionDeadlineDate}
                            </div>
                          </div>
                      </div>
                  </div>

                    {/* Action Buttons */}
                    <div className="space-y-2 sm:space-y-3">
                    <Button 
                      variant="outline" 
                      size="lg" 
                        className="w-full border-slate-600 text-white hover:bg-white hover:text-slate-900 text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
                        onClick={() =>
                          trackButtonClick(
                            "view_syllabus",
                            "course_detail_page"
                          )
                        }
                      >
                        <FileText className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                        {sections.topSection.viewSyllabus}
                    </Button>
                    {/* <Button 
                        variant="primary"
                      size="lg" 
                        className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
                        onClick={() =>
                          trackButtonClick(
                            "check_eligibility",
                            "course_detail_page"
                          )
                        }
                      >
                        {sections.topSection.checkEligibility}
                    </Button> */}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Ratings Section */}
        <PlatformRatings />

        {/* Who Can Apply & Guidance Section */}
        <section className="py-8 sm:py-10 lg:py-12 xl:py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
              {/* Left - Who Can Apply */}
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-slate-900 mb-4 sm:mb-6">
                  {sections.whoCanApply.title}
                </h2>
                <ul className="space-y-2 sm:space-y-3">
                  {whoCanApply.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 sm:gap-3">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-[#84994F] flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700 text-sm sm:text-base">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right - Need Guidance */}
              <div className="bg-gradient-to-br from-[#435663] to-slate-800 rounded-xl p-4 sm:p-6 lg:p-8 shadow-xl">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-white mb-2 leading-tight">
                  {sections.guidance.title}{" "}
                  <span className="text-red-400">
                    {sections.guidance.titleHighlight}
                  </span>
                </h2>
                <p className="text-slate-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                  {sections.guidance.description}
                </p>
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white mb-3 sm:mb-4 text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
                  onClick={() => {
                    trackButtonClick("connect_with_us", "course_detail_page");
                    setIsCareerAdviceModalOpen(true);
                  }}
                >
                  {sections.guidance.connectButton}
                </Button>
                <div className="flex items-center gap-2 text-slate-300">
                  <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm">
                    {sections.guidance.phoneNumber}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Program Highlights */}
        {programHighlights && programHighlights.length > 0 && (
          <section className="py-8 sm:py-10 lg:py-12 xl:py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8 sm:mb-10 lg:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-2 sm:mb-3">
                  {sections.programHighlights.title}
                    </h2>
                <p className="text-base sm:text-lg text-slate-600">
                  <span className="text-red-600 font-semibold">
                    {sections.programHighlights.subtitle}
                  </span>
                  , {sections.programHighlights.subtitleHighlight}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {programHighlights.map((highlight, index) => {
                const Icon = getIcon(highlight.icon);
                return (
                  <Card
                    key={index}
                    className="border-2 border-slate-200 hover:border-[#84994F] transition-all hover:shadow-xl bg-white"
                  >
                    <CardContent className="p-4 sm:p-6">
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${highlight.gradient} rounded-xl flex items-center justify-center mb-3 sm:mb-4 shadow-md`}
                      >
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <h3 className="text-base sm:text-lg font-heading font-semibold text-slate-900 mb-2">
                        {highlight.title}
                      </h3>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                        {highlight.description}
                    </p>
                  </CardContent>
                </Card>
                );
              })}
            </div>
          </div>
        </section>
        )}

        {/* Mapped to Real Job Descriptions */}
        {jobDescriptionsLink && (
          <section className="py-8 sm:py-10 lg:py-12 xl:py-16 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-3 sm:mb-4">
                {sections.jobDescriptions.title}
              </h2>
              <a
                href={jobDescriptionsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#435663] hover:text-[#84994F] transition-colors font-medium text-sm sm:text-base break-all"
                onClick={() =>
                  trackButtonClick("job_descriptions_link", "course_detail_page")
                }
              >
                <span className="break-all">{jobDescriptionsLink}</span>
                <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              </a>
            </div>
          </section>
        )}

        {/* Earn Valuable Credentials */}
        {certificate && (
          <section className="py-6 sm:py-8 lg:py-10 bg-gradient-to-br from-slate-50 via-white to-slate-50 relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#84994F]/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#435663]/5 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              {/* Header Section */}
              <div className="text-center mb-6 sm:mb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#84994F] to-[#6d7f42] rounded-xl mb-3 sm:mb-4 shadow-md">
                  <Award className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-slate-900 mb-2 sm:mb-3">
                  {sections.credentials.title}
                </h2>
                <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
                  {sections.credentials.description}
                </p>
              </div>

              {/* Certificate Display Section */}
              <div className="max-w-4xl mx-auto">
                {/* Certificate Container */}
                <div className="flex flex-col items-center">
                  <div className="relative group w-full max-w-md">
                    {/* Certificate Container with Enhanced Styling */}
                    <div className="relative bg-gradient-to-br from-white to-slate-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 shadow-xl border-2 border-slate-200 hover:border-[#84994F]/50 transition-all duration-300 hover:shadow-2xl">
                      {/* Decorative Corner Accents */}
                      <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-[#84994F]/20 rounded-tl-xl"></div>
                      <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[#84994F]/20 rounded-tr-xl"></div>
                      <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-[#84994F]/20 rounded-bl-xl"></div>
                      <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-[#84994F]/20 rounded-br-xl"></div>
                      
                      {/* Certificate Image */}
                      <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-white shadow-inner border border-slate-100 max-h-[280px] sm:max-h-[320px]">
                        <Image
                          src="/Certificate.jpg"
                          alt="Certificate of Excellence"
                          fill
                          className="object-contain p-2 sm:p-3"
                          priority
                        />
                      </div>

                      {/* Zoom Button Overlay */}
                      <button
                        onClick={() => {
                          setIsCertificateModalOpen(true);
                          trackButtonClick("certificate_zoom", "course_detail_page");
                        }}
                        className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-white/90 backdrop-blur-sm hover:bg-[#84994F] text-slate-700 hover:text-white rounded-full p-2.5 sm:p-3 shadow-lg hover:shadow-xl transition-all duration-300 group/zoom border-2 border-slate-200 hover:border-[#84994F] z-10"
                        aria-label="Zoom certificate"
                      >
                        <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5 group-hover/zoom:scale-110 transition-transform" />
                      </button>

                      {/* Hover Indicator */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#84994F]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none"></div>
                    </div>

                    {/* Info Badge */}
                    <div className="mt-3 sm:mt-4 flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-600">
                      <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-[#84994F]" />
                      <span>Click the zoom icon to view full size</span>
                    </div>
                  </div>
                </div>

                {/* Additional Features Grid */}
                <div className="grid sm:grid-cols-3 gap-3 sm:gap-4 mt-6 sm:mt-8">
                  <Card className="border-2 border-slate-200 hover:border-[#84994F] transition-all bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-3 sm:p-4 text-center">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-md">
                        <FileCheck className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <h3 className="font-heading font-semibold text-slate-900 mb-1 text-xs sm:text-sm">
                        Industry Recognized
                      </h3>
                      <p className="text-xs text-slate-600">
                        Validated by leading professionals
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-slate-200 hover:border-[#84994F] transition-all bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-3 sm:p-4 text-center">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-md">
                        <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <h3 className="font-heading font-semibold text-slate-900 mb-1 text-xs sm:text-sm">
                        Verified Credential
                      </h3>
                      <p className="text-xs text-slate-600">
                        Authenticated and secure
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-slate-200 hover:border-[#84994F] transition-all bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-3 sm:p-4 text-center">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-md">
                        <Download className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <h3 className="font-heading font-semibold text-slate-900 mb-1 text-xs sm:text-sm">
                        Downloadable
                      </h3>
                      <p className="text-xs text-slate-600">
                        Get your digital copy anytime
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {/* Certificate Zoom Modal */}
            <Modal
              isOpen={isCertificateModalOpen}
              onClose={() => setIsCertificateModalOpen(false)}
              size="xl"
            >
              <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-slate-50 to-white rounded-lg overflow-hidden border-2 border-slate-200">
                <Image
                  src="/Certificate.jpg"
                  alt="Certificate of Excellence - Full Size"
                  fill
                  className="object-contain p-4 sm:p-8"
                  priority
                />
              </div>
            </Modal>
          </section>
        )}

        {/* Skills and Tools To Master */}
        {skills && skills.length > 0 && (
          <section className="py-8 sm:py-10 lg:py-12 xl:py-16 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-6 sm:mb-8">
                {sections.skills.title}
                      </h2>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {skills.map((skill, index) => {
                  const BrandIcon = getBrandIcon(skill.name);
                  return (
                    <Card
                      key={index}
                      className="border-2 border-slate-200 hover:border-[#84994F] transition-all bg-white hover:shadow-md"
                    >
                      <CardContent className="p-4 sm:p-5 text-center flex flex-col items-center gap-2 sm:gap-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full">
                          <BrandIcon className="w-8 h-8 sm:w-10 sm:h-10" />
                        </div>
                        <div className="text-xs sm:text-sm font-semibold text-slate-900">
                          {skill.name}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
                    </div>
          </section>
        )}

        {/* Projects Section */}
        {projects && projects.length > 0 && (
          <section className="py-8 sm:py-10 lg:py-12 xl:py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-6 sm:mb-8">
                {sections.projects.title}
              </h2>
            <div className="relative">
              <div
                ref={projectsScrollRef}
                className="flex gap-3 sm:gap-4 lg:gap-6 overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
                style={{ scrollSnapType: "x mandatory" }}
              >
                {projects.map((project, index) => (
                          <div
                            key={index}
                    className="flex-shrink-0"
                    style={{ scrollSnapAlign: "start" }}
                  >
                    <Card className="w-[260px] sm:w-[280px] md:w-[300px] lg:w-[320px] h-[240px] sm:h-[260px] md:h-[280px] border-2 border-slate-200 hover:border-[#84994F] transition-all bg-white shadow-sm hover:shadow-lg flex flex-col">
                      <CardContent className="p-4 sm:p-5 flex flex-col h-full">
                        <div className="mb-3 flex-shrink-0">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#84994F] to-[#84994F] rounded-lg flex items-center justify-center mb-3 shadow-md">
                            <Code2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                          </div>
                        </div>
                        <h3 className="text-base sm:text-lg font-heading font-semibold text-slate-900 mb-2 sm:mb-3 leading-tight flex-shrink-0">
                          {project.title}
                        </h3>
                        <p className="text-slate-600 leading-relaxed text-xs sm:text-sm line-clamp-4 flex-1 overflow-hidden">
                          {project.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
                            <button
                onClick={() => {
                  if (projectsScrollRef.current) {
                    const cardWidth =
                      window.innerWidth < 640
                        ? 272
                        : window.innerWidth < 768
                        ? 292
                        : window.innerWidth < 1024
                        ? 312
                        : 332;
                    projectsScrollRef.current.scrollBy({
                      left: cardWidth,
                      behavior: "smooth",
                    });
                  }
                  trackButtonClick("projects_next", "course_detail_page");
                }}
                className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border-2 border-slate-200 hover:border-[#84994F] hover:bg-[#84994F] text-slate-600 hover:text-white transition-all flex items-center justify-center shadow-lg z-10"
                aria-label="Next project"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </section>
        )}

        {/* What Sets This Program Apart */}
        {comparisonData && comparisonData.length > 0 && (
          <section className="py-8 sm:py-10 lg:py-12 xl:py-16 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-6 sm:mb-8">
                {sections.comparison.title}
              </h2>
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="inline-block min-w-full align-middle">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-slate-300">
                      <th className="text-left py-3 sm:py-4 px-3 sm:px-4 font-heading font-bold text-slate-900 text-sm sm:text-base">
                        {sections.comparison.categoryColumn}
                      </th>
                      <th className="text-left py-3 sm:py-4 px-3 sm:px-4 font-heading font-bold text-[#84994F] text-sm sm:text-base">
                        {sections.comparison.trust2switchColumn}
                      </th>
                      <th className="text-left py-3 sm:py-4 px-3 sm:px-4 font-heading font-bold text-slate-700 text-sm sm:text-base">
                        {sections.comparison.otherCoursesColumn}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row, index) => (
                      <tr
                        key={index}
                        className="border-b border-slate-200 hover:bg-slate-50 transition-colors"
                      >
                        <td className="py-3 sm:py-4 px-3 sm:px-4 font-semibold text-slate-900 text-xs sm:text-sm">
                          {row.category}
                        </td>
                        <td className="py-3 sm:py-4 px-3 sm:px-4 text-slate-700 text-xs sm:text-sm">
                          {row.trust2switch}
                        </td>
                        <td className="py-3 sm:py-4 px-3 sm:px-4 text-slate-600 text-xs sm:text-sm">
                          {row.otherCourses}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
        )}

        {/* Career Transition */}
        {careerTransitions && careerTransitions.length > 0 && (
          <section className="py-8 sm:py-10 lg:py-12 xl:py-16 bg-gradient-to-b from-white to-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-6 sm:mb-8 text-center">
                {sections.careerTransition.title}
              </h2>
            <div className="relative">
              <div
                ref={careerTransitionScrollRef}
                className="flex gap-3 sm:gap-4 lg:gap-6 overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
                style={{ scrollSnapType: "x mandatory" }}
              >
                {careerTransitions.map((transition, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0"
                    style={{ scrollSnapAlign: "start" }}
                  >
                    <Card className="w-[280px] sm:w-[300px] md:w-[320px] lg:w-[340px] h-[520px] sm:h-[560px] border-2 border-slate-200 hover:border-[#84994F] transition-all bg-white shadow-md hover:shadow-xl overflow-hidden flex flex-col">
                      <CardContent className="p-5 sm:p-6 flex flex-col h-full">
                        {/* Header with Hike Badge */}
                        <div className="flex items-center justify-between mb-4 flex-shrink-0">
                          <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-xs px-3 py-1.5 shadow-md">
                            {transition.hike} HIKE
                          </Badge>
                          <div className="w-8 h-8 bg-gradient-to-br from-[#84994F]/10 to-[#435663]/10 rounded-lg flex items-center justify-center">
                            <Linkedin className="w-4 h-4 text-[#435663]" />
                          </div>
                        </div>

                        {/* Profile Section */}
                        <div className="text-center mb-4 flex-shrink-0">
                          <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-3">
                            <Image
                              src={transition.image}
                              alt={transition.name}
                              fill
                              className="rounded-full object-cover ring-4 ring-[#84994F]/20 shadow-lg"
                            />
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                                </div>
                          <h3 className="font-heading font-semibold text-slate-900 text-base sm:text-lg mb-1">
                            {transition.name}
                                  </h3>
                          <p className="text-xs sm:text-sm text-[#84994F] font-medium">
                            {transition.field}
                                  </p>
                                </div>

                        {/* Career Transition Flow */}
                        <div className="space-y-3 pt-4 border-t border-slate-200 flex-1 flex flex-col">
                          {/* Previous Role */}
                          <div className="bg-slate-50 rounded-lg p-3 flex-shrink-0">
                            <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">
                              Previous
                            </div>
                            <div className="font-semibold text-slate-900 text-sm mb-1">
                              {transition.previousRole}
                            </div>
                            <div className="text-xs text-slate-600 truncate">
                              {transition.previousCompany}
                            </div>
                          </div>

                          {/* Arrow */}
                          <div className="flex justify-center py-1 flex-shrink-0">
                            <div className="relative">
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-8 h-0.5 bg-gradient-to-r from-slate-300 to-green-400"></div>
                              </div>
                              <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 relative z-10 bg-white rounded-full p-0.5" />
                            </div>
                          </div>

                          {/* New Role */}
                          <div className="bg-gradient-to-br from-green-50 to-[#84994F]/5 rounded-lg p-3 border border-green-100 flex-shrink-0">
                            <div className="text-xs text-green-600 uppercase tracking-wide mb-1 font-semibold">
                              New Role
                            </div>
                            <div className="font-semibold text-slate-900 text-sm mb-1">
                              {transition.newRole}
                            </div>
                            <div className="text-xs text-slate-600 truncate">
                              {transition.newCompany}
                                    </div>
                                    </div>

                          {/* Company Logo - Always reserve space */}
                          <div className={`pt-3 mt-3 border-t border-slate-200 flex-shrink-0 ${transition.companyLogo ? '' : 'min-h-[48px]'}`}>
                            {transition.companyLogo ? (
                              <div className="text-center">
                                <div className="inline-block px-3 py-1.5 bg-slate-100 rounded-md">
                                  <div className="text-xs font-bold text-slate-700">
                                    {transition.companyLogo}
                                  </div>
                                </div>
                              </div>
                            ) : null}
                          </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
                ))}
                      </div>
              <button
                onClick={() => {
                  if (careerTransitionScrollRef.current) {
                    const cardWidth =
                      window.innerWidth < 640
                        ? 292
                        : window.innerWidth < 768
                        ? 312
                        : window.innerWidth < 1024
                        ? 332
                        : 352;
                    careerTransitionScrollRef.current.scrollBy({
                      left: cardWidth,
                      behavior: "smooth",
                    });
                  }
                  trackButtonClick(
                    "career_transition_next",
                    "course_detail_page"
                  );
                }}
                className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border-2 border-slate-200 hover:border-[#84994F] hover:bg-[#84994F] text-slate-600 hover:text-white transition-all flex items-center justify-center shadow-lg z-10"
                aria-label="Next career transition"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={() => {
                  if (careerTransitionScrollRef.current) {
                    const cardWidth =
                      window.innerWidth < 640
                        ? 292
                        : window.innerWidth < 768
                        ? 312
                        : window.innerWidth < 1024
                        ? 332
                        : 352;
                    careerTransitionScrollRef.current.scrollBy({
                      left: -cardWidth,
                      behavior: "smooth",
                    });
                  }
                  trackButtonClick(
                    "career_transition_prev",
                    "course_detail_page"
                  );
                }}
                className="absolute left-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border-2 border-slate-200 hover:border-[#84994F] hover:bg-[#84994F] text-slate-600 hover:text-white transition-all flex items-center justify-center shadow-lg z-10"
                aria-label="Previous career transition"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
                      </div>
                    </div>
        </section>
        )}

        {/* FAQ Section */}
        {faqs && faqs.length > 0 && (
          <section className="py-8 sm:py-10 lg:py-12 xl:py-16 bg-slate-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8 sm:mb-10 lg:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-2 sm:mb-3">
                  {sections.faq.title}
                </h2>
                <p className="text-base sm:text-lg text-slate-600">
                  {sections.faq.subtitle}
                </p>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {faqs.map((faq, index) => {
                const isExpanded = expandedFAQs.has(index);
                return (
                  <Card
                    key={index}
                    className="border-2 border-slate-200 hover:border-[#84994F] transition-all bg-white shadow-sm hover:shadow-md"
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full p-4 sm:p-6 text-left flex items-center justify-between gap-3 sm:gap-4 hover:bg-slate-50 transition-colors rounded-lg"
                    >
                      <h3 className="text-base sm:text-lg font-heading font-semibold text-slate-900 pr-4 sm:pr-8 flex-1">
                        {faq.question}
                    </h3>
                      <div className="flex-shrink-0">
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-[#84994F]" />
                        ) : (
                          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                        )}
                      </div>
                    </button>
                    {isExpanded && (
                      <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-0 animate-in slide-in-from-top-2 duration-200">
                        <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-3 sm:mb-4"></div>
                        <p className="text-slate-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                </Card>
                );
              })}
              </div>

            {/* Additional CTA */}
            <div className="mt-8 sm:mt-10 lg:mt-12 text-center">
              <p className="text-slate-600 mb-3 sm:mb-4 text-sm sm:text-base">
                {sections.faq.contactText}
              </p>
              <Button
                variant="primary"
                size="lg"
                className="bg-gradient-to-r from-[#84994F] to-[#84994F] hover:from-[#6d7f42] hover:to-[#6d7f42] text-white text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
                onClick={() => {
                  trackButtonClick("faq_contact", "course_detail_page");
                  setIsCareerAdviceModalOpen(true);
                }}
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                {sections.faq.contactButton}
              </Button>
            </div>
          </div>
        </section>
        )}
      </div>

      {/* Booking Modals */}
      <BookDemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        courseTitle={course.title}
      />
      <BookOneOnOneModal
        isOpen={isOneOnOneModalOpen}
        onClose={() => setIsOneOnOneModalOpen(false)}
        courseTitle={course.title}
      />
      <CareerAdviceModal
        isOpen={isCareerAdviceModalOpen}
        onClose={() => setIsCareerAdviceModalOpen(false)}
      />
    </>
  );
}
