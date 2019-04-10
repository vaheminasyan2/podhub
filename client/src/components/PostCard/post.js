import React, { Component } from "react";
import { Link } from "react-router-dom";
import Delete from "../../pages/delete-1.png"
import Modal from "react-responsive-modal";
import Popup from "reactjs-popup";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons'
import moment from "moment";
import API from "../../utils/API";
import "./postCard.css";

library.add(faComment);
library.add(faHeart);

class Post extends Component {

    constructor(props) {

        super(props);

        this.state = {
            userId: "",
            userName: "",
            userImage: "",
            date: "",
            podcastId: "",
            podcastName: "",
            podcastLogo: "",
            episodeId: "",
            episodeName: "",
            description: "",
            audioLink: "",
            userMessage: "",
            likes: [],
            numLikes: 0,
            comments: [],
            currentComment: "",
            numComments: 0,
            userListCommentLikes: [],
            postId: "",
            showLikesModal: false,
            showCommentsModal: false,
            refreshState: false,
        }
    }

    componentWillMount = () => {
        this.setState({
            userId: this.props.userId,
            userName: this.props.userName,
            userImage: this.props.userImage,
            date: this.props.date,
            postId: this.props.postId,
            podcastId: this.props.podcastId,
            podcastName: this.props.podcastName,
            podcastLogo: this.props.podcastLogo,
            episodeId: this.props.episodeId,
            episodeName: this.props.episodeName,
            description: this.props.description,
            audioLink: this.props.audioLink,
            userMessage: this.props.userMessage,
            numLikes: this.props.numLikes,
            numComments: this.props.numComments
        });
    }

    // Deletes a post and updates parent state
    handlePostDelete = () => {
        let that = this;
        API.handlePostDelete(this.state.postId)
            .then(function () {
                that.props.updateParentState();
            });
    }


    // LIKING / UNLIKING
    // ===============================================

    // Likes or unlikes a post
    handleLikeOrUnlike = () => {

        let currUserId = JSON.parse(localStorage.getItem("user")).id;
        let that = this;

        API.likePost(this.state.postId, currUserId).then(res => {

            console.log(that);

            if (res.data[1] === false) {
                API.unlikePost(this.state.postId, currUserId)
                    .then(res => {
                        this.setState({
                            refreshState: !this.state.refreshState
                        });
                    });
            }
            else {
                this.setState({
                    refreshState: !this.state.refreshState
                });
            }
        });
    }

    // Shows modal that displays users who have liked a post
    handleShowLikes = () => {
        API.getLikes(this.state.postId).then(res => {
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
    }

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
        API.addComment(this.state.currentComment, this.state.postId, this.state.userId).then(res => {
            this.props.updateParentState();
            this.handleShowComments();
            this.closeCommentsModal();
        })
    }

    // Delete a comment from post
    deleteComment = (commentId) => {
        API.deleteComment(commentId).then(res => {
            this.props.updateParentState();
            this.handleShowComments();
            this.closeCommentsModal();
        });
    };

    // Opens modal that displays comments
    handleShowComments = () => {
        API.getComments(this.state.postId).then(res => {
            this.setState({
                comments: res.data,
                showCommentsModal: true,
            });
        });
    }

    // Close modal that displays comments
    closeCommentsModal = () => {
        this.setState({
            showCommentsModal: false
        });
    };

    // Likes or unlikes a comment
    handleCommentLikeOrUnlike = (commentId) => {

        let currUserId = JSON.parse(localStorage.getItem("user")).id;

        API.likeComment(commentId, currUserId).then(res => {

            // UNLIKE COMMENT
            if (res.data[1] === false) {
                API.unlikeComment(commentId, currUserId).then(res => {
                    this.handleShowComments(this.state.currentPostId);
                });
            }

            // LIKE COMMENT
            else {
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
    getUsersListCommentLikes = (commentId) => {
        API.getUsersLikedComment(commentId)
            .then(res => {
                if (res.data.length === 0) {
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


    render() {
        return (
            <div className="container rounded-0 border-top-0 border-left-0 border-right-0 card text-secondary bg-dark" id="top" >
                <div className="row" id="post-top-row">

                    {/* USER PROFILE IMAGE / LINK TO PROFILE PAGE */}

                    <div className="col-md-1 col-xs-1">

                        <Link
                            to={{
                                pathname: "/profile",
                                state: {
                                    user: {
                                        id: this.state.userId,
                                        name: this.state.userName,
                                        profileImage: this.state.userImage
                                    }
                                }
                            }}
                        >
                            <img id="profileImage" src={this.state.userImage} alt="User" />
                        </Link>

                    </div>

                    {/* USER NAME | DATE POSTED */}

                    <div className="col-md-10 col-xs-0" id="hide-when-small">
                        <div id="name-and-date">{this.state.userName} &nbsp; <strong>-</strong> &nbsp; {this.state.date}</div>
                    </div>

                    {/* DELETE POST BUTTON */}

                    <div className="col-md-1 col-xs-0">
                        {this.state.userId === JSON.parse(localStorage.getItem("user")).id ? (
                            <button
                                className="btn btn-sm mb-1 float-right deleteButtonX"
                                onClick={() => this.handlePostDelete(this.state.postId)}>
                                <img src={Delete} alt="delete" className="size" />
                            </button>
                        ) : (
                                null
                            )
                        }
                    </div>
                </div>

                {/* PODCAST LOGO / LINK TO EPISODE LIST PAGE */}

                <div className="row" id="second-row-post">

                    <div className="col-md-2 col-xs-2 p-0">
                        <div id="img-post">

                            <Link
                                to={{
                                    pathname: "/episodeList",
                                    state: {
                                        podcastId: this.state.podcastId,
                                        podcastName: this.state.podcastName,
                                        podcastLogo: this.state.podcastLogo,
                                        loadMore: true
                                    }
                                }}
                            >
                                <span>
                                    <img
                                        id="podcastIcon"
                                        src={this.state.podcastLogo}
                                        alt="Podcast Logo"
                                        className="border-white"
                                    />
                                </span>
                            </Link>

                        </div>
                    </div>

                    {/* POST CONTENT / LINK TO LISTEN PAGE */}

                    <div className="col-md-10 col-xs-10 p-0" id="middle-of-post">

                        <Link
                            to={{
                                pathname: "/listen",
                                state: {
                                    podcastId: this.state.podcastId,
                                    podcastName: this.state.podcastName,
                                    podcastLogo: this.state.podcastLogo,
                                    episodeId: this.state.episodeId,
                                    episodeName: this.state.episodeName,
                                    date: moment(this.state.date).format("LLL"),
                                    description: this.state.description,
                                    audioLink: this.state.audioLink
                                }
                            }}
                        >
                            <div className="postText">
                                <h4 id="podcast-name-home">{this.state.podcastName}</h4>
                                <p id="episode-name-home">{this.state.episodeName}</p>
                                <p id="episode-description-home" className="ellipses">{this.state.description}</p>
                            </div>
                        </Link>

                    </div>
                </div>

                {/* USER MESSAGE */}

                <div className="row">
                    <div className="col-md-2 col-xs-1"></div>
                    <div className="col-md-8 col-xs-10">
                        <p id="user-message">{this.state.userMessage}</p>
                    </div>
                    <div className="col-md-2 col-xs-1"></div>
                </div>

                {/* LIKES AND COMMENTS */}

                <div className="row pb-1">
                    <div className="col-md text-center col-sm-2">

                        {/* LIKES */}

                        <div className="likesDiv">
                            <a
                                className="likes"
                                onClick={() => this.handleLikeOrUnlike(this.state.postId)}
                            >
                                {/* HEART ANIMATION */}

                                <i
                                    className="fas fa-heart animated"
                                    onClick={(e) => {
                                        var targ = e.target;
                                        targ.classList.add("bounce");
                                        setTimeout(() => { targ.classList.remove("bounce") }, 1000)
                                    }}
                                >
                                </i>
                            </a>

                            <a
                                className="likesNumber"
                                onClick={() => this.handleShowLikes(this.state.postId)}
                            >
                                {this.state.numLikes}
                            </a>
                        </div>

                        {/* COMMENTS */}

                        <div className="commentDiv">
                            <a
                                className="comments"
                                onClick={() => this.handleShowComments(this.state.postId)}
                            >
                                <FontAwesomeIcon icon="comment" /> &nbsp;
                                {this.state.numComments}
                            </a>
                        </div>
                    </div>
                </div>

                {/* LIKES MODAL */}

                <Modal
                    open={this.state.showLikesModal}
                    onClose={this.closeLikesModal}
                    classNames={{ modal: "standardModal" }}
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

                {/* COMMENTS MODAL */}

                <Modal
                    open={this.state.showCommentsModal}
                    onClose={this.closeCommentsModal}
                    classNames={{ modal: "standardModal" }}
                    center
                >
                    {this.state.comments.map(comment => (
                        <div
                            className="commentBox rounded border border-top-0 border-left-0 border-right-0 bg-dark text-secondary"
                            key={comment.id}
                        >

                            {/* PREVIOUS COMMENTS */}

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

                            {/* COMMENT LIKE BUTTON */}

                            <div className="row comment-third-row">
                                <div className="col-2 mb-2">
                                    <a
                                        className="likes ml-4"
                                        onClick={() => this.handleCommentLikeOrUnlike(comment.id)}
                                    >
                                        <FontAwesomeIcon icon="heart" />
                                    </a>

                                </div>

                                {/* COMMENT LIKES POP UP */}

                                <div className="col-2 mb-2">
                                    {comment.numberOfLikes > 0
                                        ?
                                        <Popup
                                            trigger={<div>{comment.numberOfLikes}</div>}
                                            on="hover"
                                            onOpen={() => this.getUsersListCommentLikes(comment.id)}
                                            position="top left"
                                            closeOnDocumentClick
                                            className="popup"
                                        >
                                            {this.state.userListCommentLikes.map(user => (
                                                <div className="row" key={user.id}>
                                                    <div className="col-3 m-0">
                                                        <img src={user.image} alt="User Icon" className="userIconPopup rounded border-white" />
                                                    </div>
                                                    <div className="col-9 m-0">
                                                        <p>{user.name}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </Popup>
                                        :
                                        0}
                                </div>

                                {/* COMMENT DELETE BUTTON */}

                                {this.state.userId === comment.commentedBy
                                    ?
                                    <div className="col-8">
                                        <button
                                            className="btn btn-sm deleteComment float-right"
                                            onClick={() =>
                                                this.deleteComment(comment.id)
                                            }>
                                            Delete
                                        </button>
                                    </div>
                                    : null
                                }
                            </div>
                        </div>
                    ))}

                    {/* COMMENT ENTRY FORM */}

                    <form>
                        <div className="form-group mt-4 bg-dark text-secondary">
                            <input type="text" className="form-control" id="commentForm"
                                defaultValue=""
                                name="currentComment"
                                placeholder="Enter your comment"
                                ref={this.state.currentComment}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-light btn-sm mb-2"
                            onClick={(event) => {
                                event.preventDefault();
                                this.addComment()
                            }
                            }
                        >
                            Submit
                        </button>
                    </form>
                </Modal>
            </div>
        );
    }
}

export default Post;