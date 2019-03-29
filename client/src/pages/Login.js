import React, { Component } from "react";
import Container from "../components/Container/container";
// import Row from "../components/Row/row";
// import Col from "../components/Col/col";
import API from "../utils/API";
import "./Login.css";
// import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';
import { Redirect } from 'react-router-dom';



class Login extends Component {

    state = {
        id_token: "",
        redirect: false,
    };


    getOrCreateUser = () => {
        API.getOrCreateUser(this.state.id_token)
            .then(res => 
                sessionStorage.setItem("id", res.data.id)
                //sessionStorage.setItem("name", res.data.name),
                //sessionStorage.setItem("email", res.data.email),
                //sessionStorage.setItem("googleId", res.data.googleId),
                //sessionStorage.setItem("profileImage", res.data.profileImage)          
                )
    };

//
    render() {

        if (this.state.redirect || sessionStorage.getItem("id")) {
            return (<Redirect to={'/home'} />)
        }

        const responseGoogle = (response) => {
            console.log(response);
            this.setState({
                id_token: response.tokenObj.id_token,
                redirect: true,
            });

            this.getOrCreateUser();
        }

        return (

            <Container>
                <div className="header">
                    <div className="googleSignIn">
                        <GoogleLogin
                            clientId="940323765774-bpnsf77f8vksurn7gbv082gatubu97kl.apps.googleusercontent.com"
                            buttonText="Login"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle} />
                    </div>
                    <br></br><br></br>
                    <h1 id="loginPageTitle" className="text-center">Welcome to PodHub!</h1>
                    <h4 id="slogan" className="text-center">Share what you care about!</h4>
                </div>
            </Container>

        )
    }
}

export default Login; 
