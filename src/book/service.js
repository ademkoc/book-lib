import createError from "http-erros";
import { knex } from "../knex";

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

export async function create(book) {
  const result = await knex("books").insert({
    name: book.name,
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

export async function update(book) {
  await knex("books")
    .update({
      name: book.name,
      modified_at: new Date(),
    })
    .where({ id: book.id });
}

function mapRecord(input) {
  return {
    id: input.id,
    name: input.name,
    createdAt: input.created_at,
    modifiedAt: input.modified_at,
  };
}
