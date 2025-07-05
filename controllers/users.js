const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { errorMessages } = require("../utils/constants");
const {
  BAD_REQUEST_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  INTERNAL_SERVER_ERROR_CODE,
  UNAUTHORIZED_CODE,
} = require("../utils/constants");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(() =>
      res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .send({ message: errorMessages.INTERNAL_SERVER_ERROR })
    );
};

const getCurrentUser = (req, res) => {
  const { id } = req.user;

  User.findById(id)
    .then((user) => {
      if (!user) {
        console.log(req.user);
        return res
          .status(NOT_FOUND_ERROR_CODE)
          .send({ message: errorMessages.NOT_FOUND });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({ message: errorMessages.BAD_REQUEST });
      }
      return res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .send({ message: errorMessages.INTERNAL_SERVER_ERROR });
    });
};

const createUser = (req, res) => {
  const {name, avatar, email, password} = req.body;
  bcrypt
    .hash(password, 10)
    .then((hashedPassword) =>
      User.create({
        name,
        avatar,
        email,
        password: hashedPassword,
      })
    )
    .then((user) => {
      const userObject = user.toObject();
      delete userObject.password;
      res.status(201).send(userObject);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({ message: errorMessages.BAD_REQUEST });
      }
      return res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .send({ message: errorMessages.INTERNAL_SERVER_ERROR });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.status(200).send({ token });
    })
    .catch(() => {
      return res
        .status(UNAUTHORIZED_CODE)
        .send({ message: errorMessages.UNAUTHORIZED})
    });
};

module.exports = { getUsers, getCurrentUser, createUser, login };
