import React from "react";
import "./postCard.css";
import Delete from "../../pages/delete-1.png"
import { Link } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons'
import moment from "moment";

library.add(faComment);
library.add(faHeart);

// POST COMPONENT

function Card({
  userId, userName, userImage, date,
  podcastId, podcastName, podcastLogo,
  episodeId, episodeName, description, audioLink,
  userMessage, likes, comments,
  postId, handlePostDelete, handleLikeOrUnlike,
  handleShowLikes, handleShowComments,
}) {

  return (
    <div className="container rounded-0 border-top-0 border-left-0 border-right-0 card text-secondary bg-dark" id="top">
      <div className="row" id="post-top-row">

        <div className="col-md-1 col-xs-1">
          <Link
            to={{
              pathname: "/profile",
              state: {
                user: {
                  id: userId,
                  name: userName,
                  profileImage: userImage
                }
              }
            }}
          >
            <img id="profileImage" src={userImage} alt="User" />
          </Link>
        </div>

        <div className="col-md-10 col-xs-0" id="hide-when-small">
          <div id="name-and-date">{userName} &nbsp; <strong>-</strong> &nbsp; {date}</div>
        </div>
        <div className="col-md-1 col-xs-0">
          {userId === JSON.parse(localStorage.getItem("user")).id
            ?
            <button
              className="btn btn-sm mb-1 float-right deleteButtonX"
              onClick={() => handlePostDelete(postId)}>
              <img src={Delete} alt="delete" className="size" />
            </button>
            : null
          }
        </div>

      </div>

      <div className="row" id="second-row-post">

        <div className="col-md-2 col-xs-2 p-0">
          <div id="img-post">

            <Link to={{
              pathname: "/episodeList",
              state: {
                podcastId: podcastId,
                podcastName: podcastName,
                podcastLogo: podcastLogo,
                loadMore: true
              }
            }}
            >
              <span><img id="podcastIcon" src={podcastLogo} alt="Podcast Logo" className="border-white" /></span>
            </Link>

          </div>
        </div>

        <div className="col-md-10 col-xs-10 p-0" id="middle-of-post">

          <Link to={{
            pathname: "/listen",
            state: {
              podcastId: podcastId,
              podcastName: podcastName,
              podcastLogo: podcastLogo,
              episodeId: episodeId,
              episodeName: episodeName,
              date: moment(date).format("LLL"),
              description: description,
              audioLink: audioLink
            }
          }}
          >
            <div className="postText">
              <h4 id="podcast-name-home">{podcastName}</h4>
              <p id="episode-name-home">{episodeName}</p>
              <p id="episode-description-home" className="ellipses">{description}</p>
            </div>

            {/* <a href={audioLink} /> */}
          </Link>

        </div>
      </div>

      <div className="row">
        <div className="col-md-2 col-xs-1"></div>
        <div className="col-md-8 col-xs-10">
          <p id="user-message">{userMessage}</p>
        </div>
        <div className="col-md-2 col-xs-1"></div>
      </div>


      <div className="row pb-1">

        {/* <div className="col-md-1 col-sm-1" id="bottom-first"></div> */}

        <div className="col-md text-center col-sm-2">
          <div className="likesDiv">
            <a
              className="likes"
              onClick={() => handleLikeOrUnlike(postId)}


            >
              <i className="fas fa-heart animated" onClick={(e) => {
                var targ = e.target;
                targ.classList.add("bounce");
                setTimeout(() => { targ.classList.remove("bounce") }, 1000)
              }}

              ></i>
            </a>
            <a
              className="likesNumber"
              onClick={() => handleShowLikes(postId)}
            >
              {likes}
            </a>
          </div>

          <div className="commentDiv">
            <a
              className="comments"
              onClick={() => handleShowComments(postId)}
            >
              <FontAwesomeIcon icon="comment" /> &nbsp; {comments}
            </a>
          </div>
        </div>


      </div>
    </div>


  );
}

export default Card;
