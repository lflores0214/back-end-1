
exports.up = function(knex) {
    return knex.schema.createTable("workouts", tbl => {
        tbl.increments()
  
        tbl.integer("user_id")
        .notNullable()
        .unsigned()
        .references('id')
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
        
      
        tbl.string("workout", 128)
        .notNullable()
        
        tbl.string("body_region")
        .notNullable()
  
        tbl.integer("weight")
        
        tbl.integer("reps")
        
        tbl.timestamp("created")
        
        tbl.string("notes",256)
  
  
    })
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTableIfExists("workouts");
  };
  