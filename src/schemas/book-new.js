export default {
  $id: "https://lib.ademkoc.com/schema/book-new",
  type: "object",
  title: "book-new",
  description: "A book",
  additionalProperties: false,
  properties: {
    name: {
      type: "string",
      description: "Name of the book",
    },
  },
  required: ["name"],
  writeOnly: true,
};
