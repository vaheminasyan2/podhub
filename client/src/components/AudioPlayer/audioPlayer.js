import React, { Component } from "react";
import "./audioPlayer.css";

// AUDIO PLAYER COMPONENT

class AudioPlayer extends Component {
    constructor(props) {
        super(props);
        this.audioElement = React.createRef();
    }

    // We can call this method from lifecycle methods when we need to adjust the playback rate.
    setPlaybackRate() {
        // set the default playback rate to 1.0
        const {playbackRate = 1.0} = this.props;

        const audioElement = this.audioElement.current;

        // Set the playback rate to the playbackRate in our props
        console.log("Setting the playbackRate to", playbackRate);
        audioElement.playbackRate = playbackRate;
    }

    componentDidMount() {
        const audioElement = this.audioElement.current;

        // Add a listener to let us know if the playback rate changes.
        audioElement.onratechange = (event) => {
            console.log('The playback rate changed.', event);

            // Sometimes the audio element resets itself to 1x speed.
            // If that happens, this will catch it and reset the speed to what we want.
            if (audioElement.playbackRate !== this.props.playbackRate) {
                this.setPlaybackRate();
            }
        };

        this.setPlaybackRate();        
    }

    // Will be called whenever the component is updated (e.g., when props change)
    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.playbackRate !== prevProps.playbackRate) {
          // We've got a new playback rate.
          this.setPlaybackRate();
        }
      }

    render() {
        const { audioLink } = this.props;

        // let speed = this.refs.audioSpeed;
        // speed.playbackRate = 0.5;

        return (
            <div>
                <audio
                    src={audioLink}
                    type="audio/mpeg"
                    controls
                    ref={this.audioElement}
                />
            </div>
        );
    }
}

export default AudioPlayer;

