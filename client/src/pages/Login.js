import React, { Component } from "react";
import Container from "../components/Container/container";
import API from "../utils/API";
import GoogleLogin from 'react-google-login';
import "./Login.css";

class Login extends Component {

    state = {
        id_token: "",
        redirect: false,
    };

    getOrCreateUser = () => {
        API.getOrCreateUser(this.state.id_token)
            .then(res => {
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
                    <br/><br/>
                    <h1 id="loginPageTitle" className="text-center">Welcome to PodHub!</h1>
                    <h4 id="slogan" className="text-center">Share what you care about!</h4>
                </div>
            </Container>

        )
    }
}

export default Login; 