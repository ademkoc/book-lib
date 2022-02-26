export async function up(knex) {
  await knex.schema.createTable("users", function (table) {
    table.increments("id");
    table.string("name", 255).notNullable();
    table.timestamp("created_at").notNullable();
    table.timestamp("modified_at").notNullable();
  });
}

export async function down(knex) {
  await knex.schema.dropTable("users");
}
