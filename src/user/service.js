import createError from "http-erros";
import { knex } from "../knex";

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
    createdAt: input.created_at,
    modifiedAt: input.modified_at,
  };
}
