
const express = require("express");

const router = express.Router();

const {
    register,
    login,
    forgetPassowrd,
    resetPassword,
  } = require("../controllers/auth.js");
  

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/forgetPassword").post(forgetPassowrd);

router.route("/resetPassword/:resetToken").put(resetPassword);

module.exports = router;
