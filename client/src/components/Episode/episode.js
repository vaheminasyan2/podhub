import React, { Component } from "react";
import { Redirect } from "react-router";
import "./episode.css";

// EPISODE COMPONENT 
// This component displays the details of an individual episode.
// It contains a link that will redirect the user to the Listen to Podcast page.

class Episode extends Component {

  constructor(props) {
    super(props);
    this.state = { redirect: false };
  }

  listenToEpisode = event => {
    event.preventDefault();

    this.setState({
      redirect: true
    });
  }

  render() {

    if (this.state.redirect) {

      return (
        <Redirect
          to={{
            pathname: "/listen",
            state: {
              podcastId: this.props.podcastId,
              podcastName: this.props.podcastName,
              podcastLogo: this.props.podcastLogo,
              episodeId: this.props.episodeId,
              episodeName: this.props.episodeName,
              date: this.props.date,
              description: this.props.description,
              audioLink: this.props.audioLink
            }
          }}
        />
      )

    }

    return (

      <div className="container pt-4 px-4 bg-black highlight" onClick={this.listenToEpisode}>
        <div className="col">

          {/* Name | Date */}
          <div className="row">
            {this.props.episodeName} &nbsp;|&nbsp; {this.props.date} &nbsp;|&nbsp; {this.props.length}
          </div>

          <div className="pt-2 line pb-4">

            {/* Episode Description */}
            <span className="episodeDescription">{this.props.description.replace(/<\/?[^>]+(>|$)/g, "")}<br /></span>

          </div>
        </div>
      </div>
    );
  }
}

export default Episode;
