exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("user_info").then(function() {
    // Inserts seed entries
    return knex("user_info").insert([
      {
        user_id: 1,
        user_age: 22,
        user_height: "5ft 10",
        user_weight: "180 lbs"
      },
      {
        user_id: 2,
        user_age: 25,
        user_height: "6ft 2",
        user_weight: "210 lbs"
      },
      { 
        user_id: 3, 
        user_age: 31, 
        user_height: "5ft 7", 
        user_weight: "160 lbs" 
      }
    ]);
  });
};
