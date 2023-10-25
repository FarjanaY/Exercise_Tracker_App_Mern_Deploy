/* eslint-disable no-unused-vars */
//External Imports
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate, redirect } from "react-router-dom";

//internal imports
import "./Home.style.css";
import Title from "../layouts/Title";
import Footer from "../footer/Footer";

const Home = () => {
  const [exercises, setExercises] = useState([]);
  const navigate = useNavigate();
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/exercise/")
      .then((response) => {
        const data = response.data;
        if (data.Exercises && Array.isArray(data.Exercises)) {
          setExercises(data.Exercises);
        } else {
          console.log("Data is not an array");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <div className="homeContainer">
      <Title title="Exercise List" />
      {errMsg && <p className="errorMsg">{errMsg}</p>}
      {successMsg && <p className="successMsg">{successMsg}</p>}
      <div className="exerciseListContainer">
        <div className="listHeadingContainer">
          <ul className="listHeadingUl">
            <li className="listHeadingLi">User Name</li>
            <li className="listHeadingLi">Exercise Name</li>
            <li className="listHeadingLi">Duration</li>
            <li className="listHeadingLi">Date</li>
            <li className="listHeadingLi">Actions</li>
          </ul>
        </div>
        <div className="exerciseList">
          {exercises.map((exercise) => {
            return (
              <div className="listItemsContainer " key={exercise._id}>
                <ul className="listItemsUl">
                  <li className="listItemLi">{exercise.username}</li>
                  <li className="listItemLi">{exercise.exercisename}</li>
                  <li className="listItemLi">{exercise.duration}</li>
                  <li className="listItemLi">
                    {new Date(exercise.createdAt).toDateString()}
                  </li>
                  <li className="listItemLi">
                    <div className="listIcons">
                      <Link to={`/editExercise/${exercise._id}`}>
                        <FaEdit
                          style={{ fill: "royalblue" }}
                          className="icon"
                        />
                      </Link>
                      <Link onClick={(e) => handleDelete(exercise._id)}>
                        <FaTrash style={{ fill: "#EB3C11" }} className="icon" />
                      </Link>
                    </div>
                  </li>
                </ul>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );

  function handleDelete(id) {
    axios
      .delete(`http://localhost:8000/api/exercise/${id}`)
      .then((res) => {
        //  window.location.reload(); //Refresh the page;
        setSuccessMsg("Record has been deleted!...");
        navigate("/");
      })
      .catch((error) => {
        setErrMsg("Data can't be deleted...");
        console.log("Data can't be deleted..." + error.message);
        navigate("/");
      });
  }
};

export default Home;
