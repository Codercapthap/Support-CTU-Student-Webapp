const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.config.js');
const db = require('../models/index.model');

const User = db.user;
const Role = db.role;

const verifyToken = (req, res, next) => {
   let token = req.headers['x-access-token']; //? add x-access-token in header client
   // let token = req.headers['authorization']; //? add x-access-token in header client
   console.log('token server: ', token);
   if (!token) {
      return res.status(403).send({ message: 'No token provided!' });
   }

   jwt.verify(token, authConfig.secret, (err, decoded) => {
      if (err) {
         return res.status(401).send({ message: 'Unauthorized!' });
      }

      req.userId = decoded.id;
      next();
   });
};

const isAdmin = async (req, res, next) => {
   User.findById(req.userId).exec((err, user) => {
      if (err) {
         res.status(500).send({ message: err });
         return;
      }
      // kiểm tra quyên hợp lệ hay không
      Role.find(
         {
            _id: { $in: user.roles }
         },
         (err, roles) => {
            if (err) {
               res.status(500).send({ message: err });
               return;
            }
            for (let i = 0; i < roles.length; i++) {
               if (roles[i].name === 'admin') {
                  // nếu có quyền admin thì đi tiếp
                  next();
                  return;
               }
            }
            res.status(403).send({ message: 'Require Admin Role!' });
            return;
         }
      );
   });
};

const isModerator = async (req, res, next) => {
   User.findById(req.userId).exec((err, user) => {
      if (err) {
         res.status(500).send({ message: err });
         return;
      }
      Role.find(
         {
            _id: { $in: user.roles }
         },
         (err, roles) => {
            if (err) {
               res.status(500).send({ message: err });
               return;
            }
            for (let i = 0; i < roles.length; i++) {
               if (roles[i].name === 'moderator') {
                  next();
                  return;
               }
            }
            res.status(403).send({ message: 'Require Moderator Role!' });
            return;
         }
      );
   });
};

const authJwt = {
   verifyToken,
   isAdmin,
   isModerator
};

module.exports = authJwt;
