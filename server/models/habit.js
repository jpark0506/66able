const mongoose = require("mongoose");

const { Schema } = mongoose;
const {
  Types: { ObjectId },
} = Schema;
const habitSchema = new Schema({
  users: [{ type: ObjectId, ref: "User" }],
  name: { type: String, required: true },
  startdate: { type: Date },
  visibility: { type: String },
  habit: [
    {
      signal: { type: String },
      wronghabit: { type: String },
      habit: { type: String },
      habittime: { type: String },
      before: [{ type: Number }],
      success: [{ type: Number }],
      habittype: { type: Number },
    },
  ],
  objective: { type: String },
  tag: [{ type: String }],
  creator: { type: ObjectId, ref: "User" },
  description: { type: String },
  achievement: [
    { userid: { type: ObjectId, ref: "User" }, data: [{ type: Number }] },
  ],
});
const Habit = mongoose.model("Habit", habitSchema);
module.exports = { Habit };
