'use client';

import StarRating from './StarRating';

/**
 * Review Card component
 * Displays a single review in card format
 */
export default function ReviewCard({ review }) {
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-pastel-green hover:shadow-lg transition">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-xl font-bold text-dark-green mb-1">{review.courseTitle}</h3>
          <p className="text-sm text-gray-600">
            Platform: <span className="font-semibold">{review.platform}</span>
          </p>
        </div>
        <div className="text-right">
          <div className="mb-2">
            <StarRating value={review.rating} readonly={true} />
          </div>
          <p className="text-sm text-gray-600">{review.rating}/5</p>
        </div>
      </div>

      <p className="text-gray-700 mb-4 leading-relaxed">{review.description}</p>

      <div className="flex justify-between items-center text-sm text-gray-600">
        <span className="font-semibold">By: {review.name}</span>
        <span>{formatDate(review.createdAt)}</span>
      </div>
    </div>
  );
}
