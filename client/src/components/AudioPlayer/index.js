import React from "react";
import "./style.css";

function AudioPlayer({ audioLink }) {
    return (
        <div>
            <audio controls>
                <source src={audioLink} type="audio/mpeg" />
                <h2>Your browser doesn't support this audio element.</h2>
            </audio>
        </div>
    );
}

export default AudioPlayer;