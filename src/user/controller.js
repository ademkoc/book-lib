/**
 * User Controller
 */
import createError from "http-errors";

import * as userService from "./service.js";
import * as bookService from "../book/service.js";

export default {
  /**
   * GET:/user
   * Return all users
   */
  index: async function (request, response) {
    return response.json(await userService.findAll());
  },

  /**
   * POST:/user
   * Create an user
   */
  create: async function (request, response) {
    const body = request.body;
    await userService.create({
      name: body.name,
    });

    return response.status(201).end();
  },

  /**
   * GET:/user/:userId
   * Return single user
   */
  show: async function (request, response) {
    const user = await userService.findByIdWithBooks(request.params.userId);
    return response.json(user);
  },
};
