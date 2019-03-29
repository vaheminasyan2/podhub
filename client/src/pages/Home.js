import React, { Component } from "react";
import Container from "../components/Container/container";
import Row from "../components/Row/row";
//import Col from "../components/Col/col";
import API from "../utils/API";
import PostCard from "../components/PostCard/postCard";

class Home extends Component {

    state = {
        posts: [
            {
                id: 1,
                userProfileImage: "https://picsum.photos/200",
                userName: "Vahe Minasyan",
                date: "03/20/2019",
                message: "Checkout this awesome podcast",
                podcastIcon: "https://picsum.photos/200",
                podcastEpisode: "Very Bad Wizards Episode 159: You have the right...",
                episodeDescription: "Description",
                link: "link",
                likes: 10,
                comments: 10,
            },
            {
                id: 2,
                userProfileImage: "https://picsum.photos/200",
                userName: "John Smith",
                date: "03/21/2019",
                message: "Checkout this awesome podcast",
                podcastIcon: "https://picsum.photos/200",
                podcastEpisode: "Very Bad Wizards Episode 159: You have the right...",
                episodeDescription: "Description",
                link: "link",
                likes: 10,
                comments: 10,
            },
        ],
        user: [
            {
                name: "John Smith",
                userProfileImage: "https://picsum.photos/200",
                googleUserId: "1111",
            },
        ],

    };

    // componentDidMount() {
    //     this.getPosts();
    // };

    // Add function to call getPost function every time when something is posted or every 2 mins or so


    // API request to get the user's and his follower's posts
    getPosts = () => {
        API.getPosts(this.state.user.googleUserId)
            .then(res =>
                this.setState({
                    posts: res.data
                })
            )
            .catch(() =>
                this.setState({
                    posts: [],
                    message: "No podcast found, please post something or follow someone to see the feeds."
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
                            <h4 className="text-center">{this.state.message}</h4>
                        )}
                </Row>
            </Container>
        )
    }
}

export default Home;