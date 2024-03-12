// Types
import type { Metadata } from 'next';

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
    <html>
      <head>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
