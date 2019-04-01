import React from "react";
import "./postCard.css";

// POST COMPONENT

function Card({ userPhoto, userName, date, podcastName, podcastLogo, episodeName, description, audioLink, userMessage, likes, comments, postId, handlePostDelete }) {
  return (
    <div className="container rounded-0 border-top-0 border-left-0 border-right-0 card">
      <div className="row">
        <div className="col-1">
          <img id="profileImage" src={userPhoto} alt="User" />
        </div>
        <div className="col">
          <div className="row">{userName} &nbsp;|&nbsp; {date}</div>
          <div className="row">{userMessage}</div>
          <div className="row border rounded">
            <div className="col-2 p-0">
              <img id="podcastIcon" src={podcastLogo} alt="Podcast Logo" />
            </div>
            <div className="col p-0">
              <button className="btn btn-danger btn-sm deletePost" onClick={() => handlePostDelete(postId)}>Delete</button>
              <h4>{podcastName}</h4>
              <p>{episodeName}</p>
              <p>{description}</p>
              {/* <a href={audioLink}>{audioLink}</a> */}
            </div>
          </div>
          <div className="row pb-1">
            <a href="/" className="likes">Likes:&nbsp;{likes}&nbsp;</a>
            <a href="/" className="comments"> Comments:&nbsp;{comments}</a>
          </div>
          
        </div>
      </div>
    </div>

  );
}

export default Card;


