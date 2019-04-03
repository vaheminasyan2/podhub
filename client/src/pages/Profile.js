import React, { Component } from "react";
import { Redirect } from "react-router";
import Container from "../components/Container/container";
import Row from "../components/Row/row";
import API from "../utils/API";
import Podcast from "../components/Podcast/podcast";
import PostCard from "../components/PostCard/postCard";
import "./Profile.css";
import Delete from "./delete.png";
import moment from "moment";
import Modal from "react-responsive-modal";

// USER PROFILE PAGE

class Home extends Component {
  state = {
    user: [],
    posts: [],
    followers: 0,
    following: 0,
    favorites: [],
    showLikesModal: false,
    likes: [],
    redirect: false
  };

  componentDidMount() {
    // console.log(this.props);

    this.setState({
      user: this.props.location.state.user
    }, () => {
      this.getPostsOnlyByUser();
      this.getFavorites();
      this.getFollowers();
      this.getFollowing();
    });
  }

  getPostsOnlyByUser = () => {
    API.getPostsOnlyByUser(this.state.user.id)
      .then(res => {
        if (res.data.length === 0) {
          this.setState({
            posts: [],
            messageNoPodcast: "No posts found, post something."
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
          messageNoPodcast: "No posts found, post something."
        });
      });
  };

  getFavorites = () => {
    API.getFavorites(this.state.user.id)
      .then(res => {
        if (res.data.length === 0) {
          this.setState({
            favorites: [],
            messageNoFav:
              "No favorites found. Search for a podcast and add it to your favorites."
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
            "No favorites found. Search for a podcast and add it to your favorites."
        });
      });
  };

  getOrCreateUser = () => {
    API.getOrCreateUser(this.state.user.id).then(res => {
      this.setState({
        user: res.data
      });
    });
  };

  getFollowers = () => {
    API.getFollowers(this.state.user.id)
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
    API.getFollowing(this.state.user.id)
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

    if (window.confirm("Delete post?")) {

      API.handlePostDelete(id)
        .then(res => {
          this.getPostsOnlyByUser();
        });
    }
  };

  handleFavoriteDelete = id => {

    if (window.confirm("Delete favorite?")) {
      API.handleFavoriteDelete(id).then(res => {
        this.getFavorites();
      });
    }
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
      if (res.data[1] == false) {
        API.unlikePost(postId).then(res => {
          //console.log(res.data)
        })
      };
      this.getPostsOnlyByUser();
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

  render() {
    return (
      <Container>
        <div className="row userProfile rounded bg-dark text-white">
          <div className="col-5">
            <img
              src={this.props.location.state.user.profileImage}
              alt="User"
              id="userMainProfileImage"
              className="rounded border-white"
            />
          </div>

          <div className="col">
            <Row>
              <h2 className="paddingTop">{this.props.location.state.user.name}</h2>
            </Row>
            <Row>
              Posts:&nbsp; {this.state.posts.length} &nbsp; | &nbsp;
              Followers:&nbsp;{this.state.followers} &nbsp; | &nbsp;
              Following:&nbsp;{this.state.following}
            </Row>
          </div>
        </div>

        <div className="row favorites rounded">
          <h4>Favorites: </h4>

          {this.state.favorites.length ? (
            <Container>
              {this.state.favorites.map(favorite => (

                <div className="row rounded favorite bg-dark text-secondary" key={favorite.id}>
                  <div className="col-2 p-4 pad">
                    <Podcast
                      podcastId={favorite.podcastId}
                      podcastName={favorite.podcastName}
                      podcastLogo={favorite.podcastLogo}
                      thumbnail={favorite.podcastLogo}
                    />
                  </div>

                  <div className="col p-0">
                    <button
                      className="btn btn-sm mb-1 float-right"
                      onClick={() => this.handleFavoriteDelete(favorite.id)}
                    >
                      <img src={Delete} alt="delete" className="size" />
                    </button>

                    <p>{moment(favorite.createdAt).format("LLL")}</p>

                    {/* <p>{favorite.podcastName}</p> */}
                    <div>
                      <p className="ellipsis">{favorite.description}</p>
                    </div>

                    <button className="btn btn-light" onClick={this.listenToEpisode}>Listen</button>

                    {this.state.redirect ? (
                      <Redirect
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
                      />
                    ) : (
                        <></>
                      )}

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
        <Row>
          <h4>Recent posts:</h4>
          {this.state.posts.length ? (
            <div className="container bg-dark">
              {this.state.posts.map(post => (
                <PostCard
                  key={post.id}
                  userPhoto={this.state.user.profileImage}
                  userName={this.state.user.name}
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
                  handleLikeOrUnlike={this.handleLikeOrUnlike}
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
    );
  }
}

export default Home;

