import axios from "axios";

export default {

    // Gets all posts for specific user
    getPosts: function(userId) {
        return axios.get("/api/getPosts", userId);
    },

    getPostsOnlyByUser:function(userId) {
        return axios.get("/api/getPostsOnlyByUser", userId);
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
    },

    getUserDetails: function(userId) {
        return axios.get("/api/getUserDetails" + userId);
    },

    getFollowers: function(userId) {
        return axios.get("/api/getFollowers" + userId);
    },

    getFollowing: function(userId) {
        return axios.get("/api/getFollowing" + userId);
    },

    getFavorites: function(id) {
        return axios.get("/api/favorites" + id);
    },

    handleFavoriteDelete: function(id) {
        return axios.post("/api/favorites" + id);
    },

};
