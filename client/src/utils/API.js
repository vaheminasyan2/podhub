import axios from "axios";

export default {

    // Gets all posts for specific user
    getPosts: function (userId) {
        return axios.get("/api/getPosts", userId);
    },

    getPostsOnlyByUser: function (userId) {
        return axios.get("/api/getPostsOnlyByUser", userId);
    },

    getUsers: function (user) {
        return axios.get("api/getUsers", user)
    },

    // Gets all episodes for a particular podcast
    getPodcasts: function (podcast) {
        var URL = "https://listennotes.p.rapidapi.com/api/v1/search?sort_by_date=0&type=podcast&only_in=title&language=English&safe_mode=1&q=" + podcast;

        return axios.get(URL, { 'headers': { 'X-RapidAPI-Key': "a063bce4f1msh0a4f44209d57a2fp1225adjsn3f80cc1cf1bb" } })
            .then((response) => {
                // console.log(response);
                return response;
            })
            .catch((error) => {
                console.log(error);
            });
    },

    // Gets all episodes for a particular podcast
    getEpisodes: function (podcastId) {
        return axios.get("/api/getEpisodes", podcastId);
    },

    getUserDetails: function (userId) {
        return axios.get("/api/getUserDetails", userId);
    },

    getFollowers: function (userId) {
        return axios.get("/api/getFollowers", userId);
    },

    getFollowing: function (userId) {
        return axios.get("/api/getFollowing", userId);
    },

    getFavorites: function (id) {
        return axios.get("/api/favorites", id);
    },

    handleFavoriteDelete: function (id) {
        return axios.post("/api/favorites", id);
    },

};