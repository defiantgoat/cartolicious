import express, { Request, Response } from "express";

// This method adds routes to the server instance that is passed to it.
export const createRoutes = (
  server: express.Application,
  indexHTML: string,
  namespace = ""
): void => {
  if (namespace > "") {
    server.get("/", (req: Request, res: Response) => {
      res.redirect(`/${namespace}${req.path}`);
    });

    // Catch health endpoints before all. Don't test the client in case it requires authentication and may redirect.
    // If the client is a single page web app (html/js), then the health endpoint is enough.
    server.get(`/${namespace}/health`, (req: Request, res: Response) => {
      res.status(200).sendStatus(200);
    });

    // Divert all traffic back to the index page. Allows for DOM routing in the client.
    server.get(`/${namespace}/*`, (req: Request, res: Response) => {
      res.sendFile(indexHTML);
    });

    server.get(`/${namespace}`, (req: Request, res: Response) => {
      res.sendFile(indexHTML);
    });
  } else {
    server.get("/health", (req: Request, res: Response) => {
      res.status(200).sendStatus(200);
    });

    server.get("/*", (req: Request, res: Response) => {
      res.sendFile(indexHTML);
    });
  }
};
