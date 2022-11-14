const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../src/server/app");

describe("Test the root path", () => {
  test("It should response the GET method", () => {
    return request(app).get("/").expect(200);
  });

  test("It should response the * method", () => {
    return request(app).get("/arbitarypoint").expect(302);
  });
});



