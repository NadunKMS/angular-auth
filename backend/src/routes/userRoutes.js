const express = require("express");
const { userController } = require("../controllers");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/users/signup", userController.createUser);
router.post("/users/login", userController.signInUser);
router.get("/users/all", userController.getAllUsers);
router.get("/users/profile", auth, userController.getProfile);

module.exports = router;
