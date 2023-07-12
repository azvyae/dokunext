import { Footer, Navbar, Sidebar } from '@/components';
import type { Metadata } from 'next';
import './globals.css';
import { styles } from './layout.styles';
const metadata: Metadata = {
  title: 'dokuNEXT API',
  description: 'DokuNEXT, simple API documentation parser for Postman.'
};

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={styles.body}>
        <header>
          <Navbar />
        </header>
        <div className={styles.content}>
          <Sidebar />
          <main className={styles.main}>{children}</main>
        </div>
        <footer className={styles.footer}>
          <Footer />
        </footer>
      </body>
    </html>
  );
}

export { RootLayout as default, metadata };
