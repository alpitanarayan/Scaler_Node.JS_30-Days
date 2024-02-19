const express = require('express');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/Scaler_30_Days_NodeJS')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});
const User = mongoose.model('User', userSchema);
const app = express();

function getAllUsers(req, res) {
    User.find({})
      .then(users => {
        res.json(users); 
      })
      .catch(err => {
        console.error('Error retrieving users:', err);
        res.status(500).json({ error: 'Internal server error' });
      });
  }
app.get('/users', getAllUsers);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
