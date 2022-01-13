const db = require('../models/index.model');

const ROLES = db.ROLES;
const User = db.user;

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
   //todo check Username
   User.findOne({
      username: req.body.username
   }).exec((err, user) => {
      if (err) {
         res.status(500).send({ message: err });
         return;
      }
      if (user) {
         res.status(400).send({ message: 'Username is already in use!' });
         return;
      }
      //todo check Email before check Username
      User.findOne({
         email: req.body.email
      }).exec((err, user) => {
         if (err) {
            res.status(500).send({ message: err });
            return;
         }
         if (user) {
            res.status(400).send({ message: 'Email is already in use!' });
            return;
         }
         next();
      });
   });
};

const checkRolesExisted = (req, res, next) => {
   // console.log(ROLES, req.body.roles);
   const roles = req.body.roles;
   if (roles) {
      if (Array.isArray(roles)) {
         console.log('in array');
         // th user được trao nhieu quyền (= array)
         for (let i = 0; i < roles.length; i++) {
            if (!ROLES.includes(roles[i])) {
               // console.log(i, roles[i]);
               res.status(400).send({
                  message: `In Array! Role ${roles[i]} does not exist!`
               });
               return;
            }
         }
      } else if (typeof roles === 'string') {
         console.log('in string');
         // th user chi co mot quyen (= string)
         if (!ROLES.includes(roles)) {
            // console.log(i, roles); //0 a (loi nho doi)
            res.status(400).send({
               message: `With string! Role ${roles} does not exist!`
            });
            return;
         }
      }
   }
   // nếu không có thì mặc định là user
   next();
};

const verifySignUp = {
   checkDuplicateUsernameOrEmail,
   checkRolesExisted
};

module.exports = verifySignUp;
