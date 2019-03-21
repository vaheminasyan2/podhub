import React from "react";
import "./postCard.css";

// function Card ({photo, name, date, message, icon, episode, link, like, comments}) 
function Card({ photo, name, date, message, icon, title,description, link, likes, comments }) {
  return (
    <div className="container rounded-0 border-top-0 border-left-0 border-right-0 card">
      <div className="row">
        <div className="col-2">
          <img src={photo} />
        </div>
        <div className="col">
          <div className="row">{name} &nbsp;|&nbsp; {date}</div>
          <div className="row">{message}</div>
          <div className="row border rounded">
            <div className="col-2 p-0">
              <img src={icon} />
            </div>
            <div className="col p-0">
            <p>{title}</p>
            <p>{description}</p>
            <a href={link}>{link}</a>
            </div>
          </div>
          <div className="row pb-1">
            <a className="likes">Likes:&nbsp;{likes}&nbsp;</a>
            <a className="comments"> Comments:&nbsp;{comments}</a>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Card;


