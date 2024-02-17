const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String
});

const User = mongoose.model('User', userSchema);

mongoose.connect('mongodb://127.0.0.1:27017/Scaler_30_Days_NodeJS', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

async function addUserToDatabase(user) {
  try {
    const newUser = new User(user);
    await newUser.save();
    console.log('User added successfully:', newUser);
  } catch (error) {
    console.error('Error adding user:', error);
  }
}

addUserToDatabase({ username: 'john_doe', email: 'john@example.com' });
