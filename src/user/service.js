import createError from "http-errors";
import { knex } from "../knex.js";

// import * as bookService from "../book/service.js";
// import * as userService from "../user/service.js";
import * as bookBorrowService from "../book_borrow/service.js";

export async function findAll() {
  const records = await knex.select().from("users");
  return records.map((record) => mapRecord(record));
}

export async function findById(id) {
  const records = await knex.select().from("users").where("id", id);

  if (records.length === 0) {
    throw new createError(400, `Could not find user with id ${id}`);
  }

  return mapRecord(records[0]);
}

export async function findByIdWithBooks(id) {
  const record = await findById(id);
  const userBorrowedBooks = await bookBorrowService.findByUser(record);
  return mapUser(record, userBorrowedBooks);
}

export async function create(user) {
  const result = await knex("users").insert({
    name: user.name,
    created_at: new Date(),
    modified_at: new Date(),
  });

  return {
    ...user,
    id: result[0],
    createdAt: new Date(),
    modifiedAt: new Date(),
  };
}

export async function update(user) {
  await knex("users")
    .update({
      name: user.name,
      modified_at: new Date(),
    })
    .where({ id: user.id });
}

function mapRecord(input) {
  return {
    id: input.id,
    name: input.name,
  };
}

function mapUser(user, borrowBooks = []) {
  return {
    id: user.id,
    name: user.name,
    books: {
      past: borrowBooks
        .filter((borrowBook) => borrowBook.isReturned === true)
        .map((borrowBook) => ({
          name: borrowBook.book.name,
          userScore: borrowBook.givenScore,
        })),
      present: borrowBooks
        .filter((borrowBook) => borrowBook.isReturned === false)
        .map((borrowBook) => ({ name: borrowBook.book.name })),
    },
  };
}
