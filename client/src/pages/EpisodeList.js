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

    // Converts date from ms to MM/DD/YYYY format
    convertDate = (date_ms) => {
        let date = new Date(date_ms);
        return `${date.getMonth()+1}/${date.getDay()+1}/${date.getFullYear().toString()}`;
    }

    convertTime = (time_sec) => {
        let hours = Math.floor(time_sec / 3600);

        time_sec = time_sec - (hours * 3600);

        let minutes = Math.floor(time_sec / 60);
        let seconds = time_sec - (minutes * 60);

        let addZeroHours = "";
        let addZeroMins = "";
        let addZeroSecs = "";

        if (hours < 10) {
            addZeroHours = 0;
        }

        if (minutes < 10) {
            addZeroMins = 0;
        }

        if (seconds < 10) {
            addZeroSecs = 0;
        }

        return `${addZeroHours}${hours}:${addZeroMins}${minutes}:${addZeroSecs}${seconds}`;
    }

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
                                        date={this.convertDate(episode.pub_date_ms)}
                                        length={this.convertTime(episode.audio_length)}
                                        description={episode.description}
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