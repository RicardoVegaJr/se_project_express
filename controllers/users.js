const User = require("../models/user");
const { errorMessages } = require("../utils/constants");
const {
  BAD_REQUEST_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  INTERNAL_SERVER_ERROR_CODE
} = require("../utils/constants");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(() => (
      res.status(INTERNAL_SERVER_ERROR_CODE).send({message: errorMessages.INTERNAL_SERVER_ERROR})
));
};

const getUsersById = (req, res) => {

const { id } = req.params

    User.findById(id)
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND_ERROR_CODE).send({ message: errorMessages.NOT_FOUND});
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST_ERROR_CODE).send({ message: errorMessages.BAD_REQUEST });
      }
      return res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: errorMessages.INTERNAL_SERVER_ERROR });
    });
};

const createUser = (req, res) => {
  const {name, avatar} = req.body;

  User.create({name, avatar})
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError' ) {
            return res.status(BAD_REQUEST_ERROR_CODE).send({message: errorMessages.BAD_REQUEST})
    }
      return res.status(INTERNAL_SERVER_ERROR_CODE).send({message: errorMessages.INTERNAL_SERVER_ERROR})
    })
};


module.exports = {getUsers, getUsersById, createUser};