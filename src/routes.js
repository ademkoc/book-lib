import express from "express";

// The validator middleware lets users easily validate request bodies
// using JSON-Schema
import { validator, asyncHandler } from "./middlewares/index.js";

// Controllers
import userController from "./user/controller.js";
import bookController from "./book/controller.js";
import bookBorrowController from "./book_borrow/controller.js";

const router = express.Router();

export default [
  // user routes
  router.get("/users", asyncHandler(userController.index)),
  router.post(
    "/users",
    validator("https://lib.ademkoc.com/schema/user-new"),
    asyncHandler(userController.create)
  ),
  router.get("/users/:userId", asyncHandler(userController.show)),

  // book routes
  router.get("/books", asyncHandler(bookController.index)),
  router.post(
    "/books",
    validator("https://lib.ademkoc.com/schema/book-new"),
    asyncHandler(bookController.create)
  ),
  router.get("/books/:bookId", asyncHandler(bookController.show)),

  // book borrow routes
  router.post(
    "/users/:userId/borrow/:bookId",
    asyncHandler(bookBorrowController.borrow)
  ),
  router.post(
    "/users/:userId/return/:bookId",
    validator("https://lib.ademkoc.com/schema/book-return"),
    asyncHandler(bookBorrowController.return)
  ),
];
