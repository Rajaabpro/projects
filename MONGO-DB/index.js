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

const user2= new User({
  username: 'John2',
  email: 'john2@example.com',
  password: 'password' 
});

user1.save().then((res) => {
  console.log(res);
}).catch((err) => {
  console.log(err);
});

