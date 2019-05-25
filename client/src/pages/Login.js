import React, { Component } from "react";
import Container from "../components/Container/container";
import API from "../utils/API";
import GoogleLogin from 'react-google-login';
import "./Login.css";
import Logo from "../components/Navbar/purple_back.png";
import dotenv from "dotenv";
//import io from "socket.io-client";

dotenv.config();

var CLIENT_ID = process.env.REACT_APP_G_CLIENT_ID;

class Login extends Component {

    state = {
        id_token: "",
        redirect: false
    };


    getOrCreateUser = () => {
        API.getOrCreateUser(this.state.id_token)
            .then(res => {
                // console.warn("User ID", res.data.id);

                //////////////////    Notification   ///////////////////
                //const socket = io(`${window.location}?userId=${res.data.id}`); // We need to initialize a connection to server.   
                this.props.handleUser(res.data);
                localStorage.setItem("user", JSON.stringify(res.data));
            })
    };



    render() {
        const responseGoogle = (response) => {
            this.setState({
                id_token: response.tokenObj.id_token,
            });

            this.getOrCreateUser();

            //console.log("Login Constructed!");
        }

        return (

            <Container>
                <div className="header">
                    <div className="googleSignIn">
                        <GoogleLogin
                            clientId={CLIENT_ID}
                            buttonText="Login"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            className="googleButton" />
                    </div>
                    <br /><br />
                    <div className="sizing">
                        <img src={Logo} alt="logo" className="autoM" />

                        <br />

                        <div className="loginText">
                            <h1 id="loginPageTitle" className="text-center font-weight-bold">PodHub</h1>
                            <h4 id="slogan" className="text-center font-weight-bold">Share what you care about</h4>
                        </div>
                    </div>
                </div>
            </Container>

        )
    }
}

export default Login; 
