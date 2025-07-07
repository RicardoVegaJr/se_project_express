const router = require("express").Router();
const userRouter = require("./users");
const clothingRouter = require("./clothing");
const {createUser, login } = require("../controllers/users");
const authMiddleware = require("../middlewares/auth");




router.use("/users",authMiddleware, userRouter);
router.use("/items", clothingRouter);
router.post('/signin', login);
router.post('/signup', createUser);

module.exports = router;
