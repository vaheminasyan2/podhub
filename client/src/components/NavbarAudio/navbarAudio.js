import React, { Component } from "react";
import "./navbarAudio.css";
import skipForwardImageLight from "../../images/skip-forward-white.png";
import skipBackwardImageLight from "../../images/skip-back-white.png";
import playImgLight from "../../images/play-white.png";
import pauseImgLight from "../../images/pause-white.png";
import skipForwardImageDark from "../../images/skip-forward.png";
import skipBackwardImageDark from "../../images/skip-backward.png";
import playImgDark from "../../images/play.png";
import pauseImgDark from "../../images/pause.png";

// AUDIO PLAYER COMPONENT

class NavbarAudio extends Component {
    constructor(props) {

        super(props);
        this.audioElement = React.createRef();
        this.timeline = React.createRef();
        this.playhead = React.createRef();

        this.state = {
            loaded: false
        };
    }

    setLoaded = () => {
        this.setState({ loaded: true });
    }

    setImages = () => {
        if (this.props.theme === "dark") {
            this.setState({
                playImg: playImgLight,
                skipForwardImg: skipForwardImageLight,
                skipBackwardImg: skipBackwardImageLight,
                pauseImg: pauseImgLight
            });
        }
        else {
            if (this.props.theme === "light") {
                this.setState({
                    playImg: playImgDark,
                    skipForwardImg: skipForwardImageDark,
                    skipBackwardImg: skipBackwardImageDark,
                    pauseImg: pauseImgDark
                });
            }
        }
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
        this.props.itIsMounted(true);
        this.setImages();
        const audioElement = this.audioElement.current;
        audioElement.addEventListener('loadedmetadata', () => {
            if (this.props.aCurrentTime) {
                audioElement.currentTime = this.props.aCurrentTime - 0.3;
            }
            this.playAudio();
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

    // Will be called whenever the component is updated (e.g., when props change)
    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.playbackRate !== prevProps.playbackRate) {
            // We've got a new playback rate.
            this.setPlaybackRate();
        }

        if (this.props.theme !== prevProps.theme) {
            this.setImages();
        }

    }

    flipPlayPauseState = () => {
        const audioElement = this.audioElement.current;
        audioElement.addEventListener('loadedmetadata', () => {
            this.playAudio();
        })
        this.props.isPlaying(!this.props.isItPlaying);
    };

    playAudio = () => {
        const audioElement = this.audioElement.current;
        if (this.props.isItPlaying) {
            audioElement.pause();
            this.flipPlayPauseState();
        }
        else {
            audioElement.play();
            this.flipPlayPauseState();
        }
    }

    skipForward15 = () => {
        const audioElement = this.audioElement.current;
        audioElement.currentTime += 15;
    }

    skipBackward15 = () => {
        const audioElement = this.audioElement.current;
        audioElement.currentTime -= 15;
    }

    componentWillUnmount() {
        this.props.itIsMounted(false);
    }

    render() {

        const { audioLink, initialSpeed, changeSpeed } = this.props;

        return (
            <div id="nav-audio-player-container">

                <div id="nav-row-1">
                    <div className="NAV-SKIP-BACKWARD-15">
                        <img src={this.state.skipBackwardImg} alt="skip backward"
                            id="nav-skip-backward-15"
                            onClick={this.skipBackward15}
                        />
                    </div>

                    <div className="NAV-PLAY-BUTTON">
                        <img src={this.props.isItPlaying ? this.state.pauseImg : this.state.playImg} alt="play button"
                            id="nav-pButton"
                            onClick={this.playAudio}
                        />
                    </div>


                    <div className="NAV-SKIP-FORWARD-15">
                        <img src={this.state.skipForwardImg} alt="skip forward"
                            id="nav-skip-forward-15"
                            onClick={this.skipForward15}
                        />
                    </div>
                </div>

                <div className="NAV-SPEED-SLIDER"
                    id="nav-speed-slider-container">
                    <input
                        id="nav-speed-slider"
                        type="range"
                        min="1"
                        max="2.35"
                        value={initialSpeed}
                        onChange={changeSpeed}
                        step=".15"
                        list="steplist"
                    />
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

export default NavbarAudio;
