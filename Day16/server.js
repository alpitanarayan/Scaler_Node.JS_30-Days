const mongoose = require('mongoose');
const express = require('express');
const app = express();


function connectToMongoDB() {
  const url = 'mongodb://127.0.0.1:27017/Scaler_30_Days_NodeJS';
  mongoose.connect(url);

  const db = mongoose.connection;
  db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });
  db.once('open', () => {
    console.log('MongoDB connected successfully');
  });
}
connectToMongoDB();

app.get('/', (req, res) => {
  connectToMongoDB();
  res.sendFile(__dirname + '/index.html');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});