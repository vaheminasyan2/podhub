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
      redirect: false,
      showAudioInNavbar: null,
      audioLink: null
    };
  }

  componentDidMount = () => {
    this.loadUserFromLocalStorage();

    setInterval(this.checkSessionStorage, 500);
  }

  checkSessionStorage = () => {

    let storedAudioLink = null;

    if (sessionStorage.getItem("audioSettings")) {
      storedAudioLink = JSON.parse(sessionStorage.getItem("audioSettings")).audioLink;
    } 
    
    if (!this.state.showAudioInNavbar || this.state.audioLink != storedAudioLink) {
      this.setState({
        audioLink: storedAudioLink,
        showAudioInNavbar: true
      });
    }
    else if (!sessionStorage.getItem("audioSettings")) {
      this.setState({
        audioLink: "",
        showAudioInNavbar: false
      })
    }
  }

  hideAudio = () => {
    sessionStorage.clear();
    this.setState({
      showAudioInNavbar: false
    });
  }

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
        console.log(error);
        this.setState({
          podcasts: [],
          message: "We couldn't find a match."
        })
      });
  };

  // Passed to children as prop
  // Hides podcast search results
  hidePodcasts = () => {
    this.setState({
      showPodcasts: "hidePodcasts"
    });
  }

  logout = () => {
    this.setState({
      user: null,
      //redirect: true
    });
    localStorage.clear();
    sessionStorage.clear();
  }

  handleUser = (userData) => {
    this.setState({ user: userData })
    this.setState({ redirect: true })
  }

  isLoggedIn = () => this.state.user != null;

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

  render() {
    return (
      <Router>

        <div className="wrapper">
          {/* {this.state.redirect
            ? <Redirect to="/" />
            : null
          } */}
          {!this.isLoggedIn()
            ? <Route
              render={() =>
                <Login handleUser={this.handleUser}
                />}
            />
            :
            <>
              <Navbar
                podcastSearch={this.podcastSearch}
                handleInputChange={this.handleInputChange}
                hidePodcasts={this.hidePodcasts}
                logout={this.logout}
                user={this.state.user}
                showAudio={this.state.showAudioInNavbar}
                hideAudio={this.hideAudio}
              />
              <PodcastSearch
                show={this.state.showPodcasts}
                hide={this.hidePodcasts}
                podcasts={this.state.podcasts}
              />

              <Switch>
                <Route exact path="/home"
                  render={() =>
                    <div className="container">
                      <div className="row">
                        <div className="col-md-2 col-xs-0"></div>
                        <div className="col-md-8 col-xs-12">
                          <Home
                            user={this.state.user}
                          />
                        </div>
                        <div className="col-md-2 col-xs-0"></div>
                      </div>
                    </div>
                  }
                />
                <Route exact path="/"
                  render={() =>
                    <div className="container">
                      <div className="row">
                        <div className="col-md-2 col-xs-0"></div>
                        <div className="col-md-8 col-xs-12">
                          <Home
                            user={this.state.user}
                          />
                        </div>
                        <div className="col-md-2 col-xs-0"></div>
                      </div>
                    </div>
                  }
                />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/episodeList" component={EpisodeList} />
                <Route exact path="/listen" component={Listen} />
                <Route exact path="/userSearch"
                  render={() =>
                    <UserSearch
                      user={this.state.user}
                    />
                  }
                />
                <Route component={Error} />
              </Switch>
            </>
          }
        </div>
      </Router>
    )
  }
}

export default App;