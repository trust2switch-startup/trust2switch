import type { Metadata, Viewport } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingButton } from '@/components/ui/FloatingButton';
import { ScrollHandler } from '@/components/ScrollHandler';
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
  title: content.site.name,
  description: content.site.description,
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
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
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
          <Header />
          <ScrollHandler />
          <main className="pt-[80px] sm:pt-[96px]">{children}</main>
          <Footer />
          <FloatingButton />
        </div>
      </body>
    </html>
  );
}


