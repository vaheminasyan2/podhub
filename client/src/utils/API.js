import axios from "axios";

export default {
    getPosts: function(userId) {
        return axios.get("/home", userId)
    }

};
