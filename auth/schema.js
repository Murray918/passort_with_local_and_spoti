const mongoose = require("mongoose")
const { Schema } = mongoose
const passportLocalMongoose = require("passport-local-mongoose")

const userDetail = new Schema(
  {
    username: String,
    password: String,
    updated: { type: Date, default: Date.now },
    created_at: Date,
    salt: String
  },
  { collection: "userInfo" }
)

userDetail.pre("save", function(next) {
  //explicitly set this to user
  const user = this
  if (!user.isModified("password")) return next()
  this.setPassword(user.password).then((result) => {
    user.password = result.hash
    user.hash = result.hash
    user.salt = result.salt
    user.hash = result.hash
    next()
  })
})

userDetail.plugin(passportLocalMongoose)

  module.exports = mongoose.model("userInfo", userDetail)
  