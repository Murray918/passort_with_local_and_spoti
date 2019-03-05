const UserDetails = require("./schema")
const express = require("express")
const router = express.Router()
const passport = require("passport")
const passportService = require("./strategies")

router.get("/", (req, res) => {
  UserDetails.find(null)
  .select({password: 1, salt : 1, username : 1})
  .then((data) => {
    console.log(data)
    res.send(data)
  })
})

router.post("/create", (req, res) => {
  let { username, password } = req.body
  let newUser = new UserDetails({
    username: username,
    password: password,
    created_at: new Date(),
    // salt: ""
  })
  newUser
    .save()
    .then((result) => {
      res.send(result)
    })
    .catch((error) => {
      console.log(error)
      res.send(error)
    })
})

router.post("/", passport.authenticate("local"), (req, res) => {
    console.log('i was hit again but i dont know tho')
    res.send('party with cardi')
})

router.get("/success", (req, res, next) => {
  res.send("<h1>success</h1>")
})

router.get("/nope", (req, res) => {
  console.log("server was hit by the client")
  res.send("you have atttacccckkkkeeeeedddd")
})

module.exports = router
