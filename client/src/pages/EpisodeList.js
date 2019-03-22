import React, { Component } from "react";
import Container from "../components/Container";
import Row from "../components/Row";
//import Col from "../components/Col";
import Episode from "../components/Episode";
import API from "..utils/API";


class EpisodeList extends Component {

    state = {
        podcastId: 1234,
        logo: "",
        episodes: [
            {
                podcast_id: 1,
                image="",
                thumbnail="",
                title_original="Project 3 Podcast Episode 1",
                pub_date_ms= 1488438000000,
                audio_length="03:00",
                description_original="Great episode of the podcast.",
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
                <Row>
                    {this.state.episodes.length ? (
                        <Container>
                            {this.state.episodes.map(episode => (
                                <Episode
                                    key={episode.podcast_id}
                                    image={episode.image}
                                    thumbnail={episode.thumbnail}
                                    name={episode.title_original}
                                    date={episode.pub_date_ms}
                                    length={episode.audio_length}
                                    description={episode.description_original}
                                />
                            ))}
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