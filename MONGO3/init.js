const mongoose = require('mongoose');

main().then(() => {
  console.log('Connected to MongoDB 🎉 ');
}).catch((err) => {
  console.log(err, 'Failed to connect to MongoDB 🔴 ');
});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}