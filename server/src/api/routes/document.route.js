const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const passport = require('passport');
const passportConfig = require('../middlewares/passport');
const { authRole } = require('../middlewares/authorization');
const { validateBody, schemas, validateParam } = require('../validations/validate');

// get danh sách document theo department id
router.get(
   '/department/:id',
   validateParam(schemas.idSchema, 'id'),
   documentController.getAllDocumentsOfDepartmentId
);

// get danh sách document theo user id
router.get(
   '/user/:id',
   validateParam(schemas.idSchema, 'id'),
   documentController.getAllDocumentsOfUserId
);

router
   .route('/:id')
   .put(
      validateParam(schemas.idSchema, 'id'),
      validateBody(schemas.documentSchema),
      passport.authenticate('jwt', { session: false }),
      authRole(['moderator', 'admin']),
      documentController.updateDocumentById
   )
   .delete(
      validateParam(schemas.idSchema, 'id'),
      passport.authenticate('jwt', { session: false }),
      authRole(['moderator', 'admin']),
      documentController.destroyDocumentById
   );

router.post(
   '/',
   validateBody(schemas.documentSchema),
   passport.authenticate('jwt', { session: false }),
   authRole(['moderator', 'admin']),
   documentController.createDocument
);

module.exports = router;
