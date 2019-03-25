import React from "react";
import Container from "../Container/container";
import Image from "../Image/image";
import AudioPlayer from "../AudioPlayer/audioPlayer";
import "./listenView.css";

// LISTEN TO PODCAST COMPONENT
// This component represents the Listen to Podcast view that is displayed on the Listen to Podcast page.
// It displays info such as Podcast Title, Logo, Episode Name, Description, and the Audio Player. 
// It receives its props from the Episode component.

function ListenView({ podcastName, podcastLogo, episodeId, episodeName, date, description, audioLink }) {
    return (
        <Container>
            <div>
                <h2>{podcastName}</h2>
                <Image src={podcastLogo} />
            </div>

            <div>
                <h4>{episodeName} &nbsp;|&nbsp; {date}</h4>

                <AudioPlayer
                    audioLink={audioLink}
                />
            </div>

            <div>
                <p>{description.replace(/<\/?[^>]+(>|$)/g, "")}</p>
            </div>

            <button className="btn btn-primary" type="submit">Share</button>
        </Container>
    );
}

export default ListenView;