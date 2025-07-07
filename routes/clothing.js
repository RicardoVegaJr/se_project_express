const router = require("express").Router();
const {
  getClothing,
  postItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");
const authMiddleware = require("../middlewares/auth");

router.get("/", getClothing);
router.post("/",authMiddleware, postItem);
router.delete("/:itemId", authMiddleware, deleteItem);
router.put("/:itemId/likes",authMiddleware, likeItem);
router.delete("/:itemId/likes", authMiddleware, dislikeItem);

module.exports = router;
