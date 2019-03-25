import React, { Component } from "react";
import Container from "../components/Container/container";
import Row from "../components/Row/row";
import AudioPlayer from "../components/AudioPlayer/audioPlayer";
import ListenView from "../components/ListenView/listenView";
import API from "../utils/API";

// LISTEN TO PODCAST PAGE

class Listen extends Component {

    state = {
        podcastName: "",
        podcastLogo: "",
        episodeId: "",
        episodeName: "",
        date: "",
        description: "",
        audioLink: ""
    };

    componentDidMount = () => {
//         console.log(this.props);
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

    handleShareEpisode = event => {
        event.preventDefault();
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
                </Row>
            </Container>
        )
    }
}

export default Listen;
