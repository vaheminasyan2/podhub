import React, { Component } from "react";
import { Link } from "react-router-dom";
import Container from "../components/Container/container";
import Row from "../components/Row/row";
import Modal from "react-responsive-modal";
import AudioPlayer from "../components/AudioPlayer/audioPlayer";
import Portal from "../components/Portal/portal";
import API from "../utils/API";

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
        showPortal: false,
        speed: 1.0,
        userMessage: ""
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
            this.state.podcastName, 
            this.state.podcastLogo,
            this.state.episodeName,
            this.state.description,
            this.state.audioLink,
            this.state.userMessage,
            userId
        )
            .then(function(response) {
                console.log(response);
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

        API.addPodcastToFavorites( 
            this.state.podcastName, 
            this.state.podcastLogo,
            this.state.description,
            this.state.audioLink,
            userId
        )
            .then(function(response) {
                console.log(response);
                alert("Favorited!");
            });
    }



    // Activates pop-out window with podcast audio
    togglePortal = event => {
        event.preventDefault();
        this.setState({
            showPortal: !this.state.showPortal
        });
    }

    // Adjusts playback speed of AudioPlayer
    changeSpeed = (event) => {
        this.setState({
            speed: event.target.value
        });
    }

    render() {
        return (
            <Container>
                <Row>
                    <div>
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
                            {this.state.podcastName}
                        </Link>
                        <img src={this.state.podcastLogo} alt="Podcast Logo" />
                    </div>
                </Row>

                <Row>

                    <div>
                        <h4>{this.state.episodeName} &nbsp;|&nbsp; {this.state.date}</h4>

                        <AudioPlayer
                            audioLink={this.state.audioLink}
                            playbackRate={this.state.speed}
                            changeSpeed={this.changeSpeed}
                            initialSpeed={this.state.speed}
                        />

                    </div>
                </Row>

                <Row>
                    <div>
                        <p>{this.state.description}</p>
                    </div>

                    <button className="btn btn-primary" onClick={this.handleShowModal}>Share</button>
                    <button className="btn btn-danger" onClick={this.addToFavorites}>Favorite</button>
                    <button className="btn btn-dark" onClick={this.togglePortal}>Open Portal</button>
                </Row>

                {this.state.showPortal && (
                    <Portal>
                        <h4>{this.state.podcastName}</h4>
                        <p>{this.state.episodeName}</p>

                        <AudioPlayer
                            audioLink={this.state.audioLink}
                            playbackRate={this.state.speed}
                            changeSpeed={this.changeSpeed}
                            initialSpeed={this.state.speed}
                        />

                        <br />
                        <button
                            className="btn btn-primary"
                            onClick={this.togglePortal}
                        >
                            Close
                        </button>
                    </Portal>
                )}

                <Modal open={this.state.showModal} onClose={this.handleCloseModal} center>

                    <Container>
                        <div>
                            <h4>{this.state.podcastName}</h4>
                            <img src={this.state.podcastLogo} alt="Podcast Logo" />
                            <p>{this.state.episodeName}</p>
                        </div>

                        <form>
                            <input 
                                className="userPostInput" 
                                name="userMessage" 
                                onChange={this.handleInputChange}
                                placeholder="Enter message"
                                value={this.state.userMessage}
                            >
                            </input>
                        
                            <button
                                className="btn btn-primary"
                                onClick={this.handleShareEpisode}
                                type="submit"
                            >
                                Share
                            </button>
                        </form>
                    </Container>

                </Modal>

            </Container>
        )
    }
}

export default Listen;
