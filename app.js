require('dotenv').config();

const express = require("express");
const errorHandler = require('./middlewares/error-handler');
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');


app.use(cors());

app.use(requestLogger);


const mainRouter = require("./routes/index");

const { PORT = 3001 } = process.env;

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("connected to db");
  })
  .catch(console.error);

app.use("/", mainRouter);

app.use(errorLogger);

app.use(errors());


app.use(errorHandler);

