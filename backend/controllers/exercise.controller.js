//internal imports
const Exercise = require("../models/exercise.model");

/*==================================================================
    Desc : Find all Exercise
    route: http://localhost:8000/api/exercise/
    method: GET 
====================================================================*/
const getAllExercises = async (req, res) => {
  try {
    const exercise = await Exercise.find();
    if (exercise) {
      return res.status(200).json({
        result: "Successful",
        message: "Exercises are found...",
        total: exercise.length,
        Exercises: exercise,
      });
    } else {
      return res.status(404).json({
        result: "Unsuccessful",
        message: "No exercise can be found...",
      });
    }
  } catch (error) {
    return res.status(500).json({
      result: "Unsuccessful",
      message: "Server error..",
      error: error.message,
    });
  }
};

/*==================================================================
    Desc : Find One Exercise
    route: http://localhost:8000/api/exercise/:id
    method: GET 
====================================================================*/
const getOneExercise = async (req, res) => {
  try {
    const id = req.params.id;
    const exercise = await Exercise.findOne({ _id: id });
    if (exercise) {
      return res.status(200).json({
        result: "Successful",
        message: "Exercise Found.",
        Exercise: exercise,
      });
    } else {
      return res.status(404).json({
        result: "Unsuccessful.",
        message: "Exercise can't be found!...",
      });
    }
  } catch (error) {
    return res.status(500).json({
      result: "Unsuccessful.",
      message: "Server Error!...",
      error: error.message,
    });
  }
};

/*==================================================================
    Desc : Create Exercise
    route: http://localhost:8000/api/exercise/addexercise
    method: POST 
====================================================================*/
const createExercise = async (req, res) => {
  try {
    const { exercisename, username, duration, date } = req.body;
    const formattedDate = new Date(date).toISOString().split("T")[0];
    const newExercise = new Exercise({
      username: username,
      exercisename: exercisename,
      duration: Number(duration),
      date: formattedDate,
    });
    const exercise = await newExercise.save();
    if (exercise) {
      return res.status(200).json({
        result: "Successful",
        message: "Exercise Added.",
        Exercise: newExercise,
      });
    } else {
      return res.status(404).json({
        result: "Unsuccessful.",
        message: "Exercise can't be added in database!...",
      });
    }
  } catch (error) {
    return res.status(500).json({
      result: "Unsuccessful.",
      message: "Server Error!...",
      error: error.message,
    });
  }
};

/*==================================================================
    Desc : Update Exercise
    route: http://localhost:8000/api/exercise/update/:id
    method: PUT 
====================================================================*/
const updateExercise = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, exercisename, duration, date } = req.body;
    const formattedDate = new Date(date).toISOString().split("T")[0];

    const exercise = await Exercise.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          username: username,
          exercisename: exercisename,
          duration: Number(duration),
          date: formattedDate,
        },
      },
      { new: true }
    );

    if (exercise) {
      return res.status(200).json({
        result: "Successful",
        message: "Exercise Updated.",
        Exercise: exercise,
      });
    } else {
      return res.status(404).json({
        result: "Unsuccessful.",
        message: "Exercise can't be updated!...",
      });
    }
  } catch (error) {
    return res.status(500).json({
      result: "Unsuccessful.",
      message: "Server Error!...",
      error: error.message,
    });
  }
};

/*==================================================================
    Desc : Delete Exercise
    route: http://localhost:8000/api/exercise/:id
    method: DELETE 
====================================================================*/
const deleteExercise = async (req, res) => {
  try {
    const { id } = req.params;
    const exercise = await Exercise.findByIdAndDelete({ _id: id });

    if (exercise) {
      return res.status(200).json({
        result: "Successful",
        message: "Exercise deleted.",
        Exercise: exercise,
      });
    } else {
      return res.status(404).json({
        result: "Unsuccessful.",
        message: "Exercise can't be deleted!...",
      });
    }
  } catch (error) {
    return res.status(500).json({
      result: "Unsuccessful.",
      message: "Server Error!...",
      error: error.message,
    });
  }
};

module.exports = {
  getAllExercises,
  getOneExercise,
  createExercise,
  updateExercise,
  deleteExercise,
};
