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

router.post(
  "/post",
  validateBody(schemas.postCommentSchema),
  passport.authenticate("jwt", { session: false }),
  commentController.createPostComment
);

router.post(
  "/subject",
  validateBody(schemas.subjectCommentSchema),
  passport.authenticate("jwt", { session: false }),
  commentController.createSubjectComment
);

router.delete(
  "/:id/post/destroy",
  validateParam(schemas.idSchema, "id"),
  passport.authenticate("jwt", { session: false }),
  authComment(["moderator", "admin"]),
  commentController.destroyPostCommentById
);

router.delete(
  "/:id/subject/destroy",
  validateParam(schemas.idSchema, "id"),
  passport.authenticate("jwt", { session: false }),
  authComment(["moderator", "admin"]),
  commentController.destroySubjectCommentById
);

router.patch(
  "/:id/restore",
  validateParam(schemas.idSchema, "id"),
  passport.authenticate("jwt", { session: false }),
  authComment(["moderator", "admin"]),
  commentController.restoreCommentById
);

router
  .route("/:id")
  .put(
    validateParam(schemas.idSchema, "id"),
    validateBody(schemas.commentUpdateSchema),
    passport.authenticate("jwt", { session: false }),
    authComment([]),
    commentController.updateCommentById
  )
  .delete(
    validateParam(schemas.idSchema, "id"),
    passport.authenticate("jwt", { session: false }),
    authComment(["moderator", "admin"]),
    commentController.deleteCommentById
  );
  
module.exports = router;
