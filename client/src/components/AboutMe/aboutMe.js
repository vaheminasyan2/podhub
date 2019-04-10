import React, { Component } from "react";
import Container from "../Container/container";
import API from "../../utils/API";
import "./aboutMe.css";

class AboutMe extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: null,
            aboutMe: "My name is blank.",
            editMode: false,
            newText: ""
        }
    }

    componentDidMount = () => {
        this.setState({
            user: this.props.user
        }, () => {this.getAboutMe()});
    }

    // Gets about me section on page load
    getAboutMe = () => {
        // API.getAboutMe(this.state.user.id)
        //     .then(res => {
        //         this.setState({
        //             aboutMe: res.data
        //         });
        //     })
        //     .catch((err) => {
        //         console.log("Error getting about me", err);
        //     });
    }

    // Toggles state that allows user to edit About Me section
    editAboutMe = () => {
        this.setState({
            editMode: true
        });
    }

    // Gets new About Me text entered by user
    setNewAboutMe = (event) => {
        this.setState({
            newText: event.target.value
        });
    }

    // Saves new about me text entered by user
    saveAboutMe = () => {

        // API.saveAboutMe(this.state.userId, this.state.newAboutMeText)
        //   .then(res => {

        //   });

        this.setState({
            aboutMe: this.state.newText,
            editMode: false
        });
    }

    // Cancels about me edit without saving changes
    cancelAboutMe = () => {
        this.setState({
            editMode:false
        });
    }

    render() {
        return (
            <span>
                <h4 id="aboutMeTitle">About Me</h4>
                <div className="row aboutMe rounded bg-dark">

                    {!this.state.editMode ? (

                        // SHOW ABOUT ME
                        <div id="showAboutMe">
                            {this.state.aboutMe}

                            {JSON.parse(localStorage.getItem("user")).id === this.props.user.id ? (
                                <button
                                className="btn btn-dark btn-sm editAboutMe"
                                onClick={this.editAboutMe}
                                >
                                Edit
                                </button>
                            ) : (
                                <></>
                            )}
                        </div>
                    ) : (

                        // EDIT ABOUT ME
                        <form id="editAboutMe">

                            {/* TEXT INPUT BOX */}

                            <textarea
                                className="aboutMeTextarea"
                                maxLength="500"
                                onChange={this.setNewAboutMe}
                                value={this.state.newText}
                            >
                            {this.state.aboutMe}
                            </textarea>

                            {/* CANCEL BUTTON */}

                            <button
                                className="btn btn-danger btn-sm cancelAboutMe"
                                onClick={(event) => {
                                    event.preventDefault();
                                    this.cancelAboutMe();
                                }}
                            >
                            Cancel
                            </button>

                            {/* SAVE BUTTON */}

                            <button
                                className="btn btn-success btn-sm saveAboutMe"
                                onClick={(event) => {
                                    event.preventDefault();
                                    this.saveAboutMe();
                                }}
                                type="submit"
                            >
                            Save
                            </button>
                        </form>
                    )}
                </div>
            </span>
        );
    }
}

export default AboutMe;
