//External imports
const express = require("express");

//internal imports
const {
  getAllExercises,
  getOneExercise,
  createExercise,
  updateExercise,
  deleteExercise,
} = require("../controllers/exercise.controller");

const exerciseRouter = express.Router();

//all routes for exercise
exerciseRouter.get("/", getAllExercises);
exerciseRouter.get("/:id", getOneExercise);
exerciseRouter.post("/addexercise", createExercise);
exerciseRouter.put("/update/:id", updateExercise);
exerciseRouter.delete("/:id", deleteExercise);

module.exports = exerciseRouter;
