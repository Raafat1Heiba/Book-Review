const BookModel = require("../models/book.model");

class BookRepository {
  constructor() {}

  async getBooks() {
    return await BookModel.find();
  }

  async getBookById(id) {
    return await BookModel.findById(id);
  }

  async createBook(bookInfo) {
    return await BookModel.create(bookInfo);
  }

  async updateBook(_id, book) {
    return await BookModel.findByIdAndUpdate(_id, book, { new: true });
  }

  async deleteBook(_id) {
    const book = await BookModel.findByIdAndDelete(_id);
    return book;
  }
}
module.exports = BookRepository;
