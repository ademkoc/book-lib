export default {
  $id: "https://lib.ademkoc.com/schema/book-return",
  type: "object",
  title: "book-return",
  description: "A returning book body",
  additionalProperties: false,
  properties: {
    score: {
      type: "integer",
      description: "Score for the book",
    },
  },
  required: ["score"],
  writeOnly: true,
};
