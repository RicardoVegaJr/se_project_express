const express = require('express');
const app = express();
const mongoose = require('mongoose');


const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
})

mongoose
.connect('mongodb://127.0.0.1:27017/wtwr_db')
.then(() => {console.log("connected to db");
})
.catch(console.error);
