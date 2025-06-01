const express = require('express');
const app = express();
const mongoose = require('mongoose');
const mainRouter = require("./routes/index")




const { PORT = 3000} = process.env;



app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
})
app.use(express.json());
app.use('/', mainRouter);


mongoose
.connect('mongodb://127.0.0.1:27017/wtwr_db')
.then(() => {console.log("connected to db");
})
.catch(console.error);


