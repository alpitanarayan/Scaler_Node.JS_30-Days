const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/Scaler_30_Days_NodeJS')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: 'Invalid email format'
    }
  }
});
const User = mongoose.model('User', userSchema);

function addUserWithValidation(user) {
  const newUser = new User(user);
  newUser.save()
    .then(() => {
      console.log('User added successfully');
    })
    .catch(err => {
      console.error('Error adding user:', err.message);
    });
}
addUserWithValidation({ username: 'john_doe', email: 'john@gmail.com' });
