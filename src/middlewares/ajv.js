import Ajv from "ajv";
import addFormats from "ajv-formats";
import createError from "http-errors";
import betterAjvErrors from "@stoplight/better-ajv-errors";

import schemas from "../schemas/index.js";

const ajv = new Ajv({ schemas });
addFormats(ajv);

export default function (schemaId) {
  return (request, response, next) => {
    const result = ajv.validate(schemaId, request.body);
    if (result) {
      return next();
    }

    const output = betterAjvErrors(schemaId, ajv.errors, {
      propertyPath: [],
      targetValue: request.body,
    });
    if (!output) {
      return next(new Error("Unknown schema validation error"));
    }

    console.log(output);
    return next(
      createError(422, `JSON-Schema validation failed. ${output[0].error}`)
    );
  };
}
