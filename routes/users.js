const router = require("express").Router();
const {getCurrentUser, updateProfile} = require("../controllers/users");

// router.get("/", getUsers);
router.get("/me", getCurrentUser);
router.patch("/me", updateProfile);
// router.post("/", createUser);
// router.post("/signin", login);

module.exports = router;
