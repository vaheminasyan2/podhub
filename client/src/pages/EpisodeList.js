import React, { Component } from "react";
import Container from "../components/Container/container";
import Row from "../components/Row/row";
import List from "../components/List/list";
import Episode from "../components/Episode/episode";
import API from "../utils/API";
import "./episodeList.css";

// EPISODE LIST PAGE
// This page displays a list of episodes for a particular podcast.

class EpisodeList extends Component {

    state = {
        podcastId: "",
        podcastName: "",
        podcastLogo: "",
        episodes: [],
        loadMore: true,
        message: ""
    };

    // On page load, update State with Podcast ID and Logo url
    // Then call .getEpisodes
    componentDidMount = () => {
        this.setState({
            podcastId: this.props.location.state.podcastId,
            podcastName: this.props.location.state.podcastName,
            podcastLogo: this.props.location.state.podcastLogo,
            loadMore: this.props.location.state.loadMore
        }, () => { this.getEpisodes() });
    }

    // Update episode list when new podcast is selected
    componentDidUpdate(prevProps, prevState) {
        if (prevState.podcastId !== this.props.location.state.podcastId) {
            this.setState({
                podcastId: this.props.location.state.podcastId,
                podcastName: this.props.location.state.podcastName,
                podcastLogo: this.props.location.state.podcastLogo,
                loadMore: this.props.location.state.loadMore,
                episodes: []
            }, () => {this.getEpisodes() });
        }
    }

    // Get episodes for podcast by Podcast ID
    // Gets 50 episodes at a time
    getEpisodes = () => {
        let pagination = 0;
        let numEpisodes = this.state.episodes.length;

        if (numEpisodes > 0) {
            pagination = this.state.episodes[numEpisodes - 1].pub_date_ms;
        }

        this.setState({
            message: "Loading..."
        });

        API.getEpisodes(this.state.podcastId, pagination)
            .then(res => {

                // If less than 10 episodes returned, hide Load More button
                // OR if user clicks Load More (pagination > 0) and less than 50 eps return, hide button
                if (res.length < 10 || (pagination > 0 && res.length < 50)) {
                    this.setState({
                        loadMore: false
                    });
                }

                // If episodes are returned, add to current list of episodes
                if (numEpisodes > 0) {
                    res = this.state.episodes.concat(res);
                }

                // Update state with episode list
                this.setState({
                    episodes: res,
                    message: ""
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
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear().toString()}`;
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

    // Scrolls to top of page
    scrollToTop = () => {
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <Container>
                <h1 className="text-center text-black">{this.state.podcastName}</h1>
                
                <img
                    src={this.state.podcastLogo}
                    alt="Podcast Logo"
                    className="rounded mx-auto d-block"
                />

                <br />
                <Row>
                    
                    {this.state.episodes.length ? (
                        <div className="container rounded p-0 text-secondary">
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
                            <div className="episodeListBtns">
                                {this.state.loadMore ? (
                                    <button className="btn btn-dark" onClick={this.getEpisodes}>Load More</button>
                                ) : (
                                    <></>
                                )}
                                <button className="btn btn-light" onClick={this.scrollToTop}>Back to Top</button>
                            </div>
                        </div>

                    ) : (
                            this.state.message !== "Loading..." ? (
                                <h2 className="episodeListBtns">No episodes found.</h2>
                            ) :
                                (
                                    <></>
                                )
                        )}

                    <h2 className="episodeListBtns">{this.state.message}</h2>
                </Row>
            </Container>
        )
    }
}

export default EpisodeList;