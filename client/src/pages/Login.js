import React, { Component } from "react";
import Container from "../components/Container/container";
import Row from "../components/Row/row";
import Col from "../components/Col/col";
import API from "../utils/API";
import "./Login.css"

class Login extends Component {


    render() {
        return (

            <Container>
                <div className="g-signin2" data-onsuccess="onSignIn" id="signIn"></div>

                <div className="header">
                    <h1 id="loginPageTitle" className="text-center">Welcome to PodHub!</h1>
                    <h4 id="slogan" className="text-center">Share what you care about!</h4>
                </div>
            </Container>
        
        )
    }
}

export default Login;