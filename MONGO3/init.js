const mongoose = require('mongoose');
const chat = require('./models/chat');



main().then(() => {
  console.log('Connected to MongoDB 🎉 ');
}).catch((err) => {
  console.log(err, 'Failed to connect to MongoDB 🔴 ');
});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allChats = [
    {
        from: 'John',
        to: 'Jane',
        msg: 'Hello how are you?',
        created_at: new Date(),
    },
    {
        from: 'Jane',
        to: 'John',
        msg: 'I am fine, thank you?',
        created_at: new Date(),
    },
    {
        from: 'John',
        to: 'Jane',
        msg: 'What are you doing?',
        created_at: new Date(),
    },
    {
        from: 'Jane',
        to: 'John',
        msg: 'I am doing nothing, you?',
        created_at: new Date(),
    },
    {
        from: 'John',
        to: 'Jane',
        msg: 'I am doing nothing, you?',
        created_at: new Date(),
    },
];


chat.insertMany([
    {
        from: 'John',
        to: 'Jane',
        msg: 'Hello how are you?',
        created_at: new Date(),
    },
]);

chat.insertMany(allChats);