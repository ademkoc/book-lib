// Update with your config settings.
export default {
  development: {
    client: "mysql2",
    connection:
      "mysql://z5aqhspgnqim:YKphIYQka0CFZIbOFZrfgPQ8QTcL6fAIH33WxPwjoI@localhost:3306/book-lib",
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
