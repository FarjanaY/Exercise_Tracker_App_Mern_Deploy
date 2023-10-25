
//External imports
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ImMenu, ImCross } from "react-icons/im";
import { BiCycling } from "react-icons/bi";
//Internal Imports
import "./Navbar.style.css";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <>
      <nav className="navContainer col-12">
        <div className="navHeadingContainer col-3">
          <h1 className="navHeadingText">
            <BiCycling
              className="headingIcon"
              style={{ textShadow: "10px 4px 5px black" }}
            />
            <Link to="/" className="navHeadingLink">
              Exercise Tracker
            </Link>
            <div
              className="navBtn"
              onClick={() => {
                setShowMenu(!showMenu);
              }}
            >
              {showMenu ? (
                <ImCross style={{ fill: "black" }} />
              ) : (
                <ImMenu style={{ fill: "var(--designColor) " }} />
              )}
            </div>
          </h1>
        </div>
        <div className={showMenu ? "navItemContainer menu" : "navItemContainer"}>
          <ul className="navItems">
            <li className="navItemList">
              <NavLink to="/" className="navLink active">
                Home
              </NavLink>
            </li>
            <li className="navItemList">
              <NavLink to="/createExercise" className="navLink">
                Create Execise
              </NavLink>
            </li>
            <li className="navItemList">
              <NavLink to="/userCreate" className="navLink">
                Create User
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
