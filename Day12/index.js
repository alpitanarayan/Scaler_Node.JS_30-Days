const express = require('express');
const app = express();
const RATE_LIMIT = 5; 
const WINDOW_SIZE = 60000; 
let requestCount = {}; 

function rateLimitMiddleware(req, res, next) {
    const clientIP = req.ip;
    if (!requestCount[clientIP]) {
        requestCount[clientIP] = {
            count: 1,
            timestamp: Date.now()
        };
    } else {
        const currentTime = Date.now();
        const timeDiff = currentTime - requestCount[clientIP].timestamp;
        if (timeDiff > WINDOW_SIZE) {
            requestCount[clientIP] = {
                count: 1,
                timestamp: currentTime
            };
        } else {
            requestCount[clientIP].count += 1;
            requestCount[clientIP].timestamp = currentTime;
        }
    }
    if (requestCount[clientIP].count > RATE_LIMIT) {
        return res.status(429).send('Too Many Requests');
    }
    next();
}
app.use(rateLimitMiddleware);

app.get('/', (req, res) => {
    res.send('Welcome to Day_12 of 30_Day Node.JS ');
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
