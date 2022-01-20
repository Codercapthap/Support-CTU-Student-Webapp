const Joi = require("joi");

const validateBody = (schema) => {
  return (req, res, next) => {
    const result = schema.validate(req.body);
    if (result.error) {
      return res.status(400).json(result.error);
    } else {
      next();
    }
  };
};

const validateParam = (schema, name) => {
  return (req, res, next) => {
    const validatorResult = schema.validate({ param: req.params[name] });
    if (validatorResult.error) {
      return res.status(400).json(validatorResult.error);
    } else {
      next();
    }
  };
};

const schemas = {
  authRegisterSchema: Joi.object().keys({
    username: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    gender: Joi.required(),
    birthday: Joi.string().min(10).max(10).required(),
    password: Joi.string().min(6).required(),
    phone: Joi.string().min(10).max(10).required(),
    address: Joi.string().min(10).required(),
  }),

  authLoginSchema: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),

  idSchema: Joi.object().keys({
    param: Joi.number().required(),
  }),

  userSchema: Joi.object().keys({
    username: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    gender: Joi.boolean().required(),
    birthday: Joi.string().min(10).max(10).required(),
    role: Joi.any().valid("user", "moderator", "admin"),
    password: Joi.string().min(6).required(),
    phone: Joi.string().min(10).max(10).required(),
    address: Joi.string().min(10).required(),
  }),

  commentSchema: Joi.alternatives().try(
    Joi.object().keys({
      postId: Joi.number().allow(null),
      subjectId: Joi.number().required(),
      commentContent: Joi.string().min(2).required(),
    }),
    Joi.object().keys({
      postId: Joi.number().required(),
      subjectId: Joi.number().allow(null),
      commentContent: Joi.string().min(2).required(),
    }),
  ),

  commentUpdateSchema: Joi.object().keys({
    commentContent: Joi.string().min(2).required(),
  }),

  departmentSchema: Joi.object().keys({
    departmentCode: Joi.string().min(2).max(2).required(),
    departmentName: Joi.string().min(2).required()
  })
};

module.exports = {
  schemas,
  validateParam,
  validateBody,
};
