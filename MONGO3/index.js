const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const path = require('path');
const chat = require('./models/chat');

// EJS setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Database connection
main()
.then(() => console.log('Connected to MongoDB 🎉 '))
.catch(err => console.log(err, 'Failed to connect to MongoDB 🔴 '));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let chat1 = new chat({
  from: 'John',
  to: 'Jane',
  msg: 'Hello how are you?',
  created_at: new Date(),
});

chat1.save().then((res) => {
  console.log(res);
}).catch((err) => {
  console.log(err);
});

app.get('/', (req, res) => {
  res.send('<style>body { background-color:rgb(16, 15, 15); color:white; }</style>Hello World');
}); 

app.listen(port, () => {
  console.log(`Server is running on port ${port} 🎉 `);
});