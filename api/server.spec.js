const request = require("supertest");
const User = require("../Users/users-model");
const db = require("../database/dbConfig");
const server = require("./server");

describe("server.js", function() {
  describe("environment", function() {
    it("should set environment to testing", function() {
      expect(process.env.DB_CONNECT).toBe("testing");
    });
  });

  describe("GET /", function() {
    it("should return a 200 OK", function() {
      // spin up the server
      return request(server)
        .get("/")
        .then(res => {
          expect(res.status).toBe(200);
        });
      // make a get request to /
      // look at the http status code for the response
    });
    it("should return a JSON", function() {
      return request(server)
        .get("/")
        .then(res => {
          expect(res.type).toMatch(/json/i);
        });
    });
    it("should return {api:'up'}", function() {
      return request(server)
        .get("/")
        .then(res => {
          expect(res.body.api).toBe("up");
        });
    });
  });
  describe("/api/auth/register", function() {
    it("should add users to the DB", async function() {
      await User.add({
        username: "Luis",
        email: "Luis@force.com",
        password: "pass"
      });
      await User.add({
        username: "Olga",
        email: "Olga@force.com",
        password: "pass"
      });

      const users = await db("users");
      expect(users).toHaveLength(4);
    });
    it("auth example", function() {
      return request(server)
        .post("/api/auth/register")
        .send({ username: "leo", email: "leo", password: "pass" })
        .then(res => {
          return request(server)
            .post("/api/auth/login")
            .send({ username: "leo", password: "pass" })
            .then(res => {
              const token = res.body.token;
              return request(server)
                .get("/api/users")
                .set("authorization", token)
                .then(res => {
                  expect(res.status).toBe(200);
                  expect(Array.isArray(res.body)).toBe(true);
                });
            });
        });
    });
  });
});
