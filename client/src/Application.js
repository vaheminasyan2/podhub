import React, { Component } from 'react';
import App from "./App";
import Login from './pages/Login';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//import Container from "./components/Container/container";
//import { Redirect } from 'react-router-dom';
import Error from "./pages/Error";


class Application extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      user: []
    }
  }

  handleUser = (userData) => {
    this.setState({ user: userData })
  }

  sendUserData = () => {
    return this.state.user
  }

  render() {
    console.log(this.state.user)

    return (
      <Router>

        <Switch>
          <Route exact path="/" render={() => <Login
            handleUser={this.handleUser}
          />} />
          <Route path="*" render={() => <App
            user={this.state.user}
          />} />
          <Route component={Error} />

        </Switch>

      </Router>
    )

  }
}

export default Application;