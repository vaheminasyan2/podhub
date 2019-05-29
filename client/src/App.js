import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar/navbar";
import PodcastSearch from "./components/PodcastSearch/podcastSearch";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import PodcastSearchPage from "./pages/PodcastSearch";
import EpisodeList from "./pages/EpisodeList";
import Listen from "./pages/Listen";
import UserSearch from "./pages/UserSearch";
import API from "./utils/API";
import Login from './pages/Login';
import Settings from "./pages/Settings";
import Error from "./pages/Error";
import Notifications from "./pages/Notifications";
import AboutUs from "./pages/AboutUs";

import "./pages/Listen.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';

import moment from "moment";
import "./App.css";

import io from "socket.io-client";

import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
library.add(faArrowUp);

class App extends Component {

  _isMounted = false;

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
      theme: "dark",
      socket: null,
      APICalls: 0,
      notificationAlert: "",
      newPost: false,
      newNotification: null,
    };
  }

  componentWillUnmount = () => {
    this._isMounted = false;
  }

  // Load user from local storage
  // Check Session Storage for Audio Settings every 500ms to display audio player in navbar
  componentDidMount = () => {
    this._isMounted = true;
    this.loadUserFromlocalStorage();
  }

  // Set notification alert to off 
  setNotificationAlertOff = () => {
    this.setState({
      notificationAlert: "off"
    });

    localStorage.setItem("notificationAlert", "off")

    API.lastCheckedNotification(this.state.user.id, { notificationsSeen: moment().format() })
      .then(res => { })
  }

  setNotificationAlertOn = () => {
    if (window.location.pathname !== "/notifications") {
      this.setState({
        notificationAlert: "on"
      });

      localStorage.setItem("notificationAlert", "on")
    }
  }

  // Get date & time of the latest notification record in the user's notification history to know if we should alert user about new notifications or not  
  isNewNotification = (id) => {
    API.isNewNotification(this.state.user.id)
      .then(res => {
        if (res.data > 0) {
          this.setNotificationAlertOn();
          if (id === "toast") {
            if (res.data === 1) {
              toast("You have " + res.data + " new notification", {
                className: 'toast-container-notif',
                bodyClassName: "toast-text",
              });
            }
            else {
              toast("You have " + res.data + " new notifications", {
                className: 'toast-container-notif',
                bodyClassName: "toast-text",
              });
            }
          }
        }
        else {
          this.setState({
            notificationAlert: "off"
          });
          localStorage.setItem("notificationAlert", "off")
        }

      })
  };

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
    API.getPodcasts(this.state.podcastSearch, 0)
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

  // This monitors the scroll position in Podcast Search results
  // Loads more podcast results as user scrolls
  checkScroll = () => {
    let boundaryDiv = document.getElementById("boundary");
    let totalScroll = boundaryDiv.scrollTop;

    // Save current list of podcasts from state
    let podcasts = this.state.podcasts;

    if (totalScroll >= boundaryDiv.scrollHeight - boundaryDiv.clientHeight) {

      API.getPodcasts(this.state.podcastSearch, this.state.podcasts.length)
        .then(res => {
          this.setState({
            podcasts: podcasts.concat(res.data.results),
            APICalls: this.state.APICalls + 1
          }, () => {
            console.log("API Calls: ", this.state.APICalls)
          });

          boundaryDiv.scrollTop = totalScroll;
        })
        .catch((error) => {
          console.log("Error getting podcasts", error);
          this.setState({
            podcasts: [],
            message: "We couldn't find a match."
          })
        });
    }
  }

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

  // Initialize Socket 
  initializeSocket = (id) => {
    const socket = io(window.location.protocol + `//` + window.location.host + `?userId=${id}`);

    socket.on("share", this.onPostShared);
    socket.on("comment", this.onCommented);
    socket.on("follow", this.onFollow);
    socket.on("post_like", this.onPostLiked);
    socket.on("comment_like", this.onCommentLiked);

    this.setState({
      socket: socket
    })
  }


  // Log the user into the site
  handleUser = (userData) => {
    this.initializeSocket(userData.id);

    this.setState({
      user: userData,
      logout: false
    }, () => this.isNewNotification("toast"));
  }

  //Receives notification about newly shared post
  onPostShared = (postId, userId) => {
    //console.log("New Post!", postId);
    if (userId !== this.state.user.id) {
      this.setState({
        newPost: true
      });
    }
  }

  setNewPostAlertOff = () => {
    this.setState({
      newPost: false
    })
  }

  onCommented = (name, comment, title) => {
    toast(name + " commented: " + comment + " on your post: " + title, {
      className: 'toast-container-notif',
      bodyClassName: "toast-text",
    });
    this.setNotificationAlertOn();
    this.setState({
      newNotification: true
    })
  }

  onCommentLiked = (name, comment) => {
    toast(name + " likes your comment: " + comment, {
      className: 'toast-container-notif',
      bodyClassName: "toast-text",
    });
    this.setNotificationAlertOn();
    this.setState({
      newNotification: true
    })
  }

  onPostLiked = (name, title) => {
    toast(name + " likes your post: " + title, {
      className: 'toast-container-notif',
      bodyClassName: "toast-text",
    });
    this.setNotificationAlertOn();
    this.setState({
      newNotification: true
    })
  }

  onFollow = (name) => {
    toast(name + " is following you!", {
      className: 'toast-container-notif',
      bodyClassName: "toast-text",
    });
    this.setNotificationAlertOn();
    this.setState({
      newNotification: true
    })
  }

  // Logout current user
  logout = () => {

    localStorage.clear();
    localStorage.clear();
    this.state.socket.disconnect();

    this.setState({
      user: null,
      logout: true,
      socket: null
    });
  }

  // Load user from local storage if available
  loadUserFromlocalStorage() {

    if (this.state.user) {
      this.initializeSocket(this.state.user.id);
      this.isNewNotification("no-toast")
      return;
    }

    if (localStorage.getItem("user")) {
      this.setState({
        user: JSON.parse(localStorage.getItem("user")),
        notificationAlert: localStorage.getItem("notificationAlert")
      }, () => this.isNewNotification("no-toast")
      );
      this.initializeSocket(JSON.parse(localStorage.getItem("user")).id);
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
    //console.log(this.state.socket)
    //console.log(this.state.user)
    //console.log(this.state.notificationAlert)

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
                <ToastContainer
                  autoClose={5000}
                  closeButton={false}
                  transition={Zoom}
                  hideProgressBar={true}
                />

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
                  notificationAlert={this.state.notificationAlert}
                  setNotificationAlertOff={this.setNotificationAlertOff}
                />

                <PodcastSearch
                  show={this.state.showPodcasts}
                  hide={this.hidePodcasts}
                  podcasts={this.state.podcasts}
                  checkScroll={this.checkScroll}
                />

                <Switch>

                  <Route exact path="/"
                    render={(props) =>
                      <div className="container">
                        <div className="row">
                          <div className="col-md-2 col-xs-0"></div>
                          <div className="col-md-8 col-xs-12">
                            <Home {...props}
                              user={this.state.user}
                              toApp={this.toApp}
                              theme={this.state.theme}
                              newPost={this.state.newPost}
                              setNewPostAlertOff={this.setNewPostAlertOff}
                            />
                          </div>
                          <div className="col-md-2 col-xs-0"></div>
                        </div>
                      </div>
                    }
                  />

                  <Route exact path="/home"
                    render={(props) =>
                      <div className="container">
                        <div className="row">
                          <div className="col-md-2 col-xs-0"></div>
                          <div className="col-md-8 col-xs-12">

                            <Home {...props}
                              user={this.state.user}
                              toApp={this.toApp}
                              theme={this.state.theme}
                              newPost={this.state.newPost}
                              setNewPostAlertOff={this.setNewPostAlertOff}
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

                  <Route exact path="/podcastSearch" render={(props) =>
                    <PodcastSearchPage {...props}
                      userQuery={this.state.podcastSearch}
                      podcasts={this.state.podcasts}
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

                  <Route exact path="/aboutUs"
                    render={(props) =>
                      <AboutUs {...props}
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

                  <Route exact path="/notifications"
                    render={() =>
                      <div className="container">
                        <div className="row">
                          <div className="col-md-2 col-xs-0"></div>
                          <div className="col-md-8 col-xs-12">
                            <Notifications
                              user={this.state.user}
                              theme={this.state.theme}
                              newNotification={this.state.newNotification}
                            />
                          </div>
                        </div>
                      </div>
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
