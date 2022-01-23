const express = require("express");
const router = express.Router();
const topicController = require("../controllers/topicController");
const passport = require("passport");
const passportConfig = require("../middlewares/passport");
const { authRole } = require("../middlewares/authorization");
const {
  validateBody,
  schemas,
  validateParam,
} = require("../validations/validate");

router.get("/department/:id", topicController.getAllTopicsOfDepartmentId);

router
  .route("/:id")
  .put(
    validateParam("id", schemas.idSchema),
    validateBody(schemas.topicSchema),
    passport.authenticate("jwt", { session: false }),
    authRole(["moderator", "admin"]),
    topicController.updateTopicById
  )
  .delete(
    validateParam("id", schemas.idSchema),
    passport.authenticate("jwt", { session: false }),
    authRole(["moderator", "admin"]),
    topicController.deleteTopicById
  );

router.post(
  "/",
  validateParam("id", schemas.idSchema),
  validateBody(schemas.topicSchema),
  passport.authenticate("jwt", { session: false }),
  authRole(["moderator", "admin"]),
  topicController.createTopic
);

router.delete(
  "/:id/destroy",
  validateParam("id", schemas.idSchema),
  passport.authenticate("jwt", { session: false }),
  authPost(["moderator", "admin"]),
  topicController.destroyTopicById
);

router.put(
  "/:id/restore",
  validateParam("id", schemas.idSchema),
  passport.authenticate("jwt", { session: false }),
  authPost(["moderator", "admin"]),
  topicController.restoreTopicById
);

module.exports = router;
