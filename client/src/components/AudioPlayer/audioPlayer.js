import React from "react";
import "./style.css";

function AudioPlayer({ audioLink }) {
    return (
        <div>
            <audio>
                <source src={audioLink} type="audio/mpeg">
                Your browser does not support the audio element.
            </audio>
        </div>
    );
}

export default AudioPlayer;
