const express = require("express");
const router = express.Router();
const userSubjectController = require("../controllers/userSubjectController");
const passport = require("passport");
const passportConfig = require("../middlewares/passport");
const {
  authRole,
  authUserSubject,
  authAccount,
} = require("../middlewares/authorization");
const {
  validateBody,
  schemas,
  validateParam,
} = require("../validations/validate");

router.get(
  "/user/:id",
  validateParam(schemas.idSchema, "id"),
  passport.authenticate("jwt", { session: false }),
  authAccount(["admin"]),
  userSubjectController.getAllUserSubjectsOfUserId
);

router
  .route("/subject/:id")
  .get(
    validateParam(schemas.idSchema, "id"),
    passport.authenticate("jwt", { session: false }),
    authRole(["admin"]),
    userSubjectController.getAllUserSubjectsOfSubjectId
  )
  .put(
    validateParam(schemas.idSchema, "id"),
    validateBody(schemas.userSubjectUpdateSchema),
    passport.authenticate("jwt", { session: false }),
    userSubjectController.updateUserSubjectById
  )
  .delete(
    validateParam(schemas.idSchema, "id"),
    passport.authenticate("jwt", { session: false }),
    userSubjectController.destroyUserSubject
  );

router
  .route("/")
  .post(
    validateBody(schemas.userSubjectSchema),
    passport.authenticate("jwt", { session: false }),
    userSubjectController.createUserSubject
  )

module.exports = router;
