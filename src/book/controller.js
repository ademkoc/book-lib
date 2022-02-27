/**
 * Book Controller
 */
import * as bookService from "./service.js";

export default {
  /**
   * GET:/book
   * Return all books
   */
  index: async function (request, response) {
    const books = await bookService.findAll();
    return response.json(books.map((book) => book.toSimpleResponse()));
  },

  /**
   * POST:/book
   * Create an book
   */
  create: async function (request, response) {
    const body = request.body;
    await bookService.create({
      name: body.name,
    });

    return response.status(201).end();
  },

  /**
   * GET:/book/:bookId
   * Return single book
   */
  show: async function (request, response) {
    const user = await bookService.findById(request.params.bookId);
    return response.json(user.toResponse());
  },
};
