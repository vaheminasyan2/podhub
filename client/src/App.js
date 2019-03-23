import React, { Component } from 'react';
//import logo from './logo.svg';
//import logo from './images/logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar/navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SearchResults from "./components/SearchResults/SearchResults";
import EpisodeList from "./pages/EpisodeList";
import Login from "./pages/Login";
import Container from "./components/Container/container";
import API from "./utils/API";


class App extends Component {

  state = {
    userSearch: "",
    podcastSearch: "",
    users: [],
    podcasts: [
      {
        podcast_id: 1234,
        thumbnail: "https://picsum.photos/200/200",
        title: "Test Podcast 1"
      },
      {
        podcast_id: 1234,
        thumbnail: "https://picsum.photos/200/200",
        title: "Test Podcast 2"
      },
      {
        podcast_id: 1234,
        thumbnail: "https://picsum.photos/200/200",
        title: "Test Podcast 3"
      }
    ],
    showResults: "hide"
  };

  // When input is changed, update state
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, () => { this.checkContent() });
  };

  // Check Podcast Search field for text
  // If text is found, show Search Results 
  // If empty, hide Search Results
  checkContent = () => {
    if (this.state.podcastSearch != "") {
      this.setState({
        showResults: "show"
      })
    }
    else {
      this.setState({
        showResults: "hide"
      })
    }
  }

  getPodcasts = () => {
    API.getPodcasts(this.state.podcastSearch)
      .then(res =>
        this.setState({
          podcasts: res.data
        })
      )
      .catch(() =>
        this.setState({
          podcasts: [],
          message: "We couldn't find a match."
        })
      );
  };

  getUsers = () => {
    API.getUsers(this.state.userSearch)
      .then(res =>
        this.setState({
          users: res.data
        })
      )
      .catch(() =>
        this.setState({
          users: [],
          message: "We couldn't find a match."
        })
      );
  };

  handleUserSubmit = event => {
    event.preventDefault();
    this.getUsers();
  };

  handlePodcastSubmit = event => {
    event.preventDefault();
    this.getPodcasts();
  };


  render() {
    return (
      <Router>
        <div className="wrapper">
          <Navbar
            handleUserSubmit={this.handleUserSubmit}
            handlePodcastSubmit={this.handlePodcastSubmit}
            userSearch={this.state.userSearch}
            podcastSearch={this.podcastSearch}
            handleInputChange={this.handleInputChange}
          />
          <SearchResults
            podcasts={this.state.podcasts}
            show={this.state.showResults}
          />
          <Container>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/home" component={Home} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/episodeList" component={EpisodeList} /> {/* Temp Route */}
            </Switch>
          </Container>
        </div>
      </Router>
    )
  }
}

export default App;
