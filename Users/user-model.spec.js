const User = require("./users-model");
const db = require("../database/dbConfig");
const server = require("../api/server");
const request = require("supertest");

describe("User Model", function() {
  beforeEach(async () => {
    await db("users").truncate();
  });
  // register endpoint tests
  describe("/api/auth/register", function() {
    it("should add users to the DB", async function() {
      await User.add({
        username: "Ben",
        email: "Ben@force.com",
        password: "pass"
      });
      await User.add({
        username: "Luke",
        email: "Luke@force.com",
        password: "pass"
      });

      const users = await db("users");
      expect(users).toHaveLength(2);
    });
    it("auth example", function() {
      return request(server)
        .post("/api/auth/register")
        .send({ username: "Luke", email: "Luke@mail.com", password: "pass" })
        .then(res => {
          return request(server)
            .post("/api/auth/login")
            .send({ username: "Luke", password: "pass" })
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
    it("POST to journal", function() {
      return request(server)
        .post("/api/auth/register")
        .send({ username: "Luke", email: "Luke@mail.com", password: "pass" })
        .then(res => {
          return request(server)
            .post("/api/auth/login")
            .send({ username: "Luke", password: "pass" })
            .then(res => {
              const token = res.body.token;
              return request(server)
                .get("/api/users")
                .set("authorization", token)
                .then(res => {
                  return request(server)
                  .post("/api/users/1/journal")
                  .set("authorization", token)
                  .send({
                    workout: "Bench Press",
                    body_region: "shoulders and chest",
                    sets: 3,
                    weight: "120 lbs",
                    reps:10,
                    notes:"Good workout"
                  })
                  .then(res => {
                    return request(server)
                    .get("/api/users/1/journal")
                    .set("authorization", token)
                    .then(res => {
                      expect(res.status).toBe(200);
                      expect(Array.isArray(res.body)).toBe(true);
                    })
                  })
                  
                });
            });
        });
    })
    it("")
  });
});
