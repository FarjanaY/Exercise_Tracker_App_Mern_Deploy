import React, { useState } from "react";
import axios from "axios";

//internal Imports
import Title from "../layouts/Title";
import Footer from "../footer/Footer";
import "./CreateUser.style.css";

const CreateUser = () => {
  const [username, setUserName] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [error, setError] = useState(false);

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (username === "") {
      setError(true);
      setErrMsg("User Name is Required...");
    } else {
      axios
        .post("https://exercise-tracker-app-52d7.onrender.com/api/user/adduser", { username: username })
        .then((response) => {
          // console.log("FULL RESPONSE");
          // console.log(response);
          // console.log("RESPONSE.DATA.RESULT=");
          // console.log(response.data.result);
          // console.log("RESPONSE.DATA.STATUS=");
          // console.log(response.data.status);
          // console.log("response.data");
          // console.log(response.data);
          // console.log(response.status);
          if (
            response.data.result === "Unsuccessful" &&
            response.status === 404
          ) {
            console.log("User name can't be added ." + error.message);
            setSuccessMsg("");
            setErrMsg("User name can't be saved...");
            setError(true);
          } else {
            console.log("Successful...");
            setSuccessMsg("Thanks! User added successfully...");
            setErrMsg("");
            setError(false);
          }
        })
        .catch((error) => {
          // console.log(error.response);
          const res = error.response;
          // console.log("RES.DATA.");
          // console.log(res.data);
          // console.log("RES.DATA.RESULT");
          // console.log(res.data.result);
          // console.log("RES.STATUS");
          // console.log(res.status);
          if (res.data.result === "Unsuccessful" && res.status === 400) {
            console.log("Unuccessful...");
            setSuccessMsg("");
            setErrMsg("User already exists...");
            setError(true);
          } else if (res.data.result === "Unsuccessful" && res.status === 500) {
            console.log("User name can't be added ." + error.message);
            setSuccessMsg("");
            setErrMsg("User name can't be saved...");
            setError(true);
          }
        });
      setUserName("");
    }
  };

  const onChangeHandler = (e) => {
    setUserName(e.target.value);
  };
  return (
    <div className="createUserContainer">
      <Title title={"Create User"} />

      <div className="createform">
        <div className="createformContainer">
          <form onSubmit={formSubmitHandler}>
            <div className="createformDataDiv">
              <label htmlFor="username" className="createformLabel">
                User Name
              </label>
              <input
                className="createformInput"
                type="text"
                value={username}
                placeholder="Enter Your Name"
                name="username"
                onChange={onChangeHandler}
              />
            </div>
            <div className="submitDiv">
              <button type="submit" className="submitBtn">
                Submit
              </button>
            </div>
            {error && errMsg && <p className="errorMsg">{errMsg}</p>}
            {successMsg && <p className="successMsg">{successMsg}</p>}
          </form>
        </div>
      </div>
      <div className="footerDivEnd">
        <Footer />
      </div>
    </div>
  );
};

export default CreateUser;
