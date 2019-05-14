import React, { Component } from "react";
import { Link } from "react-router-dom";
import Delete from "../../pages/delete-1.png"
import Modal from "react-responsive-modal";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons'
import moment from "moment";
import Comment from "../Comment/comment";
import API from "../../utils/API";
import "./post.css";
//import { cpus } from "os";

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
            postId: "",
            showLikesModal: false,
            showCommentsModal: false,
            heartClasses: "fa-heart-unliked fas fa-heart animated"
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
        }, () => { this.checkUserLike(this.state.postId) });
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

            // UNLIKE POST
            if (res.data[1] === false) {
                API.unlikePost(this.state.postId, currUserId)
                    .then(res => {
                        that.setState({
                            numLikes: that.state.numLikes - 1,
                            heartClasses: "fa-heart-unliked fas fa-heart"
                        });
                    });
            }

            // LIKE POST
            else {
                that.setState({
                    numLikes: that.state.numLikes + 1,
                    heartClasses: "fa-heart-liked fas fa-heart animated bounce"
                });
            }
        });
    }

    // Shows modal that displays users who have liked a post
    handleShowLikesModal = () => {
        API.getLikes(this.state.postId)
            .then(res => {
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

    checkUserLike = (postId) => {

        let currUserId = JSON.parse(localStorage.getItem("user")).id;

        API.getLikes(postId)
            .then(res => {
                for (var like in res.data) {
                    if (currUserId === res.data[like].id) {
                        this.setState({
                            heartClasses: "fa-heart-liked fas fa-heart animated"
                        });
                    }
                }
            });
    }


    // COMMENTS
    // ===============================================    

    // Add a comment to post
    addComment = () => {
        API.addComment(this.state.currentComment, this.state.postId, JSON.parse(localStorage.getItem("user")).id)
            .then(res => {
                this.props.updateParentState();
                this.closeCommentsModal();
                this.setState({
                    numComments: this.state.numComments + 1,
                    currentComment: "",
                });
            });
    }

    // Delete a comment from post
    deleteComment = (commentId) => {
        API.deleteComment(commentId).then(res => {
            this.props.updateParentState();
            this.closeCommentsModal();
            this.setState({
                numComments: this.state.numComments - 1

            });

            if (this.state.numComments > 0) { this.handleShowCommentsModal(); }

        });
    };

    // Opens modal that displays comments
    handleShowCommentsModal = () => {
        API.getComments(this.state.postId)
            .then(res => {
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


    // OTHER
    // ===============================================

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    // On click of "Play from Nav", sends (True, Audio Link) to Home.js & Profile.js props
    playFromNav = () => {
        this.props.toHomeAndProfile(true, this.state.audioLink, this.state.podcastName, this.state.episodeName);
    }


    render() {
        return (
            <div className={`container rounded-0 border-top-0 border-left-0 border-right-0 card text-secondary top bg-${this.props.theme}`} id={this.props.postId} >
                <div className="row" id={`post-top-row-${this.props.theme}`}>

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

                <div className="row" id={`second-row-post-${this.props.theme}`}>

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
                                <h4 className={`post-${this.props.theme} podcast-name-home`}>{this.state.podcastName}</h4>
                                <p className={`post-${this.props.theme} episode-name-home`}>{this.state.episodeName}
                                </p>
                                <p className={`post-${this.props.theme} episode-description-home`} className={`post-${this.props.theme} ellipses`}>{this.state.description}</p>
                            </div>
                        </Link>

                    </div>
                </div>

                {/* USER MESSAGE */}

                <div className="row">
                    <div className="col-md-2 col-xs-1"></div>
                    <div className={`col-md-8 col-xs-10 post-${this.props.theme}`}>
                        <p id="user-message">{this.state.userMessage}</p>
                    </div>
                    <div className="col-md-2 col-xs-1"></div>
                </div>

                {/* LIKES AND COMMENTS */}

                <div className="row pb-1">
                    <div className="col-md text-center col-sm-2">

                        {/* LIKES */}

                        <div className="likesDiv">
                            <span
                                className="likes"
                                onClick={() => this.handleLikeOrUnlike(this.state.postId)}
                            >
                                {/* HEART ANIMATION */}
                                <i className={this.state.heartClasses}></i>
                            </span>

                            <span
                                className={`likesNumber post-${this.props.theme}`}
                                onClick={() => this.handleShowLikesModal(this.state.postId)}
                            >
                                {this.state.numLikes}
                            </span>
                        </div>

                        {/* COMMENTS */}

                        <div className="commentDiv">
                            <span
                                className={`comments post-${this.props.theme}`}
                                onClick={() => this.handleShowCommentsModal(this.state.postId)}
                            >
                                <FontAwesomeIcon className={`comment-${this.props.theme}`} icon="comment" /> &nbsp;&nbsp;
                                {this.state.numComments}
                            </span>
                        </div>

                        <span>

                            {/* PLAY FROM NAVBAR BUTTTON */}
                            <button id="playFromNavButton"
                                onClick={this.playFromNav}
                            >
                                Play from Navbar
                            </button>

                        </span>

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
                            className={`row rounded bg-${this.props.theme} text-secondary like`}
                            key={like.id}
                        >
                            <Link
                                className="col-3 mt-0"
                                to={{
                                    pathname: "/profile",
                                    state: {
                                        user: {
                                            id: like.id,
                                            name: like.name,
                                            profileImage: like.image
                                        }
                                    }
                                }}
                            >
                                <img
                                    src={like.image}
                                    alt="User Icon"
                                    id="userImageLikesModal"
                                    className="rounded border-white"
                                />
                            </Link>

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
                        <Comment
                            key={comment.id}
                            comment={comment}
                            delete={this.deleteComment}
                        />
                    ))}

                    {/* COMMENT ENTRY FORM */}

                    <form>
                        <div className={`form-group mt-4 bg-${this.props.theme} text-secondary`}>
                            <textarea
                                type="text"
                                className="form-control"
                                rows="3"
                                id="commentForm"
                                defaultValue=""
                                name="currentComment"
                                placeholder="Enter your comment"
                                ref={this.state.currentComment}
                                onChange={this.handleInputChange}
                            //value={this.state.currentComment}
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-light btn-sm mb-2"
                            onClick={(event) => {
                                event.preventDefault();
                                this.addComment();
                            }}
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
