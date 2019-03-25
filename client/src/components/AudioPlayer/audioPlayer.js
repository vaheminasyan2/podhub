import React from "react";
import "./audioPlayer.css";

// AUDIO PLAYER COMPONENT

function AudioPlayer({ audioLink }) {
    return (
        <div>
            <audio src={audioLink} type="audio/mpeg" controls/>
        </div>
    );
}

export default AudioPlayer;
