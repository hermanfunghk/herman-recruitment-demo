import React from "react";
import { Link, NavLink } from "react-router";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Demo Function ({process.env.NODE_ENV})
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink className="nav-item nav-link" to="/gitSearchRepo">
            Git Repository Search
          </NavLink>
          <NavLink className="nav-item nav-link" to="/map">
            Google Map
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
