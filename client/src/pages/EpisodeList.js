import React, { Component } from "react";
import Container from "../components/Container/container";
import Row from "../components/Row/row";
import List from "../components/List/list";
// import Col from "../components/Col/col";
import Episode from "../components/Episode/episode";
import Image from "../components/Image/image";
import API from "../utils/API";
import Podcast from "../components/Podcast/podcast";


class EpisodeList extends Component {

    state = {
        podcastId: 1234,
        podcastLogo: "https://picsum.photos/200/300/?random",
        episodes: [
            {
                podcast_id: 1,
                episode_id: 1,
                image: "https://picsum.photos/200",
                thumbnail: "",
                title_original: "Project 3 Podcast Episode 1",
                pub_date_ms: 1488438000000,
                audio_length: "03:00",
                description_original: "Great episode of the podcast.",
                Button: "<button>"
            },

            {
                podcast_id: 2,
                episode_id: 2,
                image: "https://picsum.photos/200",
                thumbnail: "",
                title_original: "Project 3 Podcast Episode 2",
                pub_date_ms: 1488438000000,
                audio_length: "03:00",
                description_original: "Great episode of the podcast.",
                Button: "<button>"
            },

            {
                podcast_id: 3,
                episode_id: 3,
                image: "https://picsum.photos/200",
                thumbnail: "",
                title_original: "Project 3 Podcast Episode 3",
                pub_date_ms: 1488438000000,
                audio_length: "03:00",
                description_original: "Great episode of the podcast.",
                Button: "<button>"
            }
        ]
    };

    handleListRefresh = () => {
        this.getEpisodes();
    };

    getEpisodes = () => {
        API.getEpisodes(this.state.podcastId)
            .then(res =>
                this.setState({
                    episodes: res.data
                })
            )
            .catch(() =>
                this.setState({
                    episodes: [],
                    message: "No episodes found."
                })
            );
    };

    render() {
        return (
            <Container>
                <h1>Episodes</h1>
                <Image 
                    src={this.state.podcastLogo}
                />
                <br/>
                <Row>
                    {this.state.episodes.length ? (
                        <Container>
                            <List>
                                {this.state.episodes.map(episode => (
                                    <Episode
                                        key={episode.podcast_id}
                                        image={episode.image}
                                        thumbnail={episode.thumbnail}
                                        name={episode.title_original}
                                        date={episode.pub_date_ms}
                                        length={episode.audio_length}
                                        description={episode.description_original}
                                        Button={() => (
                                            <button
                                                onClick={() => this.listenToEpisode(episode.episode_Id)}
                                                className="btn btn-primary btn-sm"
                                            >
                                            Listen
                                            </button>
                                        )}
                                    />
                                ))}
                            </List>
                        </Container>
                    ) : (
                            <h2 className="text-center">{this.state.message}</h2>
                        )}
                </Row>
            </Container>
        )
    }
}

export default EpisodeList;