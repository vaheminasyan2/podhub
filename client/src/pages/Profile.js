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

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

library.add(faChevronLeft, faChevronRight);

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

  scrollLeft = () => {
    this.refs.scroller.scrollLeft -= 618;
  }

  scrollRight = () => {
    this.refs.scroller.scrollLeft += 618;
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
                theme={this.props.theme}
              />

              {/* FAVORITES SECTION */}

              <h4 id="favoritesTitle">Favorites</h4>

              <div
                className={`row favorites rounded bg-${this.props.theme}`}
              >

                {this.state.favorites.length ? (

                  <div 
                    ref="scroller"
                    id="entire-favorites-column"
                  >

                    {/* SCROLL LEFT ARROW */}

                    <FontAwesomeIcon
                      className="left-arrow fa-3x"
                      icon="chevron-left"
                      onClick={this.scrollLeft}
                    />  

                    {this.state.favorites.map(favorite => (

                      // FAVORITES: PODCAST LOGO, LINK TO EPISODE LIST PAGE

                      <div className="py-5 px-3 pad card bg-transparent" id="card-contain">

                        {/* FAVORITES: DELETE BUTTON */}
                        {JSON.parse(localStorage.getItem("user")).id === favorite.userId ?
                          (<div>

                            <button
                              className="btn btn-sm mb-1 float-right deleteButtonX"
                              onClick={() => this.handleFavoriteDelete(favorite.id)}
                            >
                              <img src={Delete} alt="delete" className="size delbtn" />
                            </button>
                          </div>)
                          : (null)
                        }

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
                          <img
                            id="podcastIcon"
                            src={favorite.podcastLogo}
                            alt="Podcast Logo"
                            className="border-white favoriteIcon card-img-top"
                          />
                        </Link>

                        <div className="card-body">
                          {/* FAVORITES: BODY, LINK TO LISTEN PAGE */}

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
                            className={`favoriteLink ${this.props.theme}`}
                          >
                            <h4>{favorite.podcastName}</h4>
                            <hr />
                            <p className="favoriteDescription">{favorite.episodeName}</p>
                          </Link>
                        </div>

                      </div>

                    ))}

                    {/* SCROLL RIGHT ARROW */}

                    <FontAwesomeIcon
                      className="right-arrow fa-3x"
                      icon="chevron-right"
                      onClick={this.scrollRight}
                    />

                  </div>
                  
                ) : (
                  <div className="col">
                    <h5 className="text-center">&nbsp;{this.state.message}</h5>
                  </div>
                )}
              </div>

              {/* POSTS SECTION */}

              <h4 id="postsTitle">Posts</h4>
              <div className={`row posts rounded bg-${this.props.theme}`}>
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
                        theme={this.props.theme}
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