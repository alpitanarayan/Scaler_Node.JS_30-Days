const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const setupWebSocketServer = require('./setupWebSocketServer');

const app = express();
const server = http.createServer(app);

// Define a route handler for the root URL ("/")
app.get('/', (req, res) => {
    res.send('WbSocket Server is running');
});

// Setup WebSocket server
setupWebSocketServer(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
