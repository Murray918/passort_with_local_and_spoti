const User = require("./schema")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy

passport.use(new LocalStrategy(User.authenticate()))


passport.serializeUser(function(user, cb) {
  cb(null, user.id)
})

passport.deserializeUser(function(id, cb) {
  UserDetails.findById(id, function(err, user) {
    if (err) {
      return cb(err)
    }
    cb(null, user)
  })
})

module.exports = passport
