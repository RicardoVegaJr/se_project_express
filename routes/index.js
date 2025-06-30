const router = require("express").Router();
const userRouter = require("./users");
const clothingRouter = require("./clothing");

router.use("/users", userRouter);
router.use("/items", clothingRouter);

module.exports = router;
