
exports.up = function(knex) {
    return knex.schema.createTable('users', users => {
        users.increments();

        users.string("username", 20)
        .notNullable()
        .unique()

        users.string("email", 128)
        .notNullable

        users.string("password")
        .notNullable()

    })
  
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("users");
};
