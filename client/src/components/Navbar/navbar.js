import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar() {

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-success">
      <Link className="navbarText navbar-brand" to="/">PodHub</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <li className="nav-item">
            <Link
              to="/"
              className={
                window.location.pathname === "/" || window.location.pathname === "/home"
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              Home
            </Link>
          </li>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

