export async function up(knex) {
  await knex.schema.createTable("books", function (table) {
    table.increments("id");
    table.string("name", 255).notNullable();
    table.string("score", 4).notNullable();
    table.boolean("is_available").notNullable();
    table.timestamp("created_at").notNullable();
    table.timestamp("modified_at").notNullable();
  });
}

export async function down(knex) {
  await knex.schema.dropTable("books");
}
