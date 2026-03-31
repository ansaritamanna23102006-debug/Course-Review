import Link from 'next/link';
import { connectDB } from '@/lib/db';
import Review from '@/models/Review';
import ReviewCard from '@/components/ReviewCard';

export const revalidate = 60; // Revalidate every 60 seconds

async function getFeaturedReviews() {
  try {
    await connectDB();
    // Get highest rated reviews
    const reviews = await Review.find()
      .sort({ rating: -1 })
      .limit(3)
      .lean();
    return reviews;
  } catch (error) {
    console.error('Error fetching featured reviews:', error);
    return [];
  }
}

async function getAnalytics() {
  try {
    await connectDB();
    const total = await Review.countDocuments();
    const avgRating =
      total > 0
        ? (
            await Review.aggregate([
              { $group: { _id: null, avg: { $avg: '$rating' } } },
            ])
          )[0]?.avg || 0
        : 0;

    return {
      totalReviews: total,
      averageRating: parseFloat(avgRating.toFixed(1)),
    };
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return { totalReviews: 0, averageRating: 0 };
  }
}

export default async function Home() {
  const featuredReviews = await getFeaturedReviews();
  const analytics = await getAnalytics();

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pastel-green to-light-green rounded-lg p-8 md:p-12 text-center shadow-lg">
        <h1 className="text-4xl md:text-5xl font-bold text-dark-green mb-4">
          Welcome to CourseReview
        </h1>
        <p className="text-lg text-dark-green mb-6 max-w-2xl mx-auto">
          Discover honest reviews from real learners. Help others find the best online courses on platforms like Udemy, Coursera, and YouTube.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/add-review"
            className="bg-dark-green text-white px-6 py-3 rounded-lg font-semibold hover:bg-pastel-green transition"
          >
            Share Your Review
          </Link>
          <Link
            href="/reviews"
            className="bg-white text-dark-green px-6 py-3 rounded-lg font-semibold border-2 border-dark-green hover:bg-dark-green hover:text-white transition"
          >
            Browse Reviews
          </Link>
        </div>
      </section>

      {/* Analytics Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-pastel-green">
          <div className="text-4xl font-bold text-dark-green mb-2">
            {analytics.totalReviews}
          </div>
          <p className="text-gray-600">Total Reviews</p>
          <p className="text-sm text-gray-500 mt-2">
            Community members have shared their course experiences
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-pastel-green">
          <div className="text-4xl font-bold text-yellow-500 mb-2">
            {analytics.averageRating.toFixed(1)} ⭐
          </div>
          <p className="text-gray-600">Average Rating</p>
          <p className="text-sm text-gray-500 mt-2">
            Based on all submitted reviews
          </p>
        </div>
      </section>

      {/* Featured Reviews Section */}
      <section>
        <h2 className="text-3xl font-bold text-dark-green mb-6">Top Rated Reviews</h2>
        {featuredReviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredReviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600 mb-4">No reviews yet. Be the first to share!</p>
            <Link
              href="/add-review"
              className="text-pastel-green hover:text-dark-green font-semibold"
            >
              Add a Review →
            </Link>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-dark-green text-white rounded-lg p-8 md:p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Share Your Course Experience</h2>
        <p className="text-light-green mb-6">
          Help other learners make informed decisions. Submit your honest review today!
        </p>
        <Link
          href="/add-review"
          className="inline-block bg-pastel-green text-dark-green px-8 py-3 rounded-lg font-semibold hover:bg-light-green transition"
        >
          Write a Review
        </Link>
      </section>
    </div>
  );
}
