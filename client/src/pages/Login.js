import React, { Component } from "react";
import Container from "../components/Container/container";
import Row from "../components/Row/row";
import Col from "../components/Col/col";
import API from "../utils/API";
import "./Login.css";
import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';


const responseGoogle = (response) => {
    console.log(response);
    const tokenBlob = new Blob([JSON.stringify({access_token: response.accessToken}, null, 2)], {type : 'application/json'});
    const options = {
        method: 'POST',
        body: tokenBlob,
        mode: 'cors',
        cache: 'default'
    };
    fetch('http://localhost:3000/api/v1/auth/google', options).then(r => {
        const token = r.headers.get('x-auth-token');
        r.json().then(user => {
            if (token) {
                this.setState({isAuthenticated: true, user, token})
            }
        });
    })

}
class Login extends Component {


    render() {

        return (

            <Container>
                <div className="header">

                    <div className="googleSignIn">
                        <GoogleLogin
                            clientId="894965613215-q002ho1pdjsdg42cftph6h9tt66viv3p.apps.googleusercontent.com"
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
