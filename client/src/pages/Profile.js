import React, { Component } from "react";
import { Link } from "react-router-dom";
import Container from "../components/Container/container";
import Row from "../components/Row/row";
import API from "../utils/API";
import PostCard from "../components/PostCard/postCard";
import Delete from "./delete.png";
import moment from "moment";
import Modal from "react-responsive-modal";
import User from "../components/User/user";
import List from "../components/List/list";
import Popup from "reactjs-popup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
    posts: [],
    numFollowers: 0,
    numFollowing: 0,
    favorites: [],
    posts: [],
    currentPostId: "",
    likes: [],
    showLikesModal: false,
    comments: [],
    currentComment: "",
    showCommentsModal: false,
    commentLikes: [],
    userListCommentLikes: [],
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
      this.setState({
        user: this.props.location.state.user
      });
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

  // DELETE POST if delete button is clicked
  handlePostDelete = (id) => {
    API.handlePostDelete(id)
      .then(res => {
        this.getPostsOnlyByUser();
      });
  };

  // DELETE FAVORITE if delete button is clicked
  handleFavoriteDelete = id => {
    API.handleFavoriteDelete(id).then(res => {
      this.getFavorites();
    });
  };

  
  // LIKING AND UNLIKING
  // ===============================================

  // Likes or unlikes a post
  handleLikeOrUnlike = (postId) => {
    API.likePost(postId, this.state.user.id).then(res => {
      if (res.data[1] === false) {
        API.unlikePost(postId, this.state.user.id).then(res => {
          this.getPostsOnlyByUser();
        })
      } else {
        this.getPostsOnlyByUser();
      }
    });
  }

  //Opens the Likes modal
  //Executed upon user clicking heart icon on page
  handleShowLikes = (postId) => {
    API.getLikes(postId).then(res => {
      if (res.data.length === 0) {
        this.setState({
          showLikesModal: false
        });
      }
      else {
        this.setState({
          likes: res.data,
          showLikesModal: true
        });
      }
    });
  };

  // Closes Likes modal
  closeLikesModal = () => {
    this.setState({
      showLikesModal: false
    });
  };


  // COMMENTS
  // ===============================================

  // Add a comment to post
  addComment = () => {
    API.addComment(this.state.currentComment, this.state.currentPostId, this.state.user.id).then(res => {
      // console.log(res.data)
      this.getPostsOnlyByUser();
      this.handleShowComments();
      this.closeCommentsModal();
    })
  }

  // Delete a comment from post
  deleteComment = (commentId) => {
    API.deleteComment(commentId).then(res => {
      this.getPostsOnlyByUser();
      this.handleShowComments();
      this.closeCommentsModal();
    });
  };

  // Show modal that displays comments
  handleShowComments = postId => {
    this.setState({
      currentPostId: postId
    });
    API.getComments(postId).then(res => {
      if (res.data.length === 0) {
        this.setState({
          comments: res.data,
          showCommentsModal: true,
        });
      }
      else {
        this.setState({
          comments: res.data,
          showCommentsModal: true,
          currentPostId: postId
        });
      }
    });
  };

  // Close modal that displays comments
  closeCommentsModal = () => {
    this.setState({
      showCommentsModal: false
    });
  };

  // Likes or unlikes a comment
  handleCommentLikeOrUnlike = (commentId) => {
    API.likeComment(commentId, this.state.user.id).then(res => {
      if (res.data[1] === false) {
        API.unlikeComment(commentId, this.state.user.id).then(res => {
          this.handleShowComments(this.state.currentPostId);
        });
      } else {
        this.handleShowComments(this.state.currentPostId);
      }
    });
  }

  // Show modal that displays likes for comment
  handleShowCommentsLikes = (commentId) => {
    API.getLikes(commentId).then(res => {
      if (res.data.length === 0) {
        this.setState({
          showLikesModal: false
        });
      }
      else {
        this.setState({
          commentLikes: res.data,
          showLikesModal: true
        });
      }
    });
  }

  // Show pop up with list of users who have liked comment
  getUsersListCommentLikes = (commentId) =>{
    API.getUsersLikedComment(commentId)
      .then(res =>{
        if(res.data.length === 0){
          this.setState({
              userListCommentLikes: [],
          });
        }
        else {
          this.setState({
              userListCommentLikes: res.data,
          });
        }
      });
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

                  <Row>
                    <h2 className="paddingTop userName">{this.props.location.state.user.name}</h2>
                  </Row>

                  <Row>
                    <div className="btn btn-dark" onClick={this.scrollTo}>
                      Posts:&nbsp; {this.state.posts.length}
                    </div>

                    <button
                      className="btn btn-dark"
                      onClick={this.getFollowers}
                    >
                      Followers:&nbsp;{this.state.numFollowers}
                    </button>

                    <Modal
                      open={this.state.showFollowersModal}
                      onClose={this.hideFollowersModal}
                    // classNames={{ modal: "customModal", overlay: "customOverlay", closeButton: "customCloseButton" }}
                    >
                      <h2>Users following {this.props.location.state.user.name}</h2>

                      {this.state.followers.length ? (
                        <List>
                          {this.state.followers.map(user =>
                            <div className="container tile m-2 userList" key={user.id}>
                              <User
                                userId={user.id}
                                userName={user.name}
                                userImage={user.image}
                                handler={null}
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

                    <Modal
                      open={this.state.showFollowingModal}
                      onClose={this.hideFollowersModal}
                    // classNames={{ modal: "customModal", overlay: "customOverlay", closeButton: "customCloseButton" }}
                    >
                      <h2>Users {this.props.location.state.user.name} follows</h2>

                      {this.state.following.length ? (
                        <List>
                          {this.state.following.map(user =>
                            <div className="container tile m-2 userList" key={user.id}>
                              <User
                                userId={user.id}
                                userName={user.name}
                                userImage={user.profileImage}
                                handler={null}
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
              <div className="row favorites rounded">

                {this.state.favorites.length ? (
                  <Container>
                    {this.state.favorites.map(favorite => (

                      <div className="row rounded favorite bg-dark text-secondary" key={favorite.id}>
                        <div className="col-2 py-5 px-3 pad">
                          <Link to={{
                            pathname: "/episodeList",
                            state: {
                              podcastId: favorite.podcastId,
                              podcastName: favorite.podcastName,
                              podcastLogo: favorite.podcastLogo,
                              loadMore: true
                            }
                          }}
                          >
                            <span><img id="podcastIcon" src={favorite.podcastLogo} alt="Podcast Logo" className="border-white favoriteIcon" /></span>
                          </Link>
                        </div>

                        <div className="col-10 p-1">
                          {JSON.parse(localStorage.getItem("user")).id === favorite.userId
                            ?
                            <div>
                              <button
                                className="btn btn-sm mb-1 float-right"
                                onClick={() => this.handleFavoriteDelete(favorite.id)}
                              >
                                <img src={Delete} alt="delete" className="size" />
                              </button>
                            </div>
                            : null
                          }
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

              <Row>
                <h4>Posts</h4>
                {this.state.posts.length ? (
                  <div className="container bg-dark">
                    {this.state.posts.map(post => (
                      <PostCard
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
                        likes={post.numberOfLikes}
                        comments={post.numberOfComments}
                        postId={post.id}
                        handlePostDelete={this.handlePostDelete}
                        handleShowLikes={this.handleShowLikes}
                        handleLikeOrUnlike={this.handleLikeOrUnlike}
                        handleShowComments={this.handleShowComments}
                      />
                    ))}

                    <Modal
                      open={this.state.showLikesModal}
                      onClose={this.closeLikesModal}
                      center
                    >
                      {this.state.likes.map(like => (
                        <div
                          className="row rounded favorite bg-dark text-secondary"
                          key={like.id}
                        >
                          <div className="col-3 mt-0">
                            <img
                              src={like.image}
                              alt="User Icon"
                              id="userImageLikesModal"
                              className="rounded border-white"
                            />
                          </div>
                          <div className="col-9">
                            <p>{like.name}</p>
                          </div>
                        </div>
                      ))}
                    </Modal>

                    <Modal
                      open={this.state.showCommentsModal}
                      onClose={this.closeCommentsModal}
                      center
                    >
                      {this.state.comments.map(comment => (
                        <div className="commentBox rounded border border-top-0 border-left-0 border-right-0 bg-dark text-secondary" key={comment.id}>
                          <div
                            className="row comment-top-row"
                          >
                            <div className="col-2 mt-0">
                              <img
                                src={comment.userImage}
                                alt="User Icon"
                                id="userImageCommentsModal"
                                className="rounded border-white mt-1"
                              />
                            </div>
                            <div className="col-10">
                              <p>{comment.userName}&nbsp;|&nbsp; {moment(comment.createdAt).format("LLL")}</p>
                            </div>
                          </div>

                          <div
                            className="row comment-second-row"
                          >
                            <p className="userComment pl-2 ml-3">{comment.comment}</p>
                          </div>
                          <div className="row comment-third-row">
                            <div className="col-4 mb-2">
                              <a
                                className="likes ml-4"
                                onClick={() => this.handleCommentLikeOrUnlike(comment.id)}
                              >
                                <FontAwesomeIcon icon="heart" />
                              </a>

                              <Popup
                                trigger={<div>{comment.numberOfLikes}</div>}
                                on="hover"
                                onOpen = {()=> this.getUsersListCommentLikes(comment.id)}
                                position="top left"
                                closeOnDocumentClick
                              >
                              {this.state.userListCommentLikes.map(user => (
                                <div>
                                  <div>{user.name}</div>
                                  <img src={user.image}  alt="User Icon"/>
                                </div>
                              ))
                              }
                            </Popup>
                              
                            </div>
                            {this.state.user.id === comment.commentedBy
                              ?
                              <div className="col-8">
                                <button className="btn btn-sm deleteComment float-right" onClick={() => this.deleteComment(comment.id)}>
                                  Delete
                                </button>
                              </div>
                              : null
                            }
                          </div>
                        </div>
                      ))}

                      <form>
                        <div className="form-group mt-4 bg-dark text-secondary">
                          <input type="text" className="form-control" id="commentForm"
                            defaultValue=""
                            name="currentComment"
                            placeholder="Enter your comment" ref={this.state.currentComment} onChange={this.handleInputChange} />
                        </div>
                        <button type="submit" className="btn btn-light btn-sm mb-2" onClick={(event) => { event.preventDefault(); this.addComment() }
                        }
                        >Submit</button>
                      </form>
                    </Modal>

                  </div>
                ) : (
                    <div className="col">
                      <h5 className="text-center">
                        &nbsp;{this.state.messageNoPodcast}
                      </h5>
                    </div>
                  )}
              </Row>
            </Container>
          </div>
          <div className="col-md-2 col-xs-0"></div>
        </Row>
      </div>

    );
  }
}

export default Profile;

