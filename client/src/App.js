import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Container from "./components/Container/container";
import Navbar from "./components/Navbar/navbar";
import PodcastSearch from "./components/PodcastSearch/podcastSearch";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import EpisodeList from "./pages/EpisodeList";
import Listen from "./pages/Listen";
import UserSearch from "./pages/UserSearch";
import API from "./utils/API"
import "./App.css";

import Login from './pages/Login';

class App extends Component {

  state = {
    podcastSearch: "",
    podcasts: [],
    showPodcasts: "hidePodcasts",
    redirect: false,
  };

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

<<<<<<< HEAD
      this.getPodcasts();
    }
    else if (this.state.podcastSearch == "") {
      this.setState({
        showPodcasts: "hidePodcasts"
      });
    }
  }
=======
    }, 250));
  };

  // Debouncing function
  // Delays execution of search operation to prevent it from firing too often
  debounce = (func, wait, immediate) => {
    var timeout;
  
    return function executedFunction() {
      var context = this;
      var args = arguments;
        
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
  
      var callNow = immediate && !timeout;
    
      clearTimeout(timeout);
  
      timeout = setTimeout(later, wait);
    
      if (callNow) func.apply(context, args);
    };
  };
>>>>>>> 4b39420dceccf713ca80b584e8dc55ef0c1d7f93

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
    sessionStorage.clear();
    this.setState({
      redirect: true
    });
  }

  render() {
    if (this.state.redirect) {
      return (
        <Switch>
          <Redirect to={'/'} />
        </Switch>
      )
    }

    return (
      <Router>
        <div className="wrapper">
          <Navbar
            podcastSearch={this.podcastSearch}
            handleInputChange={this.handleInputChange}
            hidePodcasts={this.hidePodcasts}
            logout={this.logout}
          />

          <PodcastSearch
            show={this.state.showPodcasts}
            hide={this.hidePodcasts}
            podcasts={this.state.podcasts}
          />

          <Route exact path="/home" component={Home} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/episodeList" component={EpisodeList} />
          <Route exact path="/listen" component={Listen} />
          <Route exact path="/userSearch" component={UserSearch} />
        </div>
      </Router>
    )
  }
}

export default App;