import React, { Component } from "react";
import { Link } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faUser, faHome } from '@fortawesome/free-solid-svg-icons'
import Logo from "./purple_back.png";
import NavbarAudio from "../NavbarAudio/navbarAudio";
import "./navbar.css";

library.add(faSearch, faUser, faHome);

// NAVBAR COMPONENT
// Rendered by App.js on every page
// Contains Logo, links to Home, Profile, User Search, Podcast Search form, and logout button
// Can also display audio player

class Navbar extends Component {

  state = {
    remove: false,
    speed: 1.0
  };

  // Prevent Enter keypress from refreshing window
  suppressEnter = (event) => {
    if (window.event.keyCode === 13) {
      event.preventDefault();
    }
  }

  // Change speed of audio playback
  changeSpeed = (event) => {
    this.setState({
      speed: event.target.value
    });
  }

  render() {

    const { podcastSearch, handleInputChange, hidePodcasts, logout, user, showAudio, hideAudio } = this.props;

    return (

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div className="container fluid">

          {/* Podhub Logo */}

          <div className="navbar-header">
            <Link className="navbarText navbar-brand" to="/home">
              <img src={Logo} alt="logo" id="size" />
            </Link>
          </div>

          {/* Hamburger Menu */}

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navigation Menu */}

          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <ul className="navbar-nav">

              {/* Home */}

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

              {/* Profile */}

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

              {/* Find Users */}

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

            {/* Show Audio Player in Nav Bar */}

            {sessionStorage.getItem("audioSettings") && showAudio ? (
              <span>
                <NavbarAudio
                  audioLink={JSON.parse(sessionStorage.getItem("audioSettings")).audioLink}
                  playbackRate={this.state.speed}
                  changeSpeed={this.changeSpeed}
                  initialSpeed={this.state.speed}
                  remove={this.state.remove}
                />
                <button className="btn btn-dark btn-sm hideAudioBtn" onClick={hideAudio}>Hide</button>
              </span>

              ) : (
                <></>
              )
            }

            {/* Podcast Search form */}

            <ul className="navbar-nav ml-auto">
              <li>
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
                    onKeyPress={this.suppressEnter}
                    onChange={handleInputChange}
                    onFocus={handleInputChange}
                    required
                  />
                </form>
              </li>

              {/* Logout Button */}

              <li>
                <button
                  onClick={logout}
                  className="logoutButton btn btn-dark"
                >
                  Logout
                </button>
              </li>

            </ul>
          </div>
        </div>
      </nav>
    )
  }
};

export default Navbar;
