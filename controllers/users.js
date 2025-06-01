const User = require("../models/user");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(err);
      return res.status(500).send({message: err.message});
});
};

const getUsersById = (req, res) => {

const { id } = req.params

    User.findById(id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Invalid user ID ' });
      }
      return res.status(500).send({ message: err.message });
    });
};

const createUser = (req, res) => {
  const {name, avatar} = req.body;

  User.create({name, avatar})
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.error(err);
      return res.status(500).send({message: err.message});
    });
};

module.exports = {getUsers, getUsersById, createUser};