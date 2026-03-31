'use client';

import Link from 'next/link';
import { useState } from 'react';

/**
 * Header/Navigation component
 */
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-dark-green">
            <span>📚</span>
            <span>CourseReview</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6 items-center">
            <Link href="/" className="text-gray-700 hover:text-pastel-green transition">
              Home
            </Link>
            <Link href="/add-review" className="text-gray-700 hover:text-pastel-green transition">
              Add Review
            </Link>
            <Link href="/reviews" className="text-gray-700 hover:text-pastel-green transition">
              All Reviews
            </Link>
            <Link href="/admin" className="text-gray-700 hover:text-pastel-green transition">
              Admin
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden mt-4 flex flex-col gap-3">
            <Link href="/" className="text-gray-700 hover:text-pastel-green transition py-2">
              Home
            </Link>
            <Link href="/add-review" className="text-gray-700 hover:text-pastel-green transition py-2">
              Add Review
            </Link>
            <Link href="/reviews" className="text-gray-700 hover:text-pastel-green transition py-2">
              All Reviews
            </Link>
            <Link href="/admin" className="text-gray-700 hover:text-pastel-green transition py-2">
              Admin
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
