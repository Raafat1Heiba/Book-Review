const Errors = require("../error/error");
const multer = require("multer");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const asyncHandler = require("express-async-handler");

const multerStorage = multer.memoryStorage();

const multerFilter = function (req, file, cb) {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Errors.ApiError("Only images are allowed", 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadBookImage = upload.single("coverImage");

exports.resizeBookImage = asyncHandler(async (req, res, next) => {
  if (!req.file) return next();

  const filename = `book-${uuidv4()}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(600, 900)
    .toFormat("jpeg")
    .jpeg({ quality: 95 })
    .toFile(`uploads/books/${filename}`);

  req.body.coverImageUrl = filename;
  console.log("Cover Image URL:", filename);
  next();
});

class BookController {
  BookRepository;
  authRepository;

  constructor(_BookRepository, _authRepository) {
    this.BookRepository = _BookRepository;
    this.authRepository = _authRepository;
  }

  async getBooks() {
    try {
      return await this.BookRepository.getBooks();
    } catch (error) {
      throw new Errors.ApiError("Unable to fetch books", 400);
    }
  }

  async getBookById(id) {
    try {
      return await this.BookRepository.getBookById(id);
    } catch (error) {
      throw new Errors.ApiError("Unable to fetch book by id", 400);
    }
  }

  async createBook(bookInfo) {
    try {
      const { title, author, pages, coverImageUrl, description, reviews } =
        bookInfo;

      if (!title || !author || !pages) {
        throw new Errors.ApiError("Missing required fields", 400);
      }

      const newBook = {
        title,
        author,
        pages,
        coverImageUrl,
        description,
        reviews: reviews || [],
      };

      console.log("Creating book with cover image:", coverImageUrl);

      return await this.BookRepository.createBook(newBook);
    } catch (error) {
      throw new Errors.ApiError("Unable to create book", 500);
    }
  }

  async updateBook(id, book) {
    try {
      return await this.BookRepository.updateBook(id, book);
    } catch (error) {
      throw new Errors.ApiError("Unable to update book", 400);
    }
  }

  async deleteBook(id) {
    try {
      const book = await this.BookRepository.deleteBook(id);
      if (!book) {
        throw new Errors.ApiError("Book not found", 404);
      }
      return { message: "Book deleted successfully" };
    } catch (error) {
      throw new Errors.ApiError("Unable to delete book", 400);
    }
  }
}

module.exports = BookController;
