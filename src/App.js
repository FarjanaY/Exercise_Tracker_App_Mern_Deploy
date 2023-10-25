//External imports
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//internal imports
import Home from "./components/home/Home";
import Navbar from "./components/navbar/Navbar";

import EditExercise from "./components/exercise/UpdateExercise";
import CreateExercise from "./components/exercise/CreateExercise";
import CreateUser from "./components/user/CreateUser";
import ErrorPage from "./components/errorPage/ErrorPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/editExercise/:id" element={<EditExercise />} />
        <Route exact path="/userCreate" element={<CreateUser />} />
        <Route exact path="/createExercise" element={<CreateExercise />} />
        <Route exact path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
