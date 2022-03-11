require('dotenv').config();

module.exports = {
   secret: process.env.SECRET_KEY || 'ct466-secret-key'
};

/**
 * Các hàm jsonwebtoken như: verify(),  sign() sẽ cần tới
 * một secret key để encode hay decode chuỗi token.
 */
