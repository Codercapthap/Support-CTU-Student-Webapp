const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const passport = require('passport');
const passportConfig = require('../middlewares/passport');
const { authPost, authRole } = require('../middlewares/authorization');
const { validateBody, schemas, validateParam } = require('../validations/validate');

// get danh sách post theo user id
router.get('/user/:id', postController.getAllPostsOfUserId);

// get danh sách post theo topic id
router.get('/topic/:id', postController.getAllPostsOfTopicId);

// get danh sách post theo department id
router.get('/department/:id', postController.getAllPostsOfDepartmentId);

// get danh sách post đã accept
router.get('/accepted/', postController.getAllAcceptedPosts);

// get danh sách post chưa accept
router.get(
   '/unaccepted/',
   passport.authenticate('jwt', { session: false }),
   authRole(['moderator', 'admin']),
   postController.getAllUnAcceptedPosts
);

// xóa vĩnh viễn post
router.delete(
   '/:id/destroy',
   validateParam(schemas.idSchema, 'id'),
   passport.authenticate('jwt', { session: false }),
   authPost(['moderator', 'admin']),
   postController.destroyPostById
);

router.patch(
   '/:id/restore',
   validateParam(schemas.idSchema, 'id'),
   passport.authenticate('jwt', { session: false }),
   authPost(['moderator', 'admin']),
   postController.restorePostById
);

// accept post
router.patch(
   '/:id/accept',
   validateParam(schemas.idSchema, 'id'),
   passport.authenticate('jwt', { session: false }),
   authPost(['moderator', 'admin']),
   postController.acceptPostById
);

router
   .route('/:id')
   .get(validateParam(schemas.idSchema, 'id'), postController.getPostById)
   .put(
      validateParam(schemas.idSchema, 'id'),
      validateBody(schemas.postUpdateSchema),
      passport.authenticate('jwt', { session: false }),
      authPost(['moderator', 'admin']),
      postController.updatePostById
   )
   // xóa mềm post
   .delete(
      validateParam(schemas.idSchema, 'id'),
      passport.authenticate('jwt', { session: false }),
      authPost(['moderator', 'admin']),
      postController.deletePostById
   );

router
   .route('/')
   // get tất cả post
   .get(postController.getAllPosts)
   .post(
      validateBody(schemas.postSchema),
      passport.authenticate('jwt', { session: false }),
      postController.createPost
   );

module.exports = router;
