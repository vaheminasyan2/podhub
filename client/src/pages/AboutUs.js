import React, { Component } from "react";
import Container from "../components/Container/container";
import API from "../utils/API";
import "./AboutUs.css";

class AboutUs extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: null,
        }
    }

    componentDidMount = () => {
        this.setState({
            user: this.props.location.state.user
        }, () => {
            this.props.location.hideOptionsMenu();
        });
    }

    render() {
        return (
            <Container>
                
                <div
                    className={` contacts-bg-${this.props.theme} contactList`}
                >
                    <div className="aboutRow">
                        <h3 className="border-bottom" id="aboutTitle">About Us</h3>
                        <p>
                            In April 2019, a team of six intrepid web developers launched Podhub as their final project for the University of Washington Coding Boot Camp.
                            The goal of the project was to provide an online platform on which users can easily share, discover, and discuss podcasts with 
                            friends and followers. 
                        </p>

                        <p>
                            The project was a substantial undertaking and was accomplished only through teamwork, determination, and unabashed use of the Stack Overflow forums. 
                            Post-graduation, the Podhub team decided to continue developing Podhub to its fullest extent.
                        </p>

                        <p>
                            Today, the site is operable and yet still a work in progress with features such as direct messaging, notifications, and functionality improvements 
                            currently in the works. 
                        </p>
                    </div>

                    <div className="contactRow">
                        <h3 className="border-bottom" id="aboutTitle">Our Team</h3>
                        <div className="teamMember">
                            <a href="https://www.linkedin.com/in/carson-wack/" target="_blank">
                                <img src="https://avatars2.githubusercontent.com/u/42584679?s=400&v=4"/>
                            </a>
                            <h4>Carson Wack</h4>
                            <a href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=" target="_blank">Email&nbsp;</a>
                            <a href="https://www.linkedin.com/in/carson-wack/" target="_blank">&nbsp;LinkedIn</a>
                        </div>

                        <div className="teamMember">
                            <a href="https://linkedin.com/in/curtisyungen" target="_blank">
                                <img src="https://avatars0.githubusercontent.com/u/39065500?s=460&v=4" />
                            </a>
                            <h4>Curtis Yungen</h4>
                            <a href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=curtisyungen@gmail.com" target="_blank">Email&nbsp;</a>
                            <a href="https://linkedin.com/in/curtisyungen" target="_blank">&nbsp;LinkedIn</a>
                        </div>

                        <div className="teamMember">
                            <a href="https://www.linkedin.com/in/joseph-bizar/" target="_blank">
                                <img src="https://avatars2.githubusercontent.com/u/33111101?s=400&v=4" />
                            </a>
                            <h4>Joseph Bizar</h4>
                            <a href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=" target="_blank">Email&nbsp;</a>
                            <a href="https://www.linkedin.com/in/joseph-bizar/" target="_blank">&nbsp;LinkedIn</a>
                        </div>
                    </div>

                    <div className="contactRow">
                        <div className="teamMember">
                            <a href="https://www.linkedin.com/in/mary-arzumanyan" target="_blank">
                                <img src="https://avatars1.githubusercontent.com/u/37827950?s=400&u=c8ef9a92dacba648a2768eb89928b0d264d51920&v=4"/>
                            </a>
                            <h4>Meri Arzumanyan</h4>
                            <a href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=" target="_blank">Email&nbsp;</a>
                            <a href="https://www.linkedin.com/in/mary-arzumanyan" target="_blank">&nbsp;LinkedIn</a>
                        </div>

                        <div className="teamMember">
                            <a href="https://www.linkedin.com/in/swapna-lia-anil/" target="_blank">
                                <img src="https://avatars2.githubusercontent.com/u/38369428?s=400&v=4" />
                            </a>
                            <h4>Swapna Lia Anil</h4>
                            <a href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=" target="_blank">Email&nbsp;</a>
                            <a href="https://www.linkedin.com/in/swapna-lia-anil/" target="_blank">&nbsp;LinkedIn</a>
                        </div>

                        <div className="teamMember">
                            <a href="https://www.linkedin.com/in/vaheminasyan2/" target="_blank">
                                <img src="https://avatars0.githubusercontent.com/u/32709965?s=400&v=4" />
                            </a>
                            <h4>Vahe Minasyan</h4>
                            <a href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=" target="_blank">Email&nbsp;</a>
                            <a href="https://www.linkedin.com/in/vaheminasyan2/" target="_blank">&nbsp;LinkedIn</a>
                        </div>
                    </div>
                </div>
            </Container>
        );
    }
}

export default AboutUs;