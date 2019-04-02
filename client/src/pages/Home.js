import React, { Component } from "react";
import Container from "../components/Container/container";
import Row from "../components/Row/row";
import API from "../utils/API";
import PostCard from "../components/PostCard/postCard";
import { Link } from "react-router-dom";
import Modal from "react-responsive-modal";

var moment = require('moment');

class Home extends Component {

    state = {
        posts: [],
        message: "",
        showLikesModal: false,
        likes:[],
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
                console.log(res.data)
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

    //Opens the Likes modal
    //Executed upon user clicking "Likes" button on page
    handleShowLikes = (postId) => {
       // event.preventDefault();
        this.setState({
            showLikesModal: true
        });

        //let userId = JSON.parse(localStorage.getItem("user")).id;

        API.getLikes(postId)
            .then(function (response) {
                console.log(response)
            })
    }

    // Closes Likes Episode modal
    // Executed upon user clicking "Likes" button in modal
    handleCloseLikesModal = () => {
        this.setState({
            showLikesModal: false
        });
    }

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
                                    handleShowLikes={this.handleShowLikes}

                                />
                            ))}

                            <Modal open={this.state.showLikesModal} onClose={this.handleCloseLikesModal} center>
                                <h4>Modal to show profile image and name of all users who liked the post</h4>
                            </Modal>

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
