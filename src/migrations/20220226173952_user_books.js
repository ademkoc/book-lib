export async function up(knex) {
  await knex.schema.createTable("user_books", function (table) {
    table.increments("id");
    table.integer("user_id").unsigned().notNullable();
    table.integer("book_id").unsigned().notNullable();
    table.date("return_date").notNullable();
    table.boolean("is_book_returned").notNullable();
    table.timestamp("created_at").notNullable();
    table.timestamp("modified_at").notNullable();
    table.foreign("user_id").references("users.id");
    table.foreign("book_id").references("books.id");
  });
}

export async function down(knex) {
  await knex.schema.dropTable("user_books");
}
