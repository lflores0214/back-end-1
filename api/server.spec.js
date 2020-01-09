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
  
});
