const router = require('express').Router();

router.get("/", () => console.log("GET clothing"));
router.post("/", () => console.log("post clothing"));
router.delete("/:itemId", () => console.log("delete clothing"));

module.exports = router;