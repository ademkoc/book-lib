/**
 * Book Controller
 */

export default {
  /**
   * GET:/book
   * Return all books
   */
  index: async function (request, response) {
    return response.send("index");
  },

  /**
   * POST:/book
   * Create an book
   */
  create: async function (request, response) {
    return response.send("create");
  },

  /**
   * GET:/book/:itemid
   * Return single book
   */
  show: async function (request, response) {
    return response.send("show");
  },
};
