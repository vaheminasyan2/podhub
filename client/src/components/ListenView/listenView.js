import React from "react";
import Container from "../Container/container";
import Image from "../Image/image";
import AudioPlayer from "../AudioPlayer/audioPlayer";

function ListenView({ episodeId, podcastName, episodeName, date, podcastLogo, audioLink, description }) {
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