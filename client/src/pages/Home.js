import React, { Component } from "react";
import Container from "../components/Container/container";
import Row from "../components/Row/row";
import Col from "../components/Col/col";
import API from "../utils/API";
import PostCard from "../components/PostCard/postCard";

class Home extends Component {

    state = {
        posts: [
            {
                userProfileImage: "<image>",
                userName: "Vahe Minasyan",
                date: "03/20/2019",
                message: "Checkout this awesome podcast",
                podcastIcon: "<image>",
                podcastEpisode: "Very Bad Wizards Episode 159: You have the right...",
                episodeDescription: "Description",
                link: "link",
                likes: 10,
                comments: 10,
            },
            {
                userProfileImage: "<image>",
                userName: "John Smith",
                date: "03/21/2019",
                message: "Checkout this awesome podcast",
                podcastIcon: "<image>",
                podcastEpisode: "Very Bad Wizards Episode 159: You have the right...",
                episodeDescription: "Description",
                link: "link",
                likes: 10,
                comments: 10,
            },
        ],
        userId: ""
    };

    // Add funtion to cal getPost function on window onload and everytime when there is a new post added or every 2 mins or so
    //// Code goes here

    refreshPosts = () => {
        //


        this.getPosts();
    };

    // API request to get the user's and his follower's posts
    getPosts = () => {
        API.getPosts(this.state.userId)
            .then(res =>
                this.setState({
                    posts: res.data
                })
            )
            .catch(() =>
                this.setState({
                    posts: [],
                    message: "Please follow someone or post something to see posts"
                })
            );
    };

    render() {
        return (
            <Container>
                <Row>
                    {this.state.posts.length ? (
                        <Container>
                            {this.state.posts.map(post => (
                                <PostCard
                                    key={post.id}
                                    photo={post.userProfileImage}
                                    name={post.userName}
                                    date={post.date}
                                    message={post.message}
                                    icon={post.podcastIcon}
                                    title={post.podcastEpisode}
                                    description={post.episodeDescription}
                                    link={post.link}
                                    likes={post.likes}
                                    comments={post.comments}
                                />
                            ))}
                        </Container>
                    ) : (
                            <h2 className="text-center">{this.state.message}</h2>
                        )}
                </Row>
            </Container>
        )
    }
}

export default Home;