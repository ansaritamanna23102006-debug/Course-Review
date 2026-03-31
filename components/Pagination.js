'use client';

/**
 * Pagination component
 */
export default function Pagination({ current, total, onPageChange }) {
  const pages = Array.from({ length: total }, (_, i) => i + 1);
  const maxVisible = 5;
  let startPage = Math.max(1, current - Math.floor(maxVisible / 2));
  let endPage = Math.min(total, startPage + maxVisible - 1);

  if (endPage - startPage + 1 < maxVisible) {
    startPage = Math.max(1, endPage - maxVisible + 1);
  }

  const visiblePages = pages.slice(startPage - 1, endPage);

  return (
    <div className="flex justify-center items-center gap-2 my-8">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(current - 1)}
        disabled={current === 1}
        className="px-3 py-2 border border-gray-300 rounded hover:bg-pastel-green hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        ← Prev
      </button>

      {/* First Page */}
      {startPage > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="px-3 py-2 border border-gray-300 rounded hover:bg-pastel-green hover:text-white transition"
          >
            1
          </button>
          {startPage > 2 && <span className="px-2">...</span>}
        </>
      )}

      {/* Page Numbers */}
      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-2 rounded transition ${
            page === current
              ? 'bg-pastel-green text-white border border-pastel-green'
              : 'border border-gray-300 hover:bg-pastel-green hover:text-white'
          }`}
        >
          {page}
        </button>
      ))}

      {/* Last Page */}
      {endPage < total && (
        <>
          {endPage < total - 1 && <span className="px-2">...</span>}
          <button
            onClick={() => onPageChange(total)}
            className="px-3 py-2 border border-gray-300 rounded hover:bg-pastel-green hover:text-white transition"
          >
            {total}
          </button>
        </>
      )}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(current + 1)}
        disabled={current === total}
        className="px-3 py-2 border border-gray-300 rounded hover:bg-pastel-green hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        Next →
      </button>
    </div>
  );
}
