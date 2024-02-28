const WebSocket = require('ws');

function setupWebSocketServer(server) {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws) => {
        console.log('A new client connected');
        ws.on('message', (message) => {
            console.log('Received message:', message);
            wss.clients.forEach((client) => {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(message);
                }
            });
        });

        ws.on('close', () => {
            console.log('Client disconnected');
        });
    });

    console.log('WebSocket server is listening');
}

module.exports = setupWebSocketServer;
