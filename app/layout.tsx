import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { SchemaMarkup } from '@/components/common/SchemaMarkup';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Reformei | Reformas de Alto Padrão',
  description:
    'Reformei - Especialistas em reformas de alto padrão para casas e apartamentos. Transforme seu espaço com qualidade e sofisticação.',
  keywords: ['reformas', 'alto padrão', 'design de interiores', 'reforma residencial', 'reforma apartamento'],
  authors: [{ name: 'Reformei' }],
  creator: 'Reformei',
  publisher: 'Reformei',
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Reformei',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://reformei.co',
    siteName: 'Reformei',
    title: 'Reformei - Reformas de Alto Padrão',
    description: 'Transforme seu espaço com qualidade e sofisticação. Especialistas em reformas de alto padrão para casas e apartamentos.',
    images: [
      {
        url: 'https://reformei.co/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Reformei - Reformas de Alto Padrão',
        type: 'image/svg+xml',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reformei - Reformas de Alto Padrão',
    description: 'Transforme seu espaço com qualidade e sofisticação.',
    images: ['https://reformei.co/og-image.svg'],
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
    google: 'google-site-verification-code',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#35503F" />
        <link rel="canonical" href="https://reformei.co" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/api/manifest" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <SchemaMarkup />
      </head>
      <body className={`${poppins.variable} font-poppins bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
