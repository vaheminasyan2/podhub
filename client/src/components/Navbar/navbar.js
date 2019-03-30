import React from "react";
import { Link } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import "./navbar.css";
import logo from "./purple_back.png"
import { GoogleLogout } from 'react-google-login';

library.add(faSearch);

function Navbar({ podcastSearch, handleInputChange, hidePodcasts, logout }) {

  return (

    <div className="hero-head ">
      <header className="navbar">
        <div className="container">
          <div className="navbar=brand">
            <div className="navbar-item">
            <Link className="navbarText navbar-brand" to="/home">
            <img src={logo} alt="logo" className="logo"/>
            </Link>
            </div>
            <span className="navbar-burger burger" data-target="navbarMenuHeroC">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
        <div id="navbarMenuHeroC" className="navbar-menu">
          <div className="navbar-start">
          
            <Link
               to="/profile"
               className={
                 window.location.pathname === "/profile"
                   ? "navbar-item hover nav-link active"
                   : "navbar-item hover nav-link"
               }
             >
               Profile
            </Link>

            <Link
              to="/home"
              className={
                window.location.pathname === "/home"
                  ? "navbar-item hover nav-link active"
                  : "navbar-item hover nav-link"
              }
            >
              Home
            </Link>

            <Link
              to={{
                pathname: "/userSearch",
              }}
              className="navbar-item hover findUsers"
            >
              <FontAwesomeIcon icon="search" />
              <span>&nbsp; Find Users</span>
            </Link>

          </div>
        </div>
        
        <div className="navbar-end">
              
              <div className="navbar-item">
              <form className="searchPodcastForm">
        <div className="field">
          <div className="control has-icons-left has-icons-right">
            <input className="input is-dark searchPodcastInput"
           type="search"
           placeholder="Search for a podcast"
           aria-label="Search"
           id="podcastInput"
           value={podcastSearch}           
           name="podcastSearch"
           autoComplete="off"
           onBlur={hidePodcasts}
           onChange={handleInputChange}
           onFocus={handleInputChange}
           required/>
              <span className="icon is-small is-left">
                <i className="fas fa-podcast"></i>
              </span>
          </div>
          </div>
        </form>
              </div>

        </div>
        <div className="navbar-item">
        <GoogleLogout
          buttonText="Logout"
          onLogoutSuccess={logout}
        />
        </div>
        </div>        
      </header>
      </div>
  );
}

export default Navbar;