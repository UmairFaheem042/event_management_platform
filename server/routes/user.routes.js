const express = require("express");
const router = express.Router();
const {
  signUp,
  signIn,
  signOut,
  getUser,
} = require("../controllers/user.controller");
const { userAuthenticate } = require("../middlewares/authenticate");

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/signout", signOut);

router.get("/get_user", userAuthenticate, getUser);

router.get("/check-auth", userAuthenticate, (req, res) => {
  // The user is authenticated if they passed the middleware
  res.status(200).json({
    success: true,
    message: "Authenticated",
    user: req.user,
  });
});

module.exports = router;
