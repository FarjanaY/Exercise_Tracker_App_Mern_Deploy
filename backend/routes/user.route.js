//External imports
const express = require("express");

//internal imports
const {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

const userRouter = express.Router();

//All routes for user
userRouter.get("/", getAllUsers);
userRouter.get("/:id", getOneUser);
userRouter.post("/adduser", createUser);
userRouter.put("/update/:id", updateUser);
userRouter.delete("/:id", deleteUser);

module.exports = userRouter;
