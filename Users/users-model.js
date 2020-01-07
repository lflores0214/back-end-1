const db = require("../database/dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findById,
  findEntries,
  addEntry,
  findEnt,
};

function find() {
  return db("users");
}

function findBy(filter) {
  return db("users").where(filter);
}

async function add(user) {
  const [id] = await db("users").insert(user, "id");

  return findById(id);
}

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}
function findEntries(){
  return db("workouts");
}

function findEntryById(id) {
  return db("workouts")
    .where({ id })
    .first();
}


function findEnt(id) {
  return db("workouts")
    .join("users", "users.id", "workout.user_id")
    .select(
      "workouts.id",
      "users.id",
      "workouts.workout",
      "workouts.weight",
      "workouts.reps",
      "workouts.notes",
      "workouts.timestamp"
    )
    .orderBy("workouts.timestamp")
    .where("users.id", id);
}
async function addEntry(entry) {
  const [id] = await db("workouts").insert(entry, "id");

  return findEntryById(id);
}
