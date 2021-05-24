const mongoose = require("mongoose");

const { Schema } = mongoose;
const {
  Types: { ObjectId },
} = Schema;
const habitSchema = new Schema({
  habitname: { type: String, required: true },
  creator: { type: ObjectId, ref: "User" },
  users: [{ type: ObjectId, ref: "User" }],
  objective: { type: String },
  description: { type: String },
  startdate: { type: Date },
  reaction: [
    {
      wronghabit: { type: String },
      habit: { type: String },
      signal: { type: String },
      habittime: [{ type: String }],
      habitimage: { type: String },
      before: [{ type: Number }],
      success: [{ type: Date }],
      habittype: { type: Number },
    },
  ],
  visibility:{type:Boolean},
  achievement:[{type:Number}],
  public: { type: Number },
  tag: [{ type: String }],
});
const Habit = mongoose.model("Habit", habitSchema);
module.exports = { Habit };
