import React from "react";
import "./podcast.css";

function Podcast ({ podcastId, thumbnail, title }) {
    return (
        <a href="/listen">
            <span><img className="podcastLogoSmall" src={thumbnail}/></span>
            <span><h4 className="podcastTitle">{title}</h4></span>
        </a>
    );
};

export default Podcast;