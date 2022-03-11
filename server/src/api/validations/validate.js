const Joi = require('joi');

const validateBody = schema => {
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
      departmentId: Joi.array().min(1).required(),
      email: Joi.string().email().required(),
      gender: Joi.required(),
      birthday: Joi.string().min(10).max(10).required(),
      password: Joi.string().min(6).required(),
      phone: Joi.string().min(10).max(10).required(),
      avatarUrl: Joi.any().allow(null),
      address: Joi.string().min(10).required()
   }),

   authLoginSchema: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required()
   }),

   idSchema: Joi.object().keys({
      param: Joi.number().required()
   }),

   userSchema: Joi.object().keys({
      username: Joi.string().min(2).required(),
      departmentId: Joi.array().min(1).required(),
      email: Joi.string().email().required(),
      gender: Joi.boolean().required(),
      birthday: Joi.string().min(10).max(10).required(),
      role: Joi.any().valid('user', 'moderator', 'admin'),
      avatarUrl: Joi.string().allow(null),
      password: Joi.string().min(6).required(),
      phone: Joi.string().min(10).max(10).required(),
      address: Joi.string().min(10).required()
   }),

   userUpdateSchema: Joi.object().keys({
      username: Joi.string().min(2).required(),
      departmentId: Joi.array().min(1).required(),
      email: Joi.string().email().required(),
      gender: Joi.boolean().required(),
      birthday: Joi.string().min(10).max(10).required(),
      avatarUrl: Joi.string().allow(null),
      phone: Joi.string().min(10).max(10).required(),
      address: Joi.string().min(10).required()
   }),

   resetPasswordSchema: Joi.object().keys({
      oldPassword: Joi.string().min(6).required(),
      password: Joi.string().min(6).required()
   }),

   updateRoleSchema: Joi.object().keys({
      role: Joi.any().valid('user', 'moderator', 'admin').required()
   }),

   updateAvatarUrl: Joi.object().keys({
      avatarUrl: Joi.string().required()
   }),

   postCommentSchema: Joi.object().keys({
      postId: Joi.number().required(),
      commentContent: Joi.string().min(2).required()
   }),

   subjectCommentSchema: Joi.object().keys({
      subjectId: Joi.number().required(),
      commentContent: Joi.string().min(2).required()
   }),

   commentUpdateSchema: Joi.object().keys({
      commentContent: Joi.string().min(2).required()
   }),

   departmentSchema: Joi.object().keys({
      departmentCode: Joi.string().min(2).max(2).required(),
      departmentName: Joi.string().min(2).required()
   }),

   documentSchema: Joi.object().keys({
      departmentId: Joi.number().required(),
      documentName: Joi.string().min(2).required(),
      documentUrl: Joi.string().min(10).required()
   }),

   subjectSchema: Joi.object().keys({
      departmentId: Joi.number().required(),
      subjectName: Joi.string().min(2).required(),
      subjectCode: Joi.string().min(5).max(5).required()
   }),

   subjectUpdateSchema: Joi.object().keys({
      subjectName: Joi.string().min(2).required(),
      subjectCode: Joi.string().min(5).max(5).required()
   }),

   postSchema: Joi.object().keys({
      topicId: Joi.number().required(),
      postTitle: Joi.string().min(2).required(),
      postContent: Joi.string().min(10).required()
   }),

   postUpdateSchema: Joi.object().keys({
      postTitle: Joi.string().min(2).required(),
      postContent: Joi.string().min(10).required()
   }),

   topicSchema: Joi.object().keys({
      departmentId: Joi.number().required(),
      topicName: Joi.string().min(2).required(),
      topicDescription: Joi.string().min(10).required()
   }),

   topicUpdateSchema: Joi.object().keys({
      topicName: Joi.string().min(2).required(),
      topicDescription: Joi.string().min(10).required()
   }),

   userSubjectSchema: Joi.object().keys({
      subjectId: Joi.number().required(),
      subjectScore: Joi.number()
   }),

   userSubjectUpdateSchema: Joi.object().keys({
      subjectScore: Joi.number()
   })
};

module.exports = {
   schemas,
   validateParam,
   validateBody
};
