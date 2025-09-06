const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const path = require('path');
const Chat = require('./models/chat');
const methodOverride = require('method-override');

// EJS setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
// Database connection
main()
.then(() => console.log('Connected to MongoDB 🎉 '))
.catch(err => console.log(err, 'Failed to connect to MongoDB 🔴 '));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

//Index Route
app.get('/chats', async (req, res) => {
  let chats = await Chat.find({});
  console.log(chats);
  res.render('index.ejs', { chats });
});

//New Chat Route
app.get('/chats/new', (req, res) => {
  res.render('new.ejs');
});

//Home Route
app.get('/', (req, res) => {
  res.send('<style>body { background-color:rgb(16, 15, 15); color:white; }</style> Rot is running');
}); 

//Create Chat Route
app.post('/chats', async (req, res) => {
  try {
  let { from, to, msg } = req.body;
  let chat = new Chat({ from, to, msg, created_at: new Date() });
  await chat.save();
  res.redirect('/chats');
  } catch (error) {
    console.log(error);
    res.render('err.ejs', { error: error.message });
  }
});

//Edit Chat Route
app.get('/chats/:id/edit', async (req, res) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);
  res.render('edit.ejs', { chat });
});

//Update Chat Route
app.patch('/chats/:id', async (req, res) => {
  let { id } = req.params;
  let { msg } = req.body;
  let chat = await Chat.findByIdAndUpdate(id, { msg }, { new: true });
  res.redirect('/chats');
});

//Listen to port
app.listen(port, () => {
  console.log(`Server is running on port ${port} 🎉 `);
});