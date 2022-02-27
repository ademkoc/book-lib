export default {
  $id: "https://lib.ademkoc.com/schema/user",
  type: "object",
  title: "user",
  description: "A user",
  additionalProperties: false,
  properties: {
    name: {
      type: "string",
      description: "Name of the user",
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
