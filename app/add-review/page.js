'use client';

import { useRouter } from 'next/navigation';
import ReviewForm from '@/components/ReviewForm';

export default function AddReviewPage() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push('/reviews');
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-dark-green mb-2">Share Your Course Review</h1>
        <p className="text-gray-600">Help other learners make informed decisions</p>
      </div>

      <ReviewForm onSuccess={handleSuccess} />

      <div className="max-w-2xl mx-auto bg-light-green rounded-lg p-6 mt-8">
        <h3 className="font-bold text-dark-green mb-3">📝 Tips for a Great Review:</h3>
        <ul className="space-y-2 text-gray-700">
          <li>✓ Be honest about your experience</li>
          <li>✓ Share specific examples from the course</li>
          <li>✓ Mention what you learned</li>
          <li>✓ Note any strengths and areas for improvement</li>
          <li>✓ Help other learners make their decision</li>
        </ul>
      </div>
    </div>
  );
}
