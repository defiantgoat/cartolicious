import "jest";
import path from "path";
import request from "supertest";
import server from "../server-prod";

describe("App tests without namespace", () => {
  afterAll(() => {
    server.close();
  });

  it("should return a 200 and index.html file", async (done) => {
    const res = await request(server).get("/health");

    expect(res.status).toEqual(200);
    expect(res.text).toEqual("Server is running and returning content.");

    done();
  });
});
