import React from "react";
import "./image.css";

const Image = ({ src }) => (
    <img className="podcastLogo" src={src}/>
);

export default Image;