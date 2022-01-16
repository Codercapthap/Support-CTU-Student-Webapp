const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const passport = require("passport");
const passportConfig = require("../middlewares/passport");
const { authRole, authAccount } = require("../middlewares/authorization");
const { validateBody, validateParam, schemas } = require("../helper/validate");

router
  .route("/signup")
  .post(validateBody(schemas.authSignUpSchema), userController.signup);

router
  .route("/signin")
  .post(
    validateBody(schemas.authSignInSchema),
    passport.authenticate("local", { session: false }),
    userController.signin
  );

router
  .route("/secret")
  .get(passport.authenticate("jwt", { session: false }), userController.secret);

router
  .route("/restore/:userID")
  .put(
    validateParam(schemas.idSchema, "userID"),
    passport.authenticate("jwt", { session: false }),
    authAccount(['moderator', 'admin']),
    userController.restoreAccount
  );

router
  .route("/:userID")
  .put(
    validateParam(schemas.idSchema, "userID"),
    validateBody(schemas.userOptionalSchema),
    passport.authenticate("jwt", { session: false }),
    authAccount([]),
    userController.updateUser
  )
  .patch(
    validateParam(schemas.idSchema, "userID"),
    passport.authenticate("jwt", { session: false }),
    authAccount(['moderator', 'admin']),
    userController.deleteAccount
  )
  .delete(
    validateParam(schemas.idSchema, "userID"),
    passport.authenticate("jwt", { session: false }),
    authAccount(['moderator', 'admin']),
    userController.destroyAccount
  );

router.post("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

router
  .route("/")
  .get(userController.index)
  .post(validateBody(schemas.userSchema), userController.create);

module.exports = router;
