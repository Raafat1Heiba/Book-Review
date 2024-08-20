const ReviewModel = require("../models/review.model");

class ReviewRepository {
  constructor() {}

  async getReviews(bookId) {
    return await ReviewModel.find({ bookId }).populate("userId", "fullName");
  }
  async getUserReviews(userId) {
    return await ReviewModel.find({ userId }).populate("bookId", "title");
  }

  async createReview(reviewInfo) {
    return await ReviewModel.create(reviewInfo);
  }

  async updateReview(_id, review) {
    return await ReviewModel.findByIdAndUpdate(_id, review, { new: true });
  }

  async deleteReview(_id) {
    const review = await ReviewModel.findByIdAndDelete(_id);
    return review;
  }
}

module.exports = ReviewRepository;
