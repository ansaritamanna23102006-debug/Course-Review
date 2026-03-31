'use client';

import { useState } from 'react';
import StarRating from './StarRating';
import Toast from './Toast';
import LoadingSpinner from './LoadingSpinner';

/**
 * Review Form component
 * Handles form submission for adding new reviews
 */
export default function ReviewForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    courseTitle: '',
    platform: 'Udemy',
    name: '',
    rating: 0,
    description: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const platforms = ['Udemy', 'Coursera', 'YouTube', 'LinkedIn Learning', 'Pluralsight', 'Other'];

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.courseTitle.trim()) {
      newErrors.courseTitle = 'Course title is required';
    } else if (formData.courseTitle.length > 200) {
      newErrors.courseTitle = 'Course title cannot exceed 200 characters';
    }

    if (!formData.platform) {
      newErrors.platform = 'Platform is required';
    }

    if (formData.rating === 0) {
      newErrors.rating = 'Please select a rating';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Review description is required';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Review must be at least 10 characters';
    } else if (formData.description.length > 1000) {
      newErrors.description = 'Review cannot exceed 1000 characters';
    }

    return newErrors;
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // Handle rating change
  const handleRatingChange = (rating) => {
    setFormData((prev) => ({
      ...prev,
      rating,
    }));
    if (errors.rating) {
      setErrors((prev) => ({
        ...prev,
        rating: '',
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.details?.[0] || data.error || 'Failed to submit review');
      }

      // Success
      setToast({
        message: 'Review submitted successfully! Thank you for sharing.',
        type: 'success',
      });

      // Reset form
      setFormData({
        courseTitle: '',
        platform: 'Udemy',
        name: '',
        rating: 0,
        description: '',
      });
      setErrors({});

      // Call onSuccess callback
      if (onSuccess) {
        setTimeout(onSuccess, 1500);
      }
    } catch (error) {
      setToast({
        message: error.message,
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle reset
  const handleReset = () => {
    setFormData({
      courseTitle: '',
      platform: 'Udemy',
      name: '',
      rating: 0,
      description: '',
    });
    setErrors({});
  };

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-dark-green mb-6">Add a Course Review</h1>

        {/* Course Title */}
        <div className="mb-5">
          <label htmlFor="courseTitle" className="block text-sm font-semibold text-gray-700 mb-2">
            Course Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="courseTitle"
            name="courseTitle"
            value={formData.courseTitle}
            onChange={handleInputChange}
            placeholder="Enter course title"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-green transition ${
              errors.courseTitle ? 'border-red-500' : 'border-gray-300'
            }`}
            maxLength="200"
          />
          {errors.courseTitle && (
            <p className="text-red-500 text-sm mt-1">{errors.courseTitle}</p>
          )}
          <p className="text-xs text-gray-500 mt-1">{formData.courseTitle.length}/200</p>
        </div>

        {/* Platform */}
        <div className="mb-5">
          <label htmlFor="platform" className="block text-sm font-semibold text-gray-700 mb-2">
            Platform <span className="text-red-500">*</span>
          </label>
          <select
            id="platform"
            name="platform"
            value={formData.platform}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-green transition ${
              errors.platform ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            {platforms.map((platform) => (
              <option key={platform} value={platform}>
                {platform}
              </option>
            ))}
          </select>
          {errors.platform && (
            <p className="text-red-500 text-sm mt-1">{errors.platform}</p>
          )}
        </div>

        {/* Your Name */}
        <div className="mb-5">
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
            Your Name (Optional)
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your name or leave blank for Anonymous"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-green transition"
            maxLength="100"
          />
          <p className="text-xs text-gray-500 mt-1">{formData.name.length}/100</p>
        </div>

        {/* Rating */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Rating <span className="text-red-500">*</span>
          </label>
          <StarRating value={formData.rating} onChange={handleRatingChange} />
          {errors.rating && (
            <p className="text-red-500 text-sm mt-2">{errors.rating}</p>
          )}
        </div>

        {/* Review Description */}
        <div className="mb-6">
          <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
            Review Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Share your thoughts about the course..."
            rows="5"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-green transition resize-none ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
            maxLength="1000"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
          <p className="text-xs text-gray-500 mt-1">{formData.description.length}/1000</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-pastel-green text-white py-2 px-4 rounded-lg font-semibold hover:bg-dark-green transition disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit Review'}
          </button>
          <button
            type="button"
            onClick={handleReset}
            disabled={loading}
            className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-400 transition disabled:opacity-50"
          >
            Reset
          </button>
        </div>
      </form>
    </>
  );
}
