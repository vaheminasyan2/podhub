import React, { Component } from "react";
import { Link } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faUser, faHome } from '@fortawesome/free-solid-svg-icons'
import "./navbar.css";
//import { GoogleLogout } from 'react-google-login';
import Logo from "./purple_back.png";
import NavbarAudio from "../NavbarAudio/navbarAudio";

library.add(faSearch, faUser, faHome);

class Navbar extends Component {

  state = {
    speed: 1.0
  };

  suppressEnter = (event) => {
    if (window.event.keyCode === 13) {
      event.preventDefault();
    }
  }

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
          <div className="navbar-header">
            <Link className="navbarText navbar-brand" to="/home"><img src={Logo} alt="logo" id="size" /></Link>
          </div>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">

            <ul className="navbar-nav">

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

            {sessionStorage.getItem("audioSettings") && showAudio ? (
              <span>
                <NavbarAudio
                  audioLink={JSON.parse(sessionStorage.getItem("audioSettings")).audioLink}
                  playbackRate={this.state.speed}
                  changeSpeed={this.changeSpeed}
                  initialSpeed={this.state.speed}
                  remove={this.state.remove}
                />
                <button className="btn btn-dark btn-sm" onClick={hideAudio}>Hide</button>
              </span>

            ) : (
                <></>
              )}

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
