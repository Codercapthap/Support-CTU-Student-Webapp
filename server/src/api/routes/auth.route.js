const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const passport = require("passport");
const passportConfig = require("../middlewares/passport");
const { validateBody, schemas } = require("../validations/validate");

router.post(
  "/register",
  validateBody(schemas.authRegisterSchema),
  authController.register
);

router.post(
  "/login",
  validateBody(schemas.authLoginSchema),
  passport.authenticate("local", { session: false }),
  authController.login
);

router.post(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  authController.logout
);

module.exports = router;
