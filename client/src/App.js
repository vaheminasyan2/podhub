import React, { Component } from 'react';
//import logo from './logo.svg';
//import logo from './images/logo.svg';
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar/navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SearchResults from "./components/SearchResults/SearchResults";
import EpisodeList from "./pages/EpisodeList";
import Container from "./components/Container/container";
import API from "./utils/API"
import Login from './pages/Login';

class App extends Component {

  state = {
    userSearch: "",
    podcastSearch: "",
    users: [],
    podcasts: [
      {
        id: "4c7d60abc0594aa183dd54430d93d1cf",
        thumbnail: "https://picsum.photos/200/200",
        title_original: "Test Podcast 1"
      },
      {
        id: "e12c16d5521d40e9be482c9f15ef446f",
        thumbnail: "https://picsum.photos/200/200",
        title_original: "Test Podcast 2"
      },
      {
        id: "4618d25194e34a3d9b1fb5fcbafb7627",
        thumbnail: "https://picsum.photos/200/200",
        title_original: "Test Podcast 3"
      }
    ],
    showResults: "hide"
  };

  // When input is changed, update state
  // this.checkContent is callback function so it executes in real time
  // Otherwise it will lag behind by one action as setState is asynchronous
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

  getUsers = () => {
    API.getUsers(this.state.userSearch)
      .then(res => {
        this.setState({
          users: res.data
        })
      })
      .catch((error) => {
        this.setState({
          users: [],
          message: "We couldn't find a match."
        })
      });
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
