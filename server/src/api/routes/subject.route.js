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

// get tất cả subject theo departmentId
router.get("/department/:id", subjectController.getAllSubjectsOfDepartmentId);

router
  .route("/:id")
  .put(
    validateParam(schemas.idSchema, "id"),
    validateBody(schemas.subjectUpdateSchema),
    passport.authenticate("jwt", { session: false }),
    authRole(["admin"]),
    subjectController.updateSubjectById
  )
  // xóa vĩnh viễn subject
  .delete(
    validateParam(schemas.idSchema, "id"),
    passport.authenticate("jwt", { session: false }),
    authRole(["admin"]),
    subjectController.deleteSubjectById
  );

router
  .route("/")
  .get(subjectController.getAllSubjects)
  .post(
    validateBody(schemas.subjectSchema),
    passport.authenticate("jwt", { session: false }),
    authRole(["admin"]),
    subjectController.createSubject
  );

module.exports = router;
