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
    // Auth tests
    describe("/api/users", function() {
      it("auth example", function() {
        return request(server)
          .post("/api/auth/register")
          .send({ username: "Luis", email: "Luis@mail.com", password: "pass" })
          .then(res => {
            return request(server)
              .post("/api/auth/login")
              .send({ username: "Luis", password: "pass" })
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
    // Journal Post tests
    describe("/api/users/1/journal", function() {
      it("POST to journal and GET journal", function() {
        return request(server)
          .post("/api/auth/register")
          .send({
            username: "Polina",
            email: "Polina@mail.com",
            password: "pass"
          })
          .then(res => {
            return request(server)
              .post("/api/auth/login")
              .send({ username: "Polina", password: "pass" })
              .then(res => {
                const token = res.body.token;
                return request(server)
                  .get("/api/users")
                  .set("authorization", token)
                  .then(res => {
                    return request(server)
                      .post("/api/users/5/journal")
                      .set("authorization", token)
                      .send({
                        workout: "Bench Press",
                        body_region: "shoulders and chest",
                        sets: 3,
                        weight: "120 lbs",
                        reps: 10,
                        notes: "Good workout"
                      })
                      .then(res => {
                        return request(server)
                          .get("/api/users/5/journal")
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
    });
    //User info tests
    describe("/api/users/1/info", function() {
      it("POST user info and GET user info", function() {
        return request(server)
          .post("/api/auth/register")
          .send({ username: "Olga", email: "Olga@mail.com", password: "pass" })
          .then(res => {
            return request(server)
              .post("/api/auth/login")
              .send({ username: "Olga", password: "pass" })
              .then(res => {
                const token = res.body.token;
                return request(server)
                  .get("/api/users")
                  .set("authorization", token)
                  .then(res => {
                    return request(server)
                      .post("/api/users/1/info")
                      .set("authorization", token)
                      .send({
                        user_age: 45,
                        user_height: "5ft 10",
                        user_weight: "180 lbs"
                      })
                      .then(res => {
                        return request(server)
                          .get("/api/users/1/info")
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
    });
    
  });
});
