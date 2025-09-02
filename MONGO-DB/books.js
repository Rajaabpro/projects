const mongoose = require('mongoose');


main().then(() => {
  console.log('Connected to MongoDB successfully !! 🎉 ');
})
.catch(err => {
  console.log(err);
  console.log('Failed to connect to MongoDB !! 🔴 ');
});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/amazon');
}


const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});