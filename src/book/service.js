import createError from "http-errors";

import { knex } from "../knex.js";

import * as bookBorrowService from "../book_borrow/service.js";

export async function findAll() {
  const records = await knex.select().from("books");
  return records.map((record) => mapRecord(record));
}

export async function findById(id) {
  const records = await knex.select().from("books").where("id", id);

  if (records.length === 0) {
    throw new createError(400, `Could not find book with id ${id}`);
  }

  return mapRecord(records[0]);
}

export async function findByIdWithAverageScore(id) {
  const record = await findById(id);
  return findAverageBookScore(record);
}

export async function create(book) {
  const result = await knex("books").insert({
    name: book.name,
    score: -1,
    is_available: true,
    created_at: new Date(),
    modified_at: new Date(),
  });

  return {
    ...book,
    id: result[0],
    createdAt: new Date(),
    modifiedAt: new Date(),
  };
}

export async function findAverageBookScore(book) {
  const records = await knex
    .select("book_id as id")
    .from("borrowed_books")
    .where({ book_id: book.id })
    .avg("given_score as averageScore")
    .groupBy("book_id");

  if (records.length === 0) {
    return mapRecord({ ...book, score: -1 });
  }

  return mapRecord({ ...book, score: records[0].averageScore });
}

export async function updateStatus(book) {
  await knex("books")
    .update({
      name: book.name,
      score: book.score,
      is_available: !book.isAvailable,
      modified_at: new Date(),
    })
    .where({ id: book.id });
}

function mapRecord(input) {
  return {
    id: input.id,
    name: input.name,
    score: input.score,
    isAvailable: !!input.is_available,
    toResponse: () => ({
      id: input.id,
      name: input.name,
      score: input.score,
    }),
    toSimpleResponse: () => ({
      id: input.id,
      name: input.name,
    }),
  };
}
