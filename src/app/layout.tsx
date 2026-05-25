import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Footer } from '@/components/footer';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'PDF Maker - Intelligent Document Tools',
  description:
    'A professional suite of intelligent document and image processing tools. Convert, merge, resize, and compress with ease.',
  verification: {
    google: '9oC4yJJbnNWpTRXPYAC9nuCZ1jt8d7D4QJO6FoRIKZk',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* AdSense Meta Tag */}
        <meta
          name="google-adsense-account"
          content="ca-pub-9676995453061102"
        />

        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />

        {/* AdSense Script */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9676995453061102"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>

      <body className="font-body antialiased bg-background text-foreground flex flex-col min-h-screen">
        <div className="flex-grow">{children}</div>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}