const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const passport = require("passport");
const passportConfig = require("../middlewares/passport");
const { authAccount, authPost } = require("../middlewares/authorization");
const {
  validateBody,
  schemas,
  validateParam,
} = require("../validations/validate");

router
  .route("/")
  .get(postController.getAllPosts)
  .post(
    validateBody(schemas.postSchema),
    passport.authenticate("jwt", { session: false }),
    postController.createPost
  );

router
  .route("/:id")
  .get(postController.getPostById)
  .put(
    validateParam("id", schemas.idSchema),
    validateBody(schemas.postSchema),
    passport.authenticate("jwt", { session: false }),
    authPost(["moderator", "admin"]),
    postController.updatePostById
  )
  .delete(
    validateParam("id", schemas.idSchema),
    passport.authenticate("jwt", { session: false }),
    authPost(["moderator", "admin"]),
    postController.deletePostById
  );

router.get("/user/:id", postController.getAllPostsOfUserId);
router.get("/topic/:id", postController.getAllPostsOfTopicId);
router.get("/department/:id", postController.getAllPostsOfDepartmentId);
router.delete(
  "/:id/destroy",
  validateParam("id", schemas.idSchema),
  passport.authenticate("jwt", { session: false }),
  authPost(["moderator", "admin"]),
  postController.destroyPostById
);

router.put(
  "/:id/restore",
  validateParam("id", schemas.idSchema),
  passport.authenticate("jwt", { session: false }),
  authPost(["moderator", "admin"]),
  postController.restorePostById
);

router.put(
  "/:id/accept",
  validateParam("id", schemas.idSchema),
  passport.authenticate("jwt", { session: false }),
  authPost(["moderator", "admin"]),
  postController.acceptPostById
);


module.exports = router;
