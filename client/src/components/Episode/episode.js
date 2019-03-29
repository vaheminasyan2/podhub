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

      <div className="container rounded-0 border-0 card">
        <div className="col">

          {/* Name | Date */}
          <div className="row">
            {this.props.episodeName} &nbsp;|&nbsp; {this.props.date} &nbsp;|&nbsp; {this.props.length}
          </div>

          <div className="border rounded">

            {/* Episode Description */}
            <span>{this.props.description.replace(/<\/?[^>]+(>|$)/g, "")}<br /></span>

            <button className="btn btn-primary" onClick={this.listenToEpisode}>Listen</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Episode;
