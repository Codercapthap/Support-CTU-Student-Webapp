const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const authConfig = require('../config/auth.config')

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
  secretOrKey: authConfig.secret
}, async (payload, done) => {
  try{
    console.log(payload);
    const user = await User.findOne('userID', payload.sub)
    if(!user) return done(null, false)
    done(null, user)
  } catch(error){
    done(error, false)
  }
}))

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    var user = (await User.findOne('email', email))[0]
    if (!user) return done(null, false)
    user = new User(user)
    const isCorrectPassword = user.isValidPassword(password)
    if (!isCorrectPassword) return done(null, false)
  
    return done(null, user)
  } catch(error) {
    done(error, false)
  }
}))