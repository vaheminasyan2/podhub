import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar({ userSearch, podcastSearch, handleInputChange, handlePodcastSubmit, handleUserSubmit, signOut }) {

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-success">
      <Link className="navbarText navbar-brand" to="/home">PodHub</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <ul className="navbar-nav mr-5">

          <li className="nav-item">
            <Link
              to="/profile"
              className={
                window.location.pathname === "/profile"
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              Profile
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to="/home"
              className={
                window.location.pathname === "/home"
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              Home
            </Link>
          </li>
        </ul>

        <form className="form-inline my-2 my-lg-0 ml-5 searchUserForm text-center">
          <input className="form-control mr-sm-2 searchUserInput"
            type="search"
            placeholder="Search for an user"
            aria-label="Search"
            id="usertInput"
            value={userSearch}
            onChange={handleInputChange}
            name="userSearch"
            required
          />
        </form>
        <button type="submit"
          className="btn btn-dark btn-sm"
          onClick={handleUserSubmit}>
          Search
        </button>

        <form className="form-inline my-2 my-lg-0 searchPodcastForm">
          <input className="form-control mr-sm-2 searchPodcastInput"
            type="search"
            placeholder="Search for a podcast"
            aria-label="Search"
            id="podcastInput"
            value={podcastSearch}
            onChange={handleInputChange}
            name="podcastSearch"
            required
          />
        </form>
        <button type="submit"
          className="btn btn-dark btn-sm"
          onClick={handlePodcastSubmit}>
          Search
        </button>

        <ul className="navbar-nav signOutDiv">

          <li id="loggedInUser">
            Logged in as</li>
          <a id="signOutBtn" className="button btn-primary p-1" href="#" onClick={signOut}>
            <span>Sign Out</span>
          </a>

        </ul>

      </div>
    </nav>
  );
}

export default Navbar;

