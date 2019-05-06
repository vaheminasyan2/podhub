import React, { Component } from "react";
import { Redirect } from "react-router";
import Container from "../Container/container";
import onClickOutside from "react-onclickoutside";
import API from "../../utils/API";
import "./optionsMenu.css";

class OptionsMenu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: null,
            openSettings: false,
            openAboutUs: false,
        }
    }

    componentDidMount = () => {
        this.setState({
            user: this.props.user
        });
    }

    handleClickOutside = (event) => {
        event.preventDefault();
        this.props.hideOptionsMenu();
    }

    openSettings = () => {
        this.setState({
            openSettings: true
        });
    }

    openAboutUs = () => {
        this.setState({
            openAboutUs: true
        });
    }

    logout = () => {
        this.props.logout();
    }

    render() {
        return (
            <div className="options">

                {/* OPTIONS MENU */}

                <ul className="optionsList">

                    {/* ABOUT US */}
                    <li
                        onClick={this.openAboutUs}
                    >
                        About
                    </li>

                    {/* PROFILE SETTINGS */}
                    <li
                        onClick={this.openSettings}
                    >
                        Settings
                    </li>

                    {/* LOG OUT */}
                    <li
                        onClick={this.logout}
                    >
                        Log Out
                    </li>
                </ul>

                {this.state.openSettings ? (
                    <Redirect
                        to={{
                            pathname: "/settings",
                            state: {
                                user: this.state.user
                            }
                        }}

                    />
                ) : (
                        <></>
                    )}

                {this.state.openAboutUs ? (
                    <Redirect
                        to={{
                            pathname: "/aboutUs",
                            state: {
                                user: this.state.user
                            }
                        }}
                    />
                ) : (
                        <></>
                    )}

            </div>
        );
    }
};

export default onClickOutside(OptionsMenu);



