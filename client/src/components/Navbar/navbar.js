import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import logo from "./purple_back.png"
import { GoogleLogout } from 'react-google-login';


function Navbar({ userSearch, podcastSearch, handleInputChange, handlePodcastSubmit, handleUserSubmit, logout }) {

  return (
    <div className="hero-head ">
      <header className="navbar">
        <div className="container">
          <div className="navbar=brand">
            <div className="navbar-item">
            <Link className="navbarText navbar-brand" to="/">
            <img src={logo} alt="logo" className="logo"/>
            </Link>
            </div>
            <span class="navbar-burger burger" data-target="navbarMenuHeroC">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
        <div id="navbarMenuHeroC" className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item hover">
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
            </a>
            <a class="navbar-item hover">
            <Link
              to="/home"
              classNameName={
                window.location.pathname === "/home"
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              Home
            </Link>
            </a>
          </div>
        </div>
        
        <div className="navbar-end">
              <div class="navbar-item">
              <form className="searchUserForm">
        <div className="field">
          <div className="control has-icons-left has-icons-right">
            <input className="input is-dark searchUserInput" type="search"
            placeholder="User search"
            aria-label="Search"
            id="usertInput"
            value={userSearch}
            onChange={handleInputChange}
            name="userSearch"
            autoComplete="off"
            required/>
              <span className="icon is-small is-left">
                <i className="fas fa-user"></i>
              </span>
          </div>
          </div>
        </form>
              </div>
              <div class="navbar-item">
              <form className="searchPodcastForm">
        <div className="field">
          <div className="control has-icons-left has-icons-right">
            <input className="input is-dark searchPodcastInput"
           type="search"
           placeholder="Podcast search"
           aria-label="Search"
           id="podcastInput"
           value={podcastSearch}
           onChange={handleInputChange}
           name="podcastSearch"
           autoComplete="off"
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

