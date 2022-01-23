const express = require("express");
const router = express.Router();
const subjectController = require("../controllers/subjectController");
const passport = require("passport");
const passportConfig = require("../middlewares/passport");
const { authRole } = require("../middlewares/authorization");
const {
  validateBody,
  schemas,
  validateParam,
} = require("../validations/validate");

router('/department/:id', subjectController.getAllSubjectsOfDepartmentId)

router
  .route("/:id")
  .put(
    validateParam("id", schemas.idSchema),
    validateBody(schemas.subjectSchema),
    passport.authenticate("jwt", { session: false }),
    authRole(["moderator", "admin"]),
    subjectController.updateSubjectById
  )
  .delete(
    validateParam("id", schemas.idSchema),
    passport.authenticate("jwt", { session: false }),
    authRole(["moderator", "admin"]),
    subjectController.deleteSubjectById
  );

router
  .route("/")
  .get(subjectController.getAllSubjects)
  .post(
    validateBody(schemas.subjectSchema),
    passport.authenticate("jwt", { session: false }),
    authRole(["moderator", "admin"]),
    subjectController.createSubject
  );

module.exports = router;
