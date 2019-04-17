import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();


var API_KEY = "a063bce4f1msh0a4f44209d57a2fp1225adjsn3f80cc1cf1bb";

export default {

    // LIKING AND UNLIKING POSTS
    // =====================================

    // Gets number of likes for specific post
    getLikes: function (postId) {
        return axios.get("/api/posts/getUsersLikedPost/" + postId);
    },

    // Adds a like to a post
    likePost: function (postId, userId) {
        let data = {
            postId: postId,
            userId: userId
        }

        return axios.post("/api/posts/like/", data);
    },

    // Removes a like from post
    unlikePost: function (postId, userId) {
        return axios.delete("/api/posts/unlike/" + postId + "/" + userId);
    },


    // COMMENTS
    // =====================================

    // Gets all comments for a specific post
    getComments: function (postId) {
        return axios.get("/api/comments/commentedUserLikes/" + postId);
    },

    // Adds a comment to a post
    addComment: function (comment, postId, userId) {
        let data = {
            comment: comment,
            commentedBy: userId,
            postId: postId
        }

        return axios.post("/api/comments/", data);
    },

    // Removes a comment from a post
    deleteComment: function (commentId) {
        return axios.delete("/api/comments/" + commentId)
    },

    // Adds a like to a comment
    likeComment: function (commentId, userId) {
        let data = {
            commentId: commentId,
            userId: userId
        }

        return axios.post("/api/comments/commentLikes/", data);
    },

    // Removes a like from a comment
    unlikeComment: function (commentId, userId) {
        return axios.delete("/api/comments/commentUnlikes/" + commentId + "/" + userId);
    },

    // Gets the users who liked the comment
    getUsersLikedComment: function (commentId) {
        return axios.get("/api/comments/getUsersLikedComment/" + commentId);
    },


    // POSTS
    // =====================================

    // Create a new post (share a podcast episode)
    sharePodcast: function (podcastId, podcastName, podcastLogo, episodeId, episodeName, description, audioLink, userMessage, userId) {

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

    // Deletes a post
    handlePostDelete: function (postId) {
        return axios.delete("/api/posts/delete/" + postId);
    },

    // Gets all posts from specific user
    getPosts: function (userId) {
        return axios.get("/api/getPosts", userId);
    },

    // Gets all posts from current user
    getPostsOnlyByUser: function (userId) {
        return axios.get("/api/posts/getPostsOnlyByUser/" + userId);
    },

    // Gets all posts from other users that subject user is following
    // Descending order according to date
    getFollowingsPosts: function (userId) {
        return axios.get("/api/users/" + userId + "/followings/posts");
    },


    // USERS
    // =====================================

    // Get all users
    getUsers: function (user) {
        return axios.get("api/getUsers", user);
    },

    // Gets About Me section for user
    getAboutMe: function (userId) {
        return axios.get("/api/getAboutMe", userId);
    },

    // Gets existing user; creates user if doesn't exist
    getOrCreateUser: function (id_token) {
        return axios.post("/api/users?id_token=" + id_token);
    },

    deleteUser: function(user) {
        return axios.get("api/getUsers", user); // temporary. will be more like axios.delete("api/deleteUser", user);
    },


    // PODCAST, EPISODE SEARCH
    // =====================================

    // Gets list of podcasts according to user query
    getPodcasts: function (userQuery) {
        console.log(API_KEY);
        var URL = "https://listennotes.p.rapidapi.com/api/v1/search?sort_by_date=0&type=podcast&only_in=title&language=English&q=" + userQuery;

        return axios.get(URL, { 'headers': { 'X-RapidAPI-Key': API_KEY } })
            .then((response) => {
                return response;
            })
            .catch((error) => {
                console.log("Error fetching podcasts", error);
            });
    },

    // Gets all episodes for a particular podcast
    // Initially returns 10 results
    // Returns results in sets of 50 thereafter until end
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
                    console.log("Error fetching episodes", error);
                });
        }
    },


    // FAVORITES
    // =====================================

    // Adds episode to user's list of favorites
    addEpisodeToFavorites: function (podcastId, podcastName, podcastLogo, episodeId, episodeName, date, description, audioLink, userId) {

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

        return axios.post("/api/favorites/", data);
    },

    // Gets all of user's favorite episodes
    getFavorites: function (userId) {
        return axios.get("/api/favorites/" + userId);
    },

    handleFavoriteDelete: function (id) {
        console.log("api", id)
        return axios.delete("/api/favorites/delete/" + id);
    },


    // FOLLOWING AND UNFOLLOWING
    // =====================================   

    // Follows a specific user
    followUser: function (userId, followUserId) {

        let data = {
            followedBy: userId,
            isFollowing: followUserId
        }

        return axios.post("/api/users/follow/", data);
    },

    // Unfollows a specific user
    unFollowUser: function (userId, followUserId) {

        let data = {
            "followedBy": userId,
            "isFollowing": followUserId
        }

        return axios.post("/api/users/unfollow", data);
    },

    // Gets all followers of a particular user
    getFollowers: function (userId) {
        return axios.get("/api/users/followedBy/" + userId);
    },

    // Gets all users that specific user is following
    getFollowing: function (userId) {
        return axios.get("/api/users/isFollowing/" + userId);
    },

    // Gets users on site - for user search results
    getUsersToFollow: function (userId) {
        return axios.get("/api/users/" + userId);
    },

    // Gets number of users followed
    getUsersFollowed: function (userId) {
        return axios.get("/api/users/followings/" + userId);
    },

    // Gets list of other users that follow subject user
    isFollowedByUsers: function (userId) {
        return axios.get("api/users/followedByUsers/" + userId);
    },

    // Gets list of other users that subject user follows
    isFollowingUsers: function (userId) {
        return axios.get("api/users/isFollowingUsers/" + userId);
    },
};
