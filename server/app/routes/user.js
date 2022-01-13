const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const passport = require('passport')
const passportConfig = require('../middlewares/passport')
const { validateBody, validateParam, schemas } = require('../helper/validate')

router.route('/signup')
  .post(validateBody(schemas.authSignUpSchema), userController.signup)

router.route('/signin')
  .post(validateBody(schemas.authSignInSchema), passport.authenticate('local', { session: false }), userController.signin)

router.route('/secret')
  .get(passport.authenticate('jwt', { session: false }), userController.secret)

router.route('/restore/:userID')
  .put(validateParam(schemas.idSchema, 'userID'), userController.restoreAccount)

router.route('/:userID')
  .put(validateParam(schemas.idSchema, 'userID'), userController.updateUser)
  .patch(validateParam(schemas.idSchema, 'userID'), userController.deleteAccount)
  .delete(validateParam(schemas.idSchema, 'userID'), userController.destroyAccount)

router.route('/')
  .get(userController.index)
  .post(validateBody(schemas.userSchema), userController.create)

module.exports = router