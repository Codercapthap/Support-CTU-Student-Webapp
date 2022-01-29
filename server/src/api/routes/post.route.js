const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const passport = require("passport");
const passportConfig = require("../middlewares/passport");
const { authPost, authRole } = require("../middlewares/authorization");
const {
  validateBody,
  schemas,
  validateParam,
} = require("../validations/validate");

router.get("/user/:id", postController.getAllPostsOfUserId);

router.get("/topic/:id", postController.getAllPostsOfTopicId);

router.get("/department/:id", postController.getAllPostsOfDepartmentId);

router.get("/accepted/", postController.getAllAcceptedPosts);

router.get(
  "/unaccepted/",
  passport.authenticate("jwt", { session: false }),
  authRole(["moderator", "admin"]),
  postController.getAllUnAcceptedPosts
);

router.delete(
  "/:id/destroy",
  validateParam(schemas.idSchema, "id"),
  passport.authenticate("jwt", { session: false }),
  authPost(["moderator", "admin"]),
  postController.destroyPostById
);

router.patch(
  "/:id/restore",
  validateParam(schemas.idSchema, "id"),
  passport.authenticate("jwt", { session: false }),
  authPost(["moderator", "admin"]),
  postController.restorePostById
);

router.patch(
  "/:id/accept",
  validateParam(schemas.idSchema, "id"),
  passport.authenticate("jwt", { session: false }),
  authPost(["moderator", "admin"]),
  postController.acceptPostById
);

router
  .route("/:id")
  .get(postController.getPostById)
  .put(
    validateParam(schemas.idSchema, "id"),
    validateBody(schemas.postUpdateSchema),
    passport.authenticate("jwt", { session: false }),
    authPost(["moderator", "admin"]),
    postController.updatePostById
  )
  .delete(
    validateParam(schemas.idSchema, "id"),
    passport.authenticate("jwt", { session: false }),
    authPost(["moderator", "admin"]),
    postController.deletePostById
  );

router
  .route("/")
  .get(postController.getAllPosts)
  .post(
    validateBody(schemas.postSchema),
    passport.authenticate("jwt", { session: false }),
    postController.createPost
  );

module.exports = router;
