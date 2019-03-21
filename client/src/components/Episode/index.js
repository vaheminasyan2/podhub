import React from "react";
import "./style.css";

function Episode({ image, thumbnail, name, date, length, description }) {
  return (
    <div className="container rounded-0 border-top-0 border-left-0 border-right-0 card">
      <div className="row">
        <div className="col-2">
          <img src={image} />
        </div>
        <div className="col">
          <div className="row">{name} &nbsp;|&nbsp; {date}</div>
          <div className="row">{description}</div>
          <div className="row border rounded">
            <div className="col-2 p-0">
              <img src={thumbnail} />
            </div>
            <div className="col p-0">
            <p>{name}</p>
            <p>{description}</p>
            {/* <a href={link}>{link}</a> */}
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Episode;


