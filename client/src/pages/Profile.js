import React, { Component } from "react";
import { Link } from "react-router-dom";
import Container from "../components/Container/container";
import Row from "../components/Row/row";
import API from "../utils/API";
import Post from "../components/Post/post";
import Delete from "./delete-1.png";
import moment from "moment";
import ProfileHeader from "../components/ProfileHeader/profileHeader";
import "./Profile.css";

// USER PROFILE PAGE

// Contains info on user's # of posts, followers, and followings
// Displays user's favorites
// Displays user's posts

class Profile extends Component {
  state = {
    user: [],
    posts: [],
    favorites: [],
    currentPostId: "",
    redirect: false,
    message: ""
  };

  // Load user profile information
  componentDidMount() {
    this.getFavorites();
    this.getPostsOnlyByUser();
    this.setState({
      user: this.props.location.state.user
    });
  }

  // Update profile information if subject user changes
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.state.user.id !== this.props.location.state.user.id) {
      this.getFavorites();
      this.getPostsOnlyByUser();
      this.setState({
        user: this.props.location.state.user
      });
    }
  }


  // POPULATE POST & FAVORITE INFORMATION
  // ===============================================

  // Get user data and set it in state
  getOrCreateUser = () => {
    API.getOrCreateUser(this.props.location.state.user.id).then(res => {
      this.setState({
        user: res.data
      });
    });
  };

  // Get user's FAVORITES
  getFavorites = () => {
    API.getFavorites(this.props.location.state.user.id)
      .then(res => {
        if (res.data.length === 0) {
          this.setState({
            favorites: [],
            message:
              "No favorites found."
          });
        } else {
          this.setState({
            favorites: res.data
          });
        }
      })
      .catch(() => {
        this.setState({
          favorites: [],
          message:
            "No favorites found."
        });
      });
  };

  // Get user's own POSTS
  getPostsOnlyByUser = () => {
    API.getPostsOnlyByUser(this.props.location.state.user.id)
      .then(res => {
        if (res.data.length === 0) {
          this.setState({
            posts: [],
            message: "No posts found."
          });
        } else {
          this.setState({
            posts: res.data
          });
        }
      })
      .catch(() => {
        this.setState({
          posts: [],
          message: "No posts found."
        });
      });
  };


  // POST AND FAVORITE FUNCTIONALITY
  // ===============================================

  // Executed when clicking on post content
  // Redirects to the Listen page
  listenToEpisode = event => {
    event.preventDefault();

    this.setState({
      redirect: true
    });
  }

  // DELETE FAVORITE if delete button is clicked
  handleFavoriteDelete = id => {
    API.handleFavoriteDelete(id).then(res => {
      this.getFavorites();
    });
  };


  // OTHER
  // ===============================================

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // Takes (True, Audio Link) and passes them to App.js
  toHomeAndProfile = (value, link, podName, epName) => {
    this.props.toApp(value, link, podName, epName);
  }

  render() {
    return (
      <div className="container">
        <Row>
          <div className="col-md-2 col-xs-0"></div>
          <div className="col-md-8 col-xs-12">
            <Container>

              {/* PROFILE HEADER */}

              <ProfileHeader 
                user={this.props.location.state.user}
                numPosts={this.state.posts.length}
              />

              {/* FAVORITES SECTION */}

              <h4 id="favoritesTitle">Favorites</h4>
              <div className="row favorites rounded bg-dark">

                {this.state.favorites.length ? (

                  <Container>

                    {this.state.favorites.map(favorite => (

                      // FAVORITES: PODCAST LOGO, LINK TO EPISODE LIST PAGE
                      <div className="row rounded favorite text-secondary" key={favorite.id}>
                        <div className="col-2 py-5 px-3 pad">

                          <Link
                            to={{
                              pathname: "/episodeList",
                              state: {
                                podcastId: favorite.podcastId,
                                podcastName: favorite.podcastName,
                                podcastLogo: favorite.podcastLogo,
                                loadMore: true
                              }
                            }}
                          >
                            <span>
                              <img
                                id="podcastIcon"
                                src={favorite.podcastLogo}
                                alt="Podcast Logo"
                                className="border-white favoriteIcon"
                              />
                            </span>
                          </Link>

                        </div>

                        {/* FAVORITES: BODY, LINK TO LISTEN PAGE */}
                        <div className="col-7 p-1">

                          <Link
                            to={{
                              pathname: "/listen",
                              state: {
                                podcastId: favorite.podcastId,
                                podcastName: favorite.podcastName,
                                podcastLogo: favorite.podcastLogo,
                                episodeId: favorite.episodeId,
                                episodeName: favorite.episodeName,
                                date: moment(favorite.date).format("LLL"),
                                description: favorite.description,
                                audioLink: favorite.audioLink
                              }
                            }}
                            className="favoriteLink"
                          >
                            <h4>{favorite.podcastName}</h4>
                            <p className="favoriteDescription">{favorite.episodeName}</p>
                          </Link>

                        </div>

                        {/* FAVORITES: DELETE BUTTON */}
                        <div className="col-3 pr-4">
                          {JSON.parse(localStorage.getItem("user")).id === favorite.userId
                            ?
                            <div>
                              <button
                                className="btn btn-sm mb-1 float-right deleteButtonX"
                                onClick={() => this.handleFavoriteDelete(favorite.id)}
                              >
                                <img src={Delete} alt="delete" className="size" />
                              </button>
                            </div>
                            : null
                          }
                        </div>

                      </div>
                    ))}
                  </Container>
                ) : (
                    <div className="col">
                      <h5 className="text-center">&nbsp;{this.state.message}</h5>
                    </div>
                  )}
              </div>

              {/* POSTS SECTION */}

              <h4 id="postsTitle">Posts</h4>
              <div className="row posts rounded bg-dark">
                {this.state.posts.length ? (
                  <Container>
                    {this.state.posts.map(post => (
                      <Post
                        key={post.id}
                        userId={post.postedBy}
                        userName={this.state.user.name}
                        userImage={this.state.user.profileImage}
                        date={moment(post.createdAt).format("LLL")}
                        podcastId={post.podcastId}
                        podcastName={post.podcastName}
                        podcastLogo={post.podcastLogo}
                        episodeId={post.episodeId}
                        episodeName={post.episodeName}
                        description={post.description}
                        audioLink={post.audioLink}
                        userMessage={post.userMessage}
                        numLikes={post.numberOfLikes}
                        numComments={post.numberOfComments}
                        postId={post.id}
                        updateParentState={this.getPostsOnlyByUser}
                        toHomeAndProfile={this.toHomeAndProfile}
                      />
                    ))}
                  </Container>

                ) : (
                    <div className="col">
                      <h5 className="text-center">
                        &nbsp;{this.state.message}
                      </h5>
                    </div>
                  )}

              </div>
            </Container>
          </div>

          <div className="col-md-2 col-xs-0"></div>

        </Row>

      </div>

    );
  }
}

export default Profile;

