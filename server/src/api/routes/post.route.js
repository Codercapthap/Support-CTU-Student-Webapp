const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const passport = require("passport");
const passportConfig = require("../middlewares/passport");
const { authAccount, authComment } = require("../middlewares/authorization");
const {
  validateBody,
  schemas,
  validateParam,
} = require("../validations/validate");

module.exports = router;