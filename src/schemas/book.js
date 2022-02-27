export default {
  $id: "https://lib.ademkoc.com/schema/book",
  type: "object",
  title: "book",
  description: "A book",
  additionalProperties: false,
  properties: {
    name: {
      type: "string",
      description: "Name of the book",
    },
    modifiedAt: {
      type: "string",
      format: "date-time",
      description: "Last modification date",
    },
    createdAt: {
      type: "string",
      format: "date-time",
      description: "Creation date",
    },
  },
  required: ["name", "modifiedAt", "createdAt"],
  writeOnly: true,
};
