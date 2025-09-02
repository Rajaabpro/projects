const mongoose = require('mongoose');


main().then(() => {
  console.log('Connected to Mongoose successfully !! 🎉 Amazon DB ');
})
.catch(err => {
  console.log(err);
  console.log('Failed to connect to Mongoose !! 🔴 Amazon DB ');
});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/amazon');
}


const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 20,
    },
    author: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: [1 , 'Price is too low'],
    },
    discount: {
        type: Number,
        default: 50,
    },
    category: {
        type: String,
        enum: ['fiction', 'non-fiction'],
    },
    genre: [String]
});

const Book = mongoose.model('Book', bookSchema);


Book.findByIdAndUpdate('68b6cd814d0b88cbf037785a', {price: -11100}, {runValidators: true}).then((res) => {
    console.log(res);
}).catch((err) => {
    console.log(err.errors.price.properties);
});
// let book1 = new Book({
//     title: 'Rich Dad Poor Dad',
//     author: 'Stan Lee',
//     price: 1000,
//     genre: ['fiction', 'non-fiction'],
// });

// book1.save().then((res) => {
//     console.log(res);
// }).catch((err) => {
//     console.log(err.message);
// });
