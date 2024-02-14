const cachedResponses = {};
const cacheExpirationTime = 300000; 

function cachingMiddleware(req, res, next) {
  const url = req.url;
  if (cachedResponses[url] && Date.now() - cachedResponses[url].timestamp < cacheExpirationTime) {
    console.log("Returning cached response for:", url);
    res.send(cachedResponses[url].response);
  } else {
    console.log("Cache miss or expired for:", url);
    const originalSend = res.send;
    res.send = function (body) {
      cachedResponses[url] = {
        response: body,
        timestamp: Date.now()
      };
      originalSend.call(this, body);
    };
    next();
  }
}
const express = require('express');
const app = express();
app.use(cachingMiddleware);
app.get('/', (req, res) => {
  res.send('This is a cached response');
});
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
