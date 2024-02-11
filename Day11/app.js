const express = require('express');
const authenticationMiddleware = require('./authenticationMiddleware');
const path = require('path');
const app = express();
app.use(express.json());

function staticFileServer(req, res) {
    const publicPath = path.join(__dirname, 'public');
      app.use(express.static(publicPath));
  
      app.get('/', (req, res) => {
      res.sendFile(path.join(publicPath, 'index.html'));
    });
  } 
staticFileServer();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
