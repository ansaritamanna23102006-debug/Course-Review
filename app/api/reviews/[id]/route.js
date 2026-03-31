import { connectDB } from '@/lib/db';
import Review from '@/models/Review';
import { NextResponse } from 'next/server';

/**
 * DELETE /api/reviews/:id
 * Delete a review (requires admin password)
 */
export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const { id } = params;
    const { adminPassword } = await request.json();

    // Verify admin password
    if (adminPassword !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized',
        },
        { status: 401 }
      );
    }

    // Validate MongoDB ID
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid review ID',
        },
        { status: 400 }
      );
    }

    // Delete the review
    const result = await Review.findByIdAndDelete(id);

    if (!result) {
      return NextResponse.json(
        {
          success: false,
          error: 'Review not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Review deleted successfully',
        data: result,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting review:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to delete review',
      },
      { status: 500 }
    );
  }
}
