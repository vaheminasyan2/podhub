import React, { Component } from "react";
import Container from "../components/Container/container";
import Row from "../components/Row/row";
import API from "../utils/API";
import PostCard from "../components/PostCard/postCard";
//import { Link } from "react-router-dom";
import Modal from "react-responsive-modal";
import "./Home.css";
//import Delete from "../pages/delete.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons'
//import User from "../components/User/user";
import { library } from '@fortawesome/fontawesome-svg-core'
library.add(faComment);
library.add(faHeart);


let moment = require("moment");

class Home extends Component {
    state = {
        posts: [],
        message: "",
        showLikesModal: false,
        likes: [],
        showCommentsModal: false,
        comments: [],
        currentComment: "",
        currentPostId: "",
        commentLikes:  [],
    };

    componentDidMount() {
        this.getPosts();
    }

    // Get posts from user and those that user is following
    getPosts = () => {
        this.setState({
            message: "Getting posts..."
        });

        API.getFollowingsPosts(this.props.user.id)
            .then(res => {
                var message = "";

                if (res.data.length === 0) {
                    message = "No posts found.";
                }

                this.setState({
                    message: message,
                    posts: res.data
                });
                //console.log(res.data);
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    message: "No posts found.",
                    posts: []
                });
            });
    };

    // Delete post
    handlePostDelete = id => {
       
            API.handlePostDelete(id).then(res => {
                this.getPosts();
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
        API.likePost(postId, this.props.user.id).then(res => {
            //console.log(res.data)
            if (res.data[1] === false) {
                API.unlikePost(postId, this.props.user.id).then(res => {
                    //console.log(res.data)
                    this.getPosts();
                })
            }else{
                this.getPosts();
            }

            // this.getPosts();
        })
    }

    // Closes Likes Episode modal
    // Executed upon user clicking "Likes" button in modal
    closeLikesModal = () => {
        this.setState({
            showLikesModal: false
        });
    };

    handleCommentLikeOrUnlike = commentId => {
        API.likeComment(commentId, this.props.user.id).then(res =>{
            if (res.data[1] === false) {
                API.unlikeComment(commentId, this.props.user.id).then(res => {
                    console.log(res.data)
                    this.handleShowComments(this.state.currentPostId);
                })
            }else{
                this.handleShowComments(this.state.currentPostId);
            }
            // this.getPosts();
            
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
            currentPostId:postId
        });
        API.getComments(postId).then(res => {
            console.log(res.data);
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
                    currentPostId:postId
                });
            }
        });
    };

    addComment = () => {
        API.addComment(this.state.currentComment, this.state.currentPostId, this.props.user.id).then(res => {
            console.log(res.data)
            this.getPosts();
            this.handleShowComments();
            this.closeCommentsModal();
        })
    }

    deleteComment = (commentId) => {
            API.deleteComment(commentId).then(res => {
                console.log(res.data)
                this.getPosts();
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

    getUsersListCommentLikes = () => {
        API.getPostsOnlyByUser(this.state.comment.id)
          .then(res => {
              if (res.data.length)
             {
              this.setState({
                likedUsers: res.data
              });
            }
          })
          .catch(() => {
            this.setState({
              likedUsers: [],
              messageNoPodcast: "No users found, post something."
            });
          });
      };

      
    // followUser = (id) => {
    //     API.followUser(this.props.user.id, id)
    //         .then(function (response) {
    //             console.log(response);
    //             alert("Followed!");
    //         })
    //         .catch((err) =>
    //             console.log(err)
    //         )
    // }

    render() {
        //console.log(this.state.currentComment)
        return (
            <div className="container bg-dark rounded" id="post-container">
                <Row>
                    {this.state.posts.length > 0
                        ? (
                            <Container>
                                {this.state.posts.map(post => (
                                    <PostCard
                                        key={post.id}
                                        userId={post.postedBy}
                                        userName={post.userName}
                                        userImage={post.userImage}
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
                                            
                                                {/* <button
                                                    className="btn btn-outline-light bPosition"
                                                    onClick={(event) => {
                                                        event.preventDefault();
                                                        this.followUser(like.id)
                                                    }
                                                    }
                                                >
                                                    Follow
                                                </button> */}
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
                                                <a
                                                    className="likesNumber"
                                                onClick={() => this.handleShowCommentsLikes(comment.id)}
                                                >
                                                    {comment.numberOfLikes}
                                                </a>
                                                </div>
                                                {this.props.user.id === comment.commentedBy
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

                            </Container>
                        )
                        :
                        (
                            <h4 className="text-center">{this.state.message}</h4>
                        )}
                </Row>
            </div>
        );
    }
}

export default Home;
