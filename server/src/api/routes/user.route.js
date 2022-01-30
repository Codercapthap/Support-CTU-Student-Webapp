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

// get tất cả user theo department id
router.get(
  "/department/:id",
  validateParam(schemas.idSchema, "id"),
  passport.authenticate("jwt", { session: false }),
  userController.getAllUsersOfDepartmentId
);

// reset password
router.patch(
  "/reset_password",
  validateBody(schemas.resetPasswordSchema),
  passport.authenticate("jwt", { session: false }),
  userController.resetPassword
);

// chỉnh sửa role user
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

// xóa vĩnh viễn user
router.delete(
  "/:id/destroy",
  validateParam(schemas.idSchema, "id"),
  passport.authenticate("jwt", { session: false }),
  authAccount(["admin"]),
  userController.destroyAccount
);

// cập nhật avatar url user
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

router
  .route("/")
  .get(
    passport.authenticate("jwt", { session: false }),
    userController.getAllUsers
  )
  .put(
    validateBody(schemas.userUpdateSchema),
    passport.authenticate("jwt", { session: false }),
    userController.updateUser
  );

module.exports = router;
