import React, { Component } from 'react';
import App from "./App";
import Login from './pages/Login';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//import Container from "./components/Container/container";
//import { Redirect } from 'react-router-dom';
import Error from "./pages/Error";


class Application extends React.Component {

  state = {
    user: []
  }

  handleUser = (userData) => {
    this.setState({ user: userData })
  }



  render() {
    console.log(this.state.user)

    return (
      <Router>

        <Switch>
          <Route exact path="/" render={() => <Login
            handleUser={this.handleUser}
          />} />
          <Route path="*" component={App} />
          <Route component={Error} />

        </Switch>

      </Router>
    )

  }
}

export default Application;




