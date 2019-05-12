import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import "./notification.css";

class NotificationComponent extends Component {


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
                    {
                        this.props.type === "follower"
                            ?
                            (
                                <Link
                                    to={{
                                        pathname: "/userSearch",
                                        state: {
                                            user: {
                                                id: this.props.loginUser.id
                                            }
                                        }
                                    }}
                                >

                                    <div className="notificationText">
                                        <p className={`notif`}>
                                            <strong>{this.props.userName}</strong>&nbsp;
                                    started following you -- {moment(this.props.date).startOf('hour').fromNow()}
                                        </p>
                                    </div>

                                </Link>
                            )
                            :
                            (
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

                                    {
                                        this.props.type === "like"
                                            ?
                                            (
                                                <div className="notificationText">
                                                    <p className={`notif`}>
                                                        <strong>{this.props.userName}</strong>&nbsp;
                                            liked your post -- {moment(this.props.date).startOf('hour').fromNow()}
                                                    </p>
                                                </div>
                                            )
                                            :
                                            (
                                                <div className="notificationText">
                                                    <p className={`notif`}>
                                                        <strong>{this.props.userName}</strong>&nbsp;
                                            commented on your post -- {moment(this.props.date).startOf('hour').fromNow()}
                                                    </p>
                                                </div>
                                            )
                                    }

                                </Link>
                            )
                    }

                </div>

            </div>
        )
    }
}

export default NotificationComponent;