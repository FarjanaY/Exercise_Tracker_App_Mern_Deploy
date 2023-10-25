//External Imports
import React, { useState, useEffect } from "react";
import axios from "axios";

//Inernal Imports
import Title from "../layouts/Title";
import Footer from "../footer/Footer";
import "./CreateExercise.style.css";

const CreateExercise = () => {
  const [exercise, setExercise] = useState({
    username: "",
    exercisename: "",
    duration: "",
    date: "",
  });

  const [selectUser, setSelectUser] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errors, setErrors] = useState({
    username: false,
    exercisename: false,
    duration: false,
    date: false,
  });

  //Fectching user Name from datebase;
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/user/")
      .then((response) => {
        const data = response.data;
        if (data.user && Array.isArray(data.user)) {
          setSelectUser(data.user);
        } else {
          console.log("Data is not array.");
        }
      })
      .catch((error) => {
        console.log("Can't fetch data..." + error.message);
      });
  }, []);

  const formHandler = (e) => {
    e.preventDefault();

    //Validation

    if (exercise.username === "") {
      setErrors({
        username: true,
        exercisename: false,
        duration: false,
        date: false,
      });
      setErrMsg("User Name is required!...");
    } else if (exercise.exercisename === "") {
      setErrors({
        username: false,
        exercisename: true,
        duration: false,
        date: false,
      });
      setErrMsg("Exercise Name is required!...");
    } else if (exercise.duration === "") {
      setErrors({
        username: false,
        exercisename: false,
        duration: true,
        date: false,
      });
      setErrMsg("Exercise Duration is required!...");
    } else if (exercise.date === "") {
      setErrors({
        username: false,
        exercisename: false,
        duration: false,
        date: true,
      });
      setErrMsg("Date is required!...");
    }

    //add data to database
    else {
      axios
        .post("http://localhost:8000/api/exercise/addexercise", exercise)
        .then(() => {
          console.log("Data Added Succesfully..");
        })
        .catch((error) => {
          console.log("Can not be added to database..." + error.message);
        });

      setSuccessMsg("Thanks!!!Your data has been added successfully...");
      setErrMsg("");
      setExercise({
        username: "",
        exercisename: "",
        duration: "",
        date: "",
      });
      setSelectUser([]);
      setErrors({
        username: false,
        exercisename: false,
        duration: false,
        date: false,
      });
    }
  };

  const onChangeHandler = (e) => {
    if (e.target.name === "date") {
      const formattedDate = new Date(e.target.value)
        .toISOString()
        .split("T")[0];
      setExercise({ ...exercise, [e.target.name]: formattedDate });
    } else {
      setExercise({
        ...exercise,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <div className="createExercise">
      <Title title="Create Exercise" />
      <div className="form">
        <div className="formContainer">
          <form onSubmit={formHandler}>
            <div className="formDataDiv">
              <label htmlFor="username" className="formLabel">
                User Name :
              </label>
              <select
                className="formInput"
                name="username"
                value={exercise.username}
                onChange={onChangeHandler}
              >
                <option>Select User</option>
                {selectUser.map((user) => {
                  return (
                    <option key={user._id} value={user.username}>
                      {user.username}
                    </option>
                  );
                })}
              </select>
              {errors.username && errMsg && (
                <p className="errorMsg">{errMsg}</p>
              )}
            </div>

            <div className="formDataDiv">
              <label htmlFor="exercisename" className="formLabel">
                Exercise Name :
              </label>
              <input
                className="formInput"
                type="text"
                name="exercisename"
                placeholder="Enter Exercise Name."
                value={exercise.exercisename}
                onChange={onChangeHandler}
              />
              {errors.exercisename && errMsg && (
                <p className="errorMsg">{errMsg}</p>
              )}
            </div>

            <div className="formDataDiv">
              <label htmlFor="duration" className="formLabel">
                Duration :
              </label>
              <input
                className="formInput"
                type="number"
                name="duration"
                placeholder="Enter Exercise duration(in minute)."
                value={exercise.duration}
                onChange={onChangeHandler}
              />
              {errors.duration && errMsg && (
                <p className="errorMsg">{errMsg}</p>
              )}
            </div>

            <div className="formDataDiv">
              <label htmlFor="date" className="formLabel">
                Date :
              </label>
              <input
                className="formInput"
                type="date"
                name="date"
                placeholder="Enter current date"
                value={exercise.date}
                onChange={onChangeHandler}
              />
              {errors.date && errMsg && <p className="errorMsg">{errMsg}</p>}
            </div>
            <div className="submitDiv">
              <button type="submit" className="submitBtn">
                Submit
              </button>
            </div>
            {errMsg && <p className="errorMsg">{errMsg}</p>}
            {successMsg && <p className="successMsg">{successMsg}</p>}
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateExercise;
