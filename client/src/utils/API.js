import axios from "axios";

export default {

    // Gets all posts for specific user
    getPosts: function(userId) {
        return axios.get("/home", userId);
    },

    // Gets all episodes for a particular podcast
    getEpisodes: function(podcastId) {
        return axios.get("/api/getEpisodes", podcastId);
    }

};
