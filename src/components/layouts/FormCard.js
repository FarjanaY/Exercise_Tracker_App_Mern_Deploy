//External Imports
import React, { useState, useEffect } from "react";
import axios from "axios";

//Inernal Imports
import "./FormCard.style.css";

const FormCard = ({ phUserName, phExerciseName, phDuration, phDate }) => {
  const [exercise, setExercise] = useState({
    username: "",
    exercisename: "",
    duration: "",
    date: "",
  });

  const [selectUser, setSelectUser] = useState([]);

  //Fectching user Name from datebase;
  useEffect(() => {
    axios
      .get("https://exercise-tracker-app-52d7.onrender.com/api/user/")
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
    console.log(exercise);
    axios
      .post("https://exercise-tracker-app-52d7.onrender.com/api/exercise/addexercise", exercise)
      .then(() => {
        console.log("Data Added Succesfully..");
      })
      .catch((error) => {
        console.log("Can not be added to database..." + error.message);
      });
  };

  const onChangeHandler = (e) => {
    setExercise({
      ...exercise,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="form">
      <div className="formContainer">
        <form onSubmit={formHandler}>
          <div className="formDataDiv">
            <label htmlFor="username" className="formLabel">
              User Name :
            </label>
            <select
              className="formDataDiv"
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
          </div>

          <div className="formDataDiv">
            <label htmlFor="exercisename" className="formLabel">
              Exercise Name :
            </label>
            <input
              type="text"
              name="exercisename"
              placeholder={phExerciseName}
              value={exercise.exercisename}
              onChange={onChangeHandler}
            />
          </div>

          <div className="formDataDiv">
            <label htmlFor="duration" className="formLabel">
              Duration :
            </label>
            <input
              type="number"
              name="duration"
              placeholder={phDuration}
              value={exercise.duration}
              onChange={onChangeHandler}
            />
          </div>

          <div className="formDataDiv">
            <label htmlFor="date" className="formLabel">
              Date :
            </label>
            <input
              type="date"
              name="date"
              placeholder={phDate}
              value={exercise.date}
              onChange={onChangeHandler}
            />
          </div>
          <div className="submitDiv">
            <button type="submit" className="submitBtn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormCard;
