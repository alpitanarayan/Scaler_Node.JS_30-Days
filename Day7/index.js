const express = require('express');
const app = express();
const port = 2002;

function requestLoggerMiddleware(req, res, next) {
    const timestamp = new Date().toISOString();
    const method = req.method;
    console.log(`${timestamp} - ${method} request received`);
    next();
  }
 app.use(requestLoggerMiddleware);

app.get('/', (req, res) =>
{
    res.send("Hello, Alpita");
});

app.listen(port, () => {
  console.log(`Server is listening at ${port}`);
});





  