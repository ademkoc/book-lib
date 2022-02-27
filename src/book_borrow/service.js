import createError from "http-errors";
import { knex } from "../knex.js";

import * as userService from "../user/service.js";
import * as bookService from "../book/service.js";

/**
 *
 * Returns book borrowed by the user
 * If not exists it will be throw BadRequest error
 */
export async function findCurrentBook(userId, bookId) {
  const records = await knex.select().from("borrowed_books").where({
    is_book_returned: false,
    user_id: userId,
    book_id: bookId,
  });

  if (records.length === 0) {
    throw new createError(
      400,
      `Could not find borrowed book record with id ${bookId}`
    );
  }

  return mapRecord(
    records[0],
    await userService.findById(records[0].user_id),
    await bookService.findById(records[0].book_id)
  );
}

/**
 *
 * Returns all books borrowed by the user
 * if there is no book its will return only user
 */
export async function findByUser(user) {
  const books = await bookService.findAll();

  const records = await knex
    .select()
    .from("borrowed_books")
    .where({ user_id: user.id });

  return Promise.all(
    records.map(async (record) =>
      mapRecord(
        record,
        user,
        books.find((book) => book.id === record.book_id)
      )
    )
  );
}

export async function create(borrowBook) {
  const result = await knex("borrowed_books").insert({
    user_id: borrowBook.user.id,
    book_id: borrowBook.book.id,
    is_book_returned: false,
    given_score: -1,
    created_at: new Date(),
    modified_at: new Date(),
  });

  return {
    ...borrowBook,
    id: result[0],
    createdAt: new Date(),
    modifiedAt: new Date(),
  };
}

export async function updateById(id, score) {
  await knex("borrowed_books")
    .update({
      is_book_returned: true,
      given_score: score,
      return_date: new Date(),
      modified_at: new Date(),
    })
    .where({ id });
}

function mapRecord(input, user, book) {
  return {
    id: input.id,
    book,
    user,
    isReturned: !!input.is_book_returned,
    givenScore: input.given_score,
  };
}
