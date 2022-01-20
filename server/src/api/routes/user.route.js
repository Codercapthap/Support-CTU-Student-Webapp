const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const passport = require("passport");
const passportConfig = require("../middlewares/passport");
const { authRole, authAccount } = require("../middlewares/authorization");
const {
  validateBody,
  validateParam,
  schemas,
} = require("../validations/validate");

router.get(
  "/department/:id",
  passport.authenticate("jwt", { session: false }),
  userController.getAllUsersOfDepartmentId
);

// router.put(
//   "/restore/:id",
//   validateParam(schemas.idSchema, "id"),
//   passport.authenticate("jwt", { session: false }),
//   // authAccount(["moderator", "admin"]),
//   authRole(["moderator", "admin"]),
//   userController.restoreAccount
// );

// router.post('/reset_password', auth, userController.resetPassword)

router
  .route("/:id")
  .get(
    validateParam(schemas.idSchema, "id"),
    passport.authenticate("jwt", { session: false }),
    userController.getUserById
  )
  .put(
    validateParam(schemas.idSchema, "id"),
    validateBody(schemas.userSchema),
    passport.authenticate("jwt", { session: false }),
    authAccount([]),
    userController.updateUser
  );
// delete post, comment
// .delete(
//   validateParam(schemas.idSchema, "userID"),
//   passport.authenticate("jwt", { session: false }),
//   authAccount(["moderator", "admin"]),
//   userController.deleteUser
// );

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  userController.getAllUsers
);

// router
// .route("/:userID")
// .put(
//   validateParam(schemas.idSchema, "userID"),
//   validateBody(schemas.userOptionalSchema),
//   passport.authenticate("jwt", { session: false }),
//   authAccount([]),
//   userController.updateUser
// )
// .patch(
//   validateParam(schemas.idSchema, "userID"),
//   passport.authenticate("jwt", { session: false }),
//   authAccount(["moderator", "admin"]),
//   userController.deleteAccount
// )
// .delete(
//   validateParam(schemas.idSchema, "userID"),
//   passport.authenticate("jwt", { session: false }),
//   authAccount(["moderator", "admin"]),
//   userController.destroyAccount
// );

router.post(
  "/create",
  validateBody(schemas.userSchema),
  userController.createUser
);

module.exports = router;
