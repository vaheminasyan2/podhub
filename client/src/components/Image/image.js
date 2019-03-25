import React from "react";
import "./image.css";

// IMAGE COMPONENT

const Image = ({ src }) => (
    <img className="podcastLogo" src={src} alt="Podcast Logo"/>
);

export default Image;