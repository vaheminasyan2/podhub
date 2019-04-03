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
    };
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

  componentDidMount() {
    this.loadUserFromLocalStorage();
  }

  render() {
    return (
      <Router>

        <div className="wrapper">
          {this.state.redirect
            ? <Redirect to="/home" />
            : null
          }
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
              />
              <PodcastSearch
                show={this.state.showPodcasts}
                hide={this.hidePodcasts}
                podcasts={this.state.podcasts}
              />

              <Switch>
                <Route exact path="/home"
                  render={() =>
                    <Home
                      user={this.state.user}
                    />
                  }
                />
                <Route exact path="/profile" component={Profile}/>
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