'use client';

/**
 * Footer component
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-green text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="text-lg font-bold mb-4">CourseReview</h4>
            <p className="text-light-green">
              Help others find the best online courses with honest reviews.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-light-green">
              <li><a href="/reviews" className="hover:text-white transition">All Reviews</a></li>
              <li><a href="/add-review" className="hover:text-white transition">Add Review</a></li>
              <li><a href="/admin" className="hover:text-white transition">Admin</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Platforms</h4>
            <ul className="space-y-2 text-light-green">
              <li>Udemy</li>
              <li>Coursera</li>
              <li>YouTube</li>
              <li>LinkedIn Learning</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-light-green pt-6 text-center text-light-green">
          <p>&copy; {currentYear} CourseReview System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
