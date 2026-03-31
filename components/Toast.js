'use client';

import { useEffect, useState } from 'react';

/**
 * Toast notification component
 * Displays success or error messages with auto-dismiss
 */
export default function Toast({ message, type = 'success', onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose && onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!isVisible) return null;

  const bgColor = type === 'success' ? 'bg-green-100' : 'bg-red-100';
  const textColor = type === 'success' ? 'text-green-700' : 'text-red-700';
  const borderColor = type === 'success' ? 'border-green-400' : 'border-red-400';

  return (
    <div
      className={`fixed top-4 right-4 px-4 py-3 rounded border ${bgColor} ${textColor} ${borderColor} border-l-4 shadow-lg`}
      role="alert"
    >
      <p className="font-semibold text-sm">{message}</p>
    </div>
  );
}
