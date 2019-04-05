import React, { Component } from "react";
//import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import Container from "../components/Container/container";
import Row from "../components/Row/row";
import API from "../utils/API";
//import Podcast from "../components/Podcast/podcast";
import PostCard from "../components/PostCard/postCard";
import "./Profile.css";
import Delete from "./delete.png";
import moment from "moment";
import Modal from "react-responsive-modal";
import User from "../components/User/user";
import List from "../components/List/list";
import Popup from "reactjs-popup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// USER PROFILE PAGE

class Profile extends Component {
  state = {
    user: [],
    posts: [],
    followers: 0,
    actualFollowers: [],
    following: 0,
    actualFollowing: [],
    favorites: [],
    showLikesModal: false,
    likes: [],
    redirect: false,
    showCommentsModal: false,
    comments: [],
    currentComment: "",
    currentPostId: "",
    commentLikes: [],
    showFollowers: false,
    showFollowingModal: false,
    userListCommentLikes: []
  };

  // Load user profile information
  componentDidMount() {
    this.getFavorites();
    this.getPostsOnlyByUser();
    this.getFollowers();
    this.getFollowing();
    this.setState({
      user: this.props.location.state.user
    });
  }

  // Update profile information if user's change
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.state.user.id !== this.props.location.state.user.id) {

      this.getFavorites();
      this.getPostsOnlyByUser();
      this.getFollowers();
      this.getFollowing();
      this.setState({
        user: this.props.location.state.user
      });
    }
  }

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
  getUsersListCommentLikes = (commentId) =>{
    API.getUsersLikedComment(commentId)
    .then(res =>{
        console.log(res.data)
        if(res.data.length === 0){
            this.setState({
                userListCommentLikes: [],
            });

    }else{
        this.setState({
            userListCommentLikes: res.data,
        });
    }
    })
}

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

  getOrCreateUser = () => {
    API.getOrCreateUser(this.props.location.state.user.id).then(res => {
      this.setState({
        user: res.data
      });
    });
  };

  getActualFollowers = () => {

    API.isFollowedByUsers(this.state.user.id)
      .then(res => {
        // console.log(res);
        this.setState({
          actualFollowers: res.data,
        }, () => { this.showFollowersModal() });
      });
  }

  getUsersFollowed = () => {

    API.getUsersFollowed(this.state.user.id)
        .then(res => {
            this.setState({
                actualFollowing: res.data
            }, () => {this.showFollowingModal() });
        });
}     

showFollowingModal = () => {
  this.setState({
    showFollowingModal: true
  });
}

  getFollowers = () => {
    API.getFollowers(this.props.location.state.user.id)
      .then(res => {
        this.setState({
          followers: res.data[0].count
        });
      })
      .catch(() => {
        this.setState({
          followers: 0
        });
      });
  };

  getFollowing = () => {
    API.getFollowing(this.props.location.state.user.id)
      .then(res => {
        this.setState({
          following: res.data[0].count
        });
      })
      .catch(() => {
        this.setState({
          following: 0
        });
      });
  };

  handlePostDelete = (id) => {
      API.handlePostDelete(id)
        .then(res => {
          this.getPostsOnlyByUser();
        });
  };

  handleFavoriteDelete = id => {
      API.handleFavoriteDelete(id).then(res => {
        this.getFavorites();
      });
  };

  //Opens the Likes modal
  //Executed upon user clicking "Likes" button on page
  handleShowLikes = postId => {

    API.getLikes(postId).then(res => {
      //console.log(res.data);
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

  handleLikeOrUnlike = postId => {
    API.likePost(postId, this.state.user.id).then(res => {
      //console.log(res.data)
      if (res.data[1] === false) {
        API.unlikePost(postId, this.state.user.id).then(res => {
          //console.log(res.data)
          this.getPostsOnlyByUser();
        })
      } else{
        this.getPostsOnlyByUser();
      }
      
    })
  }

  // Closes Likes Episode modal
  // Executed upon user clicking "Likes" button in modal
  closeLikesModal = () => {
    this.setState({
      showLikesModal: false
    });
  };

  listenToEpisode = event => {
    event.preventDefault();

    this.setState({
      redirect: true
    });
  }

  handleCommentLikeOrUnlike = commentId => {
    API.likeComment(commentId, this.state.user.id).then(res => {
      if (res.data[1] === false) {
        API.unlikeComment(commentId, this.state.user.id).then(res => {
          // console.log(res.data)
          this.handleShowComments(this.state.currentPostId);
        })
      }else{
        this.handleShowComments(this.state.currentPostId);
      }
      // this.getPostsOnlyByUser();
      // this.handleShowComments();
    })
  }

  handleShowCommentsLikes = commentId => {
    API.getLikes(commentId).then(res => {
      //console.log(res.data);
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

  handleShowComments = postId => {
    this.setState({
      currentPostId: postId
    });
    API.getComments(postId).then(res => {
      // console.log(res.data);
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

  addComment = () => {
    API.addComment(this.state.currentComment, this.state.currentPostId, this.state.user.id).then(res => {
      // console.log(res.data)
      this.getPostsOnlyByUser();
      this.handleShowComments();
      this.closeCommentsModal();
    })
  }

  deleteComment = (commentId) => {
      API.deleteComment(commentId).then(res => {
        // console.log(res.data)
        this.getPostsOnlyByUser();
        this.handleShowComments();
        this.closeCommentsModal();
      });
  };

  closeCommentsModal = () => {
    this.setState({
      showCommentsModal: false
    });
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  showFollowersModal = () => {
    this.setState({
      showFollowers: true
    });
  }

  hideFollowersModal = () => {
    this.setState({
      showFollowers: false,
      showFollowingModal: false
    });
  }

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
                      onClick={this.getActualFollowers}
                    >
                      Followers:&nbsp;{this.state.followers}
                    </button>

                    <Modal
                      open={this.state.showFollowers}
                      onClose={this.hideFollowersModal}
                    // classNames={{ modal: "customModal", overlay: "customOverlay", closeButton: "customCloseButton" }}
                    >
                      <h2>Users following {this.props.location.state.user.name}</h2>

                      {this.state.actualFollowers.length ? (
                        <List>
                          {this.state.actualFollowers.map(user =>
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
                      Following:&nbsp;{this.state.following}
                    </button>

                    <Modal
                      open={this.state.showFollowingModal}
                      onClose={this.hideFollowersModal}
                    // classNames={{ modal: "customModal", overlay: "customOverlay", closeButton: "customCloseButton" }}
                    >
                      <h2>Users {this.props.location.state.user.name} follows</h2>

                      {this.state.actualFollowing.length ? (
                        <List>
                          {this.state.actualFollowing.map(user =>
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
                            ))}</Popup>
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

