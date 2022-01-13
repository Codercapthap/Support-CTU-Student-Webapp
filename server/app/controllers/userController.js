const User = require('../models/user')
const authConfig = require('../config/auth.config')

const JWT = require('jsonwebtoken')

const encodedToken = (userID) => {
  return JWT.sign({
    iss: 'Akiko',
    sub: userID,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 3)
  }, authConfig.secret)
}

class userController {
  async index (req, res, next) {
    try{
      const users = await User.all()
      return res.status(200).json({users})
    } catch(error) { next(error) }
  }

  async create(req, res, next) {
    try{
      //check email
      const { fullName, gender, birthday, email, password, phone, role, address } = req.body
      const foundUser = await User.findOne('email', email)
      if (foundUser) return res.status(403).json({ error: { message: "email is already exits" } })

      //save user
      const newUser = new User({ fullName, gender, birthday, email, password, phone, role, address })
      newUser.userID = (await newUser.save()).insertId

      return res.status(201).json({user: newUser})
    } catch(error) { next(error) }
  }

  async signin(req, res, next) {
    const token = encodedToken(req.user.userID)
    res.setHeader('Authorization', token)
    return res.status(200).json({ success: true })
  }

  async signup(req, res, next) {
    try {
      const { fullName, gender, birthday, email, password, phone, address } = req.body
      // check email
      const foundUser = await User.findOne('email', email)
      if (foundUser) return res.status(403).json({ error: { message: "email is already exits" } })

      // save user
      var newUser = new User({ fullName, gender, birthday, email, password, phone, address })
      newUser.userID = (await newUser.save()).insertId

      //encode token
      const token = encodedToken(newUser.userID)
      res.setHeader('Authorization', token)
      return res.status(200).json({sucess: true})
    } catch(err) { next(err) }
  }

  async deleteAccount(req, res, next) {
    try {
      const userID = req.params.userID
      User.deleteOneById(userID)
      return res.status(200).json({success: true})
    } catch(err) { next(err) }
  }

  async restoreAccount(req, res, next) {
    try {
      const userID = req.params.userID
      User.restoreOneById(userID)
      return res.status(200).json({success: true})
    } catch(err) { next(err) }
  }

  async destroyAccount(req, res, next) {
    try {
      const userID = req.params.userID
      User.destroyOneById(userID)
      return res.status(200).json({success: true})
    } catch(err) { next(err) }
  }


  async updateUser(req, res, next){
    try{
      const { userID } = req.params
      const newUser = req.body
      const result = await User.findOneAndUpdate(userID, newUser)
      return res.status(200).json({ success: true })
    } catch(err) { next(err) }
  }

  async secret(req, res, next) {
    try{
      return res.status(200).json("something secret here")
    }
    catch (err) { next(err) }
  }
}

module.exports = new userController()