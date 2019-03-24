import React, { Component } from "react";
import Container from "../components/Container/container";
import Row from "../components/Row/row";
import List from "../components/List/list";
// import Col from "../components/Col/col";
import Episode from "../components/Episode/episode";
import Image from "../components/Image/image";
import API from "../utils/API";

class EpisodeList extends Component {

    state = {
        podcastId: "",
        podcastLogo: "",
        episodes: []
    };

    componentDidMount = () => {
        this.setState({
            podcastId: this.props.location.state.podcastId,
            podcastLogo: this.props.location.state.podcastLogo
        }, () => { this.getEpisodes() });
    }

    handleListRefresh = () => {
        this.getEpisodes();
    };

    getEpisodes = () => {
        API.getEpisodes(this.state.podcastId)
            .then(res =>
                // console.log(res)
                this.setState({
                    episodes: res.data.episodes
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
                                        key={episode.id}
                                        name={episode.title}
                                        date={episode.pub_date_ms}
                                        length={episode.audio_length}
                                        description={episode.description_original}
                                        Button={() => (
                                            <button
                                                onClick={() => this.listenToEpisode(episode.id)}
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