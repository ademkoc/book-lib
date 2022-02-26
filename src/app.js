import * as path from "path";
import { fileURLToPath } from "url";

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { validator } from "./middlewares/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import routes from "./routes.js";

const app = express();

// The bodyparser middleware parses incoming request bodies in a middleware before your handlers
app.use(bodyParser.json());

app.use(
  cors({
    // allowOrigin: ["http://localhost:8902", "http://127.0.0.1:8902"],
  })
);

// The validator middleware lets users easily validate request bodies
// using JSON-Schema
app.use(
  validator({
    schemaPath: path.join(__dirname, "../schema"),
  })
);

//app.use(...routes);

export default app;
