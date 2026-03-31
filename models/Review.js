import mongoose from 'mongoose';

// Define the Review schema
const reviewSchema = new mongoose.Schema(
  {
    courseTitle: {
      type: String,
      required: [true, 'Course title is required'],
      trim: true,
      maxlength: [200, 'Course title cannot exceed 200 characters'],
    },
    platform: {
      type: String,
      required: [true, 'Platform is required'],
      enum: {
        values: ['Udemy', 'Coursera', 'YouTube', 'LinkedIn Learning', 'Pluralsight', 'Other'],
        message: 'Please select a valid platform',
      },
    },
    name: {
      type: String,
      trim: true,
      default: 'Anonymous',
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5'],
    },
    description: {
      type: String,
      required: [true, 'Review description is required'],
      minlength: [10, 'Review must be at least 10 characters'],
      maxlength: [1000, 'Review cannot exceed 1000 characters'],
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model re-initialization in development
export default mongoose.models.Review || mongoose.model('Review', reviewSchema);
