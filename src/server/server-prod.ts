import express from "express";
import app, { NAMESPACE, DIST_DIR, CLIENT_HTML_FILE } from "./app";
import { createRoutes } from "./routes";

// start PROD MIDDLEWARE
app.use(`/${NAMESPACE}`, express.static(DIST_DIR));
// end PROD MIDDLEWARE

// Shared logic
const port = app.get("port");

createRoutes(app, CLIENT_HTML_FILE, NAMESPACE);

const server = app.listen(port, () => {
  console.log(
    "---> Prod App is running at http://localhost:%d in %s mode",
    port,
    process.env.NODE_ENV
  );
});

export default server;
