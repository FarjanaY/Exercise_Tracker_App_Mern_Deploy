//External imporrts
const mongoose = require("mongoose");

//internal imports

//Exercise schema create
const ExerciseSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    exercisename: {
      type: String,
      required: true,
      trim: true,
    },
    duration: {
      type: Number,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//model create for exercise schema
const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;
