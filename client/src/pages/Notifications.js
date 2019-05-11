import React, { Component } from "react";
import Container from "../components/Container/container";
import Row from "../components/Row/row";
import API from "../utils/API";
import LikeNotification from "../components/Notification/LikeNotification";
import CommentNotification from "../components/Notification/CommentNotification";
import FollowerNotification from "../components/Notification/FollowerNotification";
import "./Notifications.css"

// NOTIFICATION PAGE

class Notification extends Component {

    state = {
        newLikes: [
            {
                userId:1,
                userName: "Vahe Minasyan",
                userImage:"https://via.placeholder.com/150C/O",
                postId:21,
                date:"2019-04-16 05:30:39"
            }
        ],
        newComments: [
            {
                userId:2,
                userName: "John Smith",
                userImage:"https://via.placeholder.com/150C",
                postId:22,
                date: "2019-04-18 04:05:01"
            }
        ],
        newFollowers: [
            {
                userId:3,
                userName:"Ricardo Joe",
                userImage:"https://via.placeholder.com/150C/O",
                date: "2019-05-10 22:24:35"
            }
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
                                            userId={newLike.userId}
                                            userName={newLike.userName}
                                            userImage={newLike.userImage}
                                            episodeName={newLike.episodeName}
                                            postId={newLike.postId}
                                            date={newLike.date}
                                            theme={this.props.theme}
                                            loginUser={this.props.user}
                                        />
                                    ))}
                                    {this.state.newComments.map(newComment => (
                                        <CommentNotification
                                            key={newComment.id}
                                            userId={newComment.userId}
                                            userName={newComment.userName}
                                            userImage={newComment.userImage}
                                            postId={newComment.postId}
                                            date={newComment.date}
                                            theme={this.props.theme}
                                            loginUser={this.props.user}
                                        />
                                    ))}
                                    {this.state.newFollowers.map(newFollower => (
                                        <FollowerNotification
                                            key={newFollower.id}
                                            userId={newFollower.userId}
                                            userName={newFollower.userName}
                                            userImage={newFollower.userImage}
                                            date={newFollower.date}
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
