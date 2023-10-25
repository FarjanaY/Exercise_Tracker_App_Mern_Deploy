/* eslint-disable react-hooks/exhaustive-deps */
//External Imports
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

//Inernal Imports
import Title from "../layouts/Title";
import "./CreateExercise.style.css";
import Footer from "../footer/Footer";

const EditExercise = () => {
  const { id } = useParams();
  const [exercise, setExercise] = useState({
    username: "",
    exercisename: "",
    duration: "",
    date: "",
  });

  const [successMsg, setSuccessMsg] = useState("");

  //Fectching user Name from datebase;
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/exercise/${id}`)
      .then((response) => {
        const data = response.data;
        console.log(data.Exercise);
        setExercise(data.Exercise);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const formHandler = (e) => {
    e.preventDefault();

    //add data to database
    axios
      .put(`http://localhost:8000/api/exercise/update/${id}`, exercise)
      .then(() => {
        console.log("Data Updated Succesfully..");
      })
      .catch((error) => {
        console.log("Can not be updated to database..." + error.message);
      });

    setSuccessMsg("Thanks!!!Your data has been updated successfully...");
    setExercise({
      username: "",
      exercisename: "",
      duration: "",
      date: "",
    });
  };

  const onChangeHandler = (e) => {
    setExercise({
      ...exercise,
      [e.target.name]: e.target.value,
    });
    // if (e.target.name === "date") {
    //   const formattedDate = new Date(e.target.value)
    //     .toISOString()
    //     .split("T")[0];
    //   setExercise({ ...exercise, [e.target.name]: formattedDate });
    // } else {
    //   setExercise({
    //     ...exercise,
    //     [e.target.name]: e.target.value,
    //   });
    // }
  };

  return (
    <div>
      <Title title="Edit Exercise" />
      <div className="form">
        <div className="formContainer">
          <form onSubmit={formHandler}>
            <div className="formDataDiv">
              <label htmlFor="username" className="formLabel">
                User Name :
              </label>
              <input
                disabled
                className="formInput"
                name="username"
                value={exercise.username}
                onChange={onChangeHandler}
              ></input>
            </div>

            <div className="formDataDiv">
              <label htmlFor="exercisename" className="formLabel">
                Exercise Name :
              </label>
              <input
                className="formInput"
                type="text"
                name="exercisename"
                value={exercise.exercisename}
                onChange={onChangeHandler}
              />
            </div>

            <div className="formDataDiv">
              <label htmlFor="duration" className="formLabel">
                Duration (in min):
              </label>
              <input
                className="formInput"
                type="number"
                name="duration"
                value={exercise.duration}
                onChange={onChangeHandler}
              />
            </div>

            <div className="formDataDiv">
              <label htmlFor="date" className="formLabel">
                Date :
              </label>
              <input
                className="formInput"
                type="date"
                name="date"
                value={new Date(exercise.createdAt).toDateString()}
                onChange={onChangeHandler}
              />
            </div>
            <div className="submitDiv">
              <button type="submit" className="submitBtn">
                Submit
              </button>
            </div>

            {successMsg && <p className="successMsg">{successMsg}</p>}
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};
export default EditExercise;
