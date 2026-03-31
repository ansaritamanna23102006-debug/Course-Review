'use client';

import { useState } from 'react';
import Toast from './Toast';

/**
 * Admin Table component
 * Displays reviews in a table format with delete functionality
 */
export default function AdminTable({ reviews, adminPassword, onReviewDeleted }) {
  const [toast, setToast] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Handle delete
  const handleDelete = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) {
      return;
    }

    setDeletingId(reviewId);

    try {
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ adminPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete review');
      }

      setToast({
        message: 'Review deleted successfully',
        type: 'success',
      });

      if (onReviewDeleted) {
        onReviewDeleted(reviewId);
      }
    } catch (error) {
      setToast({
        message: error.message,
        type: 'error',
      });
    } finally {
      setDeletingId(null);
    }
  };

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No reviews found</p>
      </div>
    );
  }

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-pastel-green text-white">
              <th className="px-4 py-3 text-left">Course Title</th>
              <th className="px-4 py-3 text-left">Platform</th>
              <th className="px-4 py-3 text-center">Rating</th>
              <th className="px-4 py-3 text-left">Author</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review._id} className="border-b hover:bg-light-green transition">
                <td className="px-4 py-3 font-semibold">{review.courseTitle}</td>
                <td className="px-4 py-3">{review.platform}</td>
                <td className="px-4 py-3 text-center">
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-semibold">
                    {review.rating} ⭐
                  </span>
                </td>
                <td className="px-4 py-3">{review.name}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{formatDate(review.createdAt)}</td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => handleDelete(review._id)}
                    disabled={deletingId === review._id}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition disabled:opacity-50"
                  >
                    {deletingId === review._id ? 'Deleting...' : 'Delete'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
