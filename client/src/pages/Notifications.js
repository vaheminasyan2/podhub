import React, { Component } from "react";
import Container from "../components/Container/container";
import Row from "../components/Row/row";
import API from "../utils/API";
import "./Notifications.css"
import NotificationComponent from "../components/Notification/NotificationComponent";

// NOTIFICATION PAGE

class Notification extends Component {

    state = {
        notifications: [],
        message: ""
    };

    componentDidMount() {
        //console.log(this.props.user.id)
        this.getNotifications(this.props.user.id);
    };

    componentWillReceiveProps(nextProps) {
        // You don't have to do this check first, but it can help prevent an unneeded render
        if (nextProps.newNotification === true) {
            this.getNotifications(this.props.user.id);
        }
    }

    // Get all notification history for given user
    getNotifications = userId => {
        this.setState({
            message: "Getting notifications..."
        });

        API.getNotifications(userId)
            .then(res => {
                var message = "";

                if (res.data.length === 0) {
                    message = "There are no notifications"
                }
                this.setState({
                    message: message,
                    notifications: res.data
                });
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    message: "No notifications found.",
                    posts: []
                });
            });
    }

    render() {
        return (
            <div className={`container bg-${this.props.theme} rounded`} id="post-container">
                <Row>
                    {
                        this.state.notifications.length > 0
                            ?
                            (
                                <Container>
                                    {this.state.notifications.map(notification => (
                                        <NotificationComponent
                                            key={notification.id}
                                            userId={notification.actorId}
                                            userName={notification.name}
                                            userImage={notification.actorImage}
                                            postId={notification.postId}
                                            date={notification.updatedAt}
                                            type={notification.action}
                                            theme={this.props.theme}
                                            loginUser={this.props.user}
                                        />
                                    ))}

                                </Container>
                            )
                            :
                            (
                                <h4 className="text-center">{this.state.message}</h4>
                            )}
                </Row>
            </div>
        )
    }
}

export default Notification;
