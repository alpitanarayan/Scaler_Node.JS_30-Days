const express = require('express');
const path = require('path');

function staticFileServer(req, res) {
  const publicPath = path.join(__dirname, 'public');
    app.use(express.static(publicPath));

    app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
  });
}

const app = express();

staticFileServer();

const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
