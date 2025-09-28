const router = require("express").Router();
const userRouter = require("./users");
const clothingRouter = require("./clothing");
const { createUser, login } = require("../controllers/users");
const authMiddleware = require("../middlewares/auth");
const { NotFoundError } = require("../errors/NotFoundError");
const { errorMessages } = require("../utils/constants");
const { validateSignin, validateSignup } = require("../middlewares/validation");

router.use("/users", authMiddleware, userRouter);
router.use("/items", clothingRouter);
router.post("/signin", validateSignin, login);
router.post("/signup", validateSignup, createUser);

router.use((req, res, next) => {
  next(new NotFoundError(errorMessages.NOT_FOUND));
});

module.exports = router;
