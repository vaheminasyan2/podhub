import React from "react";
import { Link } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import "./navbar.css";
import { GoogleLogout } from 'react-google-login';

library.add(faSearch);

function Navbar({ podcastSearch, handleInputChange, logout }) {

  return (

    <nav className="navbar navbar-expand-lg navbar-light bg-success">

      <Link className="navbarText navbar-brand" to="/home">PodHub</Link>

      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">

        <ul className="navbar-nav mr-auto">
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

          <li>
            <Link
              to={{
                pathname: "/userSearch",
              }}
              className="btn btn-dark btn-sm findUsers"
            >
              <FontAwesomeIcon icon="search" />
              <span>&nbsp; Find Users</span>
            </Link>
          </li>
        </ul>

        <ul className="navbar-nav">
          <form className="form-inline my-2 my-lg-0 searchPodcastForm">
            <input className="form-control mr-sm-2 searchPodcastInput"
              type="search"
              placeholder="Search for a podcast"
              aria-label="Search"
              id="podcastInput"
              value={podcastSearch}           
              name="podcastSearch"
              autoComplete="off"
              onChange={handleInputChange}
              onFocus={handleInputChange}
              required
            />
          </form>
        </ul>

        <GoogleLogout
          buttonText="Logout"
          onLogoutSuccess={logout}
        >
        </GoogleLogout>

      </div>

    </nav>
  );
}

export default Navbar;
