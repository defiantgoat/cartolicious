import "jest";
import path from "path";
import request from "supertest";
import app from "../app";
import { createRoutes } from "../routes";

const html = path.join(__dirname, "test.html");

describe("App tests with namespace", () => {
  beforeAll(() => {
    createRoutes(app, html, "mock-namespace");
  });

  it("should redirect to /namespace at root", async (done) => {
    const res = await request(app).get("/");

    expect(res.status).toEqual(302);
    expect(res.header.location).toEqual("/mock-namespace/");

    done();
  });

  it("should return a 200 and index.html with namespace root", async (done) => {
    const res = await request(app).get("/mock-namespace");

    expect(res.status).toEqual(200);
    expect(res.text).toEqual("<p>test</p>");

    done();
  });

  it("should return a 200 and index.html with namespace/subpath", async (done) => {
    const res = await request(app).get("/mock-namespace/subpath");

    expect(res.status).toEqual(200);
    expect(res.text).toEqual("<p>test</p>");

    done();
  });

  it("should return a 200 for /health", async (done) => {
    const res = await request(app).get("/mock-namespace/health");

    expect(res.status).toEqual(200);
    expect(res.text).toEqual("Server is running and returning content.");

    done();
  });
});
