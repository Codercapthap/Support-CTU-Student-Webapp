module.exports = {
  secret: process.env.SECRET,
};

/**
 * Các hàm jsonwebtoken như: verify(),  sign() sẽ cần tới
 * một secret key để encode hay decode chuỗi token.
 */
