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

  constructor(props) {
    super(props)
    this.state = {
      user: [],
      posts: [],
      favorites: [],
      currentPostId: "",
      redirect: false,
      postMessage: "",
      favMessage: "",
      scrollLeft: 0,
      awsImageUrl:""
    };
  }

  // Load user profile information
  componentDidMount() {
    this.getAwsImageUrl()
    this.getFavorites();
    this.getPostsOnlyByUser();
    this.setState({
      user: this.props.location.state.user,
    });
  }

  // Update profile information if subject user changes
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.state.user.id !== this.props.location.state.user.id) {
      this.getAwsImageUrl()
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
  getAwsImageUrl = () => {
    API.getAwsImageUrl(this.props.location.state.user.id)
      .then(res => {
        console.log(res.data.url)
        // console.log(this)
        this.setState({
          awsImageUrl: res.data.url,
        });
        console.log(this.state.awsImageUrl)
      })
  }
  // Get user's FAVORITES
  getFavorites = () => {
    API.getFavorites(this.props.location.state.user.id)
      .then(res => {
        if (res.data.length === 0) {
          this.setState({
            favorites: [],
            favMessage:
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
          favMessage:
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
            postMessage: "No posts found."
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
          postMessage: "No posts found."
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

  // Handles SCROLLING left and right through Favorites section
  scrollTo = (direction) => {
    let element = document.getElementById("entire-favorites-column");

    let duration = 500;
    let that = this;

    var start = element.scrollLeft,
      change = (618 - ((start % 618)) - 618), // default to scrolling left
      currentTime = 0,
      increment = 20;

    // For scrolling left
    if (change === 0) {
      change = -618;
    }

    // For scrolling right
    if (direction === "right") {
      change = 618 - (start % 618);
    }

    var animateScroll = function () {
      currentTime += increment;

      var val = that.easeInAndOut(currentTime, start, change, duration);

      element.scrollLeft = val;

      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    }

    let maxScroll = this.state.favorites.length * 193;

    if (this.state.scrollLeft >= 0 && this.state.scrollLeft <= maxScroll) {
      this.setState({
        scrollLeft: that.state.scrollLeft + change
      });
    }

    animateScroll();
  }

  // Handles animation timing for scrolling through Favorites
  easeInAndOut = (time, value, change, duration) => {
    time /= duration / 2;

    if (time < 1) {
      return change / 2 * time * time + value;
    }

    time--;

    return -change / 2 * (time * (time - 2) - 1) + value;
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
                awsImageUrl={this.state.awsImageUrl}
                numPosts={this.state.posts.length}
                numFavs={this.state.favorites.length}
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
                      onClick={(event) => {
                        event.preventDefault();
                        this.scrollTo("left");
                      }}
                    />

                    {this.state.favorites.map(favorite => (

                      // FAVORITES: PODCAST LOGO, LINK TO EPISODE LIST PAGE

                      <div className="py-5 px-3 pad card bg-transparent" id="card-contain" key={favorite.podcastId}>

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
                            <h4 className="favoriteTitle">{favorite.podcastName}</h4>

                            <p className="favoriteDescription">{favorite.episodeName}</p>
                          </Link>
                        </div>

                      </div>

                    ))}

                    {/* SCROLL RIGHT ARROW */}

                    <FontAwesomeIcon
                      className="right-arrow fa-3x"
                      icon="chevron-right"
                      onClick={(event) => {
                        event.preventDefault();
                        this.scrollTo("right");
                      }}
                    />

                  </div>

                ) : (
                    <div className="col">
                      <h5 className="text-center">&nbsp;{this.state.favMessage}</h5>
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
                        userName={this.props.location.state.user.name}
                        userImage={this.props.location.state.user.profileImage}
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

                  </Container >

                ) : (
                    <div className="col">
                      <h5 className="text-center">
                        &nbsp;{this.state.postMessage}
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
