import React from "react";
import { Link } from "react-router-dom";
import "./podcast.css";

// PODCAST COMPONENT
// This component represents an individual Podcast.
// It contains a link that will redirect the user to the Episode List page.
// Upon redirecting it will send along information on the Podcast ID, Name, and Logo for use down the line. 
// It also contains an onClick event handler which is passed down from App.js. This handler hides the Search Results dropdown.
// The onMouseDown event is there for the onBlur event in the search form. This allows the click event
// to execute before hiding the podcast search results.

function Podcast ({ podcastId, podcastName, podcastLogo, thumbnail, hide }) {

    return (
        
        <Link to={{
            pathname: "/episodeList", 
            state: {
                podcastId: podcastId,
                podcastName: podcastName,
                podcastLogo: podcastLogo,
                loadMore: true
            }
            }} 
            className="podcast"
            onClick={hide}
            onMouseDown={event => event.preventDefault()}
        >
            <span><img className="podcastLogoSmall" src={thumbnail} alt="Podcast Logo"/></span>
            <span><p className="podcastTitle">{podcastName}</p></span>
        </Link>
    );
};

export default Podcast;