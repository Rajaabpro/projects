const mongoose = require('mongoose');


main().then(() => {
  console.log('Connected to MongoDB successfully !! 🎉 ');
})
.catch(err => {
  console.log(err);
  console.log('Failed to connect to MongoDB !! 🔴 ');
});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
}

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

const user1= new User({
  username: 'John',
  email: 'john@example.com',
  password: 'password' 
});

user1.save();

