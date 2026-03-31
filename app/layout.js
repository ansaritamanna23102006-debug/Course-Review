import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'CourseReview - Share Your Learning Experience',
  description: 'A platform to review and discover online courses from top platforms like Udemy, Coursera, and YouTube',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-cream">
        <Header />
        <main className="min-h-screen max-w-7xl mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
