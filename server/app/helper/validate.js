const Joi = require('joi')

const validateBody = (schema) => {
  return (req, res, next) => {
    const result = schema.validate(req.body)

    if (result.error){
      return res.status(400).json(result.error)
    } else{
      next()
    }
  }
}

const validateParam = (schema, name) => {
  return (req, res, next) => {
    const validatorResult = schema.validate({param: req.params[name]})
    if(validatorResult.error){
      return res.status(400).json(validatorResult.error)
    } else{
      next()
    }
  }
}

const schemas = {
  authSignUpSchema: Joi.object().keys({
    fullName: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    gender: Joi.required(),
    birthday: Joi.string().min(10).max(10).required(),
    password: Joi.string().min(6).required(),
    phone: Joi.string().min(10).max(10).required(),
    address: Joi.string().min(10).required()
  }),

  
  authSignInSchema: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  }),

  idSchema: Joi.object().keys({
    param: Joi.number().required()
  }),

  userSchema: Joi.object().keys({
    fullName: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    gender: Joi.required(),
    birthday: Joi.string().min(10).max(10).required(),
    role: Joi.any().valid('user', 'moderator', 'admin'),
    password: Joi.string().min(6).required(),
    phone: Joi.string().min(10).max(10).required(),
    address: Joi.string().min(10).required()
  }),

  userOptionalSchema: Joi.object().keys({
    fullName: Joi.string().min(2),
    email: Joi.string().email(),
    birthday: Joi.string().min(10).max(10),
    role: Joi.any().valid('user', 'moderator', 'admin'),
    password: Joi.string().min(6),
    phone: Joi.string().min(10).max(10),
    address: Joi.string().min(10)
  }),
}

module.exports = {
  schemas,  
  validateParam,
  validateBody
}