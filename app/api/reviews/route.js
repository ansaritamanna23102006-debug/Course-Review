import { connectDB } from '@/lib/db';
import Review from '@/models/Review';
import { NextResponse } from 'next/server';

/**
 * GET /api/reviews
 * Fetch all reviews with pagination and filtering
 */
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const rating = searchParams.get('rating');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort') || 'latest';

    // Build filter object
    const filter = {};
    if (rating) {
      filter.rating = parseInt(rating);
    }
    if (search) {
      filter.courseTitle = { $regex: search, $options: 'i' };
    }

    // Build sort object
    let sortObj = {};
    switch (sort) {
      case 'highest':
        sortObj = { rating: -1 };
        break;
      case 'lowest':
        sortObj = { rating: 1 };
        break;
      case 'oldest':
        sortObj = { createdAt: 1 };
        break;
      case 'latest':
      default:
        sortObj = { createdAt: -1 };
    }

    const skip = (page - 1) * limit;

    // Fetch reviews and total count
    const reviews = await Review.find(filter)
      .sort(sortObj)
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Review.countDocuments(filter);

    // Calculate analytics
    const avgRating =
      total > 0
        ? (
            await Review.aggregate([
              { $match: filter },
              { $group: { _id: null, avg: { $avg: '$rating' } } },
            ])
          )[0]?.avg || 0
        : 0;

    return NextResponse.json(
      {
        success: true,
        data: reviews,
        pagination: {
          current: page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
        analytics: {
          totalReviews: total,
          averageRating: parseFloat(avgRating.toFixed(1)),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch reviews',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/reviews
 * Create a new review
 */
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    // Validate required fields
    const { courseTitle, platform, rating, description, name } = body;

    if (!courseTitle || !platform || !rating || !description) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: courseTitle, platform, rating, description',
        },
        { status: 400 }
      );
    }

    // Create and save the review
    const review = new Review({
      courseTitle,
      platform,
      rating: parseInt(rating),
      description,
      name: name || 'Anonymous',
    });

    await review.save();

    return NextResponse.json(
      {
        success: true,
        message: 'Review created successfully',
        data: review,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating review:', error);

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: messages,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to create review',
      },
      { status: 500 }
    );
  }
}
