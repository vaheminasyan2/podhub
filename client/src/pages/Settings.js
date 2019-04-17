import React, { Component } from "react";
import Container from "../components/Container/container";
import Row from "../components/Row/row";
import List from "../components/List/list";
import API from "../utils/API";
import "./Settings.css";

class Settings extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: null,
        }
    }

    componentDidMount = () => {
        this.setState({
            user: this.props.location.state.user
        });
    }

    deleteAccount = () => {
        if (window.confirm("Are you sure?")) {

            alert("Fine then, loser.");

            API.deleteUser(this.state.user)
                .then(res => {
                    this.logout();
                    alert("And don't come back!");
                });
        }
    }

    render() {

        console.log(this.props);

        return (
            <Container>
                <div
                    className={`bg-${this.props.theme} settings-bg-${this.props.theme}`}
                >

                    <h4>{this.props.location.state.user.name}</h4>
                    <br/>

                    <h4 className="border-bottom">Profile</h4>
                    <br/>
                    <div>
                        Change Name {this.props.location.state.user.name}
                    </div>
                    
                    <p>Change Photo</p>

                    <div>
                        <p>Change Theme </p>
                        <button
                            className="btn btn-dark theme dark"
                            name="dark"
                            onClick={this.props.darkTheme}
                        >
                        Dark 
                        </button>
                        <button
                            className="btn btn-light theme light"
                            name="light"
                            onClick={this.props.lightTheme}
                        >
                        Light
                        </button>
                    </div>

                    <h4 className="border-bottom">Account</h4>
                    <p
                        onClick={this.deleteAccount}
                    >
                    Delete Account
                    </p>

                </div>
            </Container>
        );
    }
}

export default Settings;