const router = require("express").Router();
const {getCurrentUser} = require("../controllers/users");

// router.get("/", getUsers);
router.get("/me", getCurrentUser);
// router.post("/", createUser);
// router.post("/signin", login);

module.exports = router;
