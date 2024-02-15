const express = require("express");
const app = express();

function loggingMiddleware(req, res, next) {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.url;
  const headers = req.headers;
  const body = req.body;

  console.log(`[${timestamp}] ${method} ${url}`);
  console.log("Headers:", headers);
  console.log("Body:", body);

  next();
}
app.use(loggingMiddleware);

app.get('/', (req,res) =>{
    res.sendFile(__dirname + '/index.html')
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
