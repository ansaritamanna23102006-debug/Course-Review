'use client';

import { useState } from 'react';

/**
 * Star Rating component
 * Displays and allows selection of star ratings (1-5)
 */
export default function StarRating({ value = 0, onChange, readonly = false }) {
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseEnter = (rating) => {
    if (!readonly) setHoverRating(rating);
  };

  const handleMouseLeave = () => {
    if (!readonly) setHoverRating(0);
  };

  const handleClick = (rating) => {
    if (!readonly && onChange) {
      onChange(rating);
    }
  };

  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type={readonly ? 'button' : 'button'}
          onMouseEnter={() => handleMouseEnter(star)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(star)}
          disabled={readonly}
          className={`text-3xl transition-colors ${
            star <= (hoverRating || value)
              ? 'text-yellow-400'
              : 'text-gray-300'
          } ${!readonly && 'cursor-pointer hover:scale-110'}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}
