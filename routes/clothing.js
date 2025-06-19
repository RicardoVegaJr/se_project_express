const router = require('express').Router();
const {getClothing, postItem, deleteItem} = require("../controllers/clothingItems");

router.get("/", getClothing);
router.post("/", postItem);
router.delete("/:itemId", deleteItem);

module.exports = router;



