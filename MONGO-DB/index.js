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

User.find({username: ''}).then((res) => {
  console.log(res);
}).catch((err) => {
  console.log(err);
});

// User.insertMany([
//   {
//     username: 'tom',
//     email: 'tom@example.com',
//     password: 'password' 
//   },
//   {
//     username: 'jerry',
//     email: 'jerry@example.com',
//     password: 'password' 
//   },
  
//   {
//     username: 'sherry',
//     email: 'sherry@example.com',
//     password: 'password' 
//   },
  
// ]).then((res) => {
//   console.log(res);
// }).catch((err) => {
//   console.log(err);
// });

// const user2= new User({
//   username: 'John2',
//   email: 'john2@example.com',
//   password: 'password' 
// });

// user2.save()
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

