import "jest";
import path from "path";
import request from "supertest";
import app from "../app";
import { createRoutes } from "../routes";

const html = path.join(__dirname, "test.html");

describe("App tests without namespace", () => {
  beforeAll(() => {
    createRoutes(app, html, undefined);
  });

  it("should return a 200 and index.html file", async (done) => {
    const res = await request(app).get("/");

    expect(res.status).toEqual(200);
    expect(res.text).toEqual("<p>test</p>");

    done();
  });

  it("should return a 200 with /subpath file", async (done) => {
    const res = await request(app).get("/subpath");

    expect(res.status).toEqual(200);
    expect(res.text).toEqual("<p>test</p>");

    done();
  });

  it("should return a 200 for /health", async (done) => {
    const res = await request(app).get("/health");

    expect(res.status).toEqual(200);
    expect(res.text).toEqual("Server is running and returning content.");

    done();
  });
});
