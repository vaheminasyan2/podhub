import axios from "axios";

export default {

    // Gets all posts for specific user
    getPosts: function (userId) {
        return axios.get("/api/getPosts", userId);
    },

    getPostsOnlyByUser: function (userId) {
        return axios.get("/api/posts/getPostsOnlyByUser/"+userId);
    },

    getUsers: function (user) {
        return axios.get("api/getUsers", user)
    },

 // Gets all episodes for a particular podcast
    getPodcasts: function (podcast) {
        var URL = "https://listennotes.p.rapidapi.com/api/v1/search?sort_by_date=0&type=podcast&only_in=title&language=English&q=" + podcast;

        return axios.get(URL, { 'headers': { 'X-RapidAPI-Key': "a063bce4f1msh0a4f44209d57a2fp1225adjsn3f80cc1cf1bb" } })
            .then((response) => {
                // console.log("Podcasts", response);
                return response;
            })
            .catch((error) => {
                console.log(error);
            });
    },

    // Gets all episodes for a particular podcast
    getEpisodes: function (podcastId, pagination) {
        let numEpisodes = 0;
        let episodes = [];
        let limit = 10;

        if (pagination > 0) {
            limit = 50;
        }

        return request(podcastId, pagination, episodes);

        function request(podcastId, pagination, episodes) {

            let URL = "https://listennotes.p.rapidapi.com/api/v1/podcasts/" + podcastId + "?sort=recent_first&next_episode_pub_date=" + pagination;

            return axios.get(URL, { 'headers': { 'X-RapidAPI-Key': "a063bce4f1msh0a4f44209d57a2fp1225adjsn3f80cc1cf1bb" } })
                .then((response => {
                    numEpisodes = response.data.episodes.length;
                    
                    if (numEpisodes > 0 && episodes.length < limit) {

                        pagination = response.data.episodes[numEpisodes-1].pub_date_ms;
                        return request(podcastId, pagination, episodes.concat(response.data.episodes));

                    } else {

                        return episodes;

                    }
                }))
                .catch((error) => {
                    console.log(error);
                });
        }
    },

    getOrCreateUser: function (id_token) {
        return axios.post("/api/users?id_token=" + id_token);
    },

    getFollowers: function (userId) {
        return axios.get("/api/users/followedBy/"+userId);
    },

    getFollowing: function (userId) {
        return axios.get("/api/users/isFollowing/"+userId);
    },

    getFavorites: function (id) {
        return axios.get("/api/favorites/"+id);
    },

    handleFavoriteDelete: function (id) {
        return axios.post("/api/favorites", id);
    },

    addEpisodeToFavorites: function(episodeId) {
        // add episode to user's favorite episodes
        return episodeId;
    },

    addPodcastToFavorites: function(podcastId) {
        // add podcast to user's favorite podcasts
        return podcastId;
    },

    getFollowingsPosts: function(userId) {
        // Get all user and user followings posts latest-first 
        return axios.get("/api/users/" + userId + "/followings/posts");
    },

    sharePodcast: function(userId, podcastName, podcastLogo, audioLink, description, userMessage) {
        console.log(arguments);

        let temp = {
            title: podcastName,
            link: audioLink,
            imageIcon: podcastLogo,
            details: description,
            message: userMessage,
            postedBy: userId
        }

        return axios.post("/api/posts/", temp);
    }
};
