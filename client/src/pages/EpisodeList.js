import React, { Component } from "react";
import Container from "../components/Container/container";
import Row from "../components/Row/row";
import List from "../components/List/list";
import Episode from "../components/Episode/episode";
import API from "../utils/API";

// EPISODE LIST PAGE
// This page displays a list of episodes for a particular podcast.

class EpisodeList extends Component {

    state = {
        podcastId: "",
        podcastName: "",
        podcastLogo: "",
        episodes: []
    };

    // On page load, update State with Podcast ID and Logo url
    // Then call .getEpisodes
    componentDidMount = () => {
        this.setState({
            podcastId: this.props.location.state.podcastId,
            podcastName: this.props.location.state.podcastName,
            podcastLogo: this.props.location.state.podcastLogo
        }, () => { this.getEpisodes() });
    }

    // Get episodes for podcast by Podcast ID
    // Gets 100 episodes at a time
    getEpisodes = () => {
        let pagination = 0;
        let numEpisodes = this.state.episodes.length;

        if (numEpisodes > 0) {
            pagination = this.state.episodes[numEpisodes-1].pub_date_ms;
        }

        API.getEpisodes(this.state.podcastId, pagination)
            .then(res => {

                if (numEpisodes > 0) {
                    res = this.state.episodes.concat(res);
                }

                this.setState({
                    episodes: res
                })
            })
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
        return `${date.getMonth() + 1}/${date.getDay() + 1}/${date.getFullYear().toString()}`;
    }

    // Converts time from seconds to HH:MM:SS format
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

    // Adds Podcast to list of User's Favorite Podcasts 
    addToFavorites = event => {
        event.preventDefault();

        API.addPodcastToFavorites(this.state.podcastId);
        alert("Favorited!");
    }

    render() {
        return (
            <Container>
                <h1>Episodes</h1>
                <img
                    src={this.state.podcastLogo}
                    alt="Podcast Logo"
                />
                
                <br />
                <Row>

                    <button className="btn btn-danger" onClick={this.addToFavorites}>Favorite</button>

                    {this.state.episodes.length ? (
                        <Container>
                            <List>
                                {this.state.episodes.map(episode => (    
                                    <Episode
                                        key={episode.id}
                                        podcastId={this.state.podcastId}
                                        podcastName={this.state.podcastName}
                                        podcastLogo={this.state.podcastLogo}
                                        episodeId={episode.id}
                                        episodeName={episode.title}
                                        date={this.convertDate(episode.pub_date_ms)}
                                        length={this.convertTime(episode.audio_length)}
                                        description={episode.description}
                                        audioLink={episode.audio}
                                    />
                                ))}
                            </List>
                            <button className="btn btn-dark" onClick={this.getEpisodes}>Load More</button>
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
