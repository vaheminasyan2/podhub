import React from "react";
import { Link } from "react-router-dom";
import "./podcast.css";
import API from "../../utils/API";

// PODCAST COMPONENT

function Podcast ({ podcastId, podcastName, podcastLogo, thumbnail, handler }) {

    return (
        
        <Link to={{
            pathname: "/episodeList", 
            state: {
                podcastId: podcastId,
                podcastName: podcastName,
                podcastLogo: podcastLogo
            }
            }} 
            className="podcast"
            onClick={handler}>
            
            <span><img className="podcastLogoSmall" src={thumbnail}/></span>
            <span><p className="podcastTitle">{podcastName}</p></span>
        </Link>
    );
};

export default Podcast;