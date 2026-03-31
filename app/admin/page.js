'use client';

import { useState, useEffect } from 'react';
import AdminTable from '@/components/AdminTable';
import LoadingSpinner from '@/components/LoadingSpinner';
import Toast from '@/components/Toast';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [filterRating, setFilterRating] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Handle authentication
  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD || password === 'admin123secure') {
      setIsAuthenticated(true);
      setPassword('');
      fetchReviews();
    } else {
      setError('Invalid password');
      setPassword('');
    }
  };

  // Fetch all reviews
  const fetchReviews = async (filter = '') => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('limit', 100);
      if (filterRating) params.append('rating', filterRating);
      if (searchTerm) params.append('search', searchTerm);

      const response = await fetch(`/api/reviews?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setReviews(data.data);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setToast({
        message: 'Error fetching reviews',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle review deleted
  const handleReviewDeleted = (reviewId) => {
    setReviews((prev) => prev.filter((r) => r._id !== reviewId));
  };

  // Update filters
  useEffect(() => {
    if (isAuthenticated) {
      fetchReviews();
    }
  }, [filterRating, searchTerm]);

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-dark-green mb-6 text-center">Admin Login</h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Admin Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="Enter admin password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-green"
                autoFocus
              />
            </div>

            <button
              type="submit"
              className="w-full bg-pastel-green text-white py-2 px-4 rounded-lg font-semibold hover:bg-dark-green transition"
            >
              Login
            </button>
          </form>

          <div className="mt-6 p-4 bg-light-green rounded">
            <p className="text-sm text-gray-700">
              <strong>Demo:</strong> Default password is <code className="bg-white px-2 py-1 rounded">admin123secure</code>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-dark-green">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Total Reviews: <span className="font-bold">{reviews.length}</span>
          </p>
        </div>
        <button
          onClick={() => {
            setIsAuthenticated(false);
            setPassword('');
            setReviews([]);
          }}
          className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="search" className="block text-sm font-semibold text-gray-700 mb-2">
              Search by Course Title
            </label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-green"
            />
          </div>

          <div>
            <label htmlFor="rating" className="block text-sm font-semibold text-gray-700 mb-2">
              Filter by Rating
            </label>
            <select
              id="rating"
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-green"
            >
              <option value="">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reviews Table */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <AdminTable
            reviews={reviews}
            adminPassword={process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123secure'}
            onReviewDeleted={handleReviewDeleted}
          />
        </div>
      )}
    </div>
  );
}
