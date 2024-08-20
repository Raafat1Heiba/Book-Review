const express = require("express");
const router = express.Router();

const reviewRouter = (reviewController, authMiddleware) => {
  router.get("/", async (req, res, next) => {
    try {
      const bookId = req.query.bookId;
      const reviews = await reviewController.getReviews(bookId);
      res.status(200).send(reviews);
    } catch (error) {
      console.error(`Error in GET /reviews: ${error.message}`);
      next(error);
    }
  });
  router.get(
    "/user-reviews",
    authMiddleware.anyUser(reviewController.authRepository),
    async (req, res, next) => {
      try {
        const reviews = await reviewController.getUserReviews(req.auth._id);
        res.status(200).send(reviews);
      } catch (error) {
        console.error(`Error in GET /user-reviews: ${error.message}`);
        next(error);
      }
    }
  );

  router.post(
    "/",
    authMiddleware.anyUser(reviewController.authRepository),
    async (req, res, next) => {
      try {
        const review = await reviewController.createReview(
          req.auth._id,
          req.body.bookId,
          req.body.reviewText,
          req.body.rating
        );
        res.status(201).send(review);
      } catch (error) {
        console.error(`Error in POST /reviews: ${error.message}`);
        next(error);
      }
    }
  );

  router.patch(
    "/:reviewId",
    authMiddleware.anyUser(reviewController.authRepository),
    async (req, res, next) => {
      try {
        const review = await reviewController.updateReview(
          req.params.reviewId,
          req.body
        );
        res.status(200).send(review);
      } catch (error) {
        console.error(`Error in PATCH /reviews/:reviewId: ${error.message}`);
        next(error);
      }
    }
  );

  router.delete(
    "/:reviewId",
    authMiddleware.anyUser(reviewController.authRepository),
    async (req, res, next) => {
      try {
        const result = await reviewController.deleteReview(req.params.reviewId);
        res.status(200).send(result);
      } catch (error) {
        console.error(`Error in DELETE /reviews/:reviewId: ${error.message}`);
        next(error);
      }
    }
  );

  return router;
};

module.exports = reviewRouter;
