const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const workoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    require: true,
  },
  equipment: {
    type: String,
    require: true,
    unique: true,
  },
  time: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  difficulty: {
    type: String,
    require: true,
  },
  heroimg: {
    type: String,
    require: true,
  },
  tags: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model("Workout", workoutSchema);
