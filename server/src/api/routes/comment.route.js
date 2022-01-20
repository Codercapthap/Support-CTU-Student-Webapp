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

router.get(
  "/post/:id",
  validateParam(schemas.idSchema, "id"),
  commentController.getAllCommentsOfPostId
);

router.get(
  "/subject/:id",
  validateParam(schemas.idSchema, "id"),
  commentController.getAllCommentsOfSubjectId
);

router.delete(
  "/:id/destroy",
  validateParam(schemas.idSchema, "id"),
  passport.authenticate("jwt", { session: false }),
  authComment(["moderator", "admin"]),
  commentController.destroyCommentById
);

router
  .route("/:id")
  .put(
    validateParam(schemas.idSchema, "id"),
    validateBody(schemas.commentUpdateSchema),
    passport.authenticate("jwt", { session: false }),
    authComment(["moderator", "admin"]),
    commentController.updateCommentById
  )
  .delete(
    validateParam(schemas.idSchema, "id"),
    passport.authenticate("jwt", { session: false }),
    authComment(["moderator", "admin"]),
    commentController.deleteCommentById
  );

//? check commment
router.post(
  "/",
  validateBody(schemas.commentSchema),
  passport.authenticate("jwt", { session: false }),
  commentController.createComment
);

module.exports = router;
