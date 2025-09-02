const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

app.get('/', (req, res) => {
  res.send('<style>body { background-color:rgb(16, 15, 15); color:white; }</style>Hello World');
}); 

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});