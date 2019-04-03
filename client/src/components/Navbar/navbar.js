import React from "react";
import { Link } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faUser, faHome } from '@fortawesome/free-solid-svg-icons'
import "./navbar.css";
import { GoogleLogout } from 'react-google-login';
import Logo from "./purple_back.png";

library.add(faSearch, faUser, faHome);

function Navbar({ podcastSearch, handleInputChange, hidePodcasts, logout, user }) {

  return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container mini">
      <Link className="navbarText navbar-brand" to="/home"><img src={Logo} alt="logo" id="size"/></Link>

      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">

        <ul className="navbar-nav mr-auto">

          <li className="nav-item">
            <Link
              to="/home"
              className={
                window.location.pathname === "/home"
                  ? "nav-link active"
                  : "nav-link"
              }
            >
            <FontAwesomeIcon icon="home" />
            &nbsp; Home
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to={{
                pathname: "/profile",
                state: {
                  user: user
                }
              }}
              className={
                window.location.pathname === "/profile"
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              <FontAwesomeIcon icon="user" />
              &nbsp; Profile
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to={{
                pathname: "/userSearch",
              }}
              className="nav-link"
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
              placeholder="Search Podcasts"
              aria-label="Search"
              id="podcastInput"
              value={podcastSearch}
              name="podcastSearch"
              autoComplete="off"
              onBlur={hidePodcasts}
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
            </div>
    </nav>
  );
}

export default Navbar;
