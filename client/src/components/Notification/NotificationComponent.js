import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import "./notification.css";

class NotificationComponent extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        //console.log(this.props);
    }

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
                            },
                        }}
                    >
                        <img id="profileImage" src={this.props.userImage} alt="User" />
                    </Link>
                </div>

                <div className="col-md-10 col-xs-10 pl-1 notification">
                    {
                        this.props.type === "f"
                            ?
                            (
                                <Link
                                    to={{
                                        pathname: "/profile",
                                        state: {
                                            user: {
                                                id: this.props.userId,
                                                name: this.props.userName,
                                                profileImage: this.props.userImage
                                            }
                                        },
                                    }}
                                >

                                    <div className="notificationText">
                                        <p className={`notif-${this.props.theme}`}>
                                            <strong>{this.props.userName}</strong>&nbsp;
                                    started following you -- {moment(this.props.date).startOf().fromNow()}
                                        </p>
                                    </div>

                                </Link>
                            )
                            :
                            this.props.type === "c"
                                ?
                                (
                                    <Link
                                        to={{
                                            pathname: "/home",
                                            state: {
                                                user: {
                                                    id: this.props.loginUser.id
                                                },
                                                scrollToPostId: this.props.postId,
                                                scrollToPost: true
                                            }
                                        }}
                                    >
                                        <div className="notificationText">
                                            <p className={`notif-${this.props.theme}`} id={this.props.postId}>
                                                <strong>{this.props.userName}</strong>&nbsp;
                                            commented on your post -- {moment(this.props.date).startOf().fromNow()}
                                            </p>
                                        </div>
                                    </Link>
                                )
                                :
                                this.props.type === "pl"
                                    ?
                                    (
                                        <Link
                                            to={{
                                                pathname: "/home",
                                                state: {
                                                    user: {
                                                        id: this.props.loginUser.id
                                                    },
                                                    scrollToPostId: this.props.postId,
                                                    scrollToPost: true
                                                }
                                            }}
                                        >
                                            <div className="notificationText">
                                                <p className={`notif-${this.props.theme}`} id={this.props.postId}>
                                                    <strong>{this.props.userName}</strong>&nbsp;
                                            liked your post -- {moment(this.props.date).startOf().fromNow()}
                                                </p>
                                            </div>
                                        </Link>
                                    )
                                    :
                                    (
                                        <Link
                                            to={{
                                                pathname: "/home",
                                                state: {
                                                    user: {
                                                        id: this.props.loginUser.id
                                                    },
                                                    scrollToPostId: this.props.postId,
                                                    scrollToPost: true
                                                }
                                            }}
                                        >
                                            <div className="notificationText">
                                                <p className={`notif-${this.props.theme}`} id={this.props.postId}>
                                                    <strong>{this.props.userName}</strong>&nbsp;
                                liked your comment -- {moment(this.props.date).startOf().fromNow()}
                                                </p>
                                            </div>
                                        </Link>
                                    )
                    }

                </div>

            </div>
        )

    }
}

export default NotificationComponent;