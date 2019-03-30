import React, { Component } from "react";
import Container from "../components/Container/container";
import Row from "../components/Row/row";
//import Col from "../components/Col/col";
import API from "../utils/API";
import PostCard from "../components/PostCard/postCard";
import "./Profile.css";

// USER PROFILE PAGE

class Home extends Component {

    state = {
        posts:[],
        followers: 0,
        following: 0,
        favorites: []
    }

    // state = {
    //     posts: [
    //         {
    //             id: 1,
    //             userProfileImage: "https://picsum.photos/200",
    //             userName: "Vahe Minasyan",
    //             date: "03/20/2019",
    //             message: "Checkout this awesome podcast",
    //             podcastIcon: "https://picsum.photos/200",
    //             podcastEpisode: "Very Bad Wizards Episode 159: You have the right...",
    //             episodeDescription: "Description",
    //             link: "link",
    //             likes: 10,
    //             comments: 10,
    //         },
    //         {
    //             id: 2,
    //             userProfileImage: "https://picsum.photos/200",
    //             userName: "John Smith",
    //             date: "03/21/2019",
    //             message: "Checkout this awesome podcast",
    //             podcastIcon: "https://picsum.photos/200",
    //             podcastEpisode: "Very Bad Wizards Episode 159: You have the right...",
    //             episodeDescription: "Description",
    //             link: "link",
    //             likes: 10,
    //             comments: 10,
    //         },
    //     ],
       
    //     followers: 5,
    //     following: 10,
    //     favorites: [
    //         {
    //             id: 1,
    //             podcastIcon: "https://picsum.photos/100",
    //             podcastTitle: "Favorite podcast 1",
    //             podcastDescription: "Description",
    //             link: "link",
    //         },
    //         {
    //             id: 2,
    //             podcastIcon: "https://picsum.photos/100",
    //             podcastTitle: "Favorite podcast 2",
    //             podcastDescription: "Description",
    //             link: "link",
    //         },
    //         {
    //             id: 3,
    //             podcastIcon: "https://picsum.photos/100",
    //             podcastTitle: "Favorite podcast 3",
    //             podcastDescription: "Description",
    //             link: "link",
    //         }
    //     ]
    // };

    componentDidMount() {
        this.getPostsOnlyByUser();
        this.getFavorites();
        // this.getOrCreateUser();
        this.getFollowers();
        this.getFollowing();
    };

    getPostsOnlyByUser = () => {
        API.getPostsOnlyByUser(this.props.user.id)
            .then(res =>{
                if (res.data.length === 0) {
                    this.setState({
                        posts: [],
                        messageNoPodcast: "No posts found, post something."
                    })
                }
                else {
                    console.log(res.data)
                    this.setState({
                        posts: res.data
                    })
                }
            })
            .catch(() =>
                this.setState({
                    posts: [],
                    messageNoPodcast: "No posts found, post something."
                })
        
            );
    };

    getFavorites = () => {
        API.getFavorites(this.props.user.id)
            .then(res =>{
                if (res.data.length === 0) {
                    this.setState({
                        favorites: [],
                        messageNoFav: "No favorites found. Search for a podcast and add it to your favorites."
                    })
                }
                else {
                    this.setState({
                        favorites: res.data
                    })
                }
            })
            .catch(() =>
                this.setState({
                    favorites: [],
                    messageNoFav: "No favorites found. Search for a podcast and add it to your favorites."
                })
            );
    };

    getOrCreateUser = () => {
        API.getOrCreateUser(this.state.userId)
            .then(res =>
                this.setState({
                    user: res.data
                })
            );
    };

    getFollowers = () => {
        API.getFollowers(this.props.user.id)
            .then(res =>{
                console.log(res)
                console.log(res.data[0].count)
                this.setState({
                    followers: res.data[0].count
                })
            })
            .catch(() =>
                this.setState({
                    followers: 0,
                })
            );
    };

    getFollowing = () => {
        API.getFollowing(this.props.user.id)
            .then(res =>{
                console.log(res)
                console.log(res.data[0].count)
                this.setState({
                    following: res.data[0].count
                })
            })
            .catch(() =>
                this.setState({
                    following: 0,
                })
            );
    };

    handleFavoriteDelete = id => {
        API.deleteFavorite(id).then(res => this.getFavorites());
    };


    render() {
        console.log(this.props.user)
        return (
            <Container>
                <div className="columns userProfile rounded bg-light">
                    <div className="column is-narrow">
                        <img src={this.props.user.profileImage} alt="User" id="userMainProfileImage"/>
                    </div>

                    <div className="column is-one-quarter">
                        <Row>
                            <h2 className="hcenter">{this.props.user.name}</h2>
                        </Row>
                        <Row>
                            <h2 className="hcenter">
                            Posts:&nbsp; {this.state.posts.length} &nbsp; | &nbsp;
                            Followers:&nbsp;{this.state.followers}&nbsp; | &nbsp;
                            Following:&nbsp;{this.state.following}
                            </h2>
                        </Row>
                    </div>
                </div>

                <Row>
                    <div className="column is-one-third">
                    <h2 className="is-size-3">Favorites: </h2>
                    </div>
                </Row>
                <Row>
                    {this.state.favorites.length ? (
                        <div className="column is-full">
                            {this.state.favorites.map(favorites => (

                                <div key={favorites.id} className="columns is-mobile">

                                    <div className="column is-narrow">

                                        <img src={favorites.podcastIcon} alt="Podcast Icon" id="inherit"/>
                                    </div>
                                    <div className="column">
                                        <p>{favorites.podcastTitle}</p>
                                        <p>{favorites.podcastDescription}</p>
                                        <a href={favorites.link}>{favorites.link}</a> &nbsp;

                                            <button className="btn btn-sm mb-1 btn-light"
                                            onClick={() => this.handleFavoriteDelete(favorites.id)}
                                        >
                                            x
                                            </button>

                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                            <div className="col">
                                <h5 className="text-center">&nbsp;{this.state.messageNoFav}</h5>
                            </div>
                        )}
                </Row>
                <Row>
                <div className="column">
                    <h2 className="is-size-3">Recent Posts: </h2>
                    </div>
                </Row>
                <Row>
                    {this.state.posts.length ? (
                        <div>
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
                        </div>
                    ) : (
                            <div className="col">
                                <h5 className="text-center">&nbsp;{this.state.messageNoPodcast}</h5>
                            </div>
                        )}
                </Row>
            </Container>
        )
    }
}

export default Home;