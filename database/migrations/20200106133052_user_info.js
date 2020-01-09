
exports.up = function(knex) {
    return knex.schema.createTable("user_info", tbl => {
        tbl.increments()

        tbl.integer("user_id")
        .references("id")
        .inTable("users")

        tbl.integer("user_age")
        .notNullable()

        tbl.string("user_height", 16)
        .notNullable()

        tbl.string("user_weight")
        .notNullable()
        
        tbl.timestamp('created_at').defaultTo(knex.fn.now())

    })
  
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("user_info")
};
