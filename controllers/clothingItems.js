const clothingItem = require("../models/clothingItem");
const { BadRequestError } = require("../errors/BadRequestError");
const { ForbiddenError } = require("../errors/ForbiddenError");
const { NotFoundError } = require("../errors/NotFoundError");
const { errorMessages } = require("../utils/constants");

const getClothing = (req, res, next) => {
  clothingItem
    .find({})
    .then((clothingItems) => res.status(200).send(clothingItems))
    .catch((err) => {
      return next(err);
    });
};

const postItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  clothingItem
    .create({ name, weather, imageUrl, owner })
    .then((item) => {
      res.status(201).send(item);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError(errorMessages.BAD_REQUEST));
      }
      return next(err);
    });
};

const deleteItem = (req, res, next) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  clothingItem
    .findById(itemId)
    .orFail(() => {
      throw new NotFoundError(errorMessages.NOT_FOUND);
    })
    .then((item) => {
      if (item.owner.toString() === userId) {
        return clothingItem.findByIdAndDelete(itemId).then((deletedItem) => {
          res.status(200).send(deletedItem);
        });
      }
      throw new ForbiddenError(errorMessages.FORBIDDEN);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError(errorMessages.BAD_REQUEST));
      }
      return next(err);
    });
};

const likeItem = (req, res, next) => {
  const { itemId } = req.params;

  clothingItem
    .findByIdAndUpdate(
      itemId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    )
    .orFail(() => {
      throw new NotFoundError(errorMessages.NOT_FOUND);
    })
    .then((item) => {
      res.status(200).send(item);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError(errorMessages.BAD_REQUEST));
      }
      return next(err);
    });
};

const dislikeItem = (req, res, next) => {
  const { itemId } = req.params;

  clothingItem
    .findByIdAndUpdate(
      itemId,
      { $pull: { likes: req.user._id } },
      { new: true }
    )
    .then((item) => {
      if (!item) {
        throw new NotFoundError(errorMessages.NOT_FOUND);
      }
      return res.status(200).send(item);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        throw new BadRequestError(errorMessages.BAD_REQUEST);
      }
      return next(err);
    });
};

module.exports = { getClothing, postItem, deleteItem, likeItem, dislikeItem };
