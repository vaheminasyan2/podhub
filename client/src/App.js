import React, { Component } from 'react';
//import logo from './logo.svg';
//import logo from './images/logo.svg';
import './App.css';


import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar/navbar";
import Home from "./pages/Home";
import Container from "./components/Container/container";

function App() {

  return (
    <Router>
      <div className="wrapper">
        <Navbar />
        <Container>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/home" component={Home}/>
          </Switch>
        </Container>
      </div>
    </Router>
  )
}


// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <h1>Welcome to PodHub!</h1>
//       </div>
//     );
//   }
// }

export default App;
