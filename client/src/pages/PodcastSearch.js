import React, { Component } from "react";
import Container from "../components/Container/container";
import Podcast from "../components/Podcast/podcast";
import API from "../utils/API";
import "./PodcastSearch.css";

class PodcastSearch extends Component {

    constructor(props) {
        super(props);

        this.state = {
            podcastSearch: "",
            podcasts: [],
            message: ""
        }
    }

    componentDidMount = () => {
        this.setState({
            podcastSearch: this.props.userQuery,
        }, () => {
            this.props.location.resetState();
            this.getPodcasts();
        });
    }

    componentWillUnmount = () => {
        this.setState({
            podcastSearch: "",
            podcasts: [],
            message: "" 
        });
    }

    getPodcasts = () => {

        // This asks API for the next set of 10 podcasts
        let offset = this.state.podcasts.length;

        API.getPodcasts(this.state.podcastSearch, offset)
          .then(res => {

            let allPodcasts = this.state.podcasts.concat(res.data.results);

            this.setState({
              podcasts: allPodcasts
            });
          })
          .catch((error) => {
            console.log("Error getting podcasts", error);
            this.setState({
              podcasts: [],
              message: "We couldn't find a match."
            })
          });
      };

    render() {
        return (
            <Container>
                {this.state.podcasts.length > 0 ? (
                    this.state.podcasts.map((podcast) => 
                        <span className="podcastResult">
                            <Podcast 
                                key={podcast.id}
                                podcastId={podcast.id}
                                podcastName={podcast.title_original}
                                podcastLogo={podcast.image}
                                thumbnail={podcast.thumbnail}
                            />
                        </span>
                    )
                ) : (
                    <h4>{this.state.message}</h4>
                )}

                <button 
                    className="btn btn-dark" 
                    onClick={this.getPodcasts}
                >
                    Load More
                </button>
            </Container>
        );
    }
}

export default PodcastSearch;