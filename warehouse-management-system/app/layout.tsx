import './globals.css';

//import { Analytics } from '@vercel/analytics/react';
import Nav from './nav';
import Toast from './toast';
import { Suspense } from 'react';

export const metadata = {
  title: 'Noel Barrera Challenge',
  description:
      'Challenge '
};

export default function RootLayout({
                                     children
                                   }: {
  children: React.ReactNode;
}) {
  return (
      <html lang="en" className="h-full bg-gray-50">
      <body className="h-full">
      <Suspense>
        <Nav />
      </Suspense>
      {children}
      <Toast />
      </body>
      </html>
  );
}
