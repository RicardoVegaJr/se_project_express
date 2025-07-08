const express = require("express");

const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors());

const mainRouter = require("./routes/index");
const { NOT_FOUND_ERROR_CODE } = require("./utils/constants");
const { errorMessages } = require("./utils/constants");

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

app.use((req, res) => {
  res.status(NOT_FOUND_ERROR_CODE).send({ message: errorMessages.NOT_FOUND });
});
