import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import API from "../../utils/API";
import "./notification.css";


class Notification extends Component {
    constructor(props) {

        super(props);

        this.state = {
            userId: "",
            podcastId: "",
            podcastName: "",
            episodeName: "",
            userMessage: ""
        }
    }

    componentDidMount = () => {
        this.setState ({
            userId: this.props.userId,
            podcastId: this.props.podcastId,
            podcastName: this.props.podcastName,
            episodeName: this.props.episodeName,
            userMessage: this.props.userMessage
        })
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}

export default Notification;