import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import API from "../../utils/API";
import "./notification.css";


class CommentNotification extends Component {

    render() {
        return (
            <div className="row" id={`notification-${this.props.theme}`}>

                <div className="col-md-1 col-xs-1">
                    <Link
                        to={{
                            pathname: "/profile",
                            state: {
                                user: {
                                    id: this.props.userId,
                                    name: this.props.userName,
                                    profileImage: this.props.userImage
                                }
                            }
                        }}
                    >
                        <img id="profileImage" src={this.props.userImage} alt="User" />
                    </Link>
                </div>

                <div className="col-md-10 col-xs-10 pl-1 notification">

                    <Link
                        to={{
                            pathname: "/profile",
                            state: {
                                user: {
                                    id: this.props.loginUser.id,
                                    name: this.props.loginUser.name,
                                    profileImage: this.props.loginUser.profileImage
                                }
                            }
                        }}
                    >

                        <div className="notificationText">
                            <p className={`notif`}>
                                <strong>{this.props.userName}</strong>&nbsp;
                                    commented your post -- {moment(this.props.date).startOf('hour').fromNow()}
                </p>
                        </div>

                    </Link>

                </div>

            </div>
        )
    }
}

export default CommentNotification;