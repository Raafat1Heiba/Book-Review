const Errors = require("../error/error");

class ReviewController {
  reviewRepository;
  authRepository;

  constructor(_reviewRepository, _authRepository) {
    this.reviewRepository = _reviewRepository;
    this.authRepository = _authRepository;
  }

  async getReviews(bookId) {
    try {
      const reviews = await this.reviewRepository.getReviews(bookId);
      return reviews;
    } catch (error) {
      throw new Errors.ApiError("Missing required fields", 400);
    }
  }
  async getUserReviews(userId) {
    try {
      const reviews = await this.reviewRepository.getUserReviews(userId);
      return reviews;
    } catch (error) {
      throw new Errors.ApiError("Unable to fetch user reviews", 500);
    }
  }

  async createReview(userId, bookId, reviewText, rating) {
    try {
      if (!userId || !bookId || !reviewText || !rating) {
        throw new Errors.ApiError("Missing required fields", 400);
      }

      const review = {
        userId,
        bookId,
        reviewText,
        rating,
      };

      return await this.reviewRepository.createReview(review);
    } catch (error) {
      console.error(`Error in createReview: ${error.message}`);
      throw new Errors.ApiError("Unable to create review", 500);
    }
  }

  async updateReview(reviewId, updateData) {
    try {
      const review = await this.reviewRepository.updateReview(
        reviewId,
        updateData
      );
      if (!review) {
        throw new Errors.ApiError("Review not found", 404);
      }
      return review;
    } catch (error) {
      console.error(`Error in updateReview: ${error.message}`);
      throw new Errors.ApiError("Unable to update review", 500);
    }
  }

  async deleteReview(reviewId) {
    try {
      const review = await this.reviewRepository.deleteReview(reviewId);
      if (!review) {
        throw new Errors.ApiError("Review not found", 404);
      }
      return { message: "Review deleted successfully" };
    } catch (error) {
      console.error(`Error in deleteReview: ${error.message}`);
      throw new Errors.ApiError("Unable to delete review", 500);
    }
  }
}

module.exports = ReviewController;
