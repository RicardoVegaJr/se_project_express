const router = require("express").Router();
const {
  getClothing,
  postItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");
const authMiddleware = require("../middlewares/auth");
const { validateItem, validateItemId } = require("../middlewares/validation");

router.get("/", getClothing);
router.post("/", authMiddleware, validateItem, postItem);
router.delete("/:itemId", authMiddleware, validateItemId, deleteItem);
router.put("/:itemId/likes", authMiddleware, validateItemId, likeItem);
router.delete("/:itemId/likes", authMiddleware, validateItemId, dislikeItem);

module.exports = router;
