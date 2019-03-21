import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar() {

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-success">
      <Link className="navbarText navbar-brand" to="/">Google Books</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <li className="nav-item">
            <Link
              to="/"
              className={
                window.location.pathname === "/" || window.location.pathname === "/search"
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              Search
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/saved"
              className={
                window.location.pathname === "/saved" 
                  ? "nav-link active" 
                  : "nav-link"
              }
            >
              Saved
            </Link>
          </li>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;

