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
const user = require("../models/user");
console.log(JWT_SECRET);

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
  const { _id } = req.user;

  User.findById(_id)
    .then((user) => {
      if (!user) {
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
  const { name, avatar, email, password } = req.body;
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
    .catch((err) => {
      // <-- Capture the error object here
      console.error("Login error:", err); // <-- Log the full error for debugging
      // You can also add more specific checks for err.name or err.message if needed
      return res
        .status(UNAUTHORIZED_CODE)
        .send({
          message:
            errorMessages.UNAUTHORIZED ||
            "Authentication failed. Invalid credentials.",
        });
    });
};

const updateProfile = (req, res) => {
  const userId = req.user._id;
  const { name, avatar } = req.body;

  const updateFields = {};
  if (name) {
    updateFields.name = name;
  }
  if (avatar) {
    updateFields.avatar = avatar;
  }

  if (Object.keys(updateFields).length === 0) {
    return res
      .status(BAD_REQUEST_ERROR_CODE)
      .send({ message: "No fields provided for update." });
  }

  User.findByIdAndUpdate(
    userId,
    { $set: updateFields },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        return res
          .status(NOT_FOUND_ERROR_CODE)
          .send({ message: errorMessages.NOT_FOUND || "User not found." });
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      console.error("Error updating user profile:", err);
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({
            message:
              errorMessages.BAD_REQUEST || `Validation error: ${err.message}`,
          });
      }
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({
            message: errorMessages.BAD_REQUEST || "Invalid user ID format.",
          });
      }
      return res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .send({
          message:
            errorMessages.INTERNAL_SERVER_ERROR ||
            "An internal server error occurred.",
        });
    });
};

module.exports = { getUsers, getCurrentUser, createUser, login, updateProfile };
