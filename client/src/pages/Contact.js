import React, { Component } from "react";
import Container from "../components/Container/container";
import API from "../utils/API";
import "./Contact.css";

class Contact extends Component {

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

    render() {
        return (
            <Container>
                
                <div
                    className={` contacts-bg-${this.props.theme} contactList`}
                >
                    <h3 className="" id="contactTitle">Contact Us</h3>
                    <div className="contactRow">
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
                            <a href="https://www.linkedin.com" target="_blank">
                                <img src="https://avatars1.githubusercontent.com/u/37827950?s=400&v=4" />
                            </a>
                            <h4>Meri Arzumanyan</h4>
                            <a href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=" target="_blank">Email&nbsp;</a>
                            <a href="https://www.linkedin.com" target="_blank">&nbsp;LinkedIn</a>
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

export default Contact;