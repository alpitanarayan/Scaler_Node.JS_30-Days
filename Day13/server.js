const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const WebSocket = require('ws');

function setupWebSocket(server) {
  const wss = new WebSocket.Server({ server });
  wss.on('connection', function connection(ws) {
    console.log('A new client connected.');

    ws.on('message', function incoming(message) {
      console.log('Received:', message);
            ws.send(message);
    });
    ws.on('close', function () {
      console.log('Client disconnected.');
    });
  });
}
setupWebSocket(server);

app.get('/websocket', (req, res) => {
  res.sendFile(__dirname + '/websocket.html');
});

server.listen(3000, () => {
  console.log('Server started on port 3000');
});
