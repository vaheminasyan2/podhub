import React from "react";
import "./podcast.css";

function Podcast ({ podcastId, thumbnail, title }) {
    return (
        <div className="podcast">
            <span><img className="podcastLogoSmall" src={thumbnail}/></span>
            <span><p className="podcastTitle">{title}</p></span>
        </div>
    );
};

export default Podcast;