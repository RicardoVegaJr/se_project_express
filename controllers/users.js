const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { BadRequestError } = require("../errors/BadRequestError");
const { ConflictError } = require("../errors/ConflictError");
const { NotFoundError } = require("../errors/NotFoundError");
const { UnauthorizedError } = require("../errors/UnauthorizedError");
const { errorMessages } = require("../utils/constants");

const { JWT_SECRET } = require("../utils/config");

const getCurrentUser = (req, res, next) => {
  const { _id } = req.user;

  User.findById(_id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(errorMessages.NOT_FOUND);
      }
      return res.status(200).send(user);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
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
        return next(new BadRequestError(errorMessages.BAD_REQUEST));
      }
      if (err.code === 11000) {
        return next(new ConflictError(errorMessages.CONFLICT));
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError(errorMessages.BAD_REQUEST);
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.status(200).send({ token });
    })
    .catch((err) => {
      if (err.message === "Incorrect email or password") {
        return next(new UnauthorizedError(errorMessages.UNAUTHORIZED));
      }
      return next(err);
    });
};

const updateProfile = (req, res, next) => {
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
    throw new BadRequestError(errorMessages.BAD_REQUEST);
  }

  return User.findByIdAndUpdate(
    userId,
    { $set: updateFields },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(errorMessages.NOT_FOUND);
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError(errorMessages.BAD_REQUEST));
      }
      return next(err);
    });
};

module.exports = { getCurrentUser, createUser, login, updateProfile };
