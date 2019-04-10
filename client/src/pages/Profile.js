import React, { Component } from "react";
import { Link } from "react-router-dom";
import Container from "../components/Container/container";
import Row from "../components/Row/row";
import API from "../utils/API";
import Post from "../components/Post/post";
import Delete from "./delete-1.png";
import moment from "moment";
import Modal from "react-responsive-modal";
import User from "../components/User/user";
import List from "../components/List/list";
import "./Profile.css";

// USER PROFILE PAGE

// Contains info on user's # of posts, followers, and followings
// Displays user's favorites
// Displays user's posts
// Has functionality to like/unlike a post
// Has functionality to comment on post
// Has functionality to like/unlike a comment
// Has modals to display: likes, comments, followers, followings
// Has functionality to redirect to Episode List and Listen page on post click

class Profile extends Component {
  state = {
    user: [],
    userIsFollowed: null,
    posts: [],
    numFollowers: 0,
    numFollowing: 0,
    favorites: [],
    currentPostId: "",
    followers: [],
    following: [],
    showFollowersModal: false,
    showFollowingModal: false,
    redirect: false
  };

  // Load user profile information
  componentDidMount() {
    this.getFavorites();
    this.getPostsOnlyByUser();
    this.getNumFollowers();
    this.getNumFollowing();
    this.isUserFollowed();
    this.setState({
      user: this.props.location.state.user
    });
  }

  // Update profile information if subject user changes
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.state.user.id !== this.props.location.state.user.id) {

      this.getFavorites();
      this.getPostsOnlyByUser();
      this.getNumFollowers();
      this.getNumFollowing();
      this.isUserFollowed();
      this.setState({
        user: this.props.location.state.user
      });
    }

    if (prevState.userIsFollowed !== this.state.userIsFollowed) {
      this.getNumFollowers();
      this.getNumFollowing();
    }
  }


  // POPULATE USER PROFILE INFORMATION
  // ===============================================

  // Get user data and set it in state
  getOrCreateUser = () => {
    API.getOrCreateUser(this.props.location.state.user.id).then(res => {
      this.setState({
        user: res.data
      });
    });
  };

  // Get number of FOLLOWERS for user
  getNumFollowers = () => {
    API.getFollowers(this.props.location.state.user.id)
      .then(res => {
        this.setState({
          numFollowers: res.data[0].count
        });
      })
      .catch(() => {
        this.setState({
          numFollowers: 0
        });
      });
  };

  // Get number of other users that current user is FOLLOWING
  getNumFollowing = () => {
    API.getFollowing(this.props.location.state.user.id)
      .then(res => {
        this.setState({
          numFollowing: res.data[0].count
        });
      })
      .catch(() => {
        this.setState({
          numFollowing: 0
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
            messageNoFav:
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
          messageNoFav:
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
            messageNoPodcast: "No posts found."
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
          messageNoPodcast: "No posts found."
        });
      });
  };


  // LIST OF FOLLOWERS / FOLLOWINGS, MODALS
  // ===============================================

  // Get list of user's followers
  getFollowers = () => {
    API.isFollowedByUsers(this.state.user.id)
      .then(res => {
        this.setState({
          followers: res.data,
        }, () => { this.showFollowersModal() });
      });
  }

  // Get list of other users that user is following
  getUsersFollowed = () => {
    API.getUsersFollowed(this.state.user.id)
      .then(res => {
        this.setState({
          following: res.data
        }, () => { this.showFollowingModal() });
      });
  }

  // Show modal that displays followers
  showFollowersModal = () => {
    this.setState({
      showFollowersModal: true
    });
  }

  // Show modal that displays other users being followed
  showFollowingModal = () => {
    this.setState({
      showFollowingModal: true
    });
  }

  // Hide Followers and Followings modals
  hideFollowersModal = () => {
    this.setState({
      showFollowersModal: false,
      showFollowingModal: false
    });
  }


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


  // FOLLOW / UNFOLLOW USER
  // ===============================================

  // Checks to see if user is following viewed user
  isUserFollowed = () => {

    // Get current user's ID
    let currUserId = JSON.parse(localStorage.getItem("user")).id;

    // Get list of users followed by current user
    API.getUsersFollowed(currUserId)
      .then(res => {

        let usersFollowed = res.data;

        // Look for viewed user's ID in list of followed users
        usersFollowed.forEach(element => {
          if (this.state.user.id === element.id) {

            this.setState({
              userIsFollowed: true
            });

            return;
          }
        });
      });
  }

  // Follows user if follow button is clicked
  followUser = (userId) => {

    let that = this;
    let currUserId = JSON.parse(localStorage.getItem("user")).id;

    API.followUser(currUserId, userId)
      .then(function (response) {
        that.setState({
          userIsFollowed: true
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Unfollows user if unfollow button is clicked
  unfollowUser = (userId) => {

    let that = this;
    let currUserId = JSON.parse(localStorage.getItem("user")).id;

    API.unFollowUser(currUserId, userId)
      .then(function (response) {
        that.setState({
          userIsFollowed: false
        });
      })
      .catch((err) =>
        console.log(err)
      )
  }


  // OTHER
  // ===============================================

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // Scrolls to post section when Posts is clicked from profile header
  scrollTo = () => {
    window.scrollTo(0, 500);
  }

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

              <div className="row userProfile rounded bg-dark text-white">
                <div className="col-3">
                  <img
                    src={this.props.location.state.user.profileImage}
                    alt="User"
                    id="userMainProfileImage"
                    className="rounded border-white"
                  />
                </div>

                <div className="col">

                  {/* User Name */}

                  <Row>
                    <h2 className="paddingTop userName">{this.props.location.state.user.name}</h2>
                  </Row>

                  {/* Follow Button */}

                  {this.state.user.id !== JSON.parse(localStorage.getItem("user")).id ? (
                    this.state.userIsFollowed ? (
                      <button
                        className="btn btn-outline-light followBtn"
                        onClick={(event) => { event.preventDefault(); this.unfollowUser(this.state.user.id) }}
                      >
                        Unfollow
                        </button>
                    ) : (
                        <button
                          className="btn btn-outline-light followBtn"
                          onClick={(event) => { event.preventDefault(); this.followUser(this.state.user.id) }}
                        >
                          Follow
                        </button>
                      )

                  ) : (
                      <></>
                    )
                  }

                  {/* User Info: Posts, Followers, Following */}

                  <Row>
                    <div className="btn btn-dark postsBtn" onClick={this.scrollTo}>
                      Posts:&nbsp; {this.state.posts.length}
                    </div>

                    <button
                      className="btn btn-dark"
                      onClick={this.getFollowers}
                    >
                      Followers:&nbsp;{this.state.numFollowers}
                    </button>

                    {/* FOLLOWERS MODAL */}

                    <Modal
                      open={this.state.showFollowersModal}
                      onClose={this.hideFollowersModal}
                      classNames={{ modal: "followersModal" }}
                    >
                      <h4 className="modalTitle">Followers</h4>

                      {this.state.followers.length ? (
                        <List>
                          {this.state.followers.map(user =>
                            <div className="container tile m-2 userList" key={user.id}>
                              <User
                                userId={user.id}
                                userName={user.name}
                                userImage={user.image}
                                handler={this.hideFollowersModal}
                              />
                            </div>
                          )}
                        </List>
                      ) : (
                          this.state.message !== "Loading..." ? (
                            <h2>No followers found.</h2>
                          ) : (
                              <></>
                            )
                        )}

                      <h2>{this.state.message}</h2>

                    </Modal>

                    <button
                      className="btn btn-dark"
                      onClick={this.getUsersFollowed}
                    >
                      Following:&nbsp;{this.state.numFollowing}
                    </button>

                    {/* FOLLOWING MODAL */}

                    <Modal
                      open={this.state.showFollowingModal}
                      onClose={this.hideFollowersModal}
                      classNames={{ modal: "followersModal" }}
                    >
                      <h4 className="modalTitle">Following</h4>

                      {this.state.following.length ? (
                        <List>
                          {this.state.following.map(user =>
                            <div className="container tile m-2 userList" key={user.id}>
                              <User
                                userId={user.id}
                                userName={user.name}
                                userImage={user.profileImage}
                                handler={this.hideFollowersModal}
                              />
                            </div>
                          )}
                        </List>
                      ) : (
                          this.state.message !== "Loading..." ? (
                            <h2>User is not following anyone.</h2>
                          ) : (
                              <></>
                            )
                        )}

                      <h2>{this.state.message}</h2>

                    </Modal>
                  </Row>
                </div>
              </div>

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
                      <h5 className="text-center">&nbsp;{this.state.messageNoFav}</h5>
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
                        &nbsp;{this.state.messageNoPodcast}
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

