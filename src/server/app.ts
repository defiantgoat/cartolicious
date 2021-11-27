import express from "express";
import path from "path";

const app: express.Application = express();
const port = process.env.PORT || 3000;

export const NAMESPACE = process.env.NAMESPACE || "";
export const DIST_DIR = __dirname;
export const CLIENT_HTML_FILE = path.join(DIST_DIR, "index.html");

app.set("port", port);
// Might need to add cors options!!

export default app;
