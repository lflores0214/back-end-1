const db = require("../database/dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findById,
  findEntryById,
  findEntries,
  addEntry,
  findEnt,
  update,
  remove,
  addUserInfo,
  findUsersInfo,
  findInfo,
  editInfo,
  findInfoById
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
    .join("users", "users.id","workouts.user_id")
    .select(
      "workouts.id",
      "workouts.user_id",
      "workouts.workout",
      "workouts.weight",
      "workouts.reps",
      "workouts.notes",
      "workouts.created_at"
    )
    .orderBy("workouts.created_at")
    .where("users.id", id);
}
async function addEntry(entry) {
  const [id] = await db("workouts").insert(entry, "id");

  return findEntryById(id);
}

async function update(changes, id) {
  return db("workouts")
  .where({ id })
  .update(changes, "id")
}
async function editInfo(changes, id){
  return db("user_info")
  .where({id})
  .update(changes, "id")
}

function remove(id) {
  return db("workouts")
  .where("id", id)
  .del();
}
async function addUserInfo(info){
  const [id] = await db("user_info").insert(info, "id");

}

function findUsersInfo(){
  return db("user_info")
}
function findInfo(id){
  return db("user_info")
  .join("users", "users.id","user_info.user_id")
  .select(
    "user_info.id",
    "user_info.user_id",
    "user_info.user_age",
    "user_info.user_height",
    "user_info.user_weight"
  )
  .orderBy("users.id")
  .where("users.id", id);
}

function findInfoById(id){
  return db("user_info")
  .where({ id })
  .first()
}