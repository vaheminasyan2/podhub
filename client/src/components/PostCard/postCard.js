import React from "react";
import "./postCard.css";
import Delete from "../../pages/delete.png"
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons'

library.add(faComment);
library.add(faHeart);
// POST COMPONENT

function Card({ userPhoto, userName, date, podcastName, podcastLogo, episodeName, description, audioLink, userMessage, likes, comments, postId, handlePostDelete, handleShowLikes}) {
  return (
    <div className="container rounded-0 border-top-0 border-left-0 border-right-0 card text-secondary bg-dark">
      <div className="row">
        <div className="col-1">
          <img id="profileImage" src={userPhoto} alt="User"/>
        </div>
        <div className="col">
        <button className="btn btn-sm deletePost float-right" onClick={() => handlePostDelete(postId)}>
              <img src={Delete} alt="delete" className="x"/>
              </button>
          <div className="row">{userName} &nbsp;|&nbsp; {date}</div>
          <div className="row">{userMessage}</div>
          <div className="row border rounded">
            <div className="col-2 p-0">
              <img id="podcastIcon" src={podcastLogo} alt="Podcast Logo" className="border-white"/>
            </div>
            <div className="col p-0">
                 
              <h4>{podcastName}</h4>
              <p>{episodeName}</p>
              <p className="ellipsis">{description}</p>

              <a href={audioLink}/>

            </div>
          </div>
          <div className="row pb-1">
            <a 
              className="likes padding text-white"
              onClick={() => handleShowLikes} 
            >
                <FontAwesomeIcon icon="heart"/>
                  &nbsp;{likes}&nbsp;
            </a>
            <a href="/" className="comments text-white"> <FontAwesomeIcon icon="comment" /> &nbsp;{comments}</a>
          </div>

        </div>
      </div>
    </div>

  );
}

export default Card;
