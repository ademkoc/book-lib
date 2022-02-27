import createError from "http-errors";

import * as bookBorrowService from "./service.js";
import * as bookService from "../book/service.js";
import * as userService from "../user/service.js";

export default {
  /**
   * POST:/users/:userId/borrow/:bookId
   * Borrow a book
   */
  borrow: async function (request, response) {
    const { bookId, userId } = request.params;

    // Control resources
    const [user, book] = await Promise.all([
      userService.findById(userId),
      bookService.findById(bookId),
    ]);

    if (book.isAvailable === false) {
      throw createError(400, "This book was taken");
    }

    // Borrow book
    const borrowedBook = await bookBorrowService.create({ user, book });

    // Update borrowed books status
    await bookService.updateStatus(book);

    return response.sendStatus(204);
  },

  /**
   * POST:/users/:userId/return/:bookId
   * Return a book
   */
  return: async function (request, response) {
    const { bookId, userId } = request.params;
    const { score } = request.body;

    // Control resources
    const borrowBook = await bookBorrowService.findCurrentBook(userId, bookId);

    await bookBorrowService.updateById(borrowBook.id, score);

    const book = await bookService.findAverageBookScore(borrowBook.book);

    // Update borrowed books status
    await bookService.updateStatus(book);

    return response.sendStatus(204);
  },
};
