import axios from "axios";
//import { func } from "prop-types";

export default {

    // Show users how liked the post
    getLikes: function (postId) {
        return axios.get("/api/posts/getUsersLikedPost/" + postId)
    },

    likePost: function (postId, userId) {
        let data = {
            postId: postId,
            userId: userId
        }
        return axios.post("/api/posts/like/", data)
    },

    unlikePost: function (postId) {
        return axios.delete("/api/posts/unlike/" + postId)
    },

    getComments: function (postId) {
        return axios.get("/api/comments/" + postId)
    },

    addComment: function (comment, postId, userId) {
        let data = {
            comment:comment,
            commentedBy:userId,
            postId:postId
        }
        return axios.post("/api/comments/", data)
    },

    deleteComment: function (commentId) {
        return axios.delete("/api/comments/" + commentId)
    },

    // Gets all posts for specific user
    getPosts: function (userId) {
        return axios.get("/api/getPosts", userId);
    },

    getPostsOnlyByUser: function (userId) {
        return axios.get("/api/posts/getPostsOnlyByUser/" + userId);
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

                        pagination = response.data.episodes[numEpisodes - 1].pub_date_ms;
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
        return axios.get("/api/users/followedBy/" + userId);
    },

    getFollowing: function (userId) {
        return axios.get("/api/users/isFollowing/" + userId);
    },

    getFavorites: function (id) {
        return axios.get("/api/favorites/" + id);
    },

    handleFavoriteDelete: function (id) {
        console.log("api", id)
        return axios.delete("/api/favorites/delete/" + id);
    },

    handlePostDelete: function (id) {
        return axios.delete("/api/posts/delete/" + id);
    },

    addEpisodeToFavorites: function (episodeId) {
        // add episode to user's favorite episodes
        return episodeId;
    },

    // addPodcastToFavorites: function(podcastId) {
    //     // add podcast to user's favorite podcasts
    //     return podcastId;
    // },

    addPodcastToFavorites: function (podcastId, podcastName, podcastLogo, episodeId, episodeName, date, description, audioLink, userId) {
        // console.log(arguments);

        let data = {
            podcastId: podcastId,
            podcastName: podcastName,
            podcastLogo: podcastLogo,
            episodeId: episodeId,
            episodeName: episodeName,
            date: date,
            description: description,
            audioLink: audioLink,
            userId: userId
        }
        console.log(data)

        return axios.post("/api/favorites/", data);
    },

    getFollowingsPosts: function (userId) {
        // Get all user and user followings posts latest-first 
        return axios.get("/api/users/" + userId + "/followings/posts");
    },

    getUsersToFollow: function (userId) {
        return axios.get("/api/users/" + userId);
    },

    followUser: function (userId, followUserId) {
        // console.log(arguments);

        let data = {
            followedBy: userId,
            isFollowing: followUserId
        }

        return axios.post("/api/users/follow/", data);
    },
  
    sharePodcast: function(podcastId, podcastName, podcastLogo, episodeId, episodeName, description, audioLink, userMessage, userId) {
        // console.log(arguments);

        let data = {
            podcastId: podcastId,
            podcastName: podcastName,
            podcastLogo: podcastLogo,
            episodeId: episodeId,
            episodeName: episodeName,
            description: description,
            audioLink: audioLink,
            userMessage: userMessage,
            postedBy: userId
        }

        return axios.post("/api/posts/", data);
    },

    animate: ()=> this.classList.add("animated", "tada")

};
