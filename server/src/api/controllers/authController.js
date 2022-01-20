const User = require('../services/user')
const authConfig = require('../../config/auth.config')

const JWT = require('jsonwebtoken')

const encodedToken = (id) => {
  return JWT.sign({
    iss: 'Akiko',
    sub: id,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 0)
  }, authConfig.secret)
}

class userController {
  async login(req, res, next) {
    try {
      const token = encodedToken(req.user.id)
      res.setHeader('Authorization', token)
      // return res.status(200).json(req.user)
      return res.status(200).json({ authenticated: req.isAuthenticated() })
    } catch(error) { next(error) }
  }

  async register(req, res, next) {
    try {
      const { username, gender, birthday, email, password, phone, address } = req.body
      // check email
      const foundUser = await User.findOne('email', email)
      if (foundUser) return res.status(403).json({ error: { message: "email is already exits" } })

      // save user
      var newUser = new User({ username, gender, birthday, email, password, phone, address })
      newUser.id = (await newUser.save()).insertId

      //encode token
      const token = encodedToken(newUser.id)
      res.setHeader('Authorization', token)
      return res.status(200).json(newUser)
    } catch(err) { next(err) }
  }

  //chưa hoàn thiện
  logout(req, res, next) {
    try{
      req.logOut();
      res.status(200).json({ authenticated: req.isAuthenticated() })
    } catch(err) { next(err) }
  }
}

module.exports = new userController()