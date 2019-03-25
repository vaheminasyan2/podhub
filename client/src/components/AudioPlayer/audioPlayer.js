import React from "react";
import "./audioPlayer.css";

function AudioPlayer({ audioLink }) {
    return (
        <div>
            <audio src={audioLink} type="audio/mpeg" controls autoPlay/>
        </div>
    );
}

export default AudioPlayer;
