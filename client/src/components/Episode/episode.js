import React from "react";
import { Link } from "react-router-dom";
import "./episode.css";

// EPISODE COMPONENT

function Episode({ podcastName, podcastLogo, episodeId, episodeName, date, length, description, audioLink }) {
  return (

    <div className="container rounded-0 border-0 card">

        <div className="col">

          {/* Name | Date */}
          <div className="row">{episodeName} &nbsp;|&nbsp; {date} &nbsp;|&nbsp; {length}</div>

          <div className="border rounded">

            {/* Episode Description */}
            <span>{description.replace(/<\/?[^>]+(>|$)/g, "")}<br/></span>

            {/* Listen Button */}
            <Link 
              to={{
                pathname: "/listen",
                state: {
                  podcastName: podcastName,
                  podcastLogo: podcastLogo,
                  episodeId: episodeId,
                  episodeName: episodeName,
                  date: date,
                  description: description,
                  audioLink: audioLink
                }
              }}
            >
            Listen
            </Link>
        </div>
      </div>
</div>

  );
}

export default Episode;


