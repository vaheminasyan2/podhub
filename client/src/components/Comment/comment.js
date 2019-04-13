import React, { Component } from "react";
// import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons'
import moment from "moment";
import API from "../../utils/API";

library.add(faComment);
library.add(faHeart);

class Comment extends Component {

    constructor(props) {
        super(props);

        this.state = {
            comment: "",
            userListCommentLikes: [],
            commentHeartClasses: "fa-heart-unliked fas fa-heart",
            numberOfLikes: 0
        }
    }

    componentDidMount = () => {
        this.setState({
            comment: this.props.comment,
            numberOfLikes: this.props.comment.numberOfLikes
        }, () => {this.getUsersListCommentLikes(this.state.comment.id)});
    }

    // Likes or unlikes a comment
    handleCommentLikeOrUnlike = (commentId) => {

        let currUserId = JSON.parse(localStorage.getItem("user")).id;

        API.likeComment(commentId, currUserId).then(res => {

            // UNLIKE COMMENT
            if (res.data[1] === false) {
                API.unlikeComment(commentId, currUserId).then(res => {
                    this.setState({
                        commentHeartClasses: "fa-heart-unliked fas fa-heart",
                        numberOfLikes: this.state.numberOfLikes - 1
                    });
                });
            }

            // LIKE COMMENT
            else {
                this.setState({
                    commentHeartClasses: "fa-heart-liked fas fa-heart animated bounce",
                    numberOfLikes: this.state.numberOfLikes + 1
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

                    let heartClasses = "fa-heart-unliked fas fa-heart animated";

                    for (var like in res.data) {
                        if (res.data[like].id === JSON.parse(localStorage.getItem("user")).id) {
                            heartClasses = "fa-heart-liked fas fa-heart";
                        }
                    }

                    this.setState({
                        userListCommentLikes: res.data,
                        commentHeartClasses: heartClasses
                    });
                }
            });
    }

    render() {
        return (
            <span>
                <div
                    className="commentBox rounded border border-top-0 border-left-0 border-right-0 bg-dark text-secondary"
                    key={this.props.comment.id}
                >

                    {/* PREVIOUS COMMENTS */}

                    <div
                        className="row comment-top-row"
                    >
                        <div className="col ml-2">

                            <img
                                src={this.props.comment.userImage}
                                alt="User Icon"
                                id="userImageCommentsModal"
                                className="rounded border-white mt-2 ml-2 mb-2"
                            />
                            <span className="ml-3 mr-3 pl-2 pr-2">
                                {this.props.comment.userName} &nbsp;&nbsp;|&nbsp;
                                    {moment(this.props.comment.createdAt).format("LLL")}
                            </span>
                        </div>
                    </div>

                    <div
                        className="row comment-second-row"
                    >
                        <p className="userComment pl-2 ml-3">{this.props.comment.comment}</p>
                    </div>

                    {/* COMMENT LIKE BUTTON */}

                    <div className="row comment-third-row">

                        <div className="col-4 mb-2 commentLikes">
                            <span
                                className="likes ml-4"
                            >
                                <FontAwesomeIcon
                                    className={this.state.commentHeartClasses}
                                    icon="heart"
                                    onClick={() => this.handleCommentLikeOrUnlike(this.props.comment.id)}
                                />
                            </span>

                            {/* COMMENT LIKES POP UP */}

                            {this.state.numberOfLikes > 0
                                ?
                                <Popup
                                    trigger={<span>{this.state.numberOfLikes}</span>}
                                    on="hover"
                                    onOpen={() => this.getUsersListCommentLikes(this.state.comment.id)}
                                    position="top left"
                                    closeOnDocumentClick
                                    className="popup"
                                    arrow={false}
                                >
                                    {this.state.userListCommentLikes.map(user => (
                                        <div className="row" key={user.id}>
                                            <div className="col-3 m-0">
                                                <img
                                                    src={user.image}
                                                    alt="User Icon"
                                                    className="userIconPopup rounded border-white"
                                                />
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

                        {JSON.parse(localStorage.getItem("user")).id === this.props.comment.commentedBy
                            ?
                            <div className="col-8">
                                <button
                                    className="btn btn-sm deleteComment float-right"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        this.props.delete(this.state.comment.id);
                                    }}
                                >
                                Delete
                                </button>
                            </div>
                            : null
                        }
                    </div>
                </div>
            </span>
        );
    }

}

export default Comment;
