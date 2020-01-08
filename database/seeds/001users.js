const bcrypt = require("bcryptjs");
exports.seed = function(knex) {
  return knex("users").then(function() {
    // Inserts seed entries
    return knex("users").insert([
      {
        username: "Bob",
        email: "Bob@mail.com",
        password: bcrypt.hashSync("password", 8)
      },
      {
        username: "Anthony",
        email: "Anthony@mail.com",
        password: bcrypt.hashSync("password", 8)
      },
      {
        username: "Michael",
        email: "Michael@mail.com",
        password: bcrypt.hashSync("password", 8)
      }
    ]);
  });
};
