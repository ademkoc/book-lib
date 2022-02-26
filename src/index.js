import app from "./app.js";

// The HTTP port can be overridden via the 'PORT' environment variable.
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
app.listen(port);

console.log("Listening on port %i", port);
