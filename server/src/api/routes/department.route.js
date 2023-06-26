const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');
const passport = require('passport');
const passportConfig = require('../middlewares/passport');
const { authRole } = require('../middlewares/authorization');
const { validateBody, schemas, validateParam } = require('../validations/validate');

router
   .route('/:id')
   .get(validateParam(schemas.idSchema, 'id'), departmentController.getDepartmentById)
   .put(
      validateParam(schemas.idSchema, 'id'),
      validateBody(schemas.departmentSchema),
      passport.authenticate('jwt', { session: false }),
      authRole(['admin']),
      departmentController.updateDepartment
   )
   .delete(
      validateParam(schemas.idSchema, 'id'),
      passport.authenticate('jwt', { session: false }),
      authRole(['admin']),
      departmentController.destroyDepartment
   );

router
   .route('/')
   .get(departmentController.getAllDepartments)
   .post(
      validateBody(schemas.departmentSchema),
      passport.authenticate('jwt', { session: false }),
      authRole(['admin']),
      departmentController.createDepartment
   );

module.exports = router;
