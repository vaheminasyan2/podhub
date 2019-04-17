import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar/navbar";
import PodcastSearch from "./components/PodcastSearch/podcastSearch";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import EpisodeList from "./pages/EpisodeList";
import Listen from "./pages/Listen";
import UserSearch from "./pages/UserSearch";
import API from "./utils/API"
import Login from './pages/Login';
import Settings from "./pages/Settings";
import Error from "./pages/Error";
import "./App.css";

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      user: null,
      podcastSearch: "",
      podcasts: [],
      showPodcasts: "hidePodcasts",
      logout: false,
      showAudioInNavbar: null,
      audioLink: null,
      rawCurrentTime: 0,
      podcastName: null,
      episodeName: null,
      isMounted: false,
      isPlaying: false,
      theme: "dark"
    };
  }

  // Load user from local storage
  // Check Session Storage for Audio Settings every 500ms to display audio player in navbar
  componentDidMount = () => {
    this.loadUserFromLocalStorage();
  }


  // Hide audio player in navbar
  hideAudio = () => {
    this.setState({
      showAudioInNavbar: false,
      isPlaying: false
    });
  }


  // PODCAST SEARCH
  // ==========================================

  // Listen for when user enters text into Podcast search fields
  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    },

      this.debounce(() => {

        // Show podcast search results
        if (this.state.podcastSearch !== "") {
          this.setState({
            showPodcasts: "showPodcasts"
          });

          // Get podcasts that match user query
          this.getPodcasts();
        }

        // Hide podcast search results
        else if (this.state.podcastSearch === "") {
          this.setState({
            showPodcasts: "hidePodcasts"
          });
        }

      }, 250));
  };

  // Debouncing function
  // Delays execution of search operation to prevent it from firing too often
  debounce = (func, wait, immediate) => {
    var timeout;

    return function executedFunction() {
      var context = this;
      var args = arguments;

      var later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };

      var callNow = immediate && !timeout;

      clearTimeout(timeout);

      timeout = setTimeout(later, wait);

      if (callNow) func.apply(context, args);
    };
  };

  // Search for podcasts by calling API
  getPodcasts = () => {
    API.getPodcasts(this.state.podcastSearch)
      .then(res => {
        this.setState({
          podcasts: res.data.results
        })
      })
      .catch((error) => {
        console.log("Error getting podcasts", error);
        this.setState({
          podcasts: [],
          message: "We couldn't find a match."
        })
      });
  };

  // Hides podcast search results
  hidePodcasts = () => {
    this.setState({
      showPodcasts: "hidePodcasts"
    });
  }


  // USER LOGIN/LOGOUT
  // ==========================================

  // Check if user is logged in
  isLoggedIn = () => this.state.user != null;

  // Log the user into the site
  handleUser = (userData) => {
    this.setState({
      user: userData,
      logout: false
    });
  }

  // Logout current user
  logout = () => {

    localStorage.clear();
    sessionStorage.clear();

    this.setState({
      user: null,
      logout: true
    });
  }

  // Load user from local storage if available
  loadUserFromLocalStorage() {
    if (this.state.user) {
      return;
    }
    if (localStorage.getItem("user")) {
      this.setState({
        user: JSON.parse(localStorage.getItem("user"))
      });
    }
  }

  // Updates showAudioInNavbar and audioLink using (True, Audio Link) from Home.js & Profile.js
  toApp = (trueBool, link, podName, epName) => {
    this.setState({
      showAudioInNavbar: trueBool,
      audioLink: link,
      podcastName: podName,
      episodeName: epName
    });
  }

  rawCurrentTime = (rawTime) => {
    this.setState({
      rawCurrentTime: rawTime
    });
  }

  itIsMountedApp = (bool) => {
    this.setState({
      isMounted: bool
    });
  }

  isPlayingApp = (opposite) => {
    this.setState({
      isPlaying: opposite
    });
  }

  // changeToPlay = (trueBool) => {
  //   this.setState({
  //     isPlaying: trueBool
  //   });
  //   console.log(this.state.isPlaying)
  // }

  darkTheme = () => {
    this.setState({
      theme: "dark",
    });
  }

  lightTheme = () => {
    this.setState({
      theme: "light",
    });
  }


  render() {
    return (

      <Router>
        <div className={`wrapper appClass ${this.state.theme}`}>

          {/* Redirect to Login page if user logged out */}

          {this.state.logout && window.location.pathname !== "/" ? (
            <Redirect
              to={{
                pathname: "/"
              }}
            />
          ) : (
              <></>
            )
          }

          {/* Render Home page and navbar if user logged in */}

          {!this.isLoggedIn() ? (

            <Route
              render={() =>
                <Login
                  handleUser={this.handleUser}
                />
              }
            />

          ) : (

              <>
                <Navbar
                  podcastSearch={this.podcastSearch}
                  handleInputChange={this.handleInputChange}
                  hidePodcasts={this.hidePodcasts}
                  logout={this.logout}
                  user={this.state.user}
                  showAudio={this.state.showAudioInNavbar}
                  hideAudio={this.hideAudio}
                  audioLink={this.state.audioLink}
                  podcastName={this.state.podcastName}
                  episodeName={this.state.episodeName}
                  rawCurrentTime={this.state.rawCurrentTime}
                  itIsMountedApp={this.itIsMountedApp}
                  isPlayingApp={this.isPlayingApp}
                  isItPlaying={this.state.isPlaying}
                  isMounted={this.state.isMounted}
                  theme={this.state.theme}
                />

                <PodcastSearch
                  show={this.state.showPodcasts}
                  hide={this.hidePodcasts}
                  podcasts={this.state.podcasts}
                />

                <Switch>

                  <Route exact path="/"
                    render={() =>
                      <div className="container">
                        <div className="row">
                          <div className="col-md-2 col-xs-0"></div>
                          <div className="col-md-8 col-xs-12">
                            <Home
                              user={this.state.user}
                              toApp={this.toApp}
                              theme={this.state.theme}
                            />
                          </div>
                          <div className="col-md-2 col-xs-0"></div>
                        </div>
                      </div>
                    }
                  />

                  <Route exact path="/home"
                    render={() =>
                      <div className="container">
                        <div className="row">
                          <div className="col-md-2 col-xs-0"></div>
                          <div className="col-md-8 col-xs-12">
                            <Home
                              user={this.state.user}
                              toApp={this.toApp}
                              theme={this.state.theme}
                            />
                          </div>
                          <div className="col-md-2 col-xs-0"></div>
                        </div>
                      </div>
                    }
                  />

                  <Route exact path="/profile"
                    render={(props) =>
                      <Profile {...props}
                        toApp={this.toApp}
                        theme={this.state.theme}
                      />
                    }
                  />



                  <Route exact path="/episodeList" component={EpisodeList} />
                  <Route exact path="/listen"
                    render={(props) =>
                      <Listen {...props}
                        toApp={this.toApp}
                        rawCurrentTime={this.rawCurrentTime}
                        isMounted={this.state.isMounted}
                        changeToPlay={this.changeToPlay}
                        itIsPlaying={this.state.isPlaying}
                        theme={this.state.theme}
                      />
                    }

                  />

                  <Route exact path="/userSearch"
                    render={() =>
                      <UserSearch
                        user={this.state.user}
                        theme={this.state.theme}
                      />
                    }
                  />

                  <Route exact path="/Settings"
                    render={(props) =>
                      <Settings {...props}
                        darkTheme={this.darkTheme}
                        lightTheme={this.lightTheme}
                        theme={this.state.theme}
                      />
                    }
                  />

                  <Route component={Error} />
                </Switch>
              </>
            )
          }

        </div>
      </Router>
    )
  }
}

export default App;