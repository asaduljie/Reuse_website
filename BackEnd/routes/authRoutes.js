const express = require("express");
const router = express.Router();

const verifyToken =
require("../middleware/authMiddleware");

const {
  testAuth,
  register,
  login,
  profile
} = require("../controllers/authControllers");

router.get("/test", testAuth);

router.post("/register", register);

router.post("/login", login);

router.get(
  "/profile",
  verifyToken,
  profile
);

module.exports = router;