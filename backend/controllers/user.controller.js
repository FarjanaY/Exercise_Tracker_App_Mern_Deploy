//internal imports
const User = require("../models/user.model");

/*==================================================================
    Desc : Find all user
    route: http://localhost:8000/api/user/
    method: GET 
====================================================================*/
const getAllUsers = async (req, res) => {
  try {
    const user = await User.find();
    if (user) {
      return res.status(200).json({
        result: "Successful",
        message: "Users are found...",
        total: user.length,
        user: user,
      });
    } else {
      return res.status(404).json({
        result: "Unsuccessful",
        message: "No user can be found...",
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
    Desc : Find One user
    route: http://localhost:8000/api/user/:id
    method: GET 
====================================================================*/
const getOneUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ _id: id });
    if (user) {
      return res.status(200).json({
        result: "Successful",
        message: "User Found.",
        user: user,
      });
    } else {
      return res.status(404).json({
        result: "Unsuccessful.",
        message: "User can't be found!...",
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
    Desc : Create user
    route: http://localhost:8000/api/user/adduser
    method: POST 
====================================================================*/
const createUser = async (req, res) => {
  try {
    const { username } = req.body;

    //Check if username is already exists or not
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return res.status(400).json({
        result: "Unsuccessful",
        message: "UserName is already exists.",
      });
    } else {
      const newUser = new User({
        username: username,
      });
      const user = await newUser.save();
      if (user) {
        return res.status(200).json({
          result: "Successful",
          message: "User Added.",
          newUser,
        });
      } else {
        return res.status(404).json({
          result: "Unsuccessful",
          message: "User can't be added!...",
        });
      }
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
    Desc : Update user
    route: http://localhost:8000/api/user/update/:id
    method: PUT 
====================================================================*/
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(
      { _id: id },
      { $set: { username: req.body.username } },
      { new: true }
    );

    if (user) {
      return res.status(200).json({
        result: "Successful",
        message: "User Updated.",
        user: user,
      });
    } else {
      return res.status(404).json({
        result: "Unsuccessful.",
        message: "User can't be updated!...",
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
    Desc : Find all user
    route: http://localhost:8000/api/user/:id
    method: DELETE 
====================================================================*/
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete({ _id: id });

    if (user) {
      return res.status(200).json({
        result: "Successful",
        message: "User deleted.",
        user: user,
      });
    } else {
      return res.status(404).json({
        result: "Unsuccessful.",
        message: "User can't be deleted!...",
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
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
};
