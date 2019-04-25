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
    };

    notifyShare(userId, postId) {
        const userIdAsString = userId.toString();
        console.log("Notify user: ", userIdAsString, this._clients.has(userIdAsString));
        this._clients.forEach((value) => {
            value.emit("share", postId);
        });
        
    };
};

module.exports = Notification;
