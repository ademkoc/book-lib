import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import routes from "./routes.js";

const app = express();

// The bodyparser middleware parses incoming request bodies in a middleware before your handlers
app.use(bodyParser.json());

app.use(
  cors({
    // allowOrigin: ["http://localhost:8902", "http://127.0.0.1:8902"],
  })
);

app.use(...routes);

app.use(function (error, request, response, next) {
  if (process.NODE_ENV !== "production") {
    console.error(error);
  }

  response.status(error.status || 500);

  const errors = {
    status: error.status,
    message: error.message,
  };
  response.json(errors);
});

export default app;
