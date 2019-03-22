import React, { Component } from 'react';
//import logo from './logo.svg';
//import logo from './images/logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar/navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Container from "./components/Container/container";
import API from "./utils/API"

class App extends Component {

  state = {
    userSearch: "",
    podcastSearch: "",
    users: [],
    podcasts: []

  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

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

  getUsers =() => {
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
          <Container>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/home" component={Home} />
              <Route exact path="/profile" component={Profile} />
            </Switch>
          </Container>
        </div>
      </Router>
    )
  }
}

export default App;
