import axios from "axios";

export default {

    // Gets all posts for specific user
    getPosts: function(userId) {
        return axios.get("/api/getPosts", userId);
    },

    getUsers: function(user) {
        return axios.get("api/getUsers", user)
    },

    // Gets all episodes for a particular podcast
    getPodcasts: function(podcast) {
        return axios.get("/api/getPodcast" + podcast);
    },

    // Gets all episodes for a particular podcast
    getEpisodes: function(podcastId) {
        return axios.get("/api/getEpisodes" + podcastId);
    }

};
