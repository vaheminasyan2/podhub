import React, { Component } from "react";
import Container from "../components/Container/container";
import Row from "../components/Row/row";
import API from "../utils/API";
import LikeNotification from "../components/Notification/LikeNotification";
import CommentNotification from "../components/Notification/CommentNotification";
import NotificationFollowers from "../components/Notification/NotificationFollowers";
import "./Notifications.css"

// NOTIFICATION PAGE

class Notification extends Component {

    state = {
        newLikes: [
            {
                podcastId:1,
                podcastName:"Joe Rogan",
                episodeId:1,
                episodeName:"This is placeholder for episode name",
                userMessage:"user messege"
            },
        ],
        newComments: [
            {
                podcastId:2,
                podcastName:"Craig Roschele",
                episodeId:2,
                episodeName:"This is placeholder for episode name",
                userMessage:"user messege"
            },

        ],
        newFollowers: [
            {
                userId:1,
                userName:"Vahe Minasyan",
                userImage:"https://via.placeholder.com/150C/O"
            },
        ],
        message: "There are no notifications",
        user: null
    };

    componentDidMount() {
        //console.log(this.props.user.id)
        //this.checkNewLikes();
        //this.checkNewComments();
        //this.checkNewFollowers();
    };

    checkNewLikes = () => {

    }

    checkNewComments = () => {

    }

    checkNewFollowers = () => {

    }


    render() {
        return (
            <div className={`container bg-${this.props.theme} rounded`} id="post-container">
                <Row>
                    {
                        this.state.newLikes.length > 0 ||
                            this.state.newComments.length > 0 ||
                            this.state.newFollowers.length > 0
                            ?
                            (
                                <Container>
                                    {this.state.newLikes.map(newLike => (
                                        <LikeNotification
                                            key={newLike.id}
                                            podcastId={newLike.podcastId}
                                            podcastName={newLike.podcastName}
                                            episodeId={newLike.episodeId}
                                            episodeName={newLike.episodeName}
                                            userMessage={newLike.userMessage}
                                            theme={this.props.theme}
                                        />
                                    ))}
                                    {this.state.newComments.map(newComment => (
                                        <CommentNotification
                                            key={newComment.id}
                                            podcastId={newComment.podcastId}
                                            podcastName={newComment.podcastName}
                                            episodeId={newComment.episodeId}
                                            episodeName={newComment.episodeName}
                                            userMessage={newComment.userMessage}
                                            theme={this.props.theme}
                                        />
                                    ))}
                                    {this.state.newFollowers.map(newFollower => (
                                        <NotificationFollowers
                                            key={newFollower.id}
                                            userId={newFollower.userId}
                                            userImage={newFollower.userImage}
                                            userName={newFollower.userName}
                                            theme={this.props.theme}
                                        />
                                    ))}

                                </Container>
                            )
                            :
                            (
                                <h4 className="text-center">{this.state.message}</h4>
                            )
                    }
                </Row>
            </div>
        )
    }
}

export default Notification;
