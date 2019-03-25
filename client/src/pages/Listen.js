import React, { Component } from "react";
import Container from "../components/Container/container";
import Row from "../components/Row/row";
import ListenView from "../components/ListenView/listenView";
import Modal from "react-responsive-modal";
import ShareModal from "../components/ShareModal/shareModal";
// import API from "../utils/API";

// LISTEN TO PODCAST PAGE
// This page allows a user to listen to a podcast.
// It renders a ListenView component which contains all relevant info on the podcast as well as the audio player.

class Listen extends Component {

    state = {
        podcastName: "",
        podcastLogo: "",
        episodeId: "",
        episodeName: "",
        date: "",
        description: "",
        audioLink: "", 
        showModal: false
    };

    componentDidMount = () => {
        this.setState({
            podcastName: this.props.location.state.podcastName,
            podcastLogo: this.props.location.state.podcastLogo,
            episodeId: this.props.location.state.episodeId,
            episodeName: this.props.location.state.episodeName,
            date: this.props.location.state.date,
            description: this.props.location.state.description,
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
        alert("shared");
        // Call Share Episode sequence
    }

    render() {
        return (
            <Container>
                <Row>
                    <ListenView
                        podcastName={this.state.podcastName}
                        podcastLogo={this.state.podcastLogo}
                        episodeId={this.state.episodeId}
                        episodeName={this.state.episodeName}
                        date={this.state.date}
                        description={this.state.description}
                        audioLink={this.state.audioLink}
                    />
                    <button className="btn btn-primary" onClick={this.handleShowModal}>Share</button>
                </Row>

                <Modal open={this.state.showModal} onClose={this.handleCloseModal} center>
                    <ShareModal 
                        podcastName={this.state.podcastName}
                        podcastLogo={this.state.podcastLogo}
                        episodeName={this.state.episodeName}
                        audioLink={this.state.audioLink}
                    />
                    <button 
                        className="btn btn-primary"
                        onClick={this.handleShareEpisode}
                    >
                    Share
                    </button>
                </Modal>

            </Container>
        )
    }
}

export default Listen;
