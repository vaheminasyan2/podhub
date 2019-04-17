import React, { Component } from "react";
import { Link } from "react-router-dom";
import Container from "../components/Container/container";
import Row from "../components/Row/row";
import Modal from "react-responsive-modal";
import AudioPlayer from "../components/AudioPlayer/audioPlayer";
import API from "../utils/API";
import "./Listen.css";

// LISTEN TO PODCAST PAGE
// This page allows a user to listen to a podcast.
// It renders a ListenView component which contains all relevant info on the podcast as well as the audio player.

class Listen extends Component {

    state = {
        podcastId: "",
        podcastName: "",
        podcastLogo: "",
        episodeId: "",
        episodeName: "",
        date: "",
        description: "",
        audioLink: "",
        showModal: false,
        speed: 1.0,
        userMessage: "",
        play: false
    };

    componentDidMount = () => {
        this.setState({
            podcastId: this.props.location.state.podcastId,
            podcastName: this.props.location.state.podcastName,
            podcastLogo: this.props.location.state.podcastLogo,
            episodeId: this.props.location.state.episodeId,
            episodeName: this.props.location.state.episodeName,
            date: this.props.location.state.date,
            description: this.props.location.state.description.replace(/<\/?[^>]+(>|$)/g, ""),
            audioLink: this.props.location.state.audioLink
        });
    }

    // Opens the Share Episode modal
    // Executed upon user clicking "Share" button on page
    handleShowModal = event => {
        event.preventDefault();
        this.setState({
            showModal: true
        });
    }

    // Closes Share Episode modal
    // Executed upon user clicking "Share" button in modal
    handleCloseModal = () => {
        this.setState({
            showModal: false
        });
    }

    // Shares episode as new post on user's profile
    // Executes when user clicks "Share" in modal
    // Closes modal
    handleShareEpisode = event => {
        event.preventDefault();
        this.handleCloseModal();

        let userId = JSON.parse(localStorage.getItem("user")).id;

        API.sharePodcast(
            this.state.podcastId,
            this.state.podcastName,
            this.state.podcastLogo,
            this.state.episodeId,
            this.state.episodeName,
            this.state.description,
            this.state.audioLink,
            this.state.userMessage,
            userId
        )
            .then(function (response) {
                //console.log(response);
            });
    }

    // Collects text input from modal for User Message
    handleInputChange = event => {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    }

    // Adds this episode to User's list of Favorite Episodes
    // addToFavorites = event => {
    //     event.preventDefault();
    //     API.addEpisodeToFavorites(this.state.episodeId);
    //     alert("Favorited!");
    // }

    addToFavorites = event => {
        event.preventDefault();
        this.handleCloseModal();

        let userId = JSON.parse(localStorage.getItem("user")).id;

        API.addEpisodeToFavorites(
            this.state.podcastId,
            this.state.podcastName,
            this.state.podcastLogo,
            this.state.episodeId,
            this.state.episodeName,
            this.state.date,
            this.state.description,
            this.state.audioLink,
            userId
        )
            .then(function (response) {
                //console.log(response);
                //alert("Favorited!");
            });
    }

    // Adjusts playback speed of AudioPlayer
    changeSpeed = (event) => {
        this.setState({
            speed: event.target.value
        });
    }

    // Shows the Navbar Audio Player
    showAudioInNavbar = () => {

        this.props.toApp(true, this.state.audioLink, this.state.podcastName, this.state.episodeName);

        // // if navbarAudio is already mounted & paused, we want 'Play from Navbar' to start playing again
        // if (this.props.isMounted && !this.props.itIsPlaying) {
        //     console.log("true")
        //     this.props.changeToPlay(true);
        // }

        // if listen page's audio player is playing, pause it
        if (this.state.play) {
            this.flipPlayPauseState();
        }

    }

    setRawCurrentTime = (rawTime) => {
        this.props.rawCurrentTime(rawTime);
    }

    flipPlayPauseState = () => {
        this.setState({ play: !this.state.play });
    };

    render() {
        return (
            <Container>
                <Row>
                    <div className="col-md-3 col-xs-0"></div>
                    <div className="col-md-6 col-xs-12 text-center" id="first-row-listen">
                        <div id="pod-name">
                            {this.state.podcastName}<br/>
                            <Link
                                to={{
                                    pathname: "/episodeList",
                                    state: {
                                        podcastId: this.state.podcastId,
                                        podcastName: this.state.podcastName,
                                        podcastLogo: this.state.podcastLogo,
                                        loadMore: true
                                    }
                                }}
                            >
                                <img src={this.state.podcastLogo} alt="Podcast Logo" id="pod-logo" />
                            </Link>
                        </div>
                    </div>
                    <div className="col-md-3 col-xs-0"></div>
                </Row>

                <Row>
                    <div className="col-md-2 col-xs-0"></div>
                    <div className="col-md-8 col-xs-12 text-center center-block" id="second-row-listen">
                        <div>
                            <h4 id="episode-name">{this.state.episodeName} &nbsp;<span id="line">|&nbsp;</span> {this.state.date}</h4>
                        </div>
                        <div id="audio-player-listen">
                            <AudioPlayer
                                audioLink={this.state.audioLink}
                                playbackRate={this.state.speed}
                                changeSpeed={this.changeSpeed}
                                initialSpeed={this.state.speed}
                                setRawCurrentTime={this.setRawCurrentTime}
                                flipPlayPauseState={this.flipPlayPauseState}
                                play={this.state.play}
                                theme={this.props.theme}
                            />
                        </div>
                    </div>
                    <div className="col-md-2 col-xs-0"></div>
                </Row>

                <Row>
                    <div className="col-md-3 col-xs-0"></div>
                    <div className="col-md-6 col-xs-12" id="third-row-listen">
                        <div className="center-block" id="buttons-listen">
                            <button className="btn btn-primary" id="black-btn" onClick={this.handleShowModal}>Share</button>
                            <button className="btn btn-danger" id="black-btn" onClick={this.addToFavorites}>Favorite</button>
                            <button className="btn btn-dark" id="black-btn" onClick={this.showAudioInNavbar}>Play from Navbar</button>
                        </div>

                        <div className="episodeDescription" id="description-listen">
                            <p>{this.state.description}</p>
                        </div>
                    </div>
                    <div className="col-md-3 col-xs-0"></div>
                </Row>

                <Modal
                    open={this.state.showModal}
                    onClose={this.handleCloseModal}
                    classNames={{ modal: "customModal", overlay: "customOverlay", closeButton: "customCloseButton" }}
                >

                    <Container>

                        <h4 id="podcast-name-modal">New Post<span id="bar-listen">:&nbsp;&nbsp;</span>{this.state.podcastName}</h4>
                        <span id="span"></span>
                        <div id="modal-first-line">
                            <div id="box-logo">
                                <img src={this.state.podcastLogo} alt="Podcast Logo" id="podcast-logo-modal" />
                            </div>
                            <div id="box-title">
                                <p id="podcast-episode-name-modal">{this.state.episodeName}</p>
                            </div>

                            <div></div>

                            <div>
                                <form>
                                    <div>
                                        <textarea
                                            id="new-post-message"
                                            className="userPostInput"
                                            name="userMessage"
                                            onChange={this.handleInputChange}
                                            placeholder="Caption..."
                                            value={this.state.userMessage}
                                        >
                                        </textarea>
                                    </div>
                                    <div id="share-btn-cont">
                                        <button
                                            id="share-modal-btn"
                                            className="btn btn-primary"
                                            onClick={this.handleShareEpisode}
                                            type="submit"
                                        >
                                            Post
                            </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Container>

                </Modal>

            </Container>
        )
    }
}

export default Listen;

