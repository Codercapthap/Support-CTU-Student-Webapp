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

// get tất cả comment của post
router.get(
  "/post/:id",
  validateParam(schemas.idSchema, "id"),
  commentController.getAllCommentsOfPostId
);

// get tất cả comment của subject
router.get(
  "/subject/:id",
  validateParam(schemas.idSchema, "id"),
  commentController.getAllCommentsOfSubjectId
);

// tạo comment trong post
router.post(
  "/post",
  validateBody(schemas.postCommentSchema),
  passport.authenticate("jwt", { session: false }),
  commentController.createPostComment
);

// tạo comment trong subject
router.post(
  "/subject",
  validateBody(schemas.subjectCommentSchema),
  passport.authenticate("jwt", { session: false }),
  commentController.createSubjectComment
);

// xóa vĩnh viễn comment theo post id
router.delete(
  "/:id/post/destroy",
  validateParam(schemas.idSchema, "id"),
  passport.authenticate("jwt", { session: false }),
  authComment(["moderator", "admin"]),
  commentController.destroyPostCommentById
);

// xóa vĩnh viễn comment theo subject id
router.delete(
  "/:id/subject/destroy",
  validateParam(schemas.idSchema, "id"),
  passport.authenticate("jwt", { session: false }),
  authComment(["moderator", "admin"]),
  commentController.destroySubjectCommentById
);

// khôi phục comment theo subject id
router.patch(
  "/:id/restore",
  validateParam(schemas.idSchema, "id"),
  passport.authenticate("jwt", { session: false }),
  authComment(["moderator", "admin"]),
  commentController.restoreCommentById
);

router
  .route("/:id")
  // cập nhật comment theo id comment
  .put(
    validateParam(schemas.idSchema, "id"),
    validateBody(schemas.commentUpdateSchema),
    passport.authenticate("jwt", { session: false }),
    authComment([]),
    commentController.updateCommentById
  )
  // xóa mềm comment theo id comment
  .delete(
    validateParam(schemas.idSchema, "id"),
    passport.authenticate("jwt", { session: false }),
    authComment(["moderator", "admin"]),
    commentController.deleteCommentById
  );

module.exports = router;
