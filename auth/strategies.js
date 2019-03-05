const User = require("./schema")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
console.log("hello strategy")

passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password"
    },
    (username, password, done) => {
      console.log(username, password)
      User.findOne({ username })
        .select({ salt: 1, password: 1, username: 1 })
        .then((user) => {
          if (!user || !user.validatePassword(password)) {
            return done(null, false, {
              errors: { "email or password": "is invalid" }
            })
          }
          return done(null, user)
        })
        .catch(done)
    }
  )
)

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
