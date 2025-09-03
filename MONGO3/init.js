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


chat.insertMany([
    {
        from: 'John',
        to: 'Jane',
        msg: 'Hello how are you?',
        created_at: new Date(),
    },
]);
