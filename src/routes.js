import express from "express";

import userController from "./user/controller.js";
import bookController from "./book/controller.js";

const router = express.Router();

export default [
  // user routes
  router.get("/users", userController.index),
  router.post("/users", userController.create),
  router.get("/users/:userid", userController.show),
  router.post("/users/:userid/borrow/:bookid", userController.borrow),
  router.post("/users/:userid/return/:bookid", userController.return),

  // book routes
  router.get("/books", bookController.index),
  router.post("/books", bookController.create),
  router.get("/books/:bookid", bookController.show),
];
