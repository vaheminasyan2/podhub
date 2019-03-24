import React from "react";
import { Link } from "react-router-dom";
import "./podcast.css";
import API from "../../utils/API";

// PODCAST COMPONENT

function Podcast ({ podcastId, podcastLogo, thumbnail, title, handler }) {

    return (
        
        <Link to={{
            pathname: "/episodeList", 
            state: {
                podcastId: podcastId,
                podcastLogo: podcastLogo
            }
            }} 
            className="podcast"
            onClick={handler}>
            
            <span><img className="podcastLogoSmall" src={thumbnail}/></span>
            <span><p className="podcastTitle">{title}</p></span>
        </Link>
    );
};

export default Podcast;