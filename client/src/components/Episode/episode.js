import React from "react";
import { Redirect } from "react-router";
import "./episode.css";

// EPISODE COMPONENT
// This component displays the details of an individual episode.
// It contains a link that will redirect the user to the Listen to Podcast page.

function Episode({ podcastName, podcastLogo, episodeId, episodeName, date, length, description, audioLink }) {
  return (

    <div className="container rounded-0 border-0 card">
      <div className="col">

        {/* Name | Date */}
        <div className="row">
          {episodeName} &nbsp;|&nbsp; {date} &nbsp;|&nbsp; {length}
        </div>

        <div className="border rounded">

          {/* Episode Description */}
          <span>{description.replace(/<\/?[^>]+(>|$)/g, "")}<br /></span>

          {/* Listen Button */}
          <Redirect
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
            </Redirect>
        </div>
      </div>
    </div>
  );
}

export default Episode;


