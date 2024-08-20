// book.router.js
const express = require("express");
const router = express.Router();

const bookRouter = (BookController, AuthMiddleware, multerMiddleware) => {
  router.get("/", async (req, res, next) => {
    try {
      const books = await BookController.getBooks();
      res.status(200).send(books);
    } catch (error) {
      next(error);
    }
  });

  router.get("/:id", async (req, res, next) => {
    try {
      const id = req.params.id;
      const book = await BookController.getBookById(id);
      if (!book) {
        res.status(404).send({ message: "Book not found" });
      }
      res.status(200).send(book);
    } catch (error) {
      next(error);
    }
  });

  router.post(
    "",
    AuthMiddleware.anyUser(BookController.authRepository),
    multerMiddleware.uploadSingleImage("coverImageUrl"),
    async (req, res, next) => {
      try {
        const book = await BookController.createBook(req.body);
        res.status(201).send(book);
      } catch (error) {
        next(error);
      }
    }
  );

  router.patch(
    "/:id",
    AuthMiddleware.anyUser(BookController.authRepository),
    // multerMiddleware.uploadeSingleImage("coverImageUrl"),
    async (req, res, next) => {
      try {
        const book = await BookController.updateBook(req.params.id, req.body);
        res.status(200).send(book);
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    "/:id",
    AuthMiddleware.anyUser(BookController.authRepository),
    async (req, res, next) => {
      try {
        const book = await BookController.deleteBook(req.params.id);
        res.status(204).send(book);
      } catch (error) {
        next(error);
      }
    }
  );

  return router;
};

module.exports = bookRouter;
