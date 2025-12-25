import type { Metadata, Viewport } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingButton } from '@/components/ui/FloatingButton';
import { ScrollHandler } from '@/components/ScrollHandler';
import { AnalyticsProvider } from '@/components/AnalyticsProvider';
import { theme } from '@/config/theme';
import { content } from '@/config/content';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-heading',
});

export const metadata: Metadata = {
  metadataBase: new URL(content.site.url),
  title: {
    default: content.site.name,
    template: `%s | ${content.site.name}`,
  },
  description: content.site.description,
  keywords: [
    'career switch',
    'online courses',
    'edtech',
    'professional development',
    'career transition',
    'skill development',
    'web development courses',
    'data science courses',
    'coding bootcamp',
    'online learning',
    'career coaching',
    'job placement',
    'mentorship',
    'portfolio building',
    'tech careers',
  ],
  authors: [{ name: content.site.name }],
  creator: content.site.name,
  publisher: content.site.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: content.site.url,
    siteName: content.site.name,
    title: content.site.name,
    description: content.site.description,
    images: [
      {
        url: `${content.site.url}/trust2switch_logo.jpg`,
        width: 1200,
        height: 630,
        alt: content.site.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: content.site.name,
    description: content.site.description,
    images: [`${content.site.url}/trust2switch_logo.jpg`],
    creator: '@trust2switch',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },
  alternates: {
    canonical: content.site.url,
  },
  category: 'education',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/trust2switch_logo.jpg', sizes: 'any', type: 'image/jpeg' },
    ],
    apple: [
      { url: '/trust2switch_logo.jpg', sizes: '180x180', type: 'image/jpeg' },
    ],
    shortcut: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: content.site.name,
    description: content.site.description,
    url: content.site.url,
    logo: `${content.site.url}/trust2switch_logo.jpg`,
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'hello@trust2switch.com',
      contactType: 'Customer Service',
    },
    sameAs: [
      // Add your social media URLs here
      // 'https://twitter.com/trust2switch',
      // 'https://linkedin.com/company/trust2switch',
      // 'https://facebook.com/trust2switch',
    ],
  };

  return (
    <html lang="en">
      <head>
        {/* Google tag (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-LKBH0N8ZYX"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-LKBH0N8ZYX', {
                'allow_ad_personalization_signals': true,
                'anonymize_ip': false
              });
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`} suppressHydrationWarning={true}>
        <div style={{
          '--color-primary-50': theme.colors.primary[50],
          '--color-primary-100': theme.colors.primary[100],
          '--color-primary-200': theme.colors.primary[200],
          '--color-primary-300': theme.colors.primary[300],
          '--color-primary-400': theme.colors.primary[400],
          '--color-primary-500': theme.colors.primary[500],
          '--color-primary-600': theme.colors.primary[600],
          '--color-primary-700': theme.colors.primary[700],
          '--color-primary-800': theme.colors.primary[800],
          '--color-primary-900': theme.colors.primary[900],
          '--color-secondary-50': theme.colors.secondary[50],
          '--color-secondary-100': theme.colors.secondary[100],
          '--color-secondary-200': theme.colors.secondary[200],
          '--color-secondary-300': theme.colors.secondary[300],
          '--color-secondary-400': theme.colors.secondary[400],
          '--color-secondary-500': theme.colors.secondary[500],
          '--color-secondary-600': theme.colors.secondary[600],
          '--color-secondary-700': theme.colors.secondary[700],
          '--color-secondary-800': theme.colors.secondary[800],
          '--color-secondary-900': theme.colors.secondary[900],
        } as React.CSSProperties}>
          <AnalyticsProvider>
            <Header />
            <ScrollHandler />
            <main className="pt-[80px] sm:pt-[96px]">{children}</main>
            <Footer />
            <FloatingButton />
          </AnalyticsProvider>
        </div>
      </body>
    </html>
  );
}


