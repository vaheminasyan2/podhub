import React, { Component } from "react";
import { Link } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faUser, faHome } from '@fortawesome/free-solid-svg-icons'
import Logo from "./purple_back.png";
import NavbarAudio from "../NavbarAudio/navbarAudio";
import Popup from "reactjs-popup";
import OptionsMenu from "../OptionsMenu/optionsMenu";
import "./navbar.css";

library.add(faSearch, faUser, faHome);

// NAVBAR COMPONENT
// Rendered by App.js on every page
// Contains Logo, links to Home, Profile, User Search, Podcast Search form, and logout button
// Can also display audio player

class Navbar extends Component {

  state = {
    remove: false,
    speed: 1.0,
    showOptionsMenu: false
  };


  // NAVBAR AUDIO PLAYER
  // ====================================

  // Change speed of audio playback
  changeSpeed = (event) => {
    this.setState({
      speed: event.target.value
    });
  }

  itIsMountedNav = (bool) => {
    this.props.itIsMountedApp(bool);
  }

  isPlaying = (opposite) => {
    this.props.isPlayingApp(opposite);
  }


  // OPTIONS MENU
  // ====================================

  showOptionsMenu = () => {
    this.setState({
      showOptionsMenu: true
    });
  }

  hideOptionsMenu = () => {
    this.setState({
      showOptionsMenu: false
    });
  }


  // OTHER
  // ====================================

  // Prevent Enter keypress from refreshing window
  suppressEnter = (event) => {
    if (window.event.keyCode === 13) {
      event.preventDefault();
    }
  }

  scrollToTop = () => {
    window.scrollTo(0, 0);
}

  render() {

    const { podcastSearch, handleInputChange, hidePodcasts, logout, user, showAudio, hideAudio, theme } = this.props;

    return (

      <nav className={`navbar navbar-expand-lg navbar-${theme} bg-${theme} sticky-top`}>
        <div className="container fluid">

          {/* Podhub Logo */}

          <div className="navbar-header">
            <Link className="navbarText navbar-brand" to="/home" onClick={this.scrollToTop}>
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
                      ? `nav-link active ${this.props.theme}`
                      : `nav-link ${this.props.theme}`
                  } 
                  onClick={this.scrollToTop}
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
                    window.location.pathname === "/home"
                      ? `nav-link active ${this.props.theme}`
                      : `nav-link ${this.props.theme}`
                  }
                  onClick={this.scrollToTop}
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
                  className={
                    window.location.pathname === "/home"
                      ? `nav-link active ${this.props.theme}`
                      : `nav-link ${this.props.theme}`
                  }
                >
                  <FontAwesomeIcon icon="search" />
                  <span className={`navbar-theme-{this.props.theme}`}>&nbsp; Find Users</span>
                </Link>
              </li>
            </ul>

            {/* Show Audio Player in Nav Bar */}

            {showAudio ? (
              <div>
                <Popup
                  trigger={
                    <span>
                      <NavbarAudio
                        audioLink={this.props.audioLink}
                        playbackRate={this.state.speed}
                        changeSpeed={this.changeSpeed}
                        initialSpeed={this.state.speed}
                        remove={this.state.remove}
                        aCurrentTime={this.props.rawCurrentTime}
                        itIsMounted={this.itIsMountedNav}
                        isPlaying={this.isPlaying}
                        isItPlaying={this.props.isItPlaying}
                        isMounted={this.props.isMounted}
                      />
                    </span>
                  }
                  on="hover"
                  position="bottom center"
                  className="navbarAudioPopup"
                  closeDocumentOnClick
                >
                  <p className="navbarPopupText" id="topPopupText">
                    {this.props.podcastName}
                  </p>

                  <p className="navbarPopupText">
                    {this.props.episodeName}
                  </p>

                  <button className="btn btn-dark btn-sm hideAudioBtn" onClick={hideAudio}>
                    Hide Audio Player
                    </button>
                </Popup>
              </div>
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

              {/* Settings/Logout Dropdown Menu */}

              <li>
                <span
                  onClick={this.showOptionsMenu}
                >
                  <img 
                    className="navbarUserImg"
                    src={this.props.user.profileImage} />
                </span>

                {this.state.showOptionsMenu ? (
                  <OptionsMenu
                    user={this.props.user}
                    hideOptionsMenu={this.hideOptionsMenu}
                    logout={logout}
                  />
                ) : (
                    <></>
                  )}
              </li>

            </ul>
          </div>
        </div>
      </nav>
    )
  }
};

export default Navbar;
