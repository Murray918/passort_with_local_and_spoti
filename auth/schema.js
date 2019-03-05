const crypto = require("crypto")
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


userDetail.methods.validatePassword = function(password) {
  hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex")
  console.log(this.salt)
  console.log("saved hash : ", this.hash)
  console.log("hash : ", hash)
  console.log("password :", this.password)
  return this.passwrod === hash
}

userDetail.pre("save", function(next) {
  const user = this
  if (!user.isModified("password")) return next()
  console.log("in the things", user.password)
  this.setPassword(user.password).then((result) => {
    console.log(result)
    user.password = result.hash
    user.hash = result.hash
    user.salt = result.salt
    user.hash = result.hash
    next()
  })
})
userDetail.plugin(passportLocalMongoose)

module.exports = mongoose.model("userInfo", userDetail)
