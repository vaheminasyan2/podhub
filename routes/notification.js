const sio = require("socket.io");

class Notification {
    constructor(http) {
        this._clients = new Map();
        this._io = sio(http);
        this._io.on("connection", (clientSocket) => this.onClientConnected(clientSocket));
    };

    onClientConnected(clientSocket) {
        const userId = clientSocket.handshake.query.userId;
        // Some client is connected.
        console.log("User connected:", userId, clientSocket.id);
        this._clients.set(userId, clientSocket);
        console.log("Current clients:", this._clients);
    };

    notifyShare(userId) {
        console.log("Notify user: ", userId, this._clients);
        this._clients.get(userId).emit("share");
    };
};

module.exports = Notification;
