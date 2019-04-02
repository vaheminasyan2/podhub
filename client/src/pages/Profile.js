import React, { Component } from "react";
import Container from "../components/Container/container";
import Row from "../components/Row/row";
import API from "../utils/API";
import PostCard from "../components/PostCard/postCard";
import "./Profile.css";
import Delete from "./delete.png";
import moment from "moment";

// USER PROFILE PAGE

class Home extends Component {
  state = {
    user: [],
    posts: [],
    followers: 0,
    following: 0,
    favorites: []
  };

  componentDidMount() {
    this.setUser();
    this.getPostsOnlyByUser();
    this.getFavorites();
    // this.getOrCreateUser();
    this.getFollowers();
    this.getFollowing();
  }

  setUser = () => {
    this.setState({
      user: this.props.user
    });
  };

  getPostsOnlyByUser = () => {
    API.getPostsOnlyByUser(this.props.user.id)
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
    API.getFavorites(this.props.user.id)
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
    API.getOrCreateUser(this.state.userId).then(res => {
      this.setState({
        user: res.data
      });
    });
  };

  getFollowers = () => {
    API.getFollowers(this.props.user.id)
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
    API.getFollowing(this.props.user.id)
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
    API.handleFavoriteDelete(id).then(res => {
      this.getFavorites();
    });
  };

  render() {
    return (
      <Container>
        <div className="row userProfile rounded bg-dark text-white">
          <div className="col-5">
            <img
              src={this.props.user.profileImage}
              alt="User"
              id="userMainProfileImage"
              className="rounded border-white"
            />
          </div>

          <div className="col">
            <Row>
              <h2 className="paddingTop">{this.props.user.name}</h2>
            </Row>
            <Row>
              Posts:&nbsp; {this.state.posts.length} &nbsp; | &nbsp;
              Followers:&nbsp;{this.state.followers}&nbsp; | &nbsp;
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
                    <img
                      src={favorite.podcastLogo}
                      alt="Podcast Icon"
                      id="favoriteIcon"
                      className="rounded border-white"
                    />
                  </div>
                  <div className="col p-0">
                    <button
                      className="btn btn-sm mb-1 float-right"
                      onClick={() => this.handleFavoriteDelete(favorite.id)}
                    >
                      <img src={Delete} alt="delete" className="size" />
                    </button>
                    {/* <p>{moment(favorite.createdAt).format("LLL")}</p> */}
                    <p>{favorite.podcastName}</p>
                    <div>
                      <p className="ellipsis">{favorite.description}</p>
                    </div>

                    <a href={favorite.audioLink} target="_blank" className="btn btn-sm btn-dark mb-1 listenFav"> Listen</a>

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
                />
              ))}
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

