import React from "react";
import "./postCard.css";
import Delete from "../../pages/delete.png"
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons'

library.add(faComment);
library.add(faHeart);
// POST COMPONENT

function Card({ userPhoto, userName, date, podcastName, podcastLogo, episodeName, description, audioLink, userMessage, likes, comments, postId, handlePostDelete, handleLikeOrUnlike, handleShowLikes, handleShowComments }) {
  return (
    <div className="container rounded-0 border-top-0 border-left-0 border-right-0 card text-secondary bg-dark" id="top">
      <div className="row" id="post-top-row">

        <div className="col-md-1 col-xs-1">
          <img id="profileImage" src={userPhoto} alt="User" />
        </div>

        <div className="col-md-10 col-xs-10">
          <div id="name-and-date">{userName} &nbsp;|&nbsp; {date}</div>
        </div>

        <div className="col-md-1 col-xs-1">
          <button className="btn btn-sm deletePost float-right" onClick={() => handlePostDelete(postId)}>
            <img src={Delete} alt="delete" className="x" />
          </button>
        </div>

      </div>

      <div className="row" id="second-row-post">

        <div className="col-md-2 col-xs-2 p-0">
          <div id="img-post">
            <img id="podcastIcon" src={podcastLogo} alt="Podcast Logo" className="border-white" />
          </div>
        </div>

        <div className="col-md-10 col-xs-10 p-0" id="middle-of-post">
          <h4>{podcastName}</h4>
          <p>{episodeName}</p>
          <p className="ellipses">{description}</p>

          <a href={audioLink} />

        </div>

      </div>

      <div className="row">
        <div className="col-md-3 col-xs-2"></div>
        <div className="col-md-6 col-xs-8">
          <p id="user-message">{userMessage}</p>
        </div>
        <div className="col-md-3 col-xs-2"></div>
      </div>



      <div className="row pb-1">

        <div className="col-md-1 col-sm-1"></div>

        <div className="col-md-1 col-sm-1">
          <div className="likesDiv">
            <a
              className="likes"
              onClick={() => handleLikeOrUnlike(postId)}
            >
              <FontAwesomeIcon icon="heart" />
            </a>
            <a
              className="likesNumber"
              onClick={() => handleShowLikes(postId)}
            >
              {likes}
            </a>
          </div>
        </div>
        <div className="col-md-1 col-sm-1">
          <div className="commentDiv">
            <a
              className="comments"
              onClick={() => handleShowComments(postId)}
            >
              <FontAwesomeIcon icon="comment" />
            </a>
            <a>
              {comments}
            </a>
          </div>
        </div>
        <div className="col-md-9 col-sm-9"></div>

      </div>
    </div>


  );
}

export default Card;
