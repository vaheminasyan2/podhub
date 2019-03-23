import React, { Component } from "react";
import List from "../components/List/list";
import Podcast from "../components/Podcast/podcast";
import Container from "../components/Container/container";
import API from "../utils/API";
import "./searchResults.css";

// SEARCH RESULTS PAGE

function SearchResults ({ show, podcasts }) {
    return(
            <Container className = {show} >
                <List>
                    {podcasts.map((podcast) =>
                        <Podcast 
                          podcastId={podcast.podcastId}
                          thumbnail={podcast.thumbnail}
                          title={podcast.title}
                        />
                    )}
                </List>
            </Container>
        )
};

export default SearchResults;



