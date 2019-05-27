const sio = require("socket.io");

class Notification {
    constructor(http) {
        this._clients = new Map();
        this._io = sio(http);
        this._io.on("connection", (clientSocket) => this.onClientConnected(clientSocket));
    };

    onClientConnected(clientSocket) {
        const userId = clientSocket.handshake.query.userId.toString();
        // Some client is connected.
        console.log("User connected:", userId, clientSocket.id);
        this._clients.set(userId, clientSocket);
        console.log("Current clients:", this._clients.size);
        clientSocket.on("disconnect", () => this.onClientDisconnected(userId));
    };

    onClientDisconnected(userId) {
        this._clients.delete(userId);
        console.log("Client disconected:", userId);
    }

    notifyShare(userId, postId) {
        const userIdAsString = userId.toString();
        console.log("Notify user: ", userIdAsString, this._clients.has(userIdAsString));
        this._clients.forEach((value) => {
            value.emit("share", postId, userId);
        });

    };

    notifyComment(recipient, name, comment, title) {
        console.log(name + "has commented on your post: ", comment);
        if (this._clients.get(recipient.toString())) {
            this._clients.get(recipient.toString()).emit("comment", name, comment, title);
        }
    }
    //////// Post Like ///////////
    notifyPostLike(recipient, name, title) {
        console.log(name + "likes your post: ", title);
        if (this._clients.get(recipient.toString())) {
            this._clients.get(recipient.toString()).emit("post_like", name, title);
        }
    }
    /////////  Comment Like ////////////
    notifyCommentLike(recipient, name, comment) {
        console.log(name + "likes your comment: ", comment);
        if (this._clients.get(recipient.toString())) {
            this._clients.get(recipient.toString()).emit("comment_like", name, comment);
        }
    }


    notifyfavorite(recipient, name) {
        console.log("Follow: ", name);
        if (this._clients.get(recipient.toString())) {
            this._clients.get(recipient.toString()).emit("follow", name);
        }
    }
};

module.exports = Notification;
