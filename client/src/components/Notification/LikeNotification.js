import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import API from "../../utils/API";
import "./notification.css";


class LikeNotification extends Component {
    constructor(props) {

        super(props);

        this.state = {
            podcastId: "",
            podcastName: "",
            episodeId: "",
            episodeName: "",
            userMessage: ""
        }
    }

    componentDidMount = () => {
        this.setState ({
            podcastId: this.props.podcastId,
            podcastName: this.props.podcastName,
            episodeName: this.props.episodeName,
            userMessage: this.props.userMessage
        })
    }

    render() {
        return (
            <div className="row" id={`notification-${this.props.theme}`}>
                <div className="col-md-xs p-2"> 
                New Like&nbsp;:&nbsp;
                {this.props.podcastName}&nbsp;--&nbsp;
                {this.props.episodeName}&nbsp;:&nbsp;
                {this.props.userMessage}
                </div>

            </div>
        )
    }
}

export default LikeNotification;