import React, { Component } from "react";
import "./audioPlayer.css";
import skipForwardImage from "../../images/skip-forward.png";
import skipBackwardImage from "../../images/skip-backward.png";
import playImg from "../../images/play.png";
import pauseImg from "../../images/pause.png";

// AUDIO PLAYER COMPONENT

class AudioPlayer extends Component {
    constructor(props) {

        super(props);
        this.audioElement = React.createRef();
        this.timeline = React.createRef();
        this.playhead = React.createRef();

        this.state = {
            play: false,
            loaded: false,
            headPosition: 0,
            currentTime: '0:00',
            duration: '0:00',
            mouseOnPlayhead: false
        };
    }

    setLoaded = () => {
        this.setState({ loaded: true });
    }

    setHeadPosition = (position) => {
        this.setState({ headPosition: position });
    }

    // We can call this method from lifecycle methods when we need to adjust the playback rate.
    setPlaybackRate() {
        // set the initial playback rate to 1.0
        const { playbackRate = 1.0 } = this.props;

        const audioElement = this.audioElement.current;
        // Set the playback rate to the playbackRate in our props
        audioElement.playbackRate = playbackRate;
    }

    componentDidMount() {
        const audioElement = this.audioElement.current;
        const playhead = this.playhead.current;

        audioElement.addEventListener('loadedmetadata', () => {
            let durationMinutes = parseInt(audioElement.duration / 60);
            let durationSeconds = parseInt(audioElement.duration % 60);
            if (durationSeconds < 10) {
                durationSeconds = "0" + durationSeconds;
            }
            this.setDuration(durationMinutes, durationSeconds);

            audioElement.addEventListener('timeupdate', this.timeUpdate, false);

            playhead.addEventListener('mousedown', this.mouseDown, false);
            window.addEventListener('mouseup', this.mouseUp, false);
        })

        // Add a listener to let us know if the playback rate changes.
        audioElement.onratechange = (event) => {

            // Sometimes the audio element resets itself to 1x speed.
            // If that happens, this will catch it and reset the speed to what we want.
            if (audioElement.playbackRate !== this.props.playbackRate) {
                this.setPlaybackRate();
            }
        };

        this.setPlaybackRate();
    }

    timeUpdate = () => {
        const audioElement = this.audioElement.current;
        const playhead = this.playhead.current;
        const timeline = this.timeline.current;
        // timeline width (adjusted for playhead)

        if (!audioElement || !timeline || !playhead) return;

        const timelineWidth = timeline.offsetWidth - playhead.offsetWidth;
        let marginLeft = timelineWidth * (audioElement.currentTime / audioElement.duration);
        let currentTimeMinutes = parseInt(audioElement.currentTime / 60);
        let currentTimeSeconds = parseInt(audioElement.currentTime % 60, 10).toString();
        if (currentTimeSeconds < 10) {
            currentTimeSeconds = "0" + currentTimeSeconds
        }
        this.setAudioState(marginLeft, currentTimeMinutes, currentTimeSeconds);

        if (audioElement.currentTime === audioElement.duration) {
            this.flipPlayPauseState();
        }
    }

    mouseDown = () => {
        const audioElement = this.audioElement.current;
        this.setState({ mouseOnPlayhead: true });
        window.addEventListener('mousemove', this.movePlayhead, true);
        audioElement.removeEventListener('timeupdate', this.timeUpdate, false);
    }

    mouseUp = (event) => {
        const audioElement = this.audioElement.current;
        const timeline = this.timeline.current;
        const playhead = this.playhead.current;
        // timeline width (adjusted for playhead)

        if (!audioElement || !timeline || !playhead) return;

        const timelineWidth = timeline.offsetWidth - playhead.offsetWidth;

        if (this.state.mouseOnPlayhead) {
            audioElement.currentTime = ((event.clientX - timeline.getBoundingClientRect().left) / timelineWidth) * audioElement.duration
            window.removeEventListener('mousemove', this.movePlayhead, true);
            audioElement.addEventListener('timeupdate', this.timeUpdate, false);

        }
        this.setState({ mouseOnPlayhead: false });
    }

    setAudioState = (marginLeft, minutes, seconds) => {
        this.setState({
            headPosition: marginLeft,
            currentTime: `${minutes}:${seconds}`
        });
    }

    setDuration = (minutes, seconds) => {
        this.setState({
            duration: `${minutes}:${seconds}`
        });
    }

    // Will be called whenever the component is updated (e.g., when props change)
    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.playbackRate !== prevProps.playbackRate) {
            // We've got a new playback rate.
            this.setPlaybackRate();
        }
    }

    flipPlayPauseState = () => {
        this.setState({ play: !this.state.play });
    };

    playAudio = () => {
        const audioElement = this.audioElement.current;
        if (!this.state.play) {
            audioElement.play();
            this.flipPlayPauseState();
        }
        else {
            audioElement.pause();
            this.flipPlayPauseState();
        }
    }

    movePlayhead = (event) => {
        const timeline = this.timeline.current;
        const playhead = this.playhead.current;
        const audioElement = this.audioElement.current;

        // timeline width (adjusted for playhead)
        const timelineWidth = timeline.offsetWidth - playhead.offsetWidth;

        const newMargLeft = event.clientX - timeline.getBoundingClientRect().left;

        if ((newMargLeft >= (playhead.offsetWidth / 2)) && newMargLeft <= timelineWidth) {
            this.setHeadPosition(newMargLeft - (playhead.offsetWidth / 2));
        }
        else if (newMargLeft < playhead.offsetWidth) {
            this.setHeadPosition(0);
        }
        else if (newMargLeft > timelineWidth) {
            this.setHeadPosition(timelineWidth)
        }

        audioElement.currentTime = ((event.clientX - timeline.getBoundingClientRect().left) / timelineWidth) * audioElement.duration;

    }

    skipForward15 = () => {
        const audioElement = this.audioElement.current;
        audioElement.currentTime += 15;
    }

    skipBackward15 = () => {
        const audioElement = this.audioElement.current;
        audioElement.currentTime -= 15;
    }

    render() {
        const { audioLink } = this.props;
        const { initialSpeed, changeSpeed } = this.props;

        return (
            <div id="audio-player-container">


                <div className="first-row">
                    <div className="CURRENT-TIME"
                        id="current-time">

                        {this.state.currentTime}
                    </div>

                    <div className="placeholder"></div>

                    <div className="DURATION"
                        id="duration">
                        {this.state.duration}
                    </div>
                </div>

                <div className="second-row">
                    <div className="PLAY-BUTTON">
                        <img src={this.state.play ? pauseImg : playImg} alt="play button"
                            id="pButton"
                            onClick={this.playAudio}
                        />
                    </div>


                    <div className="TIMELINE"
                        id="timeline"
                        onClick={this.movePlayhead}
                        ref={this.timeline}
                    >
                        <div
                            id="playhead"
                            style={{ marginLeft: `${this.state.headPosition}px` }}
                            ref={this.playhead}
                        >
                        </div>

                    </div>
                </div>


                <div className="third-row">

                    <div className="SKIP-BACKWARD-15">
                        <img src={skipBackwardImage} alt="skip backward"
                            id="skip-backward-15"
                            onClick={this.skipBackward15}
                        />
                    </div>

                    <div className="SPEED-SLIDER"
                        id="speed-slider-container">
                        <p id="speed-label">SPEED</p>
                        <input
                            id="speed-slider"
                            type="range"
                            min="1"
                            max="2.35"
                            value={initialSpeed}
                            onChange={changeSpeed}
                            step=".15"
                            list="steplist"
                        />
                    </div>

                    <div className="SKIP-FORWARD-15">
                        <img src={skipForwardImage} alt="skip forward"
                            id="skip-forward-15"
                            onClick={this.skipForward15}
                        />
                    </div>
                </div>

                <audio
                    id="music"
                    src={audioLink}
                    type="audio/mpeg"
                    ref={this.audioElement}
                />

            </div>
        );
    }
}

export default AudioPlayer;

