export default {
  $id: "https://lib.ademkoc.com/schema/user-new",
  type: "object",
  title: "user-new",
  description: "A user",
  additionalProperties: false,
  properties: {
    name: {
      type: "string",
      description: "Name of the user/company",
    },
  },
  required: ["name"],
  writeOnly: true,
};
