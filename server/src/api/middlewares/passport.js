const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;
const User = require("../services/user");
const authConfig = require("../../config/auth.config");

// authentication bằng token
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("Authorization"),
      secretOrKey: authConfig.secret,
    },
    async (payload, done) => {
      try {
        var user = await User.findOne("id", payload.sub);
        if (!user) return done(null, false);
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

// authentication bằng username, password
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        // tạo object user để chứa những thông tin user tìm được theo username, password
        var userObject = await User.findOne("email", email);
        if (!userObject) return done(null, false);

        // tạo 1 đối tượng user để sử dụng hàm check password
        const user = new User(userObject);
        const isCorrectPassword = await user.isValidPassword(password);
        if (!isCorrectPassword) return done(null, false);

        // trả về object user để có đủ thông tin cần thiết
        return done(null, userObject);
      } catch (error) {
        done(error, false);
      }
    }
  )
);
