import React, { Component } from "react";
import List from "../List/list";
import Podcast from "../Podcast/podcast";
import Container from "../Container/container";
import "./searchResults.css";

// SEARCH RESULTS COMPONENT

function SearchResults ({ show, podcasts }) {

    return (
        <Container>
            <div className={show}>
                <List>
                    {podcasts.map((podcast) =>
                        <Podcast 
                          podcastId={podcast.podcastId}
                          thumbnail={podcast.thumbnail}
                          title={podcast.title}
                        />
                    )}
                </List>
            </div>
        </Container>
        )
};

export default SearchResults;



