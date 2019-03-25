import React from "react";
import Container from "../Container/container";
import Image from "../Image/image";
import "./shareModal.css";

// SHARE MODAL COMPONENT
// This component contains what is displayed in the Share Episode modal.

function ShareModal({ podcastName, podcastLogo, episodeName, audioLink }) {
    return (
        <Container>
            <div>
                <h4>{podcastName}</h4>
                <Image src={podcastLogo}/>
                <p>{episodeName}</p>
            </div>

            <form>
                <input className="userPostInput" placeholder="Enter message"></input>
            </form>
        </Container>
    )
}

export default ShareModal;