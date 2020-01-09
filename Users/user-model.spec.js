const User = require("./users-model");
const db = require("../database/dbConfig");
const server = require("../api/server");
const request = require("supertest");

describe("User Model", function() {
  beforeEach(async () => {
    await db("users").truncate();
  });
  //register endpoint tests
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
  });
});
