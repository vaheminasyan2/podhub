import React, { Component } from "react";
import Container from "../components/Container";
import Row from "../components/Row";
import Col from "../components/Col";
import Episode from "../components/Episode";
import AudioPlayer from "../components/AudioPlayer";
import API from "..utils/API";


class Listen extends Component {

    state = {
        podcastId: 1234,
        podcastTitle: "",
        episodeId: 1234,
        episodeTitle: "",
        audioLink: "",
        summary: "",
        message: "NA"
    };

    getAudio = () => {
        API.getEpisodeById(this.state.episodeId)
            .then(res =>
                console.log(res.data)

                // this.setState({
                //     podcastId: res.data.podcastId,
                //     podcastTitle: res.data.podcastTitle,
                //     episodeId: res.data.episodeId,
                //     episodeTitle: res.data.title,
                //     audioLink: res.data.link,
                //     summary: res.data.description
                // })
            )
            .catch(() =>
                this.setState({
                    message: "Error: episode could not be loaded."
                })
            );
    };

    handleShareEpisode = event => {
        event.preventDefault();
        // Call Share Episode sequence
    }

    render() {
        return (
            <Container>
                <Row>
                    {this.state.episodes.length ? (
                        <Container>
                            <Episode
                                key={episode.podcast_id}
                                image={episode.image}
                                thumbnail={episode.thumbnail}
                                name={episode.title_original}
                                date={episode.pub_date_ms}
                                length={episode.audio_length}
                                description={episode.description_original}
                            />
                            <AudioPlayer 
                                audioLink={this.state.audioLink}
                            />
                        </Container>
                    ) : (
                        <h2 className="text-center">{this.state.message}</h2>
                    )}
                </Row>
            </Container>
        )
    }
}

export default Listen;