const mongoose = require('mongoose');


main().then(() => {
  console.log('Connected to MongoDB successfully !! 🎉 Amazon DB ');
})
.catch(err => {
  console.log(err);
  console.log('Failed to connect to MongoDB !! 🔴 Amazon DB ');
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
    discount: {
        type: Number,
        default: 50,
    },
});

const Book = mongoose.model('Book', bookSchema);

let book1 = new Book({
    title: 'Atomic Habits',
    author: 'James Clear',
    price: 550,
});

book1.save().then((res) => {
    console.log(res);
}).catch((err) => {
    console.log(err);
});
