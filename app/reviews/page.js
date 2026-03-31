'use client';

import { useState, useEffect } from 'react';
import ReviewCard from '@/components/ReviewCard';
import Pagination from '@/components/Pagination';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalReviews, setTotalReviews] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [sort, setSort] = useState('latest');
  const [rating, setRating] = useState('');
  const [search, setSearch] = useState('');

  // Fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.append('page', page);
        params.append('limit', 10);
        params.append('sort', sort);
        if (rating) params.append('rating', rating);
        if (search) params.append('search', search);

        const response = await fetch(`/api/reviews?${params.toString()}`);
        const data = await response.json();

        if (data.success) {
          setReviews(data.data);
          setTotalPages(data.pagination.pages);
          setTotalReviews(data.analytics.totalReviews);
          setAverageRating(data.analytics.averageRating);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [page, sort, rating, search]);

  // Handle filter/search change - reset to page 1
  const handleSortChange = (e) => {
    setSort(e.target.value);
    setPage(1);
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
    setPage(1);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-dark-green mb-2">All Course Reviews</h1>
        <p className="text-gray-600">
          Total: {totalReviews} reviews · Average Rating: {averageRating.toFixed(1)} ⭐
        </p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <label htmlFor="search" className="block text-sm font-semibold text-gray-700 mb-2">
              Search Course
            </label>
            <input
              type="text"
              id="search"
              value={search}
              onChange={handleSearchChange}
              placeholder="Enter course title..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-green"
            />
          </div>

          {/* Rating Filter */}
          <div>
            <label htmlFor="rating" className="block text-sm font-semibold text-gray-700 mb-2">
              Filter by Rating
            </label>
            <select
              id="rating"
              value={rating}
              onChange={handleRatingChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-green"
            >
              <option value="">All Ratings</option>
              <option value="5">⭐⭐⭐⭐⭐ (5 stars)</option>
              <option value="4">⭐⭐⭐⭐ (4 stars)</option>
              <option value="3">⭐⭐⭐ (3 stars)</option>
              <option value="2">⭐⭐ (2 stars)</option>
              <option value="1">⭐ (1 star)</option>
            </select>
          </div>

          {/* Sort */}
          <div>
            <label htmlFor="sort" className="block text-sm font-semibold text-gray-700 mb-2">
              Sort By
            </label>
            <select
              id="sort"
              value={sort}
              onChange={handleSortChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-green"
            >
              <option value="latest">Latest First</option>
              <option value="oldest">Oldest First</option>
              <option value="highest">Highest Rated</option>
              <option value="lowest">Lowest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      {loading ? (
        <LoadingSpinner />
      ) : reviews.length > 0 ? (
        <>
          <div className="space-y-4">
            {reviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination current={page} total={totalPages} onPageChange={setPage} />
          )}
        </>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-600 mb-4">
            {search || rating ? 'No reviews match your filters.' : 'No reviews yet.'}
          </p>
          {!search && !rating && (
            <>
              <p className="text-gray-600 mb-4">Be the first to share your course experience!</p>
              <a
                href="/add-review"
                className="text-pastel-green hover:text-dark-green font-semibold"
              >
                Add a Review →
              </a>
            </>
          )}
        </div>
      )}
    </div>
  );
}
