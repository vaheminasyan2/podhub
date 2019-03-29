import React from "react";
import List from "../List/list";
import Podcast from "../Podcast/podcast";
import Container from "../Container/container";
import "./searchResults.css";

// SEARCH RESULTS COMPONENT
// This component displays the search results for podcasts depending on a user query.
// This query comes from the Podcast Search box in the Nav Bar.
// It renders each podcast using the Podcast component.
// It will appear on the right side of the screen as a floating drop-down menu. 
// It will only be visible if the user has typed/changed text in the Podcast Search box. 

function SearchResults ({ show, podcasts, handler }) {

    return (
        <Container>
            <div className={show}>
                {podcasts.length > 0 ? (
                    <List>
                        {podcasts.map((podcast) =>
                            <Podcast 
                            key={podcast.id}
                            podcastId={podcast.id}
                            podcastName={podcast.title_original}
                            podcastLogo={podcast.image}
                            thumbnail={podcast.thumbnail}
                            handler={handler}
                            />
                        )}       
                    </List>
                ) : (
                    <p>No podcasts found.</p>
                )}
            </div>
        </Container>
        )
};

export default SearchResults;



