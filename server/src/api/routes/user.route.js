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

router.patch(
  "/reset_password",
  validateBody(schemas.resetPasswordSchema),
  passport.authenticate("jwt", { session: false }),
  userController.resetPassword
);

router.patch(
  "/:id/role",
  validateParam(schemas.idSchema, "id"),
  validateBody(schemas.updateRoleSchema),
  passport.authenticate("jwt", { session: false }),
  authRole(["admin"]),
  userController.updateRole
);

router.patch(
  "/:id/restore",
  validateParam(schemas.idSchema, "id"),
  passport.authenticate("jwt", { session: false }),
  authRole(["moderator", "admin"]),
  userController.restoreAccount
);

router.delete(
  "/:id/destroy",
  validateParam(schemas.idSchema, "id"),
  passport.authenticate("jwt", { session: false }),
  authAccount(["admin"]),
  userController.destroyAccount
);

router.patch(
  "/:id/update_avatar",
  validateParam(schemas.idSchema, "id"),
  validateBody(schemas.updateAvatarUrl),
  passport.authenticate("jwt", { session: false }),
  authAccount(["admin"]),
  userController.updateAvatar
);

router
  .route("/:id")
  .get(
    validateParam(schemas.idSchema, "id"),
    passport.authenticate("jwt", { session: false }),
    userController.getUserById
  )
  .put(
    validateParam(schemas.idSchema, "id"),
    validateBody(schemas.userUpdateSchema),
    passport.authenticate("jwt", { session: false }),
    authAccount([]),
    userController.updateUser
  )
  .delete(
    validateParam(schemas.idSchema, "id"),
    passport.authenticate("jwt", { session: false }),
    authAccount(["moderator", "admin"]),
    userController.deleteUser
  );

router.post(
  "/create",
  validateBody(schemas.userSchema),
  passport.authenticate("jwt", { session: false }),
  authRole(["admin"]),
  userController.createUser
);

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  userController.getAllUsers
);

module.exports = router;
