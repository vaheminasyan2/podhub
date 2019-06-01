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
            followingUserName: "",
            followingUserId: ""
        }
    }

    componentDidMount = () => {
        this.setState ({
            userId: this.props.userId,
            followingUserName: this.props.followingUserName,
            followingUserId: this.props.followingUserId
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