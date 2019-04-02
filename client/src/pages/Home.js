import React, { Component } from "react";
import Container from "../components/Container/container";
import Row from "../components/Row/row";
import API from "../utils/API";
import PostCard from "../components/PostCard/postCard";

var moment = require('moment');

class Home extends Component {

    state = {
        posts: [],
        message: ""
    };

    componentDidMount() {
        this.getPosts();
    };

    // Get posts from user and those that user is following
    getPosts = () => {

        this.setState({
            message: "Getting posts..."
        });

        API.getFollowingsPosts(this.props.user.id)
            .then(res => {

                var message = "";

                if (res.data.length == 0) {
                    message = "No posts found."
                }

                this.setState({
                    message: message,
                    posts: res.data
                });
            })
            .catch((error) => {
                console.log(error);
                this.setState({
                    message: "No posts found.",
                    posts: []
                });
            });
    };

    // Delete post
    handlePostDelete = (id) => {

        if (window.confirm("Delete post?")) {
            API.handlePostDelete(id)
                .then(res => {
                    this.getPosts();
                });
        }
    };

    render() {
        return (
            <div className="container bg-dark rounded">
                <Row>
                    {this.state.posts.length > 0 ? (
                        <Container>
                            {this.state.posts.map(post => (
                                <PostCard
                                    key={post.id}
                                    userPhoto={post.userImage}
                                    userName={post.userName}
                                    date={moment(post.createdAt).format("LLL")}
                                    podcastName={post.podcastName}
                                    podcastLogo={post.podcastLogo}
                                    episodeName={post.episodeName}
                                    description={post.description}
                                    audioLink={post.audioLink}
                                    userMessage={post.userMessage}
                                    likes={post.numberOfLikes}
                                    comments={post.numberOfComments}
                                    postId={post.id}
                                    handlePostDelete={this.handlePostDelete}
                                />
                            ))}
                        </Container>
                    ) : (
                            <h4 className="text-center">{this.state.message}</h4>
                        )}
                </Row>
            </div>
        )
    }
}

export default Home;
