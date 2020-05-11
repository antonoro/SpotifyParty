const WebSocket = require('ws');

function wsUtils() {

    const wsu = {};
    let clients = [];

    wsu.setupWS = (server) => {
        console.log("Setting up Web Socket");
        const wss = new WebSocket.Server({server});

        wss.on("connection", (ws) => {
            clients.push(ws);
            console.log("New connection:");
        });
    }

    wsu.notifyAll = (data) => {
        console.log("Notifying all clients:", clients.length);
        clients.forEach(ws => {
            ws.send(data);
        })
        
    }

    return wsu;
}

module.exports = wsUtils();