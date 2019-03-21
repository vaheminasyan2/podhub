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
        <ul className="navbar-nav mr-auto">

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
          </ul>
          
            <form className="form-inline my-2 my-lg-0 searchUserForm">
              <input className="form-control mr-sm-2 searchUserInput" type="search" placeholder="Search for an user" aria-label="Search" />
            </form>

            <form className="form-inline my-2 my-lg-0 searchPodcastForm">
              <input className="form-control mr-sm-2 searchPodcastInput" type="search" placeholder="Search for a podcast" aria-label="Search" />
            </form>
        
        
      </div>
    </nav>
  );
}

export default Navbar;

