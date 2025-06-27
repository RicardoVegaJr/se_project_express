const express = require('express');

const app = express();
const mongoose = require('mongoose');
const mainRouter = require("./routes/index")




const { PORT = 3001} = process.env;



app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
})
app.use(express.json());





mongoose
.connect('mongodb://127.0.0.1:27017/wtwr_db')
.then(() => {console.log("connected to db");
})
.catch(console.error);


app.use((req, res, next) => {
  req.user = {
    _id: '683cccfbd7e03b6e12a81200'// paste the _id of the test user created in the previous step
  };
  next();
});

app.use('/', mainRouter);

app.use((req, res) => {
    res.status(404).send({ message: 'Requested item not found' });
});