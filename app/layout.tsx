// Types
import type { Metadata } from 'next';

// Styles
// import { Inter } from 'next/font/google';
import './globals.css';

// const inter = Inter({ subsets: ['latin'] });

export function generateMetadata(): Metadata {
  return {
    metadataBase: new URL('https://explicit-logic.github.io'),
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html suppressHydrationWarning>
      {children}
    </html>
  );
}
