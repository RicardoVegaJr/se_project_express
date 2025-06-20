const clothingItem = require("../models/clothingItem");
const getUsersById = require("./users");

const getClothing = (req, res) => {
  clothingItem.find({})
    .then((clothingItem) => res.status(200).send(clothingItem))
    .catch((err) => {
      console.error(err);
      return res.status(500).send({message: err.message});
});
};



const postItem = (req, res) => {

  const {name, weather, imageUrl} = req.body;

  clothingItem.create({name, weather, imageUrl})
    .then((item) => {res.send({data:item})
}).catch((err) => {
      console.error(err);
      return res.status(500).send({message: err.message})
    })
};


const deleteItem = (req, res) => {
  const {itemId} = req.params;

  clothingItem.findByIdAndDelete(itemId)
    .then((item) => {
      if(!item) {
        return res.status(404).send({message: "item not found"});
      }
      res.status(200).send({message: "Item delete successfully", data:item});
    })
    .catch((err) => {
      console.error(err);
      if (err.name === 'CastError') {
        return res.status(400).send({ message: "Invalid item ID" });
      }
      return res.status(500).send({ message: err.message });
    });
};

const likeItem = (req, res) => {
  const {itemId} = req.params;

  clothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
  .then((item) => {
    if (!item) {
      return res.status(404).send({ message: "Item not found" });
    }
    return res.status(200).send({ message: "Item liked", data: item });
  })
  .catch((err) => {
    console.error(err);
    if (err.name === 'CastError') {
      return res.status(400).send({ message: "Invalid ID." });
    }
    return res.status(500).send({ message: err.message });
  });
};

const dislikeItem = (req, res) => {
  const {itemId} = req.params;


  clothingItem.findByIdAndUpdate(
    itemId,
  { $pull: { likes: req.user._id } },
  { new: true },
  )
  .then((item) => {
    if (!item) {
      return res.status(404).send({ message: "Item not found" });
    }
    return res.status(200).send({ message: "Item like deleted", data: item });
  })
  .catch((err) => {
    console.error(err);
    if (err.name === 'CastError') {
      return res.status(400).send({ message: "Invalid ID." });
    }
    return res.status(500).send({ message: err.message });
  });
};



module.exports = { getClothing, postItem, deleteItem, likeItem, dislikeItem};