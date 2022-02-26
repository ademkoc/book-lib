/**
 * User Controller
 */

export default {
  /**
   * GET:/user
   * Return all users
   */
  index: async function (request, response) {
    return response.send("index");
  },

  /**
   * POST:/user
   * Create an user
   */
  create: async function (request, response) {
    return response.send("create");
  },

  /**
   * GET:/user/:userid
   * Return single user
   */
  show: async function (request, response) {
    return response.send("show");
  },

  /**
   * POST:/users/:userid/borrow/:bookid
   * Borrow a book
   */
  borrow: async function (request, response) {
    return response.send("borrow");
  },

  /**
   * POST:/users/:userid/return/:bookid
   * Return a book
   */
  return: async function (request, response) {
    return response.send("return");
  },
};
