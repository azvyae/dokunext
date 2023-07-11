import { Footer, Navbar, Sidebar } from '@/components';
import './globals.css';
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'] });

const metadata: Metadata = {
  title: 'dokuNEXT API',
  description: 'DokuNEXT, documentation parser for Postman'
};

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${plusJakartaSans.className} flex flex-col justify-between min-h-screen`}
      >
        <header>
          <Navbar />
        </header>
        <div className="relative grid flex-grow md:grid-cols-6">
          <Sidebar />
          <main className="w-full px-4 pt-24 pb-4 overflow-auto md:col-span-4 lg:col-span-5">
            {children}
          </main>
        </div>
        <footer className="p-2 dark:bg-neutral-900 bg-neutral-300">
          <Footer />
        </footer>
      </body>
    </html>
  );
}

export { RootLayout as default, metadata };
